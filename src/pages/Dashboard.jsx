import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { LogOut, Package, Ticket, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const Dashboard = () => {
  const { user, userData, logout } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(true);

  useEffect(() => {
    const fetchUserTickets = async () => {
      if (!user && !userData?.email) return;

      setLoadingTickets(true);
      const ticketsMap = new Map();

      try {
        // 1. Query by User ID (for new tickets)
        if (user?.uid) {
          try {
            const qUid = query(
              collection(db, "tickets"),
              where("userId", "==", user.uid),
            );
            const snapshotUid = await getDocs(qUid);
            snapshotUid.forEach((doc) => {
              ticketsMap.set(doc.id, { id: doc.id, ...doc.data() });
            });
          } catch (err) {
            console.warn("Error fetching by UID:", err);
          }
        }

        // 2. Query by Email (for old tickets)
        if (userData?.email) {
          try {
            const qEmail = query(
              collection(db, "tickets"),
              where("email", "==", userData.email),
            );
            const snapshotEmail = await getDocs(qEmail);
            snapshotEmail.forEach((doc) => {
              if (!ticketsMap.has(doc.id)) {
                ticketsMap.set(doc.id, { id: doc.id, ...doc.data() });
              }
            });
          } catch (err) {
            console.warn("Error fetching by Email:", err);
          }
        }

        // Convert Map to Array and Sort
        const allTickets = Array.from(ticketsMap.values()).sort((a, b) => {
          const dateA = a.createdAt?.seconds || 0;
          const dateB = b.createdAt?.seconds || 0;
          return dateB - dateA;
        });

        setTickets(allTickets);
      } catch (error) {
        console.error("General error fetching tickets:", error);
      } finally {
        setLoadingTickets(false);
      }
    };

    fetchUserTickets();
  }, [user, userData]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "text-yellow-400";
      case "in review":
        return "text-blue-400";
      case "closed":
        return "text-green-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        paddingTop: "calc(var(--nav-height) + 2rem)",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <SEO
        title="Mi Panel"
        description="Gestiona tus servicios, puntos y tickets en Galaktik."
        keywords="dashboard, panel, puntos, tickets"
      />

      <div className="container">
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "3rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
              Hello, {userData?.name || "Client"}
            </h1>
            <p style={{ color: "var(--text-secondary)" }}>
              Welcome to your dashboard
            </p>
          </div>

          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            {userData?.role === "admin" && (
              <Link
                to="/admin"
                className="btn btn-primary"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.9rem",
                  background: "var(--accent-gradient)",
                }}
              >
                ⚙️ Admin Panel
              </Link>
            )}

            <button
              onClick={logout}
              className="btn btn-outline"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.9rem",
              }}
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
          }}
        >
          {/* My Plans Section */}
          <div style={{ gridColumn: "1 / -1" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <Package className="text-accent" /> My Active Plans
            </h2>

            {userData?.plans && userData.plans.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {userData.plans.map((plan, index) => (
                  <div
                    key={index}
                    style={{
                      background: "var(--card-bg)",
                      padding: "1.5rem",
                      borderRadius: "16px",
                      border: "1px solid var(--card-border)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "4px",
                        height: "100%",
                        background: "var(--accent-gradient)",
                      }}
                    />
                    <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                      {plan.name}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "1rem",
                      }}
                    >
                      <span
                        style={{
                          background: "rgba(34, 197, 94, 0.1)",
                          color: "#4ade80",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "20px",
                          fontSize: "0.8rem",
                          fontWeight: "600",
                        }}
                      >
                        {plan.status || "Active"}
                      </span>
                      {plan.expiry && (
                        <span
                          style={{
                            color: "var(--text-secondary)",
                            fontSize: "0.8rem",
                          }}
                        >
                          Expires: {plan.expiry}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  background: "var(--card-bg)",
                  padding: "2rem",
                  borderRadius: "16px",
                  border: "1px solid var(--card-border)",
                  textAlign: "center",
                  color: "var(--text-secondary)",
                }}
              >
                <p>You don't have any active plans yet.</p>
                <Link
                  to="/ticket?type=quote"
                  style={{
                    color: "#818cf8",
                    marginTop: "0.5rem",
                    display: "inline-block",
                  }}
                >
                  Request a service &rarr;
                </Link>
              </div>
            )}
          </div>

          {/* My Tickets Section */}
          <div style={{ gridColumn: "1 / -1" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <Ticket className="text-accent" /> My Tickets
              </h2>
              <div style={{ display: "flex", gap: "1rem" }}>
                <Link
                  to="/ticket?type=job"
                  className="btn btn-outline"
                  style={{
                    padding: "0.5rem 1rem",
                    fontSize: "0.9rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Plus size={16} /> Job Ticket
                </Link>
                <Link
                  to="/ticket?type=quote"
                  className="btn btn-outline"
                  style={{
                    padding: "0.5rem 1rem",
                    fontSize: "0.9rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Plus size={16} /> Quote Ticket
                </Link>
              </div>
            </div>

            {loadingTickets ? (
              <p>Loading tickets...</p>
            ) : tickets.length > 0 ? (
              <div style={{ display: "grid", gap: "1rem" }}>
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    style={{
                      background: "var(--card-bg)",
                      padding: "1.5rem",
                      borderRadius: "16px",
                      border: "1px solid var(--card-border)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <span
                          style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                        >
                          {ticket.id}
                        </span>
                        <span
                          className={getStatusColor(ticket.status)}
                          style={{ fontSize: "0.9rem", fontWeight: "600" }}
                        >
                          {ticket.status}
                        </span>
                      </div>
                      <p
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "0.9rem",
                        }}
                      >
                        {new Date(
                          ticket.createdAt?.seconds * 1000,
                        ).toLocaleDateString()}
                      </p>
                      <p style={{ marginTop: "0.5rem" }}>
                        {ticket.message || ticket.role || "No description"}
                      </p>
                    </div>
                    <Link
                      to={`/track?id=${ticket.id}`}
                      style={{
                        color: "#818cf8",
                        textDecoration: "underline",
                        fontSize: "0.9rem",
                      }}
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  background: "var(--card-bg)",
                  padding: "2rem",
                  borderRadius: "16px",
                  border: "1px solid var(--card-border)",
                  textAlign: "center",
                  color: "var(--text-secondary)",
                }}
              >
                <p>You haven't created any tickets yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  where,
  getDocs,
} from "firebase/firestore";
import { getFirebaseAuth, getFirebaseDb } from "../config/firebase";
import { useLanguage } from "../context/LanguageContext";
import { LogOut, Save, Search, Lock } from "lucide-react";
import SEO from "../components/SEO";

const Admin = () => {
  const { t } = useLanguage();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("tickets"); // 'tickets' or 'users'

  // User Management State
  const [searchEmail, setSearchEmail] = useState("");
  const [foundUser, setFoundUser] = useState(null);
  const [userSearchError, setUserSearchError] = useState("");
  const [newPlanName, setNewPlanName] = useState("");
  const [newPlanExpiry, setNewPlanExpiry] = useState("");

  const fetchTickets = async () => {
    const db = await getFirebaseDb();
    const q = query(collection(db, "tickets"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ticketsData = [];
      querySnapshot.forEach((doc) => {
        ticketsData.push({ id: doc.id, ...doc.data() });
      });
      setTickets(ticketsData);
      setLoading(false);
    });
    return unsubscribe;
  };

  useEffect(() => {
    let unsubscribe = () => {};
    getFirebaseAuth().then((auth) => {
      unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
          fetchTickets();
        } else {
          setLoading(false);
        }
      });
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const auth = await getFirebaseAuth();
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials");
    }
  };

  const handleLogout = async () => {
    try {
      const auth = await getFirebaseAuth();
      await signOut(auth);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const updateStatus = async (ticketId, newStatus) => {
    try {
      const db = await getFirebaseDb();
      const ticketRef = doc(db, "tickets", ticketId);
      await updateDoc(ticketRef, {
        status: newStatus,
        updatedAt: new Date(),
      });
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // User Management Functions
  const searchUser = async (e) => {
    e.preventDefault();
    setUserSearchError("");
    setFoundUser(null);
    try {
      const db = await getFirebaseDb();
      const q = query(
        collection(db, "users"),
        where("email", "==", searchEmail),
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        setFoundUser({ id: userDoc.id, ...userDoc.data() });
      } else {
        setUserSearchError("User not found");
      }
    } catch (err) {
      console.error("Error searching user:", err);
      setUserSearchError("Error searching user");
    }
  };

  const toggleAdminRole = async () => {
    if (!foundUser) return;
    try {
      const db = await getFirebaseDb();
      const userRef = doc(db, "users", foundUser.id);
      const newRole = foundUser.role === "admin" ? "user" : "admin";
      await updateDoc(userRef, { role: newRole });
      setFoundUser({ ...foundUser, role: newRole });
      alert(`User role updated to ${newRole}`);
    } catch (err) {
      console.error("Error updating role:", err);
      alert("Error updating role");
    }
  };

  const addUserPlan = async () => {
    if (!foundUser || !newPlanName) return;
    try {
      const db = await getFirebaseDb();
      const userRef = doc(db, "users", foundUser.id);
      const newPlan = {
        name: newPlanName,
        status: "Active",
        expiry: newPlanExpiry || "N/A",
        addedAt: new Date(),
      };
      const currentPlans = foundUser.plans || [];
      await updateDoc(userRef, { plans: [...currentPlans, newPlan] });
      setFoundUser({ ...foundUser, plans: [...currentPlans, newPlan] });
      setNewPlanName("");
      setNewPlanExpiry("");
      alert("Plan added successfully");
    } catch (err) {
      console.error("Error adding plan:", err);
      alert("Error adding plan");
    }
  };

  if (loading)
    return (
      <div style={{ paddingTop: "100px", textAlign: "center" }}>Loading...</div>
    );

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          paddingTop: "calc(var(--nav-height) + 2rem)",
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SEO
          title="Admin - Login"
          description="Panel de administración de Galaktik. Acceso restringido."
          keywords="admin, panel administracion"
        />
        <div
          style={{
            background: "var(--card-bg)",
            padding: "3rem",
            borderRadius: "24px",
            border: "1px solid var(--card-border)",
            width: "100%",
            maxWidth: "400px",
            textAlign: "center",
          }}
        >
          <Lock size={48} color="#6366f1" style={{ marginBottom: "1rem" }} />
          <h1 style={{ marginBottom: "2rem" }}>{t.admin.login}</h1>
          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <input
              type="email"
              placeholder={t.admin.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "1rem",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid var(--card-border)",
                color: "white",
              }}
            />
            <input
              type="password"
              placeholder={t.admin.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: "1rem",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid var(--card-border)",
                color: "white",
              }}
            />
            {error && <p style={{ color: "#fca5a5" }}>{error}</p>}
            <button type="submit" className="btn btn-primary">
              {t.admin.login}
            </button>
          </form>
        </div>
      </motion.div>
    );
  }

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
        title="Admin Dashboard"
        description="Panel de administración de tickets y solicitudes."
        keywords="admin, dashboard, tickets"
      />
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "3rem",
          }}
        >
          <h1>{t.admin.dashboard}</h1>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={() => setActiveTab("tickets")}
              className={`btn ${activeTab === "tickets" ? "btn-primary" : "btn-outline"}`}
            >
              Tickets
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`btn ${activeTab === "users" ? "btn-primary" : "btn-outline"}`}
            >
              Users
            </button>
            <button
              onClick={handleLogout}
              className="btn btn-outline"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <LogOut size={18} /> {t.admin.logout}
            </button>
          </div>
        </div>

        {activeTab === "tickets" ? (
          <div style={{ display: "grid", gap: "1.5rem" }}>
            {tickets.length === 0 ? (
              <p
                style={{ textAlign: "center", color: "var(--text-secondary)" }}
              >
                {t.admin.noTickets}
              </p>
            ) : (
              tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  style={{
                    background: "var(--card-bg)",
                    padding: "1.5rem",
                    borderRadius: "16px",
                    border: "1px solid var(--card-border)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <h3
                        style={{ fontSize: "1.2rem", marginBottom: "0.25rem" }}
                      >
                        {ticket.name}
                      </h3>
                      <p
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "0.9rem",
                        }}
                      >
                        {ticket.email} • {ticket.phone}
                      </p>
                      <p
                        style={{
                          color: "#a78bfa",
                          fontWeight: "bold",
                          marginTop: "0.5rem",
                        }}
                      >
                        ID: {ticket.id}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        alignItems: "center",
                      }}
                    >
                      <select
                        value={ticket.status}
                        onChange={(e) =>
                          updateStatus(ticket.id, e.target.value)
                        }
                        style={{
                          padding: "0.5rem",
                          borderRadius: "8px",
                          background: "rgba(255,255,255,0.1)",
                          color: "white",
                          border: "1px solid var(--card-border)",
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Review">In Review</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                  </div>
                  <div
                    style={{
                      background: "rgba(0,0,0,0.2)",
                      padding: "1rem",
                      borderRadius: "8px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--text-secondary)",
                        marginBottom: "0.25rem",
                      }}
                    >
                      Details:
                    </p>
                    <p>{ticket.message || ticket.role}</p>
                    {ticket.plan && (
                      <p
                        style={{
                          marginTop: "0.5rem",
                          fontSize: "0.9rem",
                          color: "#818cf8",
                        }}
                      >
                        Plan: {ticket.plan}
                      </p>
                    )}
                    {ticket.cv && (
                      <p style={{ marginTop: "0.5rem" }}>
                        <a
                          href={ticket.cv}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#818cf8",
                            textDecoration: "underline",
                          }}
                        >
                          View CV
                        </a>
                      </p>
                    )}
                  </div>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-secondary)",
                      textAlign: "right",
                    }}
                  >
                    {new Date(
                      ticket.createdAt?.seconds * 1000,
                    ).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        ) : (
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <div
              style={{
                background: "var(--card-bg)",
                padding: "2rem",
                borderRadius: "16px",
                border: "1px solid var(--card-border)",
                marginBottom: "2rem",
              }}
            >
              <h2 style={{ marginBottom: "1.5rem" }}>Search User</h2>
              <form
                onSubmit={searchUser}
                style={{ display: "flex", gap: "1rem" }}
              >
                <input
                  type="email"
                  placeholder="User Email"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid var(--card-border)",
                    color: "white",
                  }}
                />
                <button type="submit" className="btn btn-primary">
                  <Search size={20} />
                </button>
              </form>
              {userSearchError && (
                <p style={{ color: "#fca5a5", marginTop: "1rem" }}>
                  {userSearchError}
                </p>
              )}
            </div>

            {foundUser && (
              <div
                style={{
                  background: "var(--card-bg)",
                  padding: "2rem",
                  borderRadius: "16px",
                  border: "1px solid var(--card-border)",
                }}
              >
                <h2 style={{ marginBottom: "0.5rem" }}>{foundUser.name}</h2>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    marginBottom: "2rem",
                  }}
                >
                  {foundUser.email}
                </p>

                <div
                  style={{
                    marginBottom: "2rem",
                    paddingBottom: "2rem",
                    borderBottom: "1px solid var(--card-border)",
                  }}
                >
                  <h3 style={{ marginBottom: "1rem" }}>
                    Role:{" "}
                    <span
                      style={{
                        color:
                          foundUser.role === "admin" ? "#4ade80" : "#94a3b8",
                      }}
                    >
                      {foundUser.role || "user"}
                    </span>
                  </h3>
                  <button
                    onClick={toggleAdminRole}
                    className="btn btn-outline"
                    style={{ width: "100%" }}
                  >
                    {foundUser.role === "admin"
                      ? "Demote to User"
                      : "Promote to Admin"}
                  </button>
                </div>

                <div>
                  <h3 style={{ marginBottom: "1rem" }}>Add Plan</h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Plan Name (e.g. Web Maintenance)"
                      value={newPlanName}
                      onChange={(e) => setNewPlanName(e.target.value)}
                      style={{
                        padding: "0.75rem",
                        borderRadius: "8px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid var(--card-border)",
                        color: "white",
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Expiry Date (e.g. 2025-12-31)"
                      value={newPlanExpiry}
                      onChange={(e) => setNewPlanExpiry(e.target.value)}
                      style={{
                        padding: "0.75rem",
                        borderRadius: "8px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid var(--card-border)",
                        color: "white",
                      }}
                    />
                    <button onClick={addUserPlan} className="btn btn-primary">
                      Add Plan
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Admin;

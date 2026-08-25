import { motion, useInView } from "framer-motion";
import { memo, useRef } from "react";
import barLogo from "../assets/barlogo.webp";
import androidLogo from "../assets/Androidlogoo.jpg";
import hotelLogo from "../assets/wyndham.webp";
import restauranteLogo from "../assets/travels.webp";

const logos = [
  { src: barLogo, alt: "Bar Logo" },
  { src: androidLogo, alt: "Android Logo" },
  { src: hotelLogo, alt: "Hotel Logo" },
  { src: restauranteLogo, alt: "Restaurant Logo" },
];

const duplicatedLogos = [...logos, ...logos];

const ComponenteScroll = () => {
  return (
    <div
      style={{
        backgroundColor: "#262626",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        overflow: "hidden",
        padding: "120px 0 40px",
      }}
    >
      <HorizontalAutoCarousel />
    </div>
  );
};

const HorizontalAutoCarousel = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.1 });

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <motion.div
        style={{
          display: "flex",
          gap: "32px",
          width: "max-content",
          alignItems: "center",
        }}
        animate={inView ? { x: ["0%", "-50%"] } : { x: "0%" }}
        transition={{
          duration: 20,
          repeat: inView ? Infinity : 0,
          ease: "linear",
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <LogoCard logo={logo} key={`${logo.alt}-${index}`} />
        ))}
      </motion.div>
    </div>
  );
};

const LogoCard = memo(({ logo }) => {
  return (
    <div
      style={{
        position: "relative",
        height: "180px",
        width: "300px",
        overflow: "hidden",
        backgroundColor: "transparent",
        flexShrink: 0,
        borderRadius: "16px",
        cursor: "default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        transition:
          "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.08)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
      }}
    >
      <img
        src={logo.src}
        alt={logo.alt}
        loading="lazy"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          width: "auto",
          height: "auto",
          objectFit: "contain",
          filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))",
          transition: "filter 0.3s ease",
        }}
      />
    </div>
  );
});

export default ComponenteScroll;

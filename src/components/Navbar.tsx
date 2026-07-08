"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "Philosophy", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#makeupgallery" },
    { name: "Reviews", href: "#reviews" },
    { name: "Reservations", href: "#booking" },
  ];

  return (
    <>
      <motion.nav
        className={styles.navbar}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={styles.navContainer}>
          {/* Logo */}
          <a href="#home" className={styles.logo}>
            <span className={styles.logoTitle}>SHOBA</span>
            <span className={styles.logoSubtitle}>Beauty Parlour</span>
          </a>

          {/* Desktop Nav Links */}
          <div className={styles.navLinks}>
            {menuItems.map((item, idx) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={styles.navLink}
                whileHover={{ color: "var(--color-gold-hover)" }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Desktop Call to Action */}
          <div className={styles.navActions}>
            <a href="#booking" className="btn-primary" style={{ padding: "8px 20px", fontSize: "0.8rem" }}>
              Book Now <ArrowRight size={14} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.mobileDrawer}
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.drawerHeader}>
              <span className={styles.logo}>
                <span className={styles.logoTitle}>SHOBA</span>
                <span className={styles.logoSubtitle}>Beauty Parlour</span>
              </span>
              <button className={styles.drawerClose} onClick={() => setIsOpen(false)}>
                <X size={28} />
              </button>
            </div>
            <div className={styles.drawerLinks}>
              {menuItems.map((item, idx) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={styles.drawerLink}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.a
                href="#booking"
                className="btn-primary"
                style={{ marginTop: "30px", width: "100%" }}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Book Appointment
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

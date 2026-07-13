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
    { name: "Contact", href: "#contact" },
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
            <div className={styles.logoImgWrapper}>
              <img 
                src="/images/beauty_old.png" 
                alt="Shoba Logo" 
                className={styles.logoImg}
              />
            </div>
            <div className={styles.logoTextWrapper}>
              <span className={styles.logoTitle}>SHOBA</span>
              <span className={styles.logoSubtitle}>Beauty Parlour</span>
            </div>
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
          <div className={styles.navActions} style={{ gap: "10px" }}>
            <a href="#booking" className="btn-primary" style={{ padding: "8px 20px", fontSize: "0.8rem", whiteSpace: "nowrap" }}>
              Book Now <ArrowRight size={14} />
            </a>
            <a 
              href="https://www.google.com/maps/place/Shoba+saloon+and+spa/@12.5484799,78.2920555,17z/data=!4m8!3m7!1s0x3badcb9feb7f55d1:0xdc2cb6a30a6a7da1!8m2!3d12.5484799!4d78.2920555!9m1!1b1!16s%2Fg%2F11llp6b1jm?entry=ttu&g_ep=EgoyMDI2MDcwNy4wIKXMDSoASAFQAw%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary" 
              style={{ padding: "8px 20px", fontSize: "0.8rem", whiteSpace: "nowrap" }}
            >
              Write a Review
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
                <div className={styles.logoImgWrapper}>
                  <img 
                    src="/images/beauty_old.png" 
                    alt="Shoba Logo" 
                    className={styles.logoImg}
                  />
                </div>
                <div className={styles.logoTextWrapper}>
                  <span className={styles.logoTitle}>SHOBA</span>
                  <span className={styles.logoSubtitle}>Beauty Parlour</span>
                </div>
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
                style={{ marginTop: "30px", width: "100%", textAlign: "center" }}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Book Appointment
              </motion.a>
              <motion.a
                href="https://www.google.com/maps/place/Shoba+saloon+and+spa/@12.5484799,78.2920555,17z/data=!4m8!3m7!1s0x3badcb9feb7f55d1:0xdc2cb6a30a6a7da1!8m2!3d12.5484799!4d78.2920555!9m1!1b1!16s%2Fg%2F11llp6b1jm?entry=ttu&g_ep=EgoyMDI2MDcwNy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ marginTop: "12px", width: "100%", textAlign: "center" }}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                Write a Review
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

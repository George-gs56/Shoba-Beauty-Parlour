"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles as SparklesIcon } from "lucide-react";
import ModelCanvas from "./3d/ModelCanvas";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="home" className={styles.heroSection}>
      {/* Background Glow Orbs */}
      <div
        className="glow-orb"
        style={{
          width: "400px",
          height: "400px",
          top: "10%",
          right: "10%",
          background: "rgba(200, 162, 125, 0.08)",
        }}
      />
      <div
        className="glow-orb"
        style={{
          width: "300px",
          height: "300px",
          bottom: "10%",
          left: "5%",
          background: "rgba(230, 184, 162, 0.06)",
        }}
      />

      <div className={styles.heroContainer}>
        {/* Left Column: Typography Content */}
        <motion.div
          className={styles.heroTextContent}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.tagline}>
            <SparklesIcon size={14} className={styles.tagIcon} />
            <span>The Sanctuary of Rejuvenation</span>
          </div>

          <h1 className={styles.mainTitle}>
            Science of Skin, <br />
            <span>Art of Beauty.</span>
          </h1>

          <p className={styles.description}>
            Enter a world of bespoke luxury. At Shoba Beauty Parlour, we blend natural botanicals, 
            clinical science, and artistic hair & makeup styling to reveal your true radiance.
          </p>

          <div className={styles.actionButtons}>
            <a href="#booking" className="btn-primary">
              Book Appointment <ArrowRight size={16} />
            </a>
            <a href="#services" className="btn-secondary">
              View Menu
            </a>
          </div>

          {/* Micro Stats / Highlights */}
          <div className={styles.highlights}>
            <div className={styles.highlightItem}>
              <span className={styles.highlightVal}>98%</span>
              <span className={styles.highlightLabel}>Natural Botanicals</span>
            </div>
            <div className={styles.highlightDivider} />
            <div className={styles.highlightItem}>
              <span className={styles.highlightVal}>12+</span>
              <span className={styles.highlightLabel}>Years of Excellence</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: 3D Render Canvas */}
        <motion.div
          className={styles.heroCanvasContainer}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.canvasWrapper}>
            <ModelCanvas liquidColor="#c8a27d" intensity={1.2} />
          </div>
        </motion.div>
      </div>

      {/* Elegant Bottom Scroll Indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className={styles.scrollText}>Scroll to Explore</span>
        <div className={styles.scrollLine}>
          <motion.div
            className={styles.scrollDot}
            animate={{ y: [0, 24, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

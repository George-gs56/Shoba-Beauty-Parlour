"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Heart, ShieldCheck } from "lucide-react";
import styles from "./About.module.css";

export default function About() {
  // Staggered children animation helper
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  } as const;

  return (
    <section id="about" className="section" style={{ backgroundColor: "var(--color-bg-dark)" }}>
      {/* Decorative Blur Backgrounds */}
      <div
        className="glow-orb"
        style={{
          width: "350px",
          height: "350px",
          top: "40%",
          left: "-10%",
          background: "rgba(200, 162, 125, 0.05)",
        }}
      />

      <div className="container">
        <div className={styles.aboutGrid}>
          {/* Left Column: Story & Philosophy */}
          <motion.div
            className={styles.aboutTextSide}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div className="luxury-title-container" variants={itemVariants}>
              <span className="luxury-subtitle">Our Philosophy</span>
              <h2 className="luxury-title">
                Cultivating Radiance <br />
                From <span>Within.</span>
              </h2>
            </motion.div>

            <motion.p className={styles.philosophyText} variants={itemVariants}>
              We believe that beauty is not a mask, but a glow waiting to be uncovered. 
              Shoba Beauty Parlour was founded on the principle that premium makeup 
              and styling should highlight your natural features and unique elegance. 
            </motion.p>

            <motion.p className={styles.bodyText} variants={itemVariants}>
              Every makeup and styling session is tailored to your occasion, utilizing high-end 
              hypoallergenic cosmetics, traditional bridal aesthetics, and modern styling techniques. 
              Our parlor is designed to make you feel pampered while our experts craft your 
              perfect bridal look.
            </motion.p>

            {/* Core Values / Features */}
            <motion.div className={styles.valuesList} variants={itemVariants}>
              <div className={styles.valueItem}>
                <div className={styles.valueIcon}>
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4 className={styles.valueTitle}>Bridal Couture Makeup</h4>
                  <p className={styles.valueDesc}>
                    Exquisite traditional and contemporary bridal transformations.
                  </p>
                </div>
              </div>

              <div className={styles.valueItem}>
                <div className={styles.valueIcon}>
                  <Heart size={20} />
                </div>
                <div>
                  <h4 className={styles.valueTitle}>Occasion & Party Styling</h4>
                  <p className={styles.valueDesc}>
                    Stunning makeup and hairstyles tailored for festivals, receptions, and shoots.
                  </p>
                </div>
              </div>

              <div className={styles.valueItem}>
                <div className={styles.valueIcon}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className={styles.valueTitle}>Premium Cosmetic Brands</h4>
                  <p className={styles.valueDesc}>
                    Only dermatologist-approved, luxury makeup products used.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Premium Image Layout */}
          <motion.div
            className={styles.aboutImageSide}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.imageContainer}>
              {/* Main Premium Photo */}
              <div className={styles.mainImageFrame}>
                <Image
                  src="/images/about_makeup.jpg"
                  alt="Indian Model Makeup Styling"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.aboutImage}
                  priority
                />
              </div>

              {/* Overlapping Secondary Photo */}
              <motion.div
                className={styles.subImageFrame}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Image
                  src="/images/about_bride.jpg"
                  alt="Indian Bridal Makeup"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className={styles.aboutImage}
                />
              </motion.div>

              {/* Floating aesthetic card */}
              <motion.div
                className={`${styles.floatingCard} glass-card`}
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              >
                <span className={styles.cardNumber}>100%</span>
                <span className={styles.cardLabel}>Cruelty Free & Vegan</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

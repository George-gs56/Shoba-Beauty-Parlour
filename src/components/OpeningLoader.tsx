"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./OpeningLoader.module.css";

interface OpeningLoaderProps {
  onComplete: () => void;
}

export default function OpeningLoader({ onComplete }: OpeningLoaderProps) {
  const [showLogoText, setShowLogoText] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Stage 1: Reveal logo text (at 1.2s)
    const textTimer = setTimeout(() => {
      setShowLogoText(true);
    }, 1200);

    // Stage 2: Initiate exit fade out (at 3.8s)
    const exitTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 3800);

    // Stage 3: Trigger parent completion (at 4.5s)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Framer Motion Variants
  const logoContainerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const letterVariants: any = {
    hidden: { opacity: 0, y: 20, scale: 0.85 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const subtitleVariants: any = {
    hidden: { opacity: 0, letterSpacing: "0.2em" },
    visible: {
      opacity: 1,
      letterSpacing: "0.45em",
      transition: { duration: 1.4, ease: "easeOut" }
    }
  };

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          className={styles.loaderContainer}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Ambient glow spots */}
          <div className={styles.ambientGlow} />
          
          <div className={styles.contentWrapper}>
            {/* Large Luxury Beauty Face Outline Image */}
            <motion.div
              className={styles.beautyImgWrapper}
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src="/images/beauty_old.png"
                alt="Shoba Beauty Logo"
                width={450}
                height={450}
                className={styles.beautyImg}
                priority
              />
            </motion.div>

            {/* Shop Name Typography */}
            <div className={styles.logoTextWrapper}>
              <AnimatePresence>
                {showLogoText && (
                  <motion.div
                    variants={logoContainerVariants}
                    initial="hidden"
                    animate="visible"
                    className={styles.titleContainer}
                  >
                    {/* SHOBA Title */}
                    <h1 className={styles.mainTitle}>
                      {"SHOBA".split("").map((letter, idx) => (
                        <motion.span key={idx} variants={letterVariants}>
                          {letter}
                        </motion.span>
                      ))}
                    </h1>
                    
                    {/* BEAUTY PARLOUR Subtitle */}
                    <motion.span
                      variants={subtitleVariants}
                      className={styles.subtitle}
                    >
                      BEAUTY PARLOUR
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}




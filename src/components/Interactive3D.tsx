"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Check, Info } from "lucide-react";
import ModelCanvas from "./3d/ModelCanvas";
import styles from "./Interactive3D.module.css";

interface ElixirOption {
  id: string;
  name: string;
  color: string;
  tagline: string;
  description: string;
  keyIngredients: string[];
  benefits: string[];
  glowColor: string;
}

export default function Interactive3D() {
  const options: ElixirOption[] = [
    {
      id: "rose",
      name: "Rose Radiance Elixir",
      color: "#d6688d", // Soft luxury pink
      tagline: "Bulgarian Rose & Peony Extract",
      description: "A soothing potion designed to plump the skin matrix, instantly calm redness, and leave a dewy petal finish.",
      keyIngredients: ["Bulgarian Rose Distillate", "Peony root extract", "Squalane"],
      benefits: ["Deep Cellular Hydration", "Fades Fine Lines", "Calms Irritation"],
      glowColor: "rgba(214, 104, 141, 0.4)",
    },
    {
      id: "gold",
      name: "Golden Honey Nectar",
      color: "#d4af37", // Elegant gold
      tagline: "Royal Jelly & Wild Jasmine",
      description: "An ultra-nourishing elixir that accelerates collagen synthesis, fights oxidative stress, and restores youthful bounce.",
      keyIngredients: ["Organic Royal Jelly", "Wild Jasmine distillate", "Coenzyme Q10"],
      benefits: ["Restores Firmness", "Powerful Antioxidant", "Brightens Dullness"],
      glowColor: "rgba(212, 175, 55, 0.4)",
    },
    {
      id: "aloe",
      name: "Aloe Pure Infusion",
      color: "#618264", // Sage green
      tagline: "Green Tea & Aloe Hydrolat",
      description: "A purifying, weightless gel elixir that balances sebum production, tightens enlarged pores, and denches cells in moisture.",
      keyIngredients: ["Cold-pressed Aloe Vera", "Matcha tea extract", "Niacinamide (5%)"],
      benefits: ["Balances Oil Production", "Refines Pore Texture", "Blemish Defense"],
      glowColor: "rgba(97, 130, 100, 0.4)",
    },
  ];

  const [selected, setSelected] = useState<ElixirOption>(options[0]);
  const [isMixing, setIsMixing] = useState(false);
  const [mixComplete, setMixComplete] = useState(false);

  const handleMix = () => {
    setIsMixing(true);
    setMixComplete(false);
    setTimeout(() => {
      setIsMixing(false);
      setMixComplete(true);
    }, 2500);
  };

  return (
    <section id="customizer" className="section" style={{ backgroundColor: "var(--color-bg-dark)" }}>
      {/* Dynamic background glow matching the selected elixir color */}
      <div
        className="glow-orb"
        style={{
          width: "450px",
          height: "450px",
          top: "20%",
          left: "20%",
          background: selected.glowColor,
          transition: "background 0.8s ease",
        }}
      />

      <div className="container">
        {/* Title */}
        <div className="luxury-title-container text-center">
          <span className="luxury-subtitle">Elixir Lab</span>
          <h2 className="luxury-title">
            Bespoke <span>Customizer.</span>
          </h2>
        </div>

        <div className={styles.customizerGrid}>
          {/* Left Column: The 3D Canvas */}
          <div className={styles.canvasContainer}>
            <div className={styles.canvasWrapper}>
              <ModelCanvas liquidColor={selected.color} intensity={isMixing ? 3.0 : 1.0} />
            </div>
            {isMixing && (
              <div className={styles.mixingOverlay}>
                <motion.div
                  className={styles.mixingSpinner}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                />
                <span>Blending Botanicals...</span>
              </div>
            )}
          </div>

          {/* Right Column: Customizer Controls */}
          <div className={styles.controlsSide}>
            <span className={styles.controlHeader}>Select Your Base Extract</span>
            
            {/* Elixir Type Selector */}
            <div className={styles.optionButtons}>
              {options.map((opt) => (
                <button
                  key={opt.id}
                  className={`${styles.optionBtn} ${selected.id === opt.id ? styles.activeOption : ""}`}
                  style={{
                    borderColor: selected.id === opt.id ? opt.color : "rgba(200, 162, 125, 0.15)",
                  }}
                  onClick={() => {
                    setSelected(opt);
                    setMixComplete(false);
                  }}
                >
                  <span
                    className={styles.colorDot}
                    style={{ backgroundColor: opt.color, boxShadow: `0 0 10px ${opt.color}` }}
                  />
                  <span className={styles.optionBtnName}>{opt.name}</span>
                </button>
              ))}
            </div>

            {/* Description Info */}
            <div className={styles.infoWrapper}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className={styles.elixirTagline}>{selected.tagline}</span>
                  <p className={styles.elixirDesc}>{selected.description}</p>

                  {/* Key Ingredients */}
                  <div className={styles.detailBlock}>
                    <span className={styles.blockLabel}>
                      <Info size={14} style={{ color: selected.color }} /> Key Actives
                    </span>
                    <div className={styles.ingredientsList}>
                      {selected.keyIngredients.map((ing) => (
                        <span key={ing} className={styles.ingredientTag}>
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Benefits */}
                  <div className={styles.detailBlock}>
                    <span className={styles.blockLabel}>
                      <Sparkles size={14} style={{ color: selected.color }} /> Skin Benefits
                    </span>
                    <ul className={styles.benefitsList}>
                      {selected.benefits.map((benefit) => (
                        <li key={benefit} className={styles.benefitItem}>
                          <Check size={14} className={styles.benefitCheck} style={{ color: selected.color }} />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mix CTA */}
            <div className={styles.mixActionBlock}>
              <button
                className="btn-primary"
                style={{
                  width: "100%",
                  color: isMixing ? "var(--color-text-secondary)" : selected.color,
                  borderColor: selected.color,
                }}
                onClick={handleMix}
                disabled={isMixing}
              >
                {isMixing ? "Blending Elements..." : "Formulate My Elixir"}
              </button>

              <AnimatePresence>
                {mixComplete && (
                  <motion.div
                    className={styles.mixSuccess}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span>Formula saved! Select this elixir in your booking details below.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

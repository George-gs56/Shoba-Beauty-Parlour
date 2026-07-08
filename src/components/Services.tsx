"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Scissors, Star, Palette, Clock, DollarSign, Heart } from "lucide-react";
import styles from "./Services.module.css";

interface ServiceItem {
  id: number;
  category: string;
  name: string;
  duration: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

export default function Services() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Services" },
    { id: "bridal", label: "Bridal" },
    { id: "occasion", label: "Occasion" },
    { id: "editorial", label: "Editorial" },
    { id: "everyday", label: "Everyday" },
  ];

  const services: ServiceItem[] = [
    {
      id: 1,
      category: "bridal",
      name: "Traditional Bridal Makeup",
      duration: "3–4 hrs",
      description: "A timeless South Indian or North Indian bridal look with rich pigments, bold eyes, gold accents, and deep lip colours that last the full day.",
      features: ["Full face prep & base", "Smokey / kajal eye look", "Maang tikka & jewellery styling", "Long-lasting setting spray"],
      icon: <Heart size={22} />,
    },
    {
      id: 2,
      category: "bridal",
      name: "High-Definition (HD) Bridal Makeup",
      duration: "3–5 hrs",
      description: "Camera-ready HD finish using airbrush-grade foundations, contouring, and flawless blending designed to look stunning in photos and reels.",
      features: ["HD foundation & primer", "Precise contouring & highlight", "Full lash application", "UV-resistant setting"],
      icon: <Star size={22} />,
    },
    {
      id: 3,
      category: "bridal",
      name: "Airbrush Bridal Makeup",
      duration: "3–5 hrs",
      description: "Ultra-lightweight airbrush foundation spray technique for a breathable, photo-perfect look that remains flawless in humid conditions.",
      features: ["Airbrush spray foundation", "Seamless coverage", "Waterproof finish", "Lasts 16–20 hours"],
      icon: <Sparkles size={22} />,
    },
    {
      id: 4,
      category: "bridal",
      name: "Engagement & Roka Makeup",
      duration: "2–3 hrs",
      description: "A radiant, elegant look that suits the intimacy of engagement ceremonies — dewy skin, soft eyes, and a graceful lip.",
      features: ["Dewy skin base", "Soft eye look", "Romantic blush & highlight", "Long-wear lip colour"],
      icon: <Heart size={22} />,
    },
    {
      id: 5,
      category: "bridal",
      name: "Mehendi & Sangeet Makeup",
      duration: "2 hrs",
      description: "Vibrant, festive look for Mehendi and Sangeet nights with colourful eyeshadow, glowing skin, and bold lips suited to bright outfits.",
      features: ["Colourful eyeshadow blends", "Glow highlighter", "Bold festive lip", "Flower hair accessories"],
      icon: <Palette size={22} />,
    },
    {
      id: 6,
      category: "bridal",
      name: "Bridesmaid & Family Makeup",
      duration: "1.5 hrs",
      description: "Coordinated, polished makeup for bridesmaids and family members to complement the bride and look stunning in every frame.",
      features: ["Coordinated colour palette", "Full face base", "Eye & lip focus", "Touch-up kit provided"],
      icon: <Sparkles size={22} />,
    },
    {
      id: 7,
      category: "occasion",
      name: "High-Glam Evening Makeup",
      duration: "1.5–2 hrs",
      description: "Bold, dramatic looks perfect for gala evenings, award nights, and high-profile events — shimmery lids, sculpted cheeks, power lips.",
      features: ["Dramatic eye look", "Glitter or shimmer lids", "Cut-crease option", "Full setting & finish"],
      icon: <Star size={22} />,
    },
    {
      id: 8,
      category: "occasion",
      name: "Cocktail & Reception Makeup",
      duration: "1.5 hrs",
      description: "Elegant, cocktail-ready glam with a polished finish — perfect for reception parties and semi-formal gatherings.",
      features: ["Soft glam look", "Highlight & contour", "Bold or nude lip", "Flawless finish"],
      icon: <Palette size={22} />,
    },
    {
      id: 9,
      category: "occasion",
      name: "Festive & Party Makeup",
      duration: "1 hr",
      description: "Fun, festive looks for Pongal, Diwali, Navratri, Christmas, and other celebrations with vibrant colours and joyful aesthetics.",
      features: ["Festive colour palette", "Glowing skin base", "Bindi & kajal styling", "Long-lasting"],
      icon: <Sparkles size={22} />,
    },
    {
      id: 10,
      category: "editorial",
      name: "Editorial & Fashion Makeup",
      duration: "2–3 hrs",
      description: "Avant-garde, artistic concepts for magazine shoots, fashion campaigns, and lookbooks — bold, unconventional, and creatively stunning.",
      features: ["Concept consultation", "Avant-garde colour work", "Body art optional", "Set-friendly finish"],
      icon: <Scissors size={22} />,
    },
    {
      id: 11,
      category: "editorial",
      name: "Corporate & Headshot Makeup",
      duration: "45 min",
      description: "Clean, professional, camera-friendly makeup for LinkedIn portraits, corporate IDs, and business headshots.",
      features: ["Natural skin finish", "Anti-shine formulas", "Sharp subtle definition", "Quick session"],
      icon: <Star size={22} />,
    },
    {
      id: 12,
      category: "everyday",
      name: "Minimalist 'No-Makeup' Makeup",
      duration: "45 min",
      description: "A fresh, effortlessly glowing look that enhances your natural beauty with tinted moisturiser, groomed brows, and a sheer lip.",
      features: ["Skin tint or BB cream", "Brow grooming & tint", "Subtle blush", "Sheer or satin lip"],
      icon: <Heart size={22} />,
    },
  ];

  const filteredServices = activeTab === "all"
    ? services
    : services.filter(service => service.category === activeTab);

  return (
    <section id="services" className="section" style={{ backgroundColor: "var(--color-bg-deep)" }}>
      {/* Decorative Orbs */}
      <div
        className="glow-orb"
        style={{
          width: "400px",
          height: "400px",
          bottom: "-10%",
          right: "-5%",
          background: "rgba(200, 162, 125, 0.04)",
        }}
      />

      <div className="container">
        {/* Title */}
        <div className="luxury-title-container text-center">
          <span className="luxury-subtitle">Our Expertise</span>
          <h2 className="luxury-title">
            Makeup <span>Services.</span>
          </h2>
          <p style={{ color: "var(--color-text-secondary)", maxWidth: "600px", margin: "12px auto 0" }}>
            From traditional bridal transformations to editorial fashion looks, every stroke is crafted with precision and artistry.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className={styles.tabContainer}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.tabBtn} ${activeTab === cat.id ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(cat.id)}
            >
              {cat.label}
              {activeTab === cat.id && (
                <motion.div
                  className={styles.activeUnderline}
                  layoutId="activeTabUnderline"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Services Grid with Layout Animations */}
        <motion.div className={styles.servicesGrid} layout>
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className={`${styles.serviceCard} glass-card`}
              >
                {/* Header */}
                <div className={styles.cardHeader}>
                  <div className={styles.serviceIcon}>{service.icon}</div>
                </div>

                {/* Details */}
                <h3 className={styles.serviceName}>{service.name}</h3>

                <div className={styles.metaInfo}>
                  <Clock size={14} className={styles.metaIcon} />
                  <span>{service.duration}</span>
                </div>

                <p className={styles.serviceDesc}>{service.description}</p>

                {/* Micro Features */}
                <div className={styles.features}>
                  {service.features.map((feat, idx) => (
                    <span key={idx} className={styles.featureBadge}>
                      • {feat}
                    </span>
                  ))}
                </div>

                {/* CTA inside Card */}
                <a href="#booking" className={styles.cardLink}>
                  Book Now
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

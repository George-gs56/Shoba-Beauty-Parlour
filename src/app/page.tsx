"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import MakeupGallery from "@/components/MakeupGallery";
import Reviews from "@/components/Reviews";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import ThreeBackgroundWrapper from "@/components/ThreeBackgroundWrapper";
import OpeningLoader from "@/components/OpeningLoader";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Disable scroll while loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <OpeningLoader key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <div style={{ position: "relative", minHeight: "100vh", width: "100vw", overflowX: "hidden" }}>
        {/* Three.js Global Background Animation */}
        <ThreeBackgroundWrapper />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loading ? 0 : 1 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          style={{ pointerEvents: loading ? "none" : "auto" }}
        >
          {/* Dynamic Header */}
          <Navbar />

          {/* Hero Section */}
          <Hero />

          {/* About Philosophy Section */}
          <About />

          {/* Makeup Services Section */}
          <Services />

          {/* Makeup Gallery Carousel */}
          <MakeupGallery />

          {/* Client Reviews */}
          <Reviews />

          {/* Booking Reservations Section */}
          <Booking />

          {/* Footer Section */}
          <Footer />
        </motion.div>
      </div>
    </>
  );
}

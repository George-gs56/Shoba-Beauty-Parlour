"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import styles from "./Reviews.module.css";

const reviews = [
  {
    id: 1,
    name: "Priya Ramasubramanian",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    text: "Shoba Beauty Parlour-ல் என் திருமண மேக்கப் மிகவும் அழகாக இருந்தது! அவர்கள் என் சருமத்தை புரிந்து கொண்டு பாரம்பரிய மணப்பெண் தோற்றத்தை அசாத்தியமாக செய்தார்கள். மனமார்ந்த நன்றி!",
    service: "Traditional Bridal Makeup",
    avatar: "PR",
  },
  {
    id: 2,
    name: "Karthika Subramaniam",
    location: "Coimbatore, Tamil Nadu",
    rating: 5,
    text: "Shoba Beauty Parlour என்னுடைய நிச்சயதார்த்த நாளில் அருமையாக மேக்கப் செய்தார்கள். என் கணவர் மட்டுமில்லாமல் எல்லோரும் பாராட்டினார்கள். நிச்சயமாக மீண்டும் வருவேன்!",
    service: "Engagement & Roka Makeup",
    avatar: "KS",
  },
  {
    id: 3,
    name: "Deepika Venkataraman",
    location: "Madurai, Tamil Nadu",
    rating: 5,
    text: "I've been coming to Shoba Beauty Parlour for the past 3 years now. The team is incredibly talented and always understands exactly what I want. My Diwali party makeup looked absolutely stunning!",
    service: "Festive & Party Makeup",
    avatar: "DV",
  },
  {
    id: 4,
    name: "Ananya Krishnamurthy",
    location: "Salem, Tamil Nadu",
    rating: 5,
    text: "Best bridal makeup in Tamil Nadu, period! My HD Bridal Makeup lasted the entire day from morning pooja to the reception at midnight. Not a single touch-up needed. The artists are highly professional.",
    service: "HD Bridal Makeup",
    avatar: "AK",
  },
  {
    id: 5,
    name: "Meenakshi Sundaram",
    location: "Trichy, Tamil Nadu",
    rating: 5,
    text: "The minimalist makeup Shoba's team did for my corporate headshots was exactly what I needed — natural, glowing, and very professional. My LinkedIn profile photo has never looked better!",
    service: "Corporate & Headshot Makeup",
    avatar: "MS",
  },
  {
    id: 6,
    name: "Revathi Nagarajan",
    location: "Tirunelveli, Tamil Nadu",
    rating: 5,
    text: "My bridesmaid makeup was so beautifully done! The team matched it perfectly with the bride's look. Everyone kept complimenting me throughout the wedding. Thank you Shoba Beauty Parlour!",
    service: "Bridesmaid Makeup",
    avatar: "RN",
  },
  {
    id: 7,
    name: "Lavanya Chandrasekaran",
    location: "Erode, Tamil Nadu",
    rating: 5,
    text: "Had my Mehendi and Sangeet makeup done here and it was festive, vibrant, and lasted all night through all the dance performances! The flowers they styled in my hair were gorgeous.",
    service: "Mehendi & Sangeet Makeup",
    avatar: "LC",
  },
  {
    id: 8,
    name: "Gayathri Balakrishnan",
    location: "Vellore, Tamil Nadu",
    rating: 5,
    text: "Airbrush bridal makeup was something I always wanted to try, and Shoba Beauty Parlour delivered beyond my expectations. Even in the summer heat, my makeup stayed intact for 18+ hours. Truly magical work!",
    service: "Airbrush Bridal Makeup",
    avatar: "GB",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="section" style={{ backgroundColor: "var(--color-bg-deep)" }}>
      <div
        className="glow-orb"
        style={{
          width: "350px",
          height: "350px",
          top: "20%",
          left: "-8%",
          background: "rgba(200, 162, 125, 0.05)",
        }}
      />

      <div className="container">
        <div className="luxury-title-container text-center">
          <span className="luxury-subtitle">Client Stories</span>
          <h2 className="luxury-title">
            Real <span>Reviews.</span>
          </h2>
          <p style={{ color: "var(--color-text-secondary)", maxWidth: "520px", margin: "12px auto 0" }}>
            From Tamil Nadu brides and professionals — authentic experiences at Shoba Beauty Parlour.
          </p>
        </div>

        <div className={styles.reviewsGrid}>
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              className={`${styles.reviewCard} glass-card`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.07 }}
            >
              {/* Stars */}
              <div className={styles.stars}>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="var(--color-gold)" color="var(--color-gold)" />
                ))}
              </div>

              {/* Review Text */}
              <p className={styles.reviewText}>&ldquo;{review.text}&rdquo;</p>

              {/* Service Badge */}
              <span className={styles.serviceBadge}>{review.service}</span>

              {/* Reviewer Info */}
              <div className={styles.reviewer}>
                <div className={styles.avatar}>{review.avatar}</div>
                <div>
                  <span className={styles.reviewerName}>{review.name}</span>
                  <span className={styles.reviewerLocation}>{review.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

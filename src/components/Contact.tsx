"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import styles from "./Contact.module.css";

export default function Contact() {
  const contactDetails = {
    name: "Shoba Beauty Parlour",
    mobile: "+91 9994062045",
    email: "shoba-parlour@gmail.com",
    address: "KTM Nagar, Elathagiri RD, Palepalle, Krishnagiri, Tamil Nadu 635108",
    workingHours: [
      { days: "Monday - Friday", hours: "09:00 AM - 08:00 PM" },
      { days: "Saturday", hours: "07:00 AM - 08:00 PM" },
      { days: "Sunday", hours: "Booking Only", special: true },
    ]
  };

  return (
    <section id="contact" className="section" style={{ backgroundColor: "var(--color-bg-dark)" }}>
      {/* Decorative Orbs */}
      <div
        className="glow-orb"
        style={{
          width: "400px",
          height: "400px",
          bottom: "10%",
          right: "-5%",
          background: "rgba(200, 162, 125, 0.05)",
        }}
      />
      <div
        className="glow-orb"
        style={{
          width: "300px",
          height: "300px",
          top: "10%",
          left: "5%",
          background: "rgba(230, 184, 162, 0.03)",
        }}
      />

      <div className="container">
        {/* Section Title */}
        <motion.div
          className="luxury-title-container text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="luxury-subtitle">Find Us</span>
          <h2 className="luxury-title">
            Contact <span>Us.</span>
          </h2>
        </motion.div>

        <div className={styles.contactGrid}>
          {/* Left Side: Contact details card */}
          <motion.div
            className={`${styles.contactCard} glass-card`}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h3 className={styles.cardTitle}>{contactDetails.name}</h3>
            <p className={styles.cardSubtitle}>Shoba Saloon and Spa</p>

            <div className={styles.detailsList}>
              {/* Phone */}
              <div className={styles.detailItem}>
                <div className={styles.iconWrapper}>
                  <Phone size={18} />
                </div>
                <div className={styles.detailText}>
                  <span className={styles.label}>Phone</span>
                  <a href={`tel:${contactDetails.mobile}`} className={styles.value}>
                    {contactDetails.mobile}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className={styles.detailItem}>
                <div className={styles.iconWrapper}>
                  <Mail size={18} />
                </div>
                <div className={styles.detailText}>
                  <span className={styles.label}>Email</span>
                  <a href={`mailto:${contactDetails.email}`} className={styles.value}>
                    {contactDetails.email}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className={styles.detailItem}>
                <div className={styles.iconWrapper}>
                  <MapPin size={18} />
                </div>
                <div className={styles.detailText}>
                  <span className={styles.label}>Address</span>
                  <p className={styles.value}>{contactDetails.address}</p>
                </div>
              </div>

              {/* Working Hours */}
              <div className={styles.detailItem}>
                <div className={styles.iconWrapper}>
                  <Clock size={18} />
                </div>
                <div className={styles.detailText}>
                  <span className={styles.label}>Opening Hours</span>
                  <div className={styles.hoursList}>
                    {contactDetails.workingHours.map((item, idx) => (
                      <div key={idx} className={styles.hoursRow}>
                        <span>{item.days}</span>
                        <strong className={item.special ? styles.specialHours : ""}>
                          {item.hours}
                        </strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Integration Button */}
            <div className={styles.whatsappContainer}>
              <a
                href="https://wa.me/919994062045"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappButton}
              >
                <svg
                  className={styles.whatsappIcon}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="18"
                  height="18"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.498 1.451 5.411 1.452 5.518 0 10.007-4.492 10.01-10.01.002-2.673-1.04-5.187-2.936-7.085C17.237 1.614 14.73 0.57 12.012 0.57 6.49 0.57 2.002 5.061 2.002 10.58c-.001 1.942.508 3.84 1.472 5.461l-.965 3.528 3.633-.953zm10.372-5.132c-.3-.15-1.776-.876-2.051-.976-.275-.1-.475-.15-.675.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.413-1.49-1.01-1.077-1.688-2.417-1.888-2.762-.2-.35-.02-.54.16-.69.16-.14.35-.4.525-.6.175-.2.225-.35.35-.6.125-.25.062-.46-.03-.61-.09-.15-.675-1.626-.925-2.225-.244-.588-.492-.51-.675-.52l-.576-.007c-.2 0-.525.075-.8.376-.275.3-1.05 1.026-1.05 2.502 0 1.476 1.075 2.903 1.225 3.102.15.2 2.115 3.227 5.125 4.525.715.309 1.275.494 1.71.632.716.228 1.368.196 1.883.118.574-.087 1.775-.726 2.025-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z" />
                </svg>
                Connect via WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Right Side: Google Map card */}
          <motion.div
            className={`${styles.mapCard} glass-card`}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h3 className={styles.mapTitle}>Our Location</h3>
            <div className={styles.mapWrapper}>
              <iframe
                title="Shoba Saloon and Spa Google Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3895.5398288599427!2d78.2894806!3d12.5484799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3badcb9feb7f55d1%3A0xdc2cb6a30a6a7da1!2sShoba+saloon+and+spa!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "350px" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

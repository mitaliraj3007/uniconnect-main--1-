import React from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-darkBg via-black to-darkBg text-white p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center"
      >
        <Info className="mx-auto mb-3 text-neonBlue" size={40} />
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-neonPink to-neonBlue text-transparent bg-clip-text">
          About UniConnect
        </h1>
        <p className="text-gray-300 leading-relaxed">
          UniConnect is a campus-wide social hub connecting students, hackathon
          enthusiasts, and learners. Share ideas, find teammates, and explore
          events — all in one vibrant network built for universities. 🌐✨
        </p>
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-cardBg rounded-2xl p-5 shadow-md"
          >
            <h2 className="text-xl font-semibold text-neonBlue mb-2">
              Our Mission
            </h2>
            <p className="text-gray-400">
              Empowering students to collaborate, innovate, and grow through
              technology and teamwork.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-cardBg rounded-2xl p-5 shadow-md"
          >
            <h2 className="text-xl font-semibold text-neonPink mb-2">
              Our Vision
            </h2>
            <p className="text-gray-400">
              A future where every campus is digitally connected and full of
              creative minds working together.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
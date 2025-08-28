"use client";
import { motion } from "framer-motion";
import { FaInstagram, FaYoutube, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Home() {
  const links = [
    { name: "Instagram", icon: <FaInstagram />, url: "https://instagram.com" },
    { name: "YouTube", icon: <FaYoutube />, url: "https://youtube.com" },
    { name: "GitHub", icon: <FaGithub />, url: "https://github.com" },
    { name: "LinkedIn", icon: <FaLinkedin />, url: "https://linkedin.com" },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 text-white overflow-hidden">
      {/* background blur circles */}
      <div className="absolute top-[-6rem] left-[-6rem] w-[30rem] h-[30rem] bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-6rem] right-[-6rem] w-[30rem] h-[30rem] bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      {/* profile section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center space-y-4 z-10"
      >
        <div className="w-32 h-32 rounded-full border-4 border-pink-400 p-1 shadow-xl shadow-pink-500/40 animate-spin-slow">
          <img
            src="https://avatars.githubusercontent.com/u/1?v=4" // replace with your image
            alt="profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <h1 className="text-3xl font-bold tracking-wide">Priyanshu Yadav</h1>
        <p className="text-sm opacity-80">🚀 Developer | Creator | Dream Builder</p>
      </motion.div>

      {/* links section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="mt-10 flex flex-col space-y-5 w-80 z-10"
      >
        {links.map((link, i) => (
          <motion.a
            key={i}
            href={link.url}
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-between px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-pink-400/40 transition-all"
          >
            <span className="flex items-center gap-3 text-lg">
              {link.icon} {link.name}
            </span>
            <span className="text-sm opacity-70">→</span>
          </motion.a>
        ))}
      </motion.div>

      {/* CTA Button */}
      <motion.a
        href="mailto:youremail@example.com"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-10 px-6 py-3 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-xl font-semibold shadow-xl hover:scale-105 transition-all z-10"
      >
        📩 Contact Me
      </motion.a>
    </main>
  );
}

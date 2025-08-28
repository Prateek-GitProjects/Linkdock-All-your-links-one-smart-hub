"use client"
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const [text, settext] = useState("")
  const createTree = () => { 
    router.push(`/generate?handle=${text}`)
  }
  return (
    <main>

      <section className="bg-gradient-to-r from-[#0f172a] to-[#1e3a8a] min-h-[100vh] grid grid-cols-2">
        {/* LEFT SIDE */}
        <motion.div
          className="flex justify-center flex-col ml-[9vw] gap-4 mt-20"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.p
            className="text-teal-300 font-extrabold text-6xl leading-tight"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            All your links,
            <br /> one smart hub.
          </motion.p>

          <motion.p
            className="text-white text-lg max-w-xl"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Forget the boring bio links. Build a personalized hub for your audience with a design that actually stands out. Showcase your work, share all your links in one place, and customize it to match your unique style. Turn casual visitors into loyal followers with a hub that feels personal, creative, and memorable.
          </motion.p>

          <motion.div
            className="input flex gap-2 mt-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            <input
            value={text}
            onChange={(e)=> settext(e.target.value)}
              className="px-3 py-3 focus:outline-none rounded-md bg-[#1e293b] text-white w-64"
              type="text"
              placeholder="Enter your Handle"
            />
            <button onClick={()=>createTree()} className=" bg-teal-400 hover:bg-teal-500 transition-all rounded-full px-5 py-3 font-semibold text-slate-900">
              Claim Now
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          className="flex items-center justify-center flex-col mr-[9vw] mt-20"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src="/welcome.jpg"
            alt="Showcase"
            className="rounded-2xl shadow-2xl w-[580px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: [1, 1.05, 1] }} // pulsing
            transition={{
              duration: 3,       // time for one cycle
              repeat: Infinity,  // loop forever
              repeatType: "mirror", // reverses smoothly
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </section>
    </main>
  );
}

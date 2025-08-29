"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const Generate = () => {
  const searchParams = useSearchParams();
  const [links, setLinks] = useState([{ link: "", linktext: "" }]);
  const [handle, sethandle] = useState(searchParams.get("handle"));
  const [pic, setpic] = useState("");
  const [desc, setdesc] = useState("");

  const handleChange = (index, link, linktext) => {
    setLinks((initialLinks) =>
      initialLinks.map((item, i) => (i === index ? { link, linktext } : item))
    );
  };

  const addLink = () => {
    setLinks([...links, { link: "", linktext: "" }]);
  };

  const submitLinks = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      links: links,
      handle: handle,
      pic: pic,
      desc: desc,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const r = await fetch("http://localhost:3000/api/add", requestOptions);
    const result = await r.json();
    if (result.success) {
      toast.success(result.message);
      setLinks([]);
      setpic("");
      sethandle("");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 grid grid-cols-2 font-sans max-h-screen overflow-hidden text-cyan-100">
    {/* Load searchParams inside Suspense */}
      <Suspense fallback={null}>
        <HandleWrapper sethandle={sethandle} />
      </Suspense>
      {/* Left Column */}
      <motion.div
        className="col1 flex justify-center items-center px-6 h-screen mt-16 ml-7"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col gap-4 bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/10 w-[70%] max-w-lg h-[68%] justify-between"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="font-extrabold text-3xl text-center text-cyan-400 drop-shadow-md">
            Create your Linkdock
          </h1>

          {/* Step 1 */}
          <div className="item">
            <h2 className="font-semibold text-lg mb-1 text-cyan-300">
              Step 1: Claim your Handle
            </h2>
            <input
              value={handle || ""}
              onChange={(e) => sethandle(e.target.value)}
              className="px-3 py-2 my-1 w-full rounded-full shadow border border-white/20 text-sm bg-white/5 text-cyan-100 focus:outline-cyan-400"
              type="text"
              placeholder="Choose a Handle"
            />
          </div>

          {/* Step 2 */}
          <div className="item">
            <h2 className="font-semibold text-lg mb-1 text-cyan-300">
              Step 2: Add Links
            </h2>
            {links.map((item, index) => (
              <div key={index} className="flex gap-2 my-1">
                <input
                  value={item.linktext || ""}
                  onChange={(e) => handleChange(index, item.link, e.target.value)}
                  className="px-3 py-2 flex-1 text-sm rounded-full shadow border border-white/20 bg-white/5 text-cyan-100 focus:outline-cyan-400"
                  type="text"
                  placeholder="Enter link text"
                />
                <input
                  value={item.link || ""}
                  onChange={(e) => handleChange(index, e.target.value, item.linktext)}
                  className="px-3 py-2 flex-1 text-sm rounded-full shadow border border-white/20 bg-white/5 text-cyan-100 focus:outline-cyan-400"
                  type="text"
                  placeholder="Enter link"
                />
              </div>
            ))}
            <button
              onClick={addLink}
              className="mt-2 px-4 py-2 text-sm bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-full shadow-md hover:scale-105 transition-transform"
            >
              + Add Link
            </button>
          </div>

          {/* Step 3 */}
          <div className="item">
            <h2 className="font-semibold text-lg mb-1 text-cyan-300">
              Step 3: Add Picture & Description
            </h2>
            <div className="flex gap-4">
            <input
              value={pic || ""}
              onChange={(e) => setpic(e.target.value)}
              className="px-3 py-2 my-1 text-sm rounded-full shadow border border-white/20 bg-white/5 text-cyan-100 focus:outline-cyan-400"
              type="text"
              placeholder="Enter link to your Picture"
            />
            <input
              value={desc || ""}
              onChange={(e) => setdesc(e.target.value)}
              className="px-3 py-2 my-1 text-sm rounded-full shadow border border-white/20 bg-white/5 text-cyan-100 focus:outline-cyan-400"
              type="text"
              placeholder="Enter description"
            />
            </div>
            <motion.button
              disabled={pic === "" || handle === "" || links[0].linktext === ""}
              onClick={submitLinks}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="disabled:bg-gray-500/50 disabled:cursor-not-allowed mt-2 px-5 py-2 w-fit text-sm bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-full shadow-md"
            >
              🚀 Create your Linkdock
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Column */}
      <motion.div
        className="col2 flex justify-center items-center relative h-screen mt-20 widthh"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.img
          className="h-[70%] object-contain drop-shadow-2xl"
          src="/form.jpg"
          alt="Generate your links"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <ToastContainer />
      </motion.div>
    </div>
  );
};

export default Generate;



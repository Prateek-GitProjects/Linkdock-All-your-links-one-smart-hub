"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Community", href: "/community" },
  { name: "About", href: "/about" },
];

const Navbar = () => {
  const pathname = usePathname();
  const showNavbar = ["/", "/generate"].includes(pathname);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {showNavbar && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed top-6 right-[10vw] w-[80vw] z-50 
                     bg-gradient-to-r from-blue-900/80 via-blue-800/70 to-cyan-800/60
                     shadow-xl rounded-2xl px-8 py-4 flex justify-between items-center 
                     backdrop-blur-lg border border-white/10"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span>
              <img className="h-10" src="/logo.png" alt="Linkdock Logo" />
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-10 text-cyan-100 font-medium">
            {navItems.map((item, i) => (
              <motion.li
                key={i}
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link href={item.href} className="hover:text-cyan-400">
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* Auth Buttons */}
          <div className="hidden md:flex gap-4">
            <button className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-cyan-100 font-bold transition-all">
              Log in
            </button>
            <button className="px-6 py-2 rounded-lg bg-cyan-400 text-black font-bold shadow-md hover:bg-cyan-300 transition-all">
              Sign up
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-cyan-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Mobile Dropdown */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute top-20 left-0 w-full 
                         bg-blue-900/95 backdrop-blur-xl shadow-lg 
                         rounded-b-2xl p-6 flex flex-col gap-6 md:hidden"
            >
              {navItems.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="text-cyan-100 font-semibold hover:text-cyan-400"
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex gap-3">
                <button className="w-1/2 px-4 py-2 rounded-lg bg-white/10 text-cyan-100 font-semibold hover:bg-white/20">
                  Log in
                </button>
                <button className="w-1/2 px-4 py-2 rounded-lg bg-cyan-400 text-black font-bold hover:bg-cyan-300">
                  Sign up
                </button>
              </div>
            </motion.div>
          )}
        </motion.nav>
      )}
    </>
  );
};

export default Navbar;

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  {
    name: "Features",
    path: "/features",
  },
  {
    name: "Screenshots",
    path: "/screenshots",
  },
  {
    name: "Download",
    path: "/download",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* =====================================================
          DESKTOP / MOBILE NAVBAR
      ====================================================== */}

      <header className="fixed left-0 right-0 top-0 z-[100] px-3 pt-3 sm:px-5 sm:pt-4 lg:px-8">
        <motion.div
          initial={{
            opacity: 0,
            y: -25,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mx-auto max-w-[1420px]"
        >
          {/* =================================================
              OUTER GLASS FRAME
          ================================================== */}

          <div className="relative rounded-[24px] border border-white/80 bg-white/[0.58] p-1.5 shadow-[0_15px_45px_rgba(48,36,43,0.08)] backdrop-blur-2xl sm:rounded-[28px] sm:p-2">
            {/* Subtle glass shine */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[22px]">
              <motion.div
                initial={{
                  x: "-120%",
                }}
                animate={{
                  x: "150%",
                }}
                transition={{
                  duration: 2.2,
                  delay: 0.8,
                  ease: "easeInOut",
                }}
                className="absolute inset-y-0 w-1/3 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent"
              />
            </div>

            {/* =================================================
                NAV INNER
            ================================================== */}

            <div className="relative flex h-[58px] items-center justify-between rounded-[20px] px-2 sm:h-[62px] sm:px-3">
              {/* =================================================
                  LOGO
              ================================================== */}

              <Link
                to="/"
                onClick={closeMenu}
                className="group relative flex shrink-0 items-center"
              >
                <motion.div
                  whileHover={{
                    scale: 1.035,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                  }}
                  className="relative flex items-center"
                >
                  {/* Logo glow */}

                  <span className="pointer-events-none absolute -inset-2 rounded-2xl bg-[#CFC2DC]/30 opacity-0 blur-xl transition duration-500 group-hover:opacity-100" />

                  <img
                    src="/billzy-logo.png"
                    alt="Billzy"
                    className="relative h-[52px] w-auto object-contain sm:h-[52px]"
                  />
                </motion.div>
              </Link>

              {/* =================================================
                  DESKTOP NAVIGATION
              ================================================== */}

              <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center rounded-2xl border border-white/70 bg-white/35 p-1 md:flex">
                {navLinks.map((link) => {
                  const active = isActive(link.path);

                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="relative"
                    >
                      <motion.div
                        whileHover={{
                          y: -1,
                        }}
                        whileTap={{
                          scale: 0.96,
                        }}
                        className={`relative rounded-xl px-4 py-2.5 text-[12px] font-bold transition-colors duration-300 lg:px-5 ${
                          active
                            ? "text-white"
                            : "text-[#756970] hover:text-[#43305F]"
                        }`}
                      >
                        {/* Animated active glass pill */}

                        {active && (
                          <motion.span
                            layoutId="navbar-active-pill"
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 30,
                            }}
                            className="absolute inset-0 -z-10 rounded-xl bg-[#43305F] shadow-[0_8px_20px_rgba(67,48,95,0.18)]"
                          />
                        )}

                        {/* Hover background */}

                        {!active && (
                          <motion.span
                            className="absolute inset-0 -z-10 rounded-xl bg-white/0"
                            whileHover={{
                              backgroundColor:
                                "rgba(255,255,255,0.65)",
                            }}
                          />
                        )}

                        <span className="relative">
                          {link.name}
                        </span>

                        {/* Small active dot */}

                        {active && (
                          <motion.span
                            initial={{
                              scale: 0,
                              opacity: 0,
                            }}
                            animate={{
                              scale: 1,
                              opacity: 1,
                            }}
                            className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-[#C76B42] align-middle"
                          />
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
              </nav>

              {/* =================================================
                  DESKTOP DOWNLOAD
              ================================================== */}

              <Link
                to="/download"
                className="group relative hidden overflow-hidden rounded-[16px] bg-[#43305F] px-5 py-3 text-[11px] font-black text-white shadow-[0_12px_28px_rgba(67,48,95,0.2)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_17px_35px_rgba(67,48,95,0.27)] sm:px-6 md:flex md:items-center md:gap-2"
              >
                {/* Button shine */}

                <span className="absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-white/15 transition-all duration-700 group-hover:left-[130%]" />

                <span className="relative">
                  Download
                </span>

                <motion.span
                  animate={{
                    x: [0, 3, 0],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative text-sm text-[#E4B8A5]"
                >
                  →
                </motion.span>
              </Link>

              {/* =================================================
                  MOBILE MENU BUTTON
              ================================================== */}

              <motion.button
                type="button"
                onClick={() =>
                  setMenuOpen((previous) => !previous)
                }
                whileTap={{
                  scale: 0.9,
                }}
                className="relative flex h-11 w-11 items-center justify-center rounded-[15px] border border-white/80 bg-white/60 text-[#43305F] shadow-sm backdrop-blur-xl md:hidden"
                aria-label={
                  menuOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
                }
                aria-expanded={menuOpen}
              >
                <div className="relative h-5 w-5">
                  {/* Top */}

                  <motion.span
                    animate={
                      menuOpen
                        ? {
                            top: "9px",
                            rotate: 45,
                          }
                        : {
                            top: "3px",
                            rotate: 0,
                          }
                    }
                    transition={{
                      duration: 0.25,
                    }}
                    className="absolute left-0 h-[2px] w-5 rounded-full bg-current"
                  />

                  {/* Middle */}

                  <motion.span
                    animate={{
                      opacity: menuOpen ? 0 : 1,
                      x: menuOpen ? 5 : 0,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="absolute left-0 top-[9px] h-[2px] w-5 rounded-full bg-current"
                  />

                  {/* Bottom */}

                  <motion.span
                    animate={
                      menuOpen
                        ? {
                            top: "9px",
                            rotate: -45,
                          }
                        : {
                            top: "15px",
                            rotate: 0,
                          }
                    }
                    transition={{
                      duration: 0.25,
                    }}
                    className="absolute left-0 h-[2px] w-5 rounded-full bg-current"
                  />
                </div>
              </motion.button>
            </div>
          </div>

          {/* =====================================================
              MOBILE MENU
          ====================================================== */}

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -12,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -12,
                  scale: 0.97,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-2 overflow-hidden rounded-[26px] border border-white/80 bg-white/[0.68] p-2 shadow-[0_25px_65px_rgba(48,36,43,0.12)] backdrop-blur-3xl md:hidden"
              >
                {/* Mobile glass shine */}

                <div className="pointer-events-none absolute left-0 right-0 h-32 bg-gradient-to-b from-white/30 to-transparent" />

                <nav className="relative flex flex-col gap-1">
                  {navLinks.map((link, index) => {
                    const active = isActive(link.path);

                    return (
                      <motion.div
                        key={link.path}
                        initial={{
                          opacity: 0,
                          x: -12,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.05,
                        }}
                      >
                        <Link
                          to={link.path}
                          onClick={closeMenu}
                          className={`group flex items-center justify-between rounded-[17px] px-4 py-3.5 transition duration-300 ${
                            active
                              ? "bg-[#43305F] text-white shadow-[0_10px_25px_rgba(67,48,95,0.16)]"
                              : "text-[#756970] hover:bg-white/75 hover:text-[#43305F]"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {/* Number */}

                            <span
                              className={`text-[9px] font-black ${
                                active
                                  ? "text-white/45"
                                  : "text-[#B0A3AA]"
                              }`}
                            >
                              0{index + 1}
                            </span>

                            <span className="text-sm font-bold">
                              {link.name}
                            </span>
                          </div>

                          <motion.span
                            animate={
                              active
                                ? {
                                    x: 3,
                                  }
                                : {
                                    x: 0,
                                  }
                            }
                            className={`text-lg ${
                              active
                                ? "text-[#E4B8A5]"
                                : "text-[#B1A4AA] group-hover:text-[#43305F]"
                            }`}
                          >
                            →
                          </motion.span>
                        </Link>
                      </motion.div>
                    );
                  })}

                  {/* =================================================
                      MOBILE CTA
                  ================================================== */}

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.35,
                      delay: 0.25,
                    }}
                    className="mt-1"
                  >
                    <Link
                      to="/download"
                      onClick={closeMenu}
                      className="group relative flex items-center justify-between overflow-hidden rounded-[17px] bg-[#43305F] px-4 py-4 text-white shadow-[0_15px_30px_rgba(67,48,95,0.18)]"
                    >
                      <span className="relative text-sm font-black">
                        Download Billzy
                      </span>

                      <span className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-[#E4B8A5]">
                        →
                      </span>

                      <span className="absolute inset-y-0 -left-full w-1/3 skew-x-[-20deg] bg-white/10 transition-all duration-700 group-hover:left-[130%]" />
                    </Link>
                  </motion.div>
                </nav>

                {/* Bottom info */}

                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.35,
                  }}
                  className="relative mt-2 flex items-center justify-center gap-2 rounded-[15px] bg-white/40 px-3 py-3 text-[9px] font-bold text-[#988C93]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C76B42]" />

                  Simple billing. Less friction.
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </header>
    </>
  );
}

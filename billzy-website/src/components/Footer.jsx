import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Footer() {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const smoothX = useSpring(mouseX, {
    stiffness: 70,
    damping: 25,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 70,
    damping: 25,
  });

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    mouseX.set(
      ((event.clientX - rect.left) / rect.width) * 100
    );

    mouseY.set(
      ((event.clientY - rect.top) / rect.height) * 100
    );
  };

  const footerLinks = [
    {
      title: "Product",
      links: [
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
      ],
    },
    {
      title: "Company",
      links: [
        {
          name: "Contact",
          path: "/contact",
        },
        {
          name: "Home",
          path: "/",
        },
      ],
    },
  ];

  return (
    <footer
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-[#30242B] px-4 pb-5 pt-5 text-white sm:px-6 lg:px-8"
    >
      {/* =====================================================
          INTERACTIVE BACKGROUND
      ====================================================== */}

      <motion.div
        style={{
          left: `${smoothX.get()}%`,
          top: `${smoothY.get()}%`,
        }}
        className="pointer-events-none absolute h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#43305F]/40 blur-[110px]"
      />

      <motion.div
        animate={{
          x: [0, 70, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#C76B42]/20 blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -bottom-60 left-[-120px] h-[450px] w-[450px] rounded-full bg-[#8B6FA5]/20 blur-[110px]"
      />

      {/* =====================================================
          SUBTLE GRID
      ====================================================== */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)",
          backgroundSize: "55px 55px",
        }}
      />

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="relative mx-auto max-w-[1420px]">
        {/* =================================================
            TOP GLASS CTA
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.055] p-5 shadow-[0_25px_70px_rgba(0,0,0,0.15)] backdrop-blur-2xl sm:p-6 lg:p-7"
        >
          {/* CTA shine */}

          <motion.div
            animate={{
              x: ["-120%", "140%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute inset-y-0 w-1/4 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
          />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C76B42] shadow-[0_0_12px_rgba(199,107,66,0.8)]" />

                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#CFC2D8]">
                  Ready when you are
                </span>
              </div>

              <h2 className="text-2xl font-black tracking-[-0.04em] sm:text-3xl">
                Make billing feel
                <span className="text-[#D8C8E2]">
                  {" "}
                  effortless.
                </span>
              </h2>

              <p className="mt-2 max-w-xl text-xs leading-5 text-white/45 sm:text-sm">
                Spend less time managing bills and more
                time running your business.
              </p>
            </div>

            <Link
              to="/download"
              className="group relative flex shrink-0 items-center justify-between gap-8 overflow-hidden rounded-2xl bg-[#F4EEEA] px-5 py-3.5 text-xs font-black text-[#43305F] shadow-[0_15px_35px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(0,0,0,0.25)]"
            >
              <span className="relative z-10">
                Get Billzy
              </span>

              <motion.span
                animate={{
                  x: [0, 3, 0],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 text-base text-[#C76B42]"
              >
                →
              </motion.span>

              <span className="absolute inset-y-0 -left-full w-1/3 skew-x-[-20deg] bg-[#43305F]/5 transition-all duration-700 group-hover:left-[130%]" />
            </Link>
          </div>
        </motion.div>

        {/* =================================================
            FOOTER CONTENT
        ================================================== */}

        <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr] lg:gap-14">
          {/* =================================================
              BRAND
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <Link
              to="/"
              className="group inline-flex items-center"
            >
              <motion.img
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                src="/billzy-logo.png"
                alt="Billzy"
                className="h-[62px] w-auto object-contain brightness-0 invert"
              />
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-white/45">
              Simple, thoughtful billing software built
              for businesses that want to keep things
              moving.
            </p>

            {/* Status */}

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C76B42] opacity-60" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C76B42]" />
              </span>

              <span className="text-[9px] font-bold text-white/50">
                Billzy is ready to work
              </span>
            </div>
          </motion.div>

          {/* =================================================
              LINKS
          ================================================== */}

          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                delay: sectionIndex * 0.1,
              }}
            >
              <p className="mb-4 text-[9px] font-black uppercase tracking-[0.2em] text-white/30">
                {section.title}
              </p>

              <div className="space-y-2">
                {section.links.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="group flex w-fit items-center gap-2 py-1 text-sm font-medium text-white/55 transition duration-300 hover:translate-x-1 hover:text-white"
                  >
                    <span>{link.name}</span>

                    <span className="translate-x-[-4px] text-xs text-[#C76B42] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}

          {/* =================================================
              MINI PRODUCT CARD
          ================================================== */}

          {/* <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
            className="rounded-[22px] border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl sm:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black uppercase tracking-[0.16em] text-white/30">
                Built for
              </span>

              <span className="text-[9px] font-bold text-[#C76B42]">
                EVERYDAY
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                "Retail",
                "Shops",
                "Small business",
                "Counter billing",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.035] px-3 py-2.5 text-[9px] font-bold text-white/45 transition duration-300 hover:border-white/10 hover:bg-white/[0.07] hover:text-white/70"
                >
                  {item}
                </div>
              ))}
            </div>
          </motion.div> */}
        </div>

        {/* =================================================
            BOTTOM BAR
        ================================================== */}

        <div className="border-t border-white/[0.08] py-5">
          <div className="flex flex-col gap-3 text-[9px] font-medium text-white/30 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Billzy. All
              rights reserved.
            </p>

            <div className="flex items-center gap-5">
              <span>Made for businesses.</span>

              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C76B42]" />
                Billing made easy.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
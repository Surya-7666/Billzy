import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";

import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  CreditCard,
  FileText,
  Laptop,
  Monitor,
  MousePointer2,
  Package,
  Receipt,
  ShieldCheck,
  Sparkles,
  Store,
  TrendingUp,
  Users,
  WifiOff,
  Zap,
} from "lucide-react";

/* =========================================================
   COLORS
========================================================= */

const COLORS = {
  ivory: "#F5F0ED",
  ivoryLight: "#FBF8F6",
  violet: "#43305F",
  violetDark: "#302242",
  orange: "#C76B42",
  orangeLight: "#E7C3B2",
  text: "#30242B",
  muted: "#756970",
};

/* =========================================================
   ANIMATED NUMBER
========================================================= */

function AnimatedNumber({ value, prefix = "", suffix = "" }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplay(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [value]);

  return (
    <>
      {prefix}
      {display.toLocaleString("en-IN")}
      {suffix}
    </>
  );
}

/* =========================================================
   REVEAL WRAPPER
========================================================= */

function Reveal({
  children,
  delay = 0,
  y = 35,
  className = "",
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   MAGNETIC BUTTON
========================================================= */

function MagneticButton({ children, className = "" }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, {
    stiffness: 300,
    damping: 18,
  });

  const smoothY = useSpring(y, {
    stiffness: 300,
    damping: 18,
  });

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const mouseX =
      event.clientX - (rect.left + rect.width / 2);

    const mouseY =
      event.clientY - (rect.top + rect.height / 2);

    x.set(mouseX * 0.15);
    y.set(mouseY * 0.15);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        x: smoothX,
        y: smoothY,
      }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   DASHBOARD PREVIEW
========================================================= */

function DashboardPreview() {
  const [activeTab, setActiveTab] = useState("overview");

  const sales = [
    42, 65, 48, 72, 55, 82, 68, 91, 74, 96, 83, 100,
  ];

  return (
    <div className="relative overflow-hidden rounded-[30px] border border-white/80 bg-white/55 shadow-[0_45px_100px_rgba(48,36,43,0.18)] backdrop-blur-[35px]">
      {/* Browser header */}

      <div className="flex h-12 items-center justify-between border-b border-black/[0.04] px-5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#D8CDD2]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#D8CDD2]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#C76B42]" />
        </div>

        <div className="hidden rounded-full border border-black/[0.04] bg-white/60 px-5 py-1.5 text-[9px] font-bold tracking-[0.18em] text-[#8A7D84] sm:block">
          SR Billing DESKTOP
        </div>

        <div className="h-6 w-12 rounded-full bg-black/[0.04]" />
      </div>

      <div className="grid md:grid-cols-[170px_1fr]">
        {/* Sidebar */}

        <aside className="hidden border-r border-black/[0.04] bg-white/25 p-4 md:block">
          <div className="mb-8 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#43305F] text-sm font-black text-white">
              B
            </div>

            <span className="text-sm font-black tracking-tight">
              SR Billing
            </span>
          </div>

          <div className="space-y-1">
            {[
              ["Overview", "⌂"],
              ["Billing", "＋"],
              ["Products", "◈"],
              ["Reports", "↗"],
            ].map(([item, icon], index) => (
              <motion.div
                key={item}
                whileHover={{
                  x: 4,
                }}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[10px] font-bold ${
                  index === 0
                    ? "bg-[#43305F] text-white shadow-lg"
                    : "text-[#81747C]"
                }`}
              >
                <span>{icon}</span>
                {item}
              </motion.div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-white bg-white/55 p-3">
            <div className="text-[8px] font-bold uppercase tracking-wider text-[#A1969C]">
              Your shop
            </div>

            <div className="mt-2 text-[10px] font-black">
              SR Billing Store
            </div>

            <div className="mt-1 text-[8px] text-[#9B8D94]">
              Everything looks good
            </div>
          </div>
        </aside>

        {/* Main */}

        <div className="min-w-0 p-4 sm:p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#A1969C]">
                Wednesday, today
              </p>

              <h3 className="mt-1 text-lg font-black tracking-tight text-[#30242B] sm:text-xl">
                Good morning 👋
              </h3>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white bg-white/70 text-xs shadow-sm">
              S
            </div>
          </div>

          {/* Tabs */}

          <div className="mt-5 flex gap-1 rounded-xl bg-black/[0.025] p-1">
            {["overview", "sales"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-3 py-1.5 text-[9px] font-bold capitalize transition ${
                  activeTab === tab
                    ? "bg-white text-[#43305F] shadow-sm"
                    : "text-[#9A8E94]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Stats */}

          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              {
                label: "Sales",
                value: "₹24.6K",
                growth: "+18.4%",
                color: "#C76B42",
              },
              {
                label: "Bills",
                value: "128",
                growth: "+12 today",
                color: "#43305F",
              },
              {
                label: "Average",
                value: "₹1.9K",
                growth: "Per bill",
                color: "#7C6E76",
              },
            ].map((item) => (
              <motion.div
                key={item.label}
                whileHover={{
                  y: -4,
                  scale: 1.02,
                }}
                className="rounded-2xl border border-white bg-white/55 p-3"
              >
                <p className="text-[8px] font-bold text-[#9A8E94]">
                  {item.label}
                </p>

                <p className="mt-1 text-sm font-black text-[#30242B]">
                  {item.value}
                </p>

                <span
                  className="text-[8px] font-bold"
                  style={{ color: item.color }}
                >
                  {item.growth}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Chart */}

          <div className="mt-3 rounded-2xl border border-white bg-white/55 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] font-bold text-[#968A91]">
                  Sales overview
                </p>

                <p className="mt-1 text-sm font-black">
                  ₹1,84,240
                </p>
              </div>

              <div className="rounded-lg bg-[#F0EAF4] px-2 py-1 text-[8px] font-bold text-[#43305F]">
                This month
              </div>
            </div>

            <div className="relative mt-5 h-[115px]">
              <div className="absolute inset-0 flex flex-col justify-between">
                {[1, 2, 3, 4].map((line) => (
                  <div
                    key={line}
                    className="border-t border-black/[0.04]"
                  />
                ))}
              </div>

              <div className="absolute inset-x-0 bottom-0 flex h-[95px] items-end gap-1.5">
                {sales.map((height, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{
                      height: `${height}%`,
                    }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.04,
                      ease: "easeOut",
                    }}
                    className={`flex-1 rounded-t-md ${
                      index === sales.length - 1
                        ? "bg-[#C76B42]"
                        : "bg-[#43305F]/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}

          <div className="mt-3 grid grid-cols-2 gap-3">
            <motion.div
              whileHover={{
                y: -3,
              }}
              className="rounded-2xl border border-white bg-white/55 p-3"
            >
              <div className="flex items-center justify-between">
                <p className="text-[8px] font-bold text-[#968A91]">
                  Recent bill
                </p>

                <span className="text-[8px] font-bold text-[#C76B42]">
                  PAID
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black">
                    INV-0128
                  </p>

                  <p className="mt-0.5 text-[8px] text-[#988C93]">
                    Customer
                  </p>
                </div>

                <p className="text-xs font-black">
                  ₹2,450
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{
                y: -3,
              }}
              className="rounded-2xl border border-white bg-white/55 p-3"
            >
              <p className="text-[8px] font-bold text-[#968A91]">
                Quick action
              </p>

              <div className="mt-2 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#43305F] text-xs font-black text-white">
                  +
                </div>

                <span className="text-[9px] font-black">
                  Create a bill
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   INTERACTIVE BILL
========================================================= */

function InteractiveBill() {
  const [selected, setSelected] = useState(0);

  const items = [
    {
      name: "Premium Coffee",
      price: 280,
      quantity: 2,
    },
    {
      name: "Classic Sandwich",
      price: 190,
      quantity: 1,
    },
    {
      name: "Cold Brew",
      price: 240,
      quantity: 2,
    },
  ];

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="relative mx-auto max-w-xl">
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative rounded-[32px] border border-white/90 bg-white/65 p-4 shadow-[0_35px_90px_rgba(48,36,43,0.13)] backdrop-blur-3xl sm:p-6"
      >
        <div className="flex items-center justify-between border-b border-black/[0.05] pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#43305F] text-white">
              <Receipt size={19} />
            </div>

            <div>
              <p className="text-xs font-black">
                New Bill
              </p>

              <p className="mt-0.5 text-[9px] text-[#958991]">
                INV-0129
              </p>
            </div>
          </div>

          <div className="rounded-full bg-[#EEE7F1] px-3 py-1.5 text-[9px] font-black text-[#43305F]">
            DRAFT
          </div>
        </div>

        <div className="mt-5 space-y-2">
          {items.map((item, index) => (
            <motion.button
              key={item.name}
              onClick={() => setSelected(index)}
              whileHover={{
                x: 5,
              }}
              className={`flex w-full items-center justify-between rounded-2xl border p-3 text-left transition ${
                selected === index
                  ? "border-[#DCCFE4] bg-[#F5EFF7]"
                  : "border-transparent bg-black/[0.025]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#43305F] shadow-sm">
                  <Package size={15} />
                </div>

                <div>
                  <p className="text-[10px] font-black">
                    {item.name}
                  </p>

                  <p className="mt-0.5 text-[8px] text-[#9A8E94]">
                    Qty × {item.quantity}
                  </p>
                </div>
              </div>

              <p className="text-[10px] font-black">
                ₹{item.price * item.quantity}
              </p>
            </motion.button>
          ))}
        </div>

        <div className="mt-5 space-y-2 border-t border-black/[0.05] pt-5">
          <div className="flex justify-between text-[10px] text-[#8F8289]">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>

          <div className="flex justify-between text-[10px] text-[#8F8289]">
            <span>Discount</span>
            <span>₹50</span>
          </div>

          <div className="flex justify-between text-[10px] text-[#8F8289]">
            <span>GST</span>
            <span>₹82</span>
          </div>

          <div className="mt-3 flex items-end justify-between">
            <div>
              <p className="text-[8px] font-bold uppercase tracking-wider text-[#A1969C]">
                Total
              </p>

              <p className="mt-1 text-2xl font-black text-[#30242B]">
                ₹{total + 32}
              </p>
            </div>

            <motion.div
              animate={{
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="rounded-xl bg-[#C76B42] px-4 py-2.5 text-[9px] font-black text-white shadow-lg"
            >
              Ready to pay
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Floating status */}

      <motion.div
        animate={{
          y: [0, -7, 0],
          rotate: [-1, 1, -1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="absolute -right-3 top-12 hidden rounded-2xl border border-white/90 bg-white/75 px-4 py-3 shadow-[0_20px_50px_rgba(48,36,43,0.12)] backdrop-blur-xl sm:block"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EEE7F1] text-[#43305F]">
            <Check size={13} />
          </div>

          <div>
            <p className="text-[9px] font-black">
              Auto calculated
            </p>

            <p className="text-[8px] text-[#978A92]">
              GST included
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          delay: 1,
        }}
        className="absolute -bottom-5 -left-3 hidden rounded-2xl border border-white/90 bg-white/75 px-4 py-3 shadow-[0_20px_50px_rgba(48,36,43,0.12)] backdrop-blur-xl sm:block"
      >
        <div className="flex items-center gap-2">
          <WifiOff size={15} className="text-[#C76B42]" />

          <div>
            <p className="text-[9px] font-black">
              Works offline
            </p>

            <p className="text-[8px] text-[#978A92]">
              No internet required
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* =========================================================
   FLOATING DOTS
========================================================= */

function FloatingDots() {
  const dots = Array.from({ length: 18 });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, index) => (
        <motion.span
          key={index}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: [0.1, 0.5, 0.1],
            y: [0, -30, 0],
            x: [0, index % 2 ? 15 : -15, 0],
          }}
          transition={{
            duration: 4 + (index % 4),
            delay: index * 0.25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute h-1.5 w-1.5 rounded-full bg-[#43305F]/25"
          style={{
            left: `${(index * 17) % 100}%`,
            top: `${(index * 29) % 100}%`,
          }}
        />
      ))}
    </div>
  );
}

/* =========================================================
   HOME
========================================================= */

export default function Home() {
  /* -------------------------------------------------------
     GLOBAL MOUSE
  ------------------------------------------------------- */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 80,
    damping: 20,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 80,
    damping: 20,
  });

  const rotateX = useTransform(
    smoothY,
    [-500, 500],
    [5, -5]
  );

  const rotateY = useTransform(
    smoothX,
    [-500, 500],
    [-6, 6]
  );

  const imageX = useTransform(
    smoothX,
    [-500, 500],
    [-12, 12]
  );

  const imageY = useTransform(
    smoothY,
    [-500, 500],
    [-8, 8]
  );

  const spotlightX = useTransform(
    smoothX,
    [-500, 500],
    ["10%", "90%"]
  );

  const spotlightY = useTransform(
    smoothY,
    [-500, 500],
    ["10%", "90%"]
  );

  const handleMouseMove = (event) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    mouseX.set(
      event.clientX -
        (rect.left + rect.width / 2)
    );

    mouseY.set(
      event.clientY -
        (rect.top + rect.height / 2)
    );
  };

  const resetMouse = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <main
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMouse}
      aria-label="SR Billing billing software homepage"
      className="relative overflow-hidden bg-[#F5F0ED] text-[#30242B]"
    >
      {/* =====================================================
          GLOBAL BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -50, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-48 -top-48 h-[650px] w-[650px] rounded-full bg-[#D9CCE5]/60 blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -60, 0],
            y: [0, 50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-60 -left-48 h-[600px] w-[600px] rounded-full bg-[#E7C3B2]/45 blur-[120px]"
        />

        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(67,48,95,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(67,48,95,0.035) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />
      </div>

      <FloatingDots />

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative z-10 flex min-h-[calc(100vh-76px)] items-center px-5 pb-20 pt-28 sm:px-8 lg:px-12 lg:pb-28 lg:pt-24">
        <div className="mx-auto grid w-full max-w-[1500px] items-center gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
          {/* LEFT */}

          <div className="relative z-20 max-w-2xl">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/55 px-4 py-2 shadow-[0_12px_35px_rgba(48,36,43,0.06)] backdrop-blur-xl"
            >
              <motion.span
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="h-2 w-2 rounded-full bg-[#C76B42]"
              />

              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#43305F]">
                SR • SALES & RECEIPTS
              </span>
            </motion.div>

            <motion.h1
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[3.7rem] font-black leading-[0.88] tracking-[-0.075em] sm:text-6xl md:text-7xl lg:text-[6.2rem]"
            >
              Your shop.
              <br />

              <span className="text-[#43305F]">
                Your rhythm.
              </span>
              <br />

              <span className="text-[#C76B42]">
                Your SR Billing.
              </span>
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.2,
              }}
              className="mt-5 text-sm font-black uppercase tracking-[0.16em] text-[#43305F] sm:text-base"
            >
              Sales &amp; Receipts · Simple Billing. Smarter Business.
            </motion.p>

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.3,
              }}
              className="mt-7 max-w-xl text-base leading-7 text-[#756970] sm:text-lg sm:leading-8"
            >
              SR Billing is simple offline billing software for small businesses and retail shops. Create professional bills, manage products, track sales, record payments, and keep your counter moving with a fast Windows desktop billing experience.
            </motion.p>

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.45,
              }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <MagneticButton>
                <Link
                  to="/download"
                  className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-[#43305F] px-7 py-4 text-sm font-black text-white shadow-[0_20px_45px_rgba(67,48,95,0.24)] transition hover:shadow-[0_25px_55px_rgba(67,48,95,0.3)]"
                >
                  <span>
                    Download SR Billing
                  </span>

                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />

                  <span className="absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-white/10 transition-all duration-700 group-hover:left-[130%]" />
                </Link>
              </MagneticButton>

              <MagneticButton>
                <Link
                  to="/features"
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl border border-white/90 bg-white/50 px-7 py-4 text-sm font-black text-[#43305F] shadow-[0_15px_35px_rgba(48,36,43,0.06)] backdrop-blur-xl transition hover:bg-white/75"
                >
                  Explore SR Billing

                  <ArrowUpRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                delay: 0.7,
              }}
              className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-bold text-[#93868E]"
            >
              <span>✓ Windows desktop</span>
              <span>✓ Offline ready</span>
              <span>✓ GST billing</span>
            </motion.div>
          </div>

          {/* RIGHT */}

          <div
            className="relative mx-auto w-full max-w-[800px]"
            style={{
              perspective: "1600px",
            }}
          >
            <motion.div
              style={{
                left: spotlightX,
                top: spotlightY,
              }}
              className="pointer-events-none absolute z-0 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#CFC2DC]/50 blur-[100px]"
            />

            <motion.div
              style={{
                rotateX,
                rotateY,
                x: imageX,
                y: imageY,
              }}
              initial={{
                opacity: 0,
                scale: 0.88,
                rotateX: 8,
                rotateY: -8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateX: 0,
                rotateY: 0,
              }}
              transition={{
                duration: 1.2,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative z-10"
            >
              <div className="rounded-[38px] border border-white/90 bg-white/30 p-3 shadow-[0_50px_110px_rgba(48,36,43,0.16)] backdrop-blur-3xl sm:p-4">
                <DashboardPreview />
              </div>
            </motion.div>

            {/* Sales */}

            <motion.div
              initial={{
                opacity: 0,
                x: -35,
                y: 20,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.85,
              }}
              className="absolute left-[-12px] top-[12%] z-30 hidden w-[185px] rounded-[24px] border border-white/90 bg-white/65 p-4 shadow-[0_25px_60px_rgba(48,36,43,0.13)] backdrop-blur-2xl sm:block lg:left-[-45px]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-[0.15em] text-[#94878E]">
                  Today's sales
                </span>

                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F1E5DE] text-[#C76B42]">
                  <TrendingUp size={13} />
                </div>
              </div>

              <div className="mt-3 text-2xl font-black tracking-tight">
                <AnimatedNumber
                  value={24680}
                  prefix="₹"
                />
              </div>

              <div className="mt-2 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#43305F]/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "78%" }}
                    transition={{
                      duration: 1.2,
                      delay: 1,
                    }}
                    className="h-full rounded-full bg-[#C76B42]"
                  />
                </div>

                <span className="text-[8px] font-black text-[#C76B42]">
                  +18%
                </span>
              </div>
            </motion.div>

            {/* Bill created */}

            <motion.div
              initial={{
                opacity: 0,
                x: 35,
                y: 20,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 1,
              }}
              className="absolute right-[-8px] top-[42%] z-30 hidden w-[185px] rounded-[24px] border border-white/90 bg-white/65 p-4 shadow-[0_25px_60px_rgba(48,36,43,0.13)] backdrop-blur-2xl sm:block lg:right-[-42px]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAE4EF] text-[#43305F]">
                  <Check size={17} />
                </div>

                <div>
                  <p className="text-[10px] font-black">
                    Bill created
                  </p>

                  <p className="mt-0.5 text-[8px] text-[#978A92]">
                    INV-0128
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-black/[0.04] pt-3">
                <span className="text-[9px] text-[#93878D]">
                  Total
                </span>

                <span className="text-sm font-black">
                  ₹2,450
                </span>
              </div>
            </motion.div>

            {/* Offline */}

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 1.15,
              }}
              className="absolute bottom-[-25px] left-[10%] z-30 hidden rounded-[22px] border border-white/90 bg-white/65 px-4 py-3 shadow-[0_25px_55px_rgba(48,36,43,0.12)] backdrop-blur-2xl sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E9E2ED]">
                  <WifiOff
                    size={14}
                    className="text-[#43305F]"
                  />
                </div>

                <div>
                  <p className="text-[9px] font-black">
                    Offline ready
                  </p>

                  <p className="text-[8px] text-[#958991]">
                    Your billing stays yours.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MOVING BRAND STRIP
      ====================================================== */}

      <section className="relative z-10 overflow-hidden border-y border-black/[0.04] bg-white/25 py-5 backdrop-blur-xl">
        <motion.div
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex w-max items-center gap-10 whitespace-nowrap"
        >
          {Array.from({ length: 2 }).map((_, group) => (
            <div
              key={group}
              className="flex items-center gap-10"
            >
              {[
                "BILLING",
                "REPORTS",
                "GST",
                "PRODUCTS",
                "OFFLINE",
                "RECEIPTS",
                "STAFF",
                "SALES",
              ].map((item) => (
                <div
                  key={`${group}-${item}`}
                  className="flex items-center gap-3"
                >
                  <Sparkles
                    size={13}
                    className="text-[#C76B42]"
                  />

                  <span className="text-[10px] font-black tracking-[0.2em] text-[#8D8087]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </section>

      {/* =====================================================
          INTRO SECTION
      ====================================================== */}

      <section className="relative z-10 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-[1300px] gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal>
            <div>
              <div className="mb-5 flex items-center gap-2 text-[#C76B42]">
                <span className="h-px w-8 bg-[#C76B42]" />

                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Built for the counter
                </span>
              </div>

              <h2 className="max-w-xl text-4xl font-black leading-[0.95] tracking-[-0.055em] sm:text-5xl lg:text-6xl">
                Less clicking.
                <br />
                More{" "}
                <span className="text-[#43305F]">
                  business.
                </span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div>
              <p className="max-w-2xl text-lg leading-8 text-[#756970]">
                SR Billing keeps the things you do every day
                simple. Search a product, add it to a bill,
                collect payment and move on to the next
                customer.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Fast billing",
                  "Simple reports",
                  "Local data",
                  "GST ready",
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    whileHover={{
                      y: -4,
                      scale: 1.03,
                    }}
                    className="flex items-center gap-2 rounded-full border border-white bg-white/55 px-4 py-2.5 text-[10px] font-black text-[#43305F] shadow-sm backdrop-blur-xl"
                  >
                    <Check
                      size={12}
                      className="text-[#C76B42]"
                    />

                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          INTERACTIVE BILLING SECTION
      ====================================================== */}

      <section className="relative z-10 px-5 pb-28 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1350px] items-center gap-14 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-10 rounded-full bg-[#D9CCE5]/40 blur-[80px]" />

              <InteractiveBill />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div>
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#43305F] text-white shadow-lg">
                <Receipt size={18} />
              </div>

              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C76B42]">
                Billing without friction
              </p>

              <h2 className="mt-4 max-w-xl text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-5xl">
                Turn a customer
                <br />
                into a{" "}
                <span className="text-[#43305F]">
                  finished bill.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-[#756970]">
                Everything your counter needs is close at
                hand. Products, quantities, discounts, GST,
                payments and receipts — without making the
                process feel complicated.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  {
                    icon: Zap,
                    title: "Quick product search",
                    text: "Find products and add them instantly.",
                  },
                  {
                    icon: CreditCard,
                    title: "Flexible payments",
                    text: "Record cash, UPI and other payment methods.",
                  },
                  {
                    icon: FileText,
                    title: "Clean receipts",
                    text: "Give customers a receipt that looks professional.",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      whileHover={{
                        x: 7,
                      }}
                      className="group flex gap-4 rounded-2xl border border-white/80 bg-white/40 p-4 backdrop-blur-xl"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEE7F1] text-[#43305F] transition group-hover:bg-[#43305F] group-hover:text-white">
                        <Icon size={16} />
                      </div>

                      <div>
                        <h3 className="text-xs font-black">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-[10px] leading-5 text-[#91858C]">
                          {item.text}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          FEATURE ORBIT
      ====================================================== */}

      <section className="relative z-10 overflow-hidden bg-[#30242B] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32">
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            animate={{
              x: [0, 80, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-[-120px] top-[-150px] h-[450px] w-[450px] rounded-full bg-[#43305F]/70 blur-[100px]"
          />

          <motion.div
            animate={{
              x: [0, -50, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-[-180px] left-[-120px] h-[450px] w-[450px] rounded-full bg-[#C76B42]/25 blur-[100px]"
          />

          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-[1350px]">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#C76B42]">
                One workspace. Many moving parts.
              </p>

              <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                Everything your
                <br />
                counter needs.
              </h2>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Receipt,
                number: "01",
                title: "Billing",
                text: "Create professional bills in moments.",
              },
              {
                icon: Package,
                number: "02",
                title: "Products",
                text: "Keep your catalogue organized and ready.",
              },
              {
                icon: BarChart3,
                number: "03",
                title: "Reports",
                text: "See sales without digging through data.",
              },
              {
                icon: Users,
                number: "04",
                title: "Staff",
                text: "Give your team controlled access.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.7,
                  }}
                  whileHover={{
                    y: -10,
                    rotateX: 3,
                    rotateY: index % 2 ? -3 : 3,
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  className="group relative min-h-[260px] overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-2xl transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#C76B42]">
                      <Icon size={18} />
                    </div>

                    <span className="text-[10px] font-black text-white/30">
                      {item.number}
                    </span>
                  </div>

                  <div className="mt-16">
                    <h3 className="text-xl font-black">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-white/50">
                      {item.text}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="absolute bottom-6 right-6 text-white/30 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#C76B42]"
                  />

                  <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-[#43305F]/50 blur-[60px] transition duration-500 group-hover:bg-[#C76B42]/30" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          WORKFLOW
      ====================================================== */}

      <section className="relative z-10 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1250px]">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#C76B42]">
                The SR Billing flow
              </p>

              <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.055em] sm:text-5xl lg:text-6xl">
                From counter
                <br />
                to{" "}
                <span className="text-[#43305F]">
                  complete.
                </span>
              </h2>

              <p className="mt-6 text-base leading-7 text-[#756970]">
                A simple workflow designed around the way
                real shops actually work.
              </p>
            </div>
          </Reveal>

          <div className="relative mt-20">
            <div className="absolute left-[12%] right-[12%] top-10 hidden h-px bg-gradient-to-r from-transparent via-[#D7CDD8] to-transparent lg:block" />

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: MousePointer2,
                  title: "Choose",
                  text: "Search your product and add it to the bill.",
                },
                {
                  icon: CircleDollarSign,
                  title: "Calculate",
                  text: "Quantity, discount and GST stay organized.",
                },
                {
                  icon: CreditCard,
                  title: "Collect",
                  text: "Record the payment and finish the transaction.",
                },
                {
                  icon: Receipt,
                  title: "Done",
                  text: "Print or share a clean customer receipt.",
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <Reveal
                    key={item.title}
                    delay={index * 0.1}
                  >
                    <motion.div
                      whileHover={{
                        y: -8,
                      }}
                      className="relative text-center"
                    >
                      <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-[26px] border border-white bg-white/65 text-[#43305F] shadow-[0_20px_45px_rgba(48,36,43,0.08)] backdrop-blur-xl">
                        <Icon size={24} />

                        <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#C76B42] text-[8px] font-black text-white">
                          {index + 1}
                        </span>
                      </div>

                      <h3 className="mt-6 text-sm font-black">
                        {item.title}
                      </h3>

                      <p className="mx-auto mt-2 max-w-[220px] text-[10px] leading-5 text-[#91858C]">
                        {item.text}
                      </p>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS
      ====================================================== */}

      <section className="relative z-10 px-5 pb-28 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1350px] overflow-hidden rounded-[35px] border border-white/90 bg-white/45 shadow-[0_30px_80px_rgba(48,36,43,0.07)] backdrop-blur-2xl md:grid-cols-4">
          {[
            {
              icon: Receipt,
              value: 100,
              suffix: "+",
              title: "Bills created",
            },
            {
              icon: Store,
              value: 24,
              suffix: "/7",
              title: "Business ready",
            },
            {
              icon: Clock3,
              value: 10,
              suffix: "s",
              title: "Billing mindset",
            },
            {
              icon: ShieldCheck,
              value: 100,
              suffix: "%",
              title: "Your data",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal
                key={item.title}
                delay={index * 0.08}
              >
                <motion.div
                  whileHover={{
                    backgroundColor:
                      "rgba(255,255,255,0.55)",
                  }}
                  className={`flex min-h-[180px] flex-col justify-between p-7 ${
                    index !== 3
                      ? "border-b border-black/[0.04] md:border-b-0 md:border-r"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEE7F1] text-[#43305F]">
                      <Icon size={16} />
                    </div>

                    <ArrowUpRight
                      size={15}
                      className="text-[#B2A6AD]"
                    />
                  </div>

                  <div>
                    <div className="text-3xl font-black tracking-tight">
                      <AnimatedNumber
                        value={item.value}
                        suffix={item.suffix}
                      />
                    </div>

                    <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#9A8E94]">
                      {item.title}
                    </p>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          OFFLINE / DESKTOP SECTION
      ====================================================== */}

      <section className="relative z-10 px-5 pb-28 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1350px] items-center gap-12 rounded-[40px] border border-white/90 bg-white/35 p-6 shadow-[0_35px_90px_rgba(48,36,43,0.07)] backdrop-blur-2xl sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:p-14">
          <Reveal>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#43305F] text-white shadow-lg">
                <Laptop size={20} />
              </div>

              <p className="mt-7 text-[10px] font-black uppercase tracking-[0.2em] text-[#C76B42]">
                Made for your desktop
              </p>

              <h2 className="mt-4 text-4xl font-black leading-[0.95] tracking-[-0.05em] sm:text-5xl">
                Your billing
                <br />
                doesn't need{" "}
                <span className="text-[#43305F]">
                  the cloud.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-[#756970]">
                SR Billing is offline billing software for Windows, designed to keep your day moving even when your internet doesn't. Create bills, manage products, track sales and keep your billing workspace ready on your desktop.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Offline ready",
                  "Windows desktop",
                  "Local business data",
                  "Fast everyday workflow",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-[10px] font-black text-[#665960]"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EEE7F1] text-[#43305F]">
                      <Check size={12} />
                    </div>

                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div
              className="relative mx-auto w-full max-w-[520px]"
              style={{
                perspective: "1200px",
              }}
            >
              <motion.div
                animate={{
                  rotateY: [-3, 3, -3],
                  rotateX: [2, -2, 2],
                  y: [0, -7, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <div className="overflow-hidden rounded-[30px] border border-white bg-white/60 shadow-[0_35px_80px_rgba(48,36,43,0.14)] backdrop-blur-3xl">
                  <div className="flex h-10 items-center gap-2 border-b border-black/[0.04] px-4">
                    <span className="h-2 w-2 rounded-full bg-[#D8CDD2]" />
                    <span className="h-2 w-2 rounded-full bg-[#D8CDD2]" />
                    <span className="h-2 w-2 rounded-full bg-[#C76B42]" />
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[8px] font-bold uppercase tracking-widest text-[#A1969C]">
                          Today's overview
                        </p>

                        <p className="mt-2 text-3xl font-black">
                          ₹48,240
                        </p>
                      </div>

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEE7F1] text-[#43305F]">
                        <Monitor size={19} />
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-2">
                      {[
                        ["Bills", "84"],
                        ["Paid", "₹42K"],
                        ["Pending", "₹6K"],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="rounded-2xl bg-black/[0.025] p-3"
                        >
                          <p className="text-[8px] text-[#9A8E94]">
                            {label}
                          </p>

                          <p className="mt-1 text-sm font-black">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 rounded-2xl bg-[#43305F] p-4 text-white">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold text-white/60">
                          System status
                        </span>

                        <span className="flex items-center gap-1.5 text-[8px] font-black">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#C76B42]" />
                          ONLINE
                        </span>
                      </div>

                      <p className="mt-4 text-sm font-black">
                        Everything is ready.
                      </p>

                      <p className="mt-1 text-[8px] text-white/50">
                        Keep billing. Keep moving.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{
                  x: [0, 10, 0],
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="absolute -bottom-5 -right-3 rounded-2xl border border-white bg-white/75 px-4 py-3 shadow-xl backdrop-blur-xl"
              >
                <div className="flex items-center gap-2">
                  <WifiOff
                    size={14}
                    className="text-[#C76B42]"
                  />

                  <span className="text-[9px] font-black">
                    Offline ready
                  </span>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      {/* <section className="relative z-10 px-5 pb-16 sm:px-8 lg:px-12 lg:pb-24">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.97,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.9,
          }}
          className="relative mx-auto max-w-[1350px] overflow-hidden rounded-[42px] bg-[#43305F] px-6 py-20 text-center text-white shadow-[0_40px_100px_rgba(67,48,95,0.25)] sm:px-10 lg:py-28"
        >
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              x: [0, 40, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-32 -top-40 h-[450px] w-[450px] rounded-full bg-[#C76B42]/20 blur-[90px]"
          />

          <motion.div
            animate={{
              scale: [1, 1.12, 1],
              x: [0, -30, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-40 -left-32 h-[450px] w-[450px] rounded-full bg-white/10 blur-[100px]"
          />

          <div className="relative z-10 mx-auto max-w-3xl">
            <motion.div
              animate={{
                rotate: [0, 4, -4, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10"
            >
              <Sparkles size={23} />
            </motion.div>

            <h2 className="mt-7 text-4xl font-black leading-[0.95] tracking-[-0.055em] sm:text-5xl lg:text-7xl">
              Make billing feel
              <br />
              <span className="text-[#E7C3B2]">
                effortless.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
              A simpler desktop billing experience for
              businesses that want to spend less time
              managing invoices and more time serving
              customers.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <MagneticButton>
                <Link
                  to="/download"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#C76B42] px-7 py-4 text-sm font-black text-white shadow-[0_20px_45px_rgba(0,0,0,0.2)] transition hover:-translate-y-1"
                >
                  Get SR Billing

                  <ArrowRight size={17} />
                </Link>
              </MagneticButton>

              <MagneticButton>
                <Link
                  to="/features"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur-xl transition hover:bg-white/15"
                >
                  See everything

                  <ChevronRight size={17} />
                </Link>
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </section> */}

      {/* =====================================================
          SEO / PRODUCT SUMMARY
      ====================================================== */}

      <section
        aria-labelledby="SR Billing-billing-software-heading"
        className="relative z-10 px-5 pb-20 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-[1100px] rounded-[32px] border border-white/90 bg-white/35 p-7 shadow-[0_25px_70px_rgba(48,36,43,0.06)] backdrop-blur-2xl sm:p-10">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C76B42]">
                Simple billing for growing businesses
              </p>

              <h2
                id="SR Billing-billing-software-heading"
                className="mt-4 text-3xl font-black leading-tight tracking-[-0.045em] sm:text-4xl"
              >
                Billing software built for small businesses and retail shops.
              </h2>

              <p className="mt-5 text-sm leading-7 text-[#756970] sm:text-base">
                SR Billing brings everyday billing, GST-ready invoices, product
                management, sales reports, payment tracking and professional
                receipts into one simple Windows desktop application. Because
                SR Billing is designed for offline use, your shop can keep billing
                even when the internet is unavailable.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                {[
                  "Offline billing software",
                  "GST-ready billing",
                  "Windows billing software",
                  "Retail shop billing",
                  "Sales reports",
                  "Professional receipts",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white bg-white/60 px-3.5 py-2 text-[9px] font-black text-[#43305F] shadow-sm backdrop-blur-xl"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          MINI FOOTER LINE
      ====================================================== */}

      <section className="relative z-10 px-5 pb-10 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1350px] flex-col items-center justify-between gap-3 border-t border-black/[0.05] pt-7 text-center sm:flex-row sm:text-left">
          <p className="text-[9px] font-bold text-[#9A8E94]">
            Built for businesses that keep moving.
          </p>

          <div className="flex items-center gap-2 text-[9px] font-black text-[#43305F]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C76B42]" />
            SR Billing
          </div>
        </div>
      </section>
    </main>
  );
}

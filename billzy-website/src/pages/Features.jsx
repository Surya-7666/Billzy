import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const features = [
  {
    number: "01",
    title: "Offline Billing",
    short: "Keep selling without internet.",
    description:
      "Create bills and continue your daily billing operations even when there is no internet connection.",
    icon: "⚡",
    accent: "violet",
  },
  {
    number: "02",
    title: "Product Catalogue",
    short: "Find products faster.",
    description:
      "Keep your products organized and quickly add them to a bill without wasting time searching manually.",
    icon: "▦",
    accent: "orange",
  },
  {
    number: "03",
    title: "Manual Pricing",
    short: "Stay flexible with every sale.",
    description:
      "Enter the selling rate directly while creating a bill, giving you flexibility for different customers and orders.",
    icon: "₹",
    accent: "violet",
  },
  {
    number: "04",
    title: "Advance Payments",
    short: "Track money received upfront.",
    description:
      "Record the amount received in advance and automatically calculate the remaining balance due.",
    icon: "↗",
    accent: "orange",
  },
  {
    number: "05",
    title: "GST & Tax",
    short: "Calculate the final amount clearly.",
    description:
      "Apply discounts and taxes to your bills and keep the final amount clearly calculated.",
    icon: "%",
    accent: "violet",
  },
  {
    number: "06",
    title: "Professional Receipts",
    short: "Give customers a clean receipt.",
    description:
      "Generate clean thermal-style receipts containing your shop details, customer information and payment details.",
    icon: "▤",
    accent: "orange",
  },
  {
    number: "07",
    title: "Staff Management",
    short: "Give your team the right access.",
    description:
      "Create staff accounts and control access with separate admin and staff roles.",
    icon: "♙",
    accent: "violet",
  },
  {
    number: "08",
    title: "Multi-Shop Support",
    short: "Keep businesses separated.",
    description:
      "Keep each shop's data isolated so billing information remains separated between businesses.",
    icon: "⌂",
    accent: "orange",
  },
  {
    number: "09",
    title: "Sales Reports",
    short: "Understand your business.",
    description:
      "Review your sales activity and understand your business performance through useful reports.",
    icon: "▥",
    accent: "violet",
  },
  {
    number: "10",
    title: "Multiple Payments",
    short: "Cash, UPI or card.",
    description:
      "Record payments using cash, UPI or card while keeping the payment method attached to each bill.",
    icon: "₹",
    accent: "orange",
  },
  {
    number: "11",
    title: "Daily Bill Numbers",
    short: "Keep transactions organized.",
    description:
      "Bills are numbered automatically, making your daily transactions easier to identify and manage.",
    icon: "#",
    accent: "violet",
  },
  {
    number: "12",
    title: "Shop Customization",
    short: "Make every receipt yours.",
    description:
      "Add your shop name, tagline, phone numbers, address, GST number and logo to your receipts.",
    icon: "✦",
    accent: "orange",
  },
];

const workflow = [
  {
    number: "01",
    title: "Choose your products",
    description:
      "Pick products directly from your catalogue and add them to the current bill.",
  },
  {
    number: "02",
    title: "Set the selling rate",
    description:
      "Use the rate that makes sense for the customer and the current order.",
  },
  {
    number: "03",
    title: "Handle the payment",
    description:
      "Choose cash, UPI or card and record any advance amount received.",
  },
  {
    number: "04",
    title: "Create the receipt",
    description:
      "Generate a clean professional receipt with your shop and payment details.",
  },
];

function FeatureCard({ feature, index, active, onHover }) {
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-120, 120], [4, -4]),
    {
      stiffness: 220,
      damping: 25,
    }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-120, 120], [-4, 4]),
    {
      stiffness: 220,
      damping: 25,
    }
  );

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    onHover(null);
  };

  const accentClasses =
    feature.accent === "orange"
      ? {
          icon: "bg-[#C76B42]/10 text-[#C76B42]",
          number: "text-[#C76B42]",
          glow: "bg-[#C76B42]/20",
          line: "bg-[#C76B42]",
        }
      : {
          icon: "bg-[#43305F]/10 text-[#43305F]",
          number: "text-[#43305F]",
          glow: "bg-[#43305F]/20",
          line: "bg-[#43305F]",
        };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: 0.6,
        delay: Math.min(index * 0.04, 0.35),
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover(feature.number)}
      onMouseLeave={handleMouseLeave}
      className="group relative min-h-[320px] overflow-hidden rounded-[28px] border border-white/80 bg-white/55 p-7 shadow-[0_20px_70px_rgba(48,36,43,0.07)] backdrop-blur-2xl transition-shadow duration-500 hover:shadow-[0_30px_90px_rgba(48,36,43,0.14)] md:p-8"
    >
      {/* Mouse spotlight */}
      <motion.div
        animate={{
          opacity: active ? 1 : 0,
        }}
        transition={{ duration: 0.25 }}
        className={`pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full blur-3xl ${accentClasses.glow}`}
      />

      {/* Decorative corner */}
      <div className="absolute right-0 top-0 h-24 w-24 overflow-hidden">
        <motion.div
          animate={{
            rotate: active ? 90 : 45,
            scale: active ? 1.1 : 1,
          }}
          className={`absolute -right-10 -top-10 h-24 w-24 rounded-full ${accentClasses.glow} blur-xl`}
        />
      </div>

      <div className="relative z-10 flex items-start justify-between">
        <motion.span
          animate={{
            x: active ? 4 : 0,
          }}
          className={`text-xs font-black tracking-[0.25em] ${accentClasses.number}`}
        >
          {feature.number}
        </motion.span>

        <motion.div
          animate={{
            y: active ? -4 : 0,
            rotate: active ? 8 : 0,
            scale: active ? 1.08 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 18,
          }}
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${accentClasses.icon} text-xl font-black shadow-sm`}
        >
          {feature.icon}
        </motion.div>
      </div>

      <div className="relative z-10 mt-16">
        <h3 className="text-2xl font-black tracking-tight text-[#30242B]">
          {feature.title}
        </h3>

        <p className="mt-2 text-sm font-semibold text-[#756970]">
          {feature.short}
        </p>

        <p className="mt-5 max-w-md text-sm leading-7 text-[#81757B]">
          {feature.description}
        </p>
      </div>

      <div className="absolute bottom-7 left-7 right-7">
        <div className="flex items-center justify-between">
          <div className="h-px flex-1 bg-[#30242B]/10">
            <motion.div
              animate={{
                width: active ? "100%" : "0%",
              }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
              }}
              className={`h-full ${accentClasses.line}`}
            />
          </div>

          <motion.span
            animate={{
              x: active ? 5 : 0,
              opacity: active ? 1 : 0.45,
            }}
            className={`ml-4 text-lg font-black ${accentClasses.number}`}
          >
            →
          </motion.span>
        </div>
      </div>
    </motion.article>
  );
}

function InteractiveBillingVisual() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      label: "Products",
      value: "03 items",
    },
    {
      label: "Pricing",
      value: "₹2,450",
    },
    {
      label: "Payment",
      value: "UPI",
    },
    {
      label: "Receipt",
      value: "Ready",
    },
  ];

  return (
    <div className="relative mx-auto w-full max-w-xl">
      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#43305F]/15 blur-[100px]" />

      {/* Main glass dashboard */}
      <motion.div
        animate={{
          y: [0, -7, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative overflow-hidden rounded-[30px] border border-white/80 bg-white/65 p-5 shadow-[0_35px_100px_rgba(48,36,43,0.16)] backdrop-blur-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#30242B]/10 pb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#756970]">
              New Bill
            </div>
            <div className="mt-1 text-lg font-black text-[#30242B]">
              INV-024
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-[#43305F]/10 px-3 py-1.5 text-xs font-bold text-[#43305F]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#43305F]" />
            Offline
          </div>
        </div>

        {/* Products */}
        <div className="mt-5 space-y-3">
          {[
            ["Premium Notebook", "₹650"],
            ["Desk Organizer", "₹900"],
            ["Gift Box", "₹900"],
          ].map(([name, price], index) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.15,
              }}
              className="flex items-center justify-between rounded-2xl bg-[#F4EEEA]/80 p-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-xs font-black text-[#43305F] shadow-sm">
                  0{index + 1}
                </div>

                <span className="text-sm font-bold text-[#30242B]">
                  {name}
                </span>
              </div>

              <span className="text-sm font-black text-[#30242B]">
                {price}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-5 rounded-2xl bg-[#43305F] p-5 text-white shadow-xl">
          <div className="flex items-center justify-between text-sm text-white/65">
            <span>Subtotal</span>
            <span>₹2,450</span>
          </div>

          <div className="mt-2 flex items-center justify-between text-sm text-white/65">
            <span>Tax</span>
            <span>₹0</span>
          </div>

          <div className="my-4 h-px bg-white/15" />

          <div className="flex items-end justify-between">
            <span className="text-sm font-bold text-white/70">
              Total
            </span>

            <span className="text-3xl font-black">
              ₹2,450
            </span>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-bold text-[#756970]">
            Payment: UPI
          </span>

          <motion.div
            animate={{
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="rounded-xl bg-[#C76B42] px-4 py-2 text-xs font-black text-white shadow-lg"
          >
            BILL CREATED
          </motion.div>
        </div>
      </motion.div>

      {/* Floating status */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 2, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-5 top-16 hidden rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-xl backdrop-blur-xl sm:block"
      >
        <div className="text-[10px] font-bold uppercase tracking-widest text-[#756970]">
          Balance Due
        </div>
        <div className="mt-1 text-lg font-black text-[#C76B42]">
          ₹450
        </div>
      </motion.div>

      {/* Floating offline */}
      <motion.div
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-xl backdrop-blur-xl sm:block"
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#43305F]" />
          <span className="text-xs font-black text-[#30242B]">
            Works offline
          </span>
        </div>
      </motion.div>

      {/* Step controls */}
      <div className="relative mt-8 grid grid-cols-4 gap-2">
        {steps.map((step, index) => (
          <button
            key={step.label}
            type="button"
            onClick={() => setActiveStep(index)}
            className="relative rounded-2xl border border-white/80 bg-white/55 p-3 text-left backdrop-blur-xl transition hover:bg-white/80"
          >
            {activeStep === index && (
              <motion.div
                layoutId="active-billing-step"
                className="absolute inset-0 rounded-2xl bg-[#43305F]/10"
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 30,
                }}
              />
            )}

            <div className="relative z-10">
              <div className="text-[9px] font-black uppercase tracking-widest text-[#756970]">
                {step.label}
              </div>

              <div className="mt-1 text-xs font-black text-[#30242B]">
                {step.value}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function FloatingOrb({ className, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0.25, 0.5, 0.25],
        y: [0, -20, 0],
        x: [0, 10, 0],
      }}
      transition={{
        duration: 7,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
    />
  );
}

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(null);

  const featured = useMemo(
    () => features.find((feature) => feature.number === activeFeature),
    [activeFeature]
  );

  return (
    <div className="min-h-screen overflow-hidden bg-[#F5F0ED] text-[#30242B]">

      {/* ========================================================= */}
      {/* HERO */}
      {/* ========================================================= */}

      <section className="relative px-6 pb-24 pt-36 md:pb-28 md:pt-40">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <FloatingOrb
            className="left-[5%] top-28 h-64 w-64 bg-[#43305F]/15"
          />

          <FloatingOrb
            delay={1}
            className="right-[4%] top-48 h-72 w-72 bg-[#C76B42]/15"
          />

          <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(#30242B_1px,transparent_1px),linear-gradient(90deg,#30242B_1px,transparent_1px)] [background-size:60px_60px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">

            {/* Copy */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/55 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#43305F] shadow-sm backdrop-blur-xl"
              >
                <span className="h-2 w-2 rounded-full bg-[#C76B42]" />
                SR Billing Features
              </motion.div>

              <h1 className="mt-7 text-5xl font-black leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                Powerful where
                <br />
                <span className="text-[#43305F]">
                  it matters.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-[#756970]">
                Everything you need to run your everyday billing workflow,
                without the unnecessary complexity that gets in your way.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  to="/download"
                  className="group inline-flex items-center gap-3 rounded-2xl bg-[#43305F] px-6 py-4 text-sm font-black text-white shadow-[0_15px_40px_rgba(67,48,95,0.25)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(67,48,95,0.35)]"
                >
                  Explore SR Billing
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <Link
                  to="/screenshots"
                  className="inline-flex items-center rounded-2xl border border-white/80 bg-white/55 px-6 py-4 text-sm font-black text-[#30242B] shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/80"
                >
                  See it in action
                </Link>
              </div>

              {/* Mini stats */}
              <div className="mt-12 grid max-w-lg grid-cols-3 gap-3">
                {[
                  ["12+", "Core features"],
                  ["100%", "Offline ready"],
                  ["01", "Simple workflow"],
                ].map(([value, label], index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.25 + index * 0.1,
                    }}
                    className="rounded-2xl border border-white/80 bg-white/45 p-4 backdrop-blur-xl"
                  >
                    <div className="text-xl font-black text-[#30242B]">
                      {value}
                    </div>
                    <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#756970]">
                      {label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Interactive visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              <InteractiveBillingVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FEATURE INTRO */}
      {/* ========================================================= */}

      <section className="relative px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#C76B42]">
                Built around your workflow
              </p>

              <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.035em] sm:text-5xl">
                Less software to manage.
                <br />
                <span className="text-[#43305F]">
                  More business to run.
                </span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-[#756970]">
              Move your cursor across the cards. SR Billing's tools are designed
              to feel as simple as the work they help you do.
            </p>
          </div>

          {/* Feature grid */}
          <div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            style={{
              perspective: "1200px",
            }}
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.number}
                feature={feature}
                index={index}
                active={activeFeature === feature.number}
                onHover={setActiveFeature}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* ACTIVE FEATURE SPOTLIGHT */}
      {/* ========================================================= */}

      <section className="relative px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[36px] bg-[#30242B] px-7 py-12 text-white shadow-[0_35px_100px_rgba(48,36,43,0.18)] md:px-12 md:py-16">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0">
              <motion.div
                animate={{
                  x: activeFeature ? 80 : 0,
                  y: activeFeature ? -30 : 0,
                }}
                transition={{
                  duration: 0.8,
                }}
                className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#43305F]/60 blur-[100px]"
              />

              <motion.div
                animate={{
                  x: activeFeature ? -60 : 0,
                  y: activeFeature ? 30 : 0,
                }}
                transition={{
                  duration: 0.8,
                }}
                className="absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-[#C76B42]/35 blur-[100px]"
              />

              <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:50px_50px]" />
            </div>

            <div className="relative grid items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#C76B42]">
                  Designed for real work
                </p>

                <h2 className="mt-5 text-4xl font-black tracking-[-0.035em] sm:text-5xl">
                  Your billing should
                  <br />
                  feel effortless.
                </h2>

                <p className="mt-6 max-w-xl leading-8 text-white/55">
                  Every SR Billing feature exists to remove friction from a
                  repetitive task. Choose a feature to see how the system
                  fits together.
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {features.slice(0, 6).map((feature) => (
                    <button
                      key={feature.number}
                      type="button"
                      onMouseEnter={() => setActiveFeature(feature.number)}
                      onFocus={() => setActiveFeature(feature.number)}
                      className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
                        activeFeature === feature.number
                          ? "border-[#C76B42] bg-[#C76B42] text-white"
                          : "border-white/10 bg-white/5 text-white/55 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {feature.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[260px]">
                <AnimatePresence mode="wait">
                  {featured ? (
                    <motion.div
                      key={featured.number}
                      initial={{
                        opacity: 0,
                        y: 20,
                        scale: 0.96,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: -20,
                        scale: 0.96,
                      }}
                      transition={{
                        duration: 0.35,
                      }}
                      className="absolute inset-0 flex items-center"
                    >
                      <div className="w-full rounded-[30px] border border-white/10 bg-white/[0.07] p-8 backdrop-blur-xl">
                        <div className="flex items-start justify-between">
                          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                            {featured.icon}
                          </div>

                          <span className="text-sm font-black tracking-[0.2em] text-[#C76B42]">
                            {featured.number}
                          </span>
                        </div>

                        <h3 className="mt-10 text-3xl font-black">
                          {featured.title}
                        </h3>

                        <p className="mt-4 leading-7 text-white/55">
                          {featured.description}
                        </p>

                        <div className="mt-7 h-1 overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "78%" }}
                            transition={{
                              duration: 0.8,
                              delay: 0.15,
                            }}
                            className="h-full rounded-full bg-[#C76B42]"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 flex items-center"
                    >
                      <div className="w-full rounded-[30px] border border-white/10 bg-white/[0.05] p-8">
                        <div className="text-5xl">✦</div>

                        <h3 className="mt-6 text-3xl font-black">
                          Hover a feature.
                        </h3>

                        <p className="mt-3 leading-7 text-white/50">
                          Explore the tools that make up the SR Billing
                          experience.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* WORKFLOW */}
      {/* ========================================================= */}

      <section className="relative px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#43305F]">
                One smooth flow
              </p>

              <h2 className="mt-5 text-4xl font-black tracking-[-0.035em] sm:text-5xl">
                From product
                <br />
                <span className="text-[#C76B42]">
                  to receipt.
                </span>
              </h2>

              <p className="mt-6 max-w-md leading-8 text-[#756970]">
                SR Billing keeps the entire billing journey connected, so you
                don't have to jump between complicated tools.
              </p>

              <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/80 bg-white/55 px-4 py-2 text-xs font-bold text-[#756970] shadow-sm backdrop-blur-xl">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#C76B42]" />
                Built for everyday speed
              </div>
            </div>

            <div className="relative">
              {/* Timeline */}
              <div className="absolute bottom-8 left-[23px] top-8 w-px bg-[#30242B]/10 md:left-[27px]" />

              <div className="space-y-5">
                {workflow.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{
                      opacity: 0,
                      x: 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.3,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                    }}
                    className="group relative flex gap-5 md:gap-7"
                  >
                    <motion.div
                      whileHover={{
                        scale: 1.12,
                      }}
                      className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#43305F] text-xs font-black text-white shadow-lg md:h-14 md:w-14"
                    >
                      {step.number}
                    </motion.div>

                    <div className="flex-1 rounded-[26px] border border-white/80 bg-white/55 p-6 shadow-sm backdrop-blur-xl transition duration-500 group-hover:-translate-y-1 group-hover:bg-white/80 group-hover:shadow-xl md:p-7">
                      <div className="flex items-start justify-between gap-5">
                        <div>
                          <h3 className="text-xl font-black text-[#30242B]">
                            {step.title}
                          </h3>

                          <p className="mt-3 max-w-xl leading-7 text-[#756970]">
                            {step.description}
                          </p>
                        </div>

                        <motion.span
                          whileHover={{
                            x: 5,
                          }}
                          className="hidden text-2xl font-black text-[#C76B42] sm:block"
                        >
                          →
                        </motion.span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FINAL CTA */}
      {/* ========================================================= */}

      {/* <section className="relative px-6 pb-24 pt-10 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <motion.div
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
              amount: 0.25,
            }}
            className="relative overflow-hidden rounded-[36px] bg-[#43305F] px-7 py-14 text-center text-white shadow-[0_35px_100px_rgba(67,48,95,0.25)] md:px-12 md:py-20"
          >
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, 20, 0],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
            />

            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, -15, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-[#C76B42]/30 blur-3xl"
            />

            <div className="relative z-10 mx-auto max-w-3xl">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-xl backdrop-blur-xl">
                ✦
              </div>

              <h2 className="mt-7 text-4xl font-black tracking-[-0.035em] sm:text-6xl">
                Ready to make billing
                <br />
                <span className="text-[#F0A17C]">
                  feel simpler?
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60">
                Download SR Billing and bring your everyday billing workflow
                together in one fast, focused desktop application.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  to="/download"
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-[#C76B42] px-7 py-4 text-sm font-black text-white shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-[#d47a50]"
                >
                  Download SR Billing
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-sm font-black text-white transition duration-300 hover:-translate-y-1 hover:bg-white/10"
                >
                  Talk to us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section> */}

    </div>
  );
}

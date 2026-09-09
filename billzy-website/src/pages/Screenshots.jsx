import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const screenshots = [
  {
    title: "Billing Dashboard",
    description:
      "A clean workspace for managing your daily billing activities.",
    image: "/dashboard.png",
    category: "Dashboard",
    number: "01",
    accent: "violet",
  },
  {
    title: "Create New Bill",
    description:
      "Select products, set rates, apply discounts and taxes, and create bills quickly.",
    image: "/billing.png",
    category: "Billing",
    number: "02",
    accent: "orange",
  },
  {
    title: "Professional Receipt",
    description:
      "Generate a compact thermal-style receipt with your shop information and payment details.",
    image: "/receipt.png",
    category: "Receipts",
    number: "03",
    accent: "violet",
  },
  {
    title: "Product Catalogue",
    description:
      "Keep your products organized and quickly add them while creating bills.",
    image: "/products.png",
    category: "Products",
    number: "04",
    accent: "orange",
  },
  {
    title: "Staff Management",
    description:
      "Manage staff accounts with role-based access for your business.",
    image: "/staff.png",
    category: "Management",
    number: "05",
    accent: "violet",
  },
  {
    title: "Sales Reports",
    description:
      "Review sales activity and understand your business performance.",
    image: "/reports.png",
    category: "Reports",
    number: "06",
    accent: "orange",
  },
  {
    title: "Shop Settings",
    description:
      "Customize your shop information, contact details, GST information and receipt settings.",
    image: "/settings.png",
    category: "Settings",
    number: "07",
    accent: "violet",
  },
];

const benefits = [
  {
    number: "01",
    title: "Simple Interface",
    description:
      "Designed so everyday billing tasks are easy to understand and quick to complete.",
    icon: "✦",
  },
  {
    number: "02",
    title: "Fast Workflow",
    description:
      "Add products, set pricing, record payments and generate a receipt without unnecessary steps.",
    icon: "↗",
  },
  {
    number: "03",
    title: "Built for Business",
    description:
      "Billing, staff management, reports and shop settings are brought together in one application.",
    icon: "⌁",
  },
];

function FloatingOrb({ className }) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      animate={{
        y: [0, -18, 0],
        x: [0, 10, 0],
        scale: [1, 1.08, 1],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function ScreenshotCard({ screenshot, index, onOpen }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-150, 150], [4, -4]),
    {
      stiffness: 180,
      damping: 20,
    },
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-150, 150], [-4, 4]),
    {
      stiffness: 180,
      damping: 20,
    },
  );

  const spotlightX = useTransform(mouseX, [-150, 150], [0, 100]);
  const spotlightY = useTransform(mouseY, [-150, 150], [0, 100]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    mouseX.set(event.clientX - rect.left - rect.width / 2);
    mouseY.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const isOrange = screenshot.accent === "orange";

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(screenshot)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative block w-full text-left"
    >
      <div className="relative overflow-hidden rounded-[28px] border border-white/80 bg-white/55 p-2 shadow-[0_18px_60px_rgba(67,48,95,0.08)] backdrop-blur-xl transition-shadow duration-500 group-hover:shadow-[0_28px_80px_rgba(67,48,95,0.16)]">
        {/* Mouse spotlight */}
        <motion.div
          className={`pointer-events-none absolute -inset-24 z-10 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${
            isOrange ? "bg-[#C76B42]/15" : "bg-[#43305F]/15"
          }`}
          style={{
            x: spotlightX,
            y: spotlightY,
          }}
        />

        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] bg-[#eee8e4]">
          <img
            src={screenshot.image}
            alt={screenshot.title}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.045]"
          />

          {/* Image gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#30242B]/45 via-transparent to-transparent opacity-70" />

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-[#30242B]/0 transition duration-500 group-hover:bg-[#30242B]/40">
            <motion.span
              initial={false}
              className="translate-y-4 rounded-full border border-white/70 bg-white/85 px-5 py-2.5 text-sm font-bold text-[#30242B] opacity-0 shadow-xl backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
            >
              View Screenshot
              <span className="ml-2 text-[#C76B42]">↗</span>
            </motion.span>
          </div>

          {/* Number */}
          <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-[#30242B]/55 text-xs font-black text-white backdrop-blur-md">
            {screenshot.number}
          </div>

          {/* Category */}
          <div className="absolute bottom-4 left-4 rounded-full border border-white/40 bg-white/80 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-[#43305F] backdrop-blur-md">
            {screenshot.category}
          </div>
        </div>

        {/* Content */}
        <div className="relative px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
          <div
            className={`mb-3 h-1 w-10 rounded-full transition-all duration-500 group-hover:w-16 ${
              isOrange ? "bg-[#C76B42]" : "bg-[#43305F]"
            }`}
          />

          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-black tracking-tight text-[#30242B] sm:text-[22px]">
                {screenshot.title}
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-[#756970]">
                {screenshot.description}
              </p>
            </div>

            <span
              className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm transition-all duration-300 group-hover:translate-x-1 ${
                isOrange
                  ? "border-[#C76B42]/20 bg-[#C76B42]/10 text-[#C76B42]"
                  : "border-[#43305F]/15 bg-[#43305F]/10 text-[#43305F]"
              }`}
            >
              ↗
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function BenefitCard({ benefit, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
      }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-[26px] border border-white/80 bg-white/55 p-7 shadow-[0_18px_55px_rgba(67,48,95,0.06)] backdrop-blur-xl transition-shadow duration-500 hover:shadow-[0_24px_65px_rgba(67,48,95,0.13)] sm:p-8"
    >
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#43305F]/5 blur-3xl transition-all duration-500 group-hover:bg-[#C76B42]/10" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#43305F] text-lg font-black text-white shadow-lg shadow-[#43305F]/15">
            {benefit.icon}
          </div>

          <span className="text-xs font-black tracking-[0.18em] text-[#a59a9f]">
            {benefit.number}
          </span>
        </div>

        <h3 className="mt-7 text-xl font-black tracking-tight text-[#30242B]">
          {benefit.title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-[#756970]">
          {benefit.description}
        </p>

        <div className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-[0.15em] text-[#43305F]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C76B42]" />
          Designed with purpose
        </div>
      </div>
    </motion.div>
  );
}

export default function Screenshots() {
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);

  return (
    <div className="overflow-hidden bg-[#F5F0ED] text-[#30242B]">
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative px-5 pb-20 pt-32 sm:px-6 sm:pt-36 md:pb-24">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(#43305F 1px, transparent 1px), linear-gradient(90deg, #43305F 1px, transparent 1px)",
              backgroundSize: "42px 42px",
            }}
          />

          <FloatingOrb className="left-[8%] top-24 h-64 w-64 bg-[#43305F]/10" />
          <FloatingOrb className="right-[8%] top-32 h-72 w-72 bg-[#C76B42]/10" />

          <div className="absolute left-1/2 top-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-white/50 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/55 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#43305F] shadow-sm backdrop-blur-xl"
            >
              <span className="h-2 w-2 rounded-full bg-[#C76B42] shadow-[0_0_12px_rgba(199,107,66,0.6)]" />
              Product Showcase
            </motion.div>

            <h1 className="mt-6 text-5xl font-black leading-[0.98] tracking-[-0.045em] text-[#30242B] sm:text-6xl lg:text-[76px]">
              See Billzy
              <br />
              <span className="relative inline-block text-[#43305F]">
                in action.
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{
                    delay: 0.9,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute -bottom-2 left-0 h-1 rounded-full bg-[#C76B42]"
                />
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-[#756970] sm:text-lg sm:leading-8">
              Explore the simple interface designed to make everyday billing
              faster, clearer and easier to manage.
            </p>

            {/* Small stats */}
            <div className="mt-9 flex flex-wrap gap-3">
              {[
                ["07", "Core screens"],
                ["01", "Desktop app"],
                ["∞", "Daily workflow"],
              ].map(([value, label], index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.45 + index * 0.1,
                  }}
                  className="rounded-2xl border border-white/80 bg-white/50 px-4 py-3 shadow-sm backdrop-blur-xl"
                >
                  <div className="text-lg font-black text-[#43305F]">
                    {value}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#8a7d83]">
                    {label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          SCREENSHOT GRID
      ========================================================== */}
      <section className="relative px-5 pb-24 sm:px-6 md:pb-28">
        <div className="mx-auto max-w-7xl">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#C76B42]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C76B42]" />
                Interface
              </div>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#30242B] sm:text-4xl">
                Everything in one place.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-[#756970] md:text-right">
              Explore the Billzy desktop application and see how each part of
              your billing workflow fits together.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {screenshots.map((screenshot, index) => (
              <ScreenshotCard
                key={screenshot.title}
                screenshot={screenshot}
                index={index}
                onOpen={setSelectedScreenshot}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          BENEFITS
      ========================================================== */}
      <section className="relative overflow-hidden px-5 py-24 sm:px-6 md:py-28">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-black uppercase tracking-[0.2em] text-[#C76B42]"
            >
              Designed for Simplicity
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-4xl font-black tracking-[-0.03em] text-[#30242B] sm:text-5xl"
            >
              Built around your
              <span className="text-[#43305F]"> everyday workflow.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 text-base leading-7 text-[#756970] sm:text-lg"
            >
              Billzy keeps the important tools close at hand so creating bills,
              managing products, handling staff and reviewing sales stays
              simple.
            </motion.p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={benefit.number}
                benefit={benefit}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================== */}
      <section className="px-5 pb-24 sm:px-6 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[#43305F] px-6 py-16 text-center shadow-[0_30px_100px_rgba(67,48,95,0.25)] sm:px-10 sm:py-20"
        >
          {/* Animated background */}
          <motion.div
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#C76B42]/25 blur-3xl"
            animate={{
              x: [0, 25, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"
            animate={{
              x: [0, -20, 0],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />

          <div className="relative">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/75 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C76B42]" />
              Ready to get started?
            </div>

            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-black tracking-[-0.035em] text-white sm:text-5xl md:text-6xl">
              Make billing
              <span className="text-[#C76B42]"> easier.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
              Download Billzy for Windows and experience a simpler way to
              manage your everyday billing.
            </p>

            <Link
              to="/download"
              className="group mt-8 inline-flex items-center gap-3 rounded-2xl bg-[#C76B42] px-7 py-4 text-sm font-black text-white shadow-xl shadow-black/15 transition-all duration-300 hover:-translate-y-1 hover:bg-[#d27a52] hover:shadow-2xl"
            >
              Download Billzy
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* =========================================================
          LIGHTBOX
      ========================================================== */}
      <AnimatePresence>
        {selectedScreenshot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#30242B]/90 p-4 backdrop-blur-xl sm:p-8"
            onClick={() => setSelectedScreenshot(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex max-h-[94vh] max-w-7xl flex-col items-center"
              onClick={(event) => event.stopPropagation()}
            >
              {/* Close */}
              <motion.button
                type="button"
                onClick={() => setSelectedScreenshot(null)}
                whileHover={{ scale: 1.08, rotate: 4 }}
                whileTap={{ scale: 0.92 }}
                className="absolute -right-2 -top-2 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white text-xl font-black text-[#30242B] shadow-2xl transition-colors hover:bg-[#C76B42] hover:text-white sm:-right-4 sm:-top-4"
                aria-label="Close screenshot"
              >
                ×
              </motion.button>

              {/* Image */}
              <div className="overflow-hidden rounded-[24px] border border-white/20 bg-white/90 p-1.5 shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
                <img
                  src={selectedScreenshot.image}
                  alt={selectedScreenshot.title}
                  className="max-h-[74vh] w-auto max-w-full rounded-[18px] object-contain"
                />
              </div>

              {/* Information */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
                className="mt-5 max-w-2xl text-center"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#C76B42] backdrop-blur-md">
                  {selectedScreenshot.category}
                </div>

                <h3 className="mt-3 text-xl font-black text-white sm:text-2xl">
                  {selectedScreenshot.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/55">
                  {selectedScreenshot.description}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
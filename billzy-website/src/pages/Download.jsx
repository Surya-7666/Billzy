import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const PAYMENT_API_URL =
  import.meta.env.VITE_PAYMENT_API_URL || "http://localhost:5001/api";

const BILLZY_PRICE_DISPLAY =
  import.meta.env.VITE_BILLZY_PRICE_DISPLAY || "₹499";

const benefits = [
  {
    number: "01",
    title: "Work Offline",
    description:
      "Create and manage bills without depending on a constant internet connection.",
    icon: "⌁",
  },
  {
    number: "02",
    title: "Fast Billing",
    description:
      "Add products, adjust rates, apply discounts and complete transactions quickly.",
    icon: "↗",
  },
  {
    number: "03",
    title: "Professional Receipts",
    description:
      "Generate clean receipts with your shop details, GST information and payment details.",
    icon: "▤",
  },
  {
    number: "04",
    title: "Business Tools",
    description:
      "Manage products, staff, sales reports and shop settings from one desktop application.",
    icon: "✦",
  },
];

const installSteps = [
  {
    number: "01",
    title: "Download",
    description:
      "Complete the Billzy purchase first. After Razorpay confirms your payment, your protected Windows download becomes available.",
    icon: "↓",
  },
  {
    number: "02",
    title: "Extract",
    description:
      "Right-click the ZIP file and choose Extract All to unpack the Billzy application.",
    icon: "⌗",
  },
  {
    number: "03",
    title: "Launch",
    description:
      "Open the extracted folder and run Billzy.exe to start the application.",
    icon: "↗",
  },
];

const requirements = [
  ["Operating System", "Windows 10 / 11"],
  ["Architecture", "64-bit"],
  ["Application Type", "Desktop"],
  ["Internet", "Not required for regular billing"],
];

const faqs = [
  {
    question: "How do I get Billzy?",
    answer:
      "Billzy is available as a one-time purchase. Complete the secure Razorpay checkout and the protected Windows download becomes available after your payment is verified.",
  },
  {
    question: "Do I need internet to use Billzy?",
    answer:
      "Billzy is designed as an offline desktop billing application. Your normal billing workflow does not require a constant internet connection.",
  },
  {
    question: "How do I install the ZIP version?",
    answer:
      "Download the ZIP file, extract it to a folder on your Windows computer, open the extracted folder and launch Billzy.exe.",
  },
  {
    question: "Where is my billing information stored?",
    answer:
      "The desktop application uses a local SQLite database for its billing data.",
  },
];

function FloatingOrb({ className }) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      animate={{
        x: [0, 18, 0],
        y: [0, -20, 0],
        scale: [1, 1.08, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function MagneticButton({ children, className = "", ...props }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 350,
    damping: 20,
  });

  const springY = useSpring(y, {
    stiffness: 350,
    damping: 20,
  });

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    x.set((event.clientX - rect.left - rect.width / 2) * 0.12);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.12);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      {...props}
      style={{
        x: springX,
        y: springY,
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.96 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

function PaymentButton({ children, className = "", ...props }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.96 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}

function DownloadConsole() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-200, 200], [5, -5]),
    {
      stiffness: 180,
      damping: 22,
    },
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-200, 200], [-5, 5]),
    {
      stiffness: 180,
      damping: 22,
    },
  );

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    mouseX.set(event.clientX - rect.left - rect.width / 2);
    mouseY.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      className="relative mx-auto w-full max-w-[540px]"
    >
      {/* Outer glow */}
      <div className="absolute -inset-8 rounded-[44px] bg-[#43305F]/10 blur-3xl" />

      {/* Floating orbit */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute -inset-8 rounded-[46px] border border-dashed border-[#43305F]/15"
      />

      {/* Main glass */}
      <div className="relative overflow-hidden rounded-[34px] border border-white/80 bg-white/55 p-3 shadow-[0_35px_100px_rgba(67,48,95,0.16)] backdrop-blur-2xl">
        {/* Decorative blobs */}
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#C76B42]/12 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -15, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-24 -left-20 h-60 w-60 rounded-full bg-[#43305F]/10 blur-3xl"
        />

        {/* Window chrome */}
        <div className="relative rounded-[27px] bg-[#30242B] p-5 text-white sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            </div>

            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-white/35">
              Billzy / Windows
            </span>
          </div>

          {/* Logo */}
          <div className="mt-10 flex items-center justify-center">
            <motion.div
              animate={{
                y: [0, -7, 0],
                rotate: [0, 2, 0, -2, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <div className="absolute -inset-7 rounded-full bg-[#C76B42]/20 blur-2xl" />

              <div className="relative flex h-24 w-24 items-center justify-center rounded-[28px] bg-white p-4 shadow-2xl">
                <img
                  src="/billzy-logo.png"
                  alt="Billzy"
                  className="h-full w-full object-contain"
                />
              </div>
            </motion.div>
          </div>

          <div className="mt-8 text-center">
            <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#C76B42]">
              Latest release
            </div>

            <h3 className="mt-3 text-2xl font-black tracking-tight text-white">
              Billzy Desktop
            </h3>

            <p className="mt-2 text-xs text-white/45">
              Your billing workspace. On your machine.
            </p>
          </div>

          {/* File */}
          <motion.div
            whileHover={{ scale: 1.015 }}
            className="mt-7 rounded-2xl border border-white/10 bg-white/[0.055] p-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C76B42]/15 text-lg text-[#C76B42]">
                ZIP
              </div>

              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-bold text-white">
                  Billzy-Windows.zip
                </div>

                <div className="mt-1 text-[10px] text-white/35">
                  Windows • 64-bit • Desktop
                </div>
              </div>

              <span className="text-[#C76B42]">↓</span>
            </div>
          </motion.div>

          {/* Status */}
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3">
            <div className="flex items-center gap-2">
              <motion.span
                animate={{
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                }}
                className="h-2 w-2 rounded-full bg-[#C76B42]"
              />

              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/45">
                Purchase verified
              </span>
            </div>

            <span className="text-[10px] font-black text-white/25">
              .EXE
            </span>
          </div>
        </div>

        {/* Bottom glass information */}
        <div className="grid grid-cols-3 gap-2 p-2 pt-3">
          {[
            ["01", "Download"],
            ["02", "Extract"],
            ["03", "Launch"],
          ].map(([num, label]) => (
            <div
              key={num}
              className="rounded-2xl border border-white/70 bg-white/45 px-3 py-3 text-center backdrop-blur-xl"
            >
              <div className="text-[9px] font-black text-[#C76B42]">
                {num}
              </div>
              <div className="mt-1 text-[10px] font-bold text-[#756970]">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating badge */}
      <motion.div
        animate={{
          y: [0, -9, 0],
          rotate: [0, 1.5, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-4 top-20 rounded-2xl border border-white/80 bg-white/70 px-4 py-3 shadow-xl backdrop-blur-xl sm:-right-8"
      >
        <div className="text-[9px] font-black uppercase tracking-[0.15em] text-[#756970]">
          Offline
        </div>

        <div className="mt-1 text-sm font-black text-[#43305F]">
          Always ready.
        </div>
      </motion.div>

      {/* Floating Windows badge */}
      <motion.div
        animate={{
          y: [0, 8, 0],
          rotate: [0, -2, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-5 -left-3 rounded-2xl border border-white/80 bg-[#C76B42] px-4 py-3 shadow-xl sm:-left-7"
      >
        <div className="text-[9px] font-black uppercase tracking-[0.15em] text-white/65">
          Built for
        </div>

        <div className="mt-1 text-sm font-black text-white">
          Windows 10 / 11
        </div>
      </motion.div>
    </motion.div>
  );
}

function BenefitCard({ benefit, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.65,
        delay: index * 0.08,
      }}
      whileHover={{
        y: -8,
      }}
      className="group relative overflow-hidden rounded-[27px] border border-white/80 bg-white/55 p-6 shadow-[0_18px_55px_rgba(67,48,95,0.06)] backdrop-blur-xl transition-shadow duration-500 hover:shadow-[0_28px_70px_rgba(67,48,95,0.13)] sm:p-7"
    >
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#43305F]/5 blur-3xl transition-all duration-500 group-hover:bg-[#C76B42]/10" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#43305F] text-lg font-black text-white shadow-lg shadow-[#43305F]/15 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
            {benefit.icon}
          </div>

          <span className="font-mono text-[10px] font-black tracking-[0.18em] text-[#aaa0a4]">
            {benefit.number}
          </span>
        </div>

        <h3 className="mt-7 text-xl font-black tracking-tight text-[#30242B]">
          {benefit.title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-[#756970]">
          {benefit.description}
        </p>

        <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-[#43305F]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C76B42]" />
          Included with Billzy
        </div>
      </div>
    </motion.div>
  );
}

function InstallStep({ step, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
      }}
      className="group relative flex gap-5 rounded-[25px] border border-white/80 bg-white/55 p-5 shadow-[0_15px_50px_rgba(67,48,95,0.05)] backdrop-blur-xl transition-all duration-500 hover:-translate-x-1 hover:shadow-[0_20px_60px_rgba(67,48,95,0.1)] sm:p-6"
    >
      {/* Connector */}
      {index !== installSteps.length - 1 && (
        <div className="absolute bottom-[-25px] left-[35px] hidden h-5 w-px bg-[#43305F]/15 sm:block" />
      )}

      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#43305F] text-lg font-black text-white shadow-lg transition-all duration-500 group-hover:rotate-3 group-hover:bg-[#C76B42]">
        {step.icon}

        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-[#F5F0ED] font-mono text-[8px] font-black text-[#43305F]">
          {step.number}
        </span>
      </div>

      <div>
        <h3 className="text-lg font-black tracking-tight text-[#30242B]">
          {step.title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-[#756970]">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Download() {
  const [openFaq, setOpenFaq] = useState(0);
  const [paymentState, setPaymentState] = useState("idle");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [paymentMessage, setPaymentMessage] = useState("");

  useEffect(() => {
    const savedDownloadUrl = sessionStorage.getItem("billzy_download_url");
    if (savedDownloadUrl) {
      setDownloadUrl(savedDownloadUrl);
      setPaymentState("paid");
      setPaymentMessage("Your previous purchase is ready to download.");
    }

    if (!document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const startPayment = async () => {
    if (paymentState === "loading" || paymentState === "verifying") return;

    setPaymentState("loading");
    setPaymentMessage("");

    try {
      if (!window.Razorpay) {
        await new Promise((resolve, reject) => {
          const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
          if (existing) {
            existing.addEventListener("load", resolve, { once: true });
            existing.addEventListener("error", reject, { once: true });
            return;
          }
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }

      const orderResponse = await fetch(`${PAYMENT_API_URL}/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const orderData = await orderResponse.json();
      if (!orderResponse.ok) throw new Error(orderData.message || "Unable to start payment.");

      const checkout = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Billzy",
        description: "Billzy Windows Desktop License",
        order_id: orderData.orderId,
        image: `${window.location.origin}/billzy-logo.png`,
        theme: { color: "#43305F" },
        handler: async (response) => {
          try {
            setPaymentState("verifying");
            setPaymentMessage("Payment received. Verifying your purchase...");

            const verifyResponse = await fetch(`${PAYMENT_API_URL}/payment/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verifyData = await verifyResponse.json();
            if (!verifyResponse.ok || !verifyData.success) {
              throw new Error(verifyData.message || "Payment verification failed.");
            }

            const paymentServerBaseUrl = PAYMENT_API_URL.replace(/\/api\/?$/, "").replace(/\/$/, "");
            const absoluteDownloadUrl = `${paymentServerBaseUrl}${verifyData.downloadUrl}`;
            setDownloadUrl(absoluteDownloadUrl);
            sessionStorage.setItem("billzy_download_url", absoluteDownloadUrl);
            setPaymentState("paid");
            setPaymentMessage("Payment verified. Your Billzy download is ready.");
          } catch (error) {
            console.error(error);
            setPaymentState("error");
            setPaymentMessage(error.message || "Payment was received, but verification failed. Please contact support.");
          }
        },
        modal: {
          ondismiss: () => {
            if (paymentState !== "paid") {
              setPaymentState("idle");
              setPaymentMessage("");
            }
          },
        },
      });

      checkout.on("payment.failed", (response) => {
        console.error("Razorpay payment failed:", response.error);
        setPaymentState("error");
        setPaymentMessage(response.error?.description || "Payment failed. Please try again.");
      });

      checkout.open();
    } catch (error) {
      console.error(error);
      setPaymentState("error");
      setPaymentMessage(error.message || "Unable to open Razorpay. Please try again.");
    }
  };

  const isBusy = paymentState === "loading" || paymentState === "verifying";

  return (
    <>
      {/* Funky but readable fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@10..48,400;10..48,500;10..48,600;10..48,700;10..48,800&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        .billzy-download-page {
          font-family: "Space Grotesk", sans-serif;
        }

        .billzy-display {
          font-family: "Bricolage Grotesque", sans-serif;
        }
      `}</style>

      <main className="billzy-download-page overflow-hidden bg-[#F5F0ED] text-[#30242B]">
        {/* =========================================================
            HERO
        ========================================================== */}
        <section className="relative min-h-[760px] overflow-hidden px-5 pb-24 pt-32 sm:px-6 sm:pt-36 lg:min-h-[820px] lg:pb-28">
          {/* Background */}
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "linear-gradient(#43305F 1px, transparent 1px), linear-gradient(90deg, #43305F 1px, transparent 1px)",
                backgroundSize: "46px 46px",
              }}
            />

            <FloatingOrb className="left-[-8%] top-20 h-80 w-80 bg-[#43305F]/10" />
            <FloatingOrb className="right-[-5%] top-24 h-96 w-96 bg-[#C76B42]/10" />

            <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-white/45 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl">
            <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
              {/* LEFT */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-3 rounded-full border border-white/80 bg-white/55 px-4 py-2 shadow-sm backdrop-blur-xl"
                >
                  <motion.span
                    animate={{
                      scale: [1, 1.35, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                    }}
                    className="h-2 w-2 rounded-full bg-[#C76B42]"
                  />

                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#43305F]">
                    Billzy for Windows
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1,
                  }}
                  className="billzy-display mt-7 text-6xl font-extrabold leading-[0.91] tracking-[-0.055em] text-[#30242B] sm:text-7xl lg:text-[88px]"
                >
                  Your billing.
                  <br />

                  <span className="relative inline-block text-[#43305F]">
                    Your desktop.
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{
                        delay: 0.9,
                        duration: 0.8,
                      }}
                      className="absolute -bottom-2 left-0 h-1.5 rounded-full bg-[#C76B42]"
                    />
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.25,
                  }}
                  className="mt-7 max-w-xl text-base leading-7 text-[#756970] sm:text-lg sm:leading-8"
                >
                  A focused desktop workspace for creating bills, managing
                  products, handling payments and keeping your business
                  organized — without depending on a constant internet
                  connection.
                </motion.p>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.4,
                  }}
                  className="mt-9 flex flex-col gap-3 sm:flex-row"
                >
                  {paymentState === "paid" && downloadUrl ? (
                    <MagneticButton
                      href={downloadUrl}
                      className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-[#C76B42] px-7 py-4 text-sm font-black text-white shadow-xl shadow-[#C76B42]/20 transition-all duration-300 hover:bg-[#d07850] hover:shadow-2xl"
                    >
                      <span>Download Billzy</span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-y-1">
                        ↓
                      </span>
                    </MagneticButton>
                  ) : (
                    <PaymentButton
                      onClick={startPayment}
                      disabled={isBusy}
                      className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-[#43305F] px-7 py-4 text-sm font-black text-white shadow-xl shadow-[#43305F]/20 transition-all duration-300 hover:bg-[#51406e] hover:shadow-2xl disabled:cursor-wait disabled:opacity-70"
                    >
                      <span>{isBusy ? (paymentState === "verifying" ? "Verifying..." : "Opening payment...") : `Buy Billzy ${BILLZY_PRICE_DISPLAY}`}</span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                        →
                      </span>
                    </PaymentButton>
                  )}

                  <Link
                    to="/screenshots"
                    className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-white/80 bg-white/55 px-7 py-4 text-sm font-black text-[#43305F] shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/75"
                  >
                    Explore the app
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </motion.div>

                {paymentMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 rounded-2xl border px-4 py-3 text-xs font-bold ${paymentState === "error" ? "border-red-200 bg-red-50 text-red-700" : paymentState === "paid" ? "border-[#C76B42]/20 bg-[#C76B42]/8 text-[#43305F]" : "border-[#43305F]/10 bg-white/55 text-[#756970]"}`}
                  >
                    {paymentMessage}
                  </motion.div>
                )}

                {/* Specs */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 0.65,
                    duration: 0.7,
                  }}
                  className="mt-7 flex flex-wrap gap-2"
                >
                  {[
                    "Windows 10 / 11",
                    "64-bit",
                    "Offline billing",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/80 bg-white/40 px-3 py-1.5 text-[10px] font-bold text-[#756970] backdrop-blur-md"
                    >
                      {item}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* RIGHT */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <DownloadConsole />
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================
            QUICK VALUE STRIP
        ========================================================== */}
        <section className="relative px-5 pb-20 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid overflow-hidden rounded-[30px] border border-white/80 bg-white/50 shadow-[0_20px_70px_rgba(67,48,95,0.07)] backdrop-blur-xl sm:grid-cols-3"
            >
              {[
                ["LOCAL", "Your billing data stays on your machine."],
                ["FOCUSED", "Everything you need for everyday billing."],
                ["READY", "Purchase, download and start billing."],
              ].map(([title, text], index) => (
                <div
                  key={title}
                  className={`p-6 sm:p-7 ${
                    index !== 2
                      ? "border-b border-[#43305F]/10 sm:border-b-0 sm:border-r"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C76B42]" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#43305F]">
                      {title}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-[#756970]">
                    {text}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* =========================================================
            BENEFITS
        ========================================================== */}
        <section className="relative px-5 py-24 sm:px-6 md:py-28">
          <FloatingOrb className="right-[-10%] top-20 h-80 w-80 bg-[#C76B42]/6" />

          <div className="relative mx-auto max-w-7xl">
            <div className="mb-12 max-w-3xl">
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-[10px] font-black uppercase tracking-[0.22em] text-[#C76B42]"
              >
                Inside Billzy
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="billzy-display mt-4 text-5xl font-extrabold leading-[0.95] tracking-[-0.04em] text-[#30242B] sm:text-6xl"
              >
                More than
                <br />
                <span className="text-[#43305F]">just billing.</span>
              </motion.h2>

              <p className="mt-5 max-w-2xl text-base leading-7 text-[#756970]">
                Billzy brings the essential parts of your daily billing
                workflow together in one focused desktop application.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
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
            INSTALLATION
        ========================================================== */}
        <section className="relative overflow-hidden px-5 py-24 sm:px-6 md:py-28">
          <div className="absolute inset-0 bg-[#43305F]" />

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <FloatingOrb className="left-[-8%] top-[-10%] h-96 w-96 bg-[#C76B42]/20" />
          <FloatingOrb className="bottom-[-10%] right-[-8%] h-96 w-96 bg-white/10" />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#C76B42]">
                  Getting started
                </div>

                <h2 className="billzy-display mt-4 text-5xl font-extrabold leading-[0.92] tracking-[-0.045em] text-white sm:text-6xl">
                  From download
                  <br />
                  <span className="text-[#C76B42]">to billing.</span>
                </h2>

                <p className="mt-6 max-w-md text-sm leading-7 text-white/55">
                  The current Windows package is distributed as a ZIP file,
                  keeping the initial setup straightforward.
                </p>

                <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-xl">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#C76B42] text-sm font-black text-white">
                    ZIP
                  </div>

                  <div>
                    <div className="text-xs font-bold text-white">
                      Billzy-Windows.zip
                    </div>
                    <div className="mt-0.5 text-[9px] text-white/35">
                      Extract before launching
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {installSteps.map((step, index) => (
                  <InstallStep
                    key={step.number}
                    step={step}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            REQUIREMENTS
        ========================================================== */}
        <section className="px-5 py-24 sm:px-6 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#C76B42]">
                  Requirements
                </div>

                <h2 className="billzy-display mt-4 text-5xl font-extrabold leading-[0.92] tracking-[-0.045em] text-[#30242B] sm:text-6xl">
                  Ready for your
                  <br />
                  <span className="text-[#43305F]">Windows PC.</span>
                </h2>

                <p className="mt-6 max-w-lg text-sm leading-7 text-[#756970]">
                  The current Billzy desktop package is built for 64-bit
                  Windows systems.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="overflow-hidden rounded-[28px] border border-white/80 bg-white/55 shadow-[0_20px_70px_rgba(67,48,95,0.07)] backdrop-blur-xl"
              >
                {requirements.map(([label, value], index) => (
                  <div
                    key={label}
                    className={`flex flex-col gap-2 px-6 py-6 sm:flex-row sm:items-center sm:justify-between ${
                      index !== requirements.length - 1
                        ? "border-b border-[#43305F]/10"
                        : ""
                    }`}
                  >
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#9b8f94]">
                      {label}
                    </span>

                    <span className="text-sm font-black text-[#43305F] sm:text-right">
                      {value}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================
            FAQ
        ========================================================== */}
        <section className="relative px-5 pb-24 sm:px-6 md:pb-28">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#C76B42]">
                Questions
              </div>

              <h2 className="billzy-display mt-4 text-5xl font-extrabold tracking-[-0.045em] text-[#30242B] sm:text-6xl">
                Before you download.
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <motion.div
                    key={faq.question}
                    layout
                    className={`overflow-hidden rounded-[23px] border transition-all duration-300 ${
                      isOpen
                        ? "border-[#43305F]/15 bg-white/70 shadow-[0_15px_50px_rgba(67,48,95,0.08)]"
                        : "border-white/80 bg-white/45"
                    } backdrop-blur-xl`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaq(isOpen ? -1 : index)
                      }
                      className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                    >
                      <span className="text-sm font-black text-[#30242B] sm:text-base">
                        {faq.question}
                      </span>

                      <motion.span
                        animate={{
                          rotate: isOpen ? 45 : 0,
                        }}
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xl ${
                          isOpen
                            ? "bg-[#43305F] text-white"
                            : "bg-[#43305F]/8 text-[#43305F]"
                        }`}
                      >
                        +
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration: 0.3,
                          }}
                        >
                          <p className="px-5 pb-6 pr-14 text-sm leading-7 text-[#756970] sm:px-6">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================
            FINAL DOWNLOAD ZONE
        ========================================================== */}
        <section className="px-5 pb-24 sm:px-6 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-[#30242B] px-6 py-16 shadow-[0_35px_100px_rgba(48,36,43,0.2)] sm:px-10 sm:py-20"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                backgroundSize: "42px 42px",
              }}
            />

            <FloatingOrb className="left-[-5%] top-[-25%] h-72 w-72 bg-[#43305F]/50" />
            <FloatingOrb className="bottom-[-35%] right-[-5%] h-80 w-80 bg-[#C76B42]/25" />

            <div className="relative text-center">
              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-3 shadow-2xl"
              >
                <img
                  src="/billzy-logo.png"
                  alt="Billzy"
                  className="h-full w-full object-contain"
                />
              </motion.div>

              <div className="mt-7 text-[10px] font-black uppercase tracking-[0.22em] text-[#C76B42]">
                Ready when you are
              </div>

              <h2 className="billzy-display mx-auto mt-4 max-w-3xl text-5xl font-extrabold leading-[0.95] tracking-[-0.045em] text-white sm:text-7xl">
                Download Billzy.
                <br />
                <span className="text-[#C76B42]">
                  Start billing.
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
                Purchase Billzy securely and get the protected Windows package for your desktop billing workflow.
              </p>

              {paymentState === "paid" && downloadUrl ? (
                <MagneticButton
                  href={downloadUrl}
                  className="group mt-9 inline-flex items-center gap-4 rounded-2xl bg-[#C76B42] px-8 py-4 text-sm font-black text-white shadow-xl shadow-black/20 transition-all duration-300 hover:bg-[#d07850] hover:shadow-2xl"
                >
                  Download for Windows
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-y-1">
                    ↓
                  </span>
                </MagneticButton>
              ) : (
                <PaymentButton
                  onClick={startPayment}
                  disabled={isBusy}
                  className="group mt-9 inline-flex items-center gap-4 rounded-2xl bg-[#C76B42] px-8 py-4 text-sm font-black text-white shadow-xl shadow-black/20 transition-all duration-300 hover:bg-[#d07850] hover:shadow-2xl disabled:cursor-wait disabled:opacity-70"
                >
                  {isBusy ? (paymentState === "verifying" ? "Verifying payment..." : "Opening Razorpay...") : `Buy Billzy — ${BILLZY_PRICE_DISPLAY}`}
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                    →
                  </span>
                </PaymentButton>
              )}

              <div className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/25">
                Windows 10 / 11&nbsp;&nbsp; • &nbsp;&nbsp;64-bit&nbsp;&nbsp; •
                &nbsp;&nbsp;Offline
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}

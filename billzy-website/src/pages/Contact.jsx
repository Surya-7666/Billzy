import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const WEB3FORMS_ACCESS_KEY = "4275a773-e1a3-4bd2-847a-69cb0f04dd67";

const contactOptions = [
  {
    number: "01",
    title: "General Questions",
    description:
      "Questions about SR Billing, features, billing workflows or getting started.",
    action: "support@SR Billing.in",
    href: "mailto:support@SR Billing.in",
  },
  {
    number: "02",
    title: "Business Enquiries",
    description:
      "Interested in using SR Billing for your shop or business? Let's talk.",
    action: "Talk to us",
    href: "mailto:support@SR Billing.in?subject=Business%20Enquiry",
  },
  {
    number: "03",
    title: "Technical Support",
    description:
      "Having trouble with the desktop application? Tell us what happened.",
    action: "Get support",
    href: "mailto:support@SR Billing.in?subject=Technical%20Support",
  },
];

const faqs = [
  {
    question: "How can I get started with SR Billing?",
    answer:
      "Download the Windows version of SR Billing, extract the ZIP package and launch SR Billing.exe.",
  },
  {
    question: "Does SR Billing work offline?",
    answer:
      "Yes. SR Billing is designed as an offline desktop billing application, allowing your everyday billing workflow to continue without an internet connection.",
  },
  {
    question: "Can I use SR Billing for my business?",
    answer:
      "Yes. SR Billing is designed for businesses that need a simple workflow for billing, products, payments, receipts, staff and sales management.",
  },
  {
    question: "How can I report a problem?",
    answer:
      "Use the contact form and include as much information about the issue as possible. This helps us understand and resolve the problem faster.",
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

function ContactOption({ option, index }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-80, 80], [4, -4]);
  const rotateY = useTransform(x, [-80, 80], [-4, 4]);

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={option.href}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative overflow-hidden rounded-[28px] border border-white/70 bg-white/55 p-6 shadow-[0_18px_60px_rgba(67,48,95,0.08)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_24px_80px_rgba(67,48,95,0.14)] sm:p-7"
    >
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#C76B42]/10 blur-3xl transition duration-500 group-hover:bg-[#C76B42]/20" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black tracking-[0.25em] text-[#C76B42]">
            {option.number}
          </span>

          <motion.div
            whileHover={{ rotate: -8, scale: 1.08 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/80 bg-white/70 text-[#43305F] shadow-sm"
          >
            ↗
          </motion.div>
        </div>

        <h3 className="mt-10 text-xl font-black tracking-tight text-[#30242B]">
          {option.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-[#756970]">
          {option.description}
        </p>

        <div className="mt-6 text-sm font-bold text-[#43305F] transition group-hover:text-[#C76B42]">
          {option.action}
        </div>
      </div>
    </motion.a>
  );
}

function FAQItem({ faq, index, openIndex, setOpenIndex }) {
  const isOpen = openIndex === index;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
      }}
      className="overflow-hidden rounded-2xl border border-white/80 bg-white/60 shadow-[0_10px_40px_rgba(67,48,95,0.05)] backdrop-blur-xl"
    >
      <button
        type="button"
        onClick={() => setOpenIndex(isOpen ? null : index)}
        className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
      >
        <span className="font-bold text-[#30242B]">
          {faq.question}
        </span>

        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#43305F] text-lg text-white"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p className="px-5 pb-5 text-sm leading-7 text-[#756970] sm:px-6">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");
  const [openIndex, setOpenIndex] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !WEB3FORMS_ACCESS_KEY ||
      WEB3FORMS_ACCESS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY"
    ) {
      setStatus("config");
      return;
    }

    setStatus("sending");

    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `SR Billing Contact: ${formData.subject}`,
        from_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        enquiry_type: formData.subject,
        message: formData.message,
      };

      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to send your message."
        );
      }

      setStatus("success");

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="SR Billing-contact-page overflow-hidden bg-[#F5F0ED] text-[#30242B]">

      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="relative px-5 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-36">

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.28]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(67,48,95,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(67,48,95,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <FloatingOrb className="right-[-80px] top-20 h-72 w-72 bg-[#C76B42]/15" />

        <FloatingOrb className="left-[-100px] top-40 h-80 w-80 bg-[#43305F]/10" />

        <div className="relative mx-auto max-w-7xl">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#43305F] shadow-sm backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-[#C76B42] shadow-[0_0_12px_rgba(199,107,66,0.7)]" />
              Get in touch
            </div>

            <h1 className="SR Billing-display mt-6 text-5xl font-black leading-[0.95] tracking-[-0.05em] text-[#30242B] sm:text-6xl lg:text-8xl">
              Let's make
              <br />
              <span className="text-[#43305F]">
                billing easier.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-[#756970] sm:text-lg">
              Have a question, need support or want to explore SR Billing
              for your business? Drop us a message. We'll get back to
              you.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:support@SR Billing.in"
                className="rounded-full border border-white/80 bg-white/65 px-5 py-3 text-sm font-bold text-[#43305F] shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white"
              >
                Email support
              </a>

              <Link
                to="/download"
                className="rounded-full bg-[#43305F] px-5 py-3 text-sm font-bold text-white shadow-[0_12px_30px_rgba(67,48,95,0.2)] transition hover:-translate-y-0.5 hover:bg-[#36264e]"
              >
                Download SR Billing →
              </Link>
            </div>
          </motion.div>

          {/* Small floating status card */}

          <motion.div
            initial={{ opacity: 0, x: 30, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
            className="absolute right-0 top-12 hidden w-56 rounded-3xl border border-white/80 bg-white/55 p-5 shadow-[0_20px_70px_rgba(67,48,95,0.1)] backdrop-blur-xl lg:block"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C76B42]/10 text-[#C76B42]">
                ✦
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#756970]">
                  Support
                </div>
                <div className="font-black text-[#30242B]">
                  We're listening
                </div>
              </div>
            </div>

            <div className="mt-5 h-px bg-[#43305F]/10" />

            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#756970]">
              <span className="h-2 w-2 rounded-full bg-[#C76B42]" />
              support@SR Billing.in
            </div>
          </motion.div>

        </div>
      </section>

      {/* =========================================================
          CONTACT OPTIONS
      ========================================================== */}

      <section className="px-5 pb-20 sm:px-6">

        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {contactOptions.map((option, index) => (
            <ContactOption
              key={option.number}
              option={option}
              index={index}
            />
          ))}
        </div>

      </section>

      {/* =========================================================
          FORM SECTION
      ========================================================== */}

      <section className="px-5 pb-24 sm:px-6">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">

            {/* LEFT PANEL */}

            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-[32px] bg-[#43305F] p-7 text-white shadow-[0_25px_90px_rgba(67,48,95,0.2)] sm:p-9"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#C76B42]/25 blur-3xl" />

              <div className="relative">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl backdrop-blur-xl">
                  B
                </div>

                <p className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-[#E4A17F]">
                  Contact SR Billing
                </p>

                <h2 className="SR Billing-display mt-4 text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
                  Tell us
                  <br />
                  what's on
                  <br />
                  your mind.
                </h2>

                <p className="mt-6 max-w-md text-sm leading-7 text-white/65">
                  Whether you're exploring SR Billing, need technical help
                  or simply want to share feedback, we'd love to hear
                  from you.
                </p>

                <div className="mt-10 space-y-3">

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                      Email
                    </div>

                    <a
                      href="mailto:support@SR Billing.in"
                      className="mt-1 block text-sm font-bold text-[#E4A17F] transition hover:text-white"
                    >
                      support@SR Billing.in
                    </a>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                      Response
                    </div>

                    <div className="mt-1 text-sm font-bold text-white">
                      We'll get back to you
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>

            {/* FORM */}

            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="rounded-[32px] border border-white/80 bg-white/60 p-6 shadow-[0_20px_70px_rgba(67,48,95,0.08)] backdrop-blur-2xl sm:p-9"
            >

              <div className="mb-8">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#C76B42]">
                  Send a message
                </div>

                <h2 className="SR Billing-display mt-3 text-3xl font-black tracking-[-0.04em] text-[#30242B] sm:text-4xl">
                  How can we help?
                </h2>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Name + Email */}

                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#756970]"
                    >
                      Your name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full rounded-2xl border border-white/90 bg-white/70 px-4 py-3.5 text-sm font-medium text-[#30242B] outline-none transition placeholder:text-[#AAA0A4] focus:border-[#C76B42] focus:bg-white focus:ring-4 focus:ring-[#C76B42]/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#756970]"
                    >
                      Email address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-2xl border border-white/90 bg-white/70 px-4 py-3.5 text-sm font-medium text-[#30242B] outline-none transition placeholder:text-[#AAA0A4] focus:border-[#C76B42] focus:bg-white focus:ring-4 focus:ring-[#C76B42]/10"
                    />
                  </div>

                </div>

                {/* Phone + Subject */}

                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#756970]"
                    >
                      Phone
                      <span className="ml-1 normal-case tracking-normal text-[#AAA0A4]">
                        optional
                      </span>
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-2xl border border-white/90 bg-white/70 px-4 py-3.5 text-sm font-medium text-[#30242B] outline-none transition placeholder:text-[#AAA0A4] focus:border-[#C76B42] focus:bg-white focus:ring-4 focus:ring-[#C76B42]/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#756970]"
                    >
                      What is this about?
                    </label>

                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-white/90 bg-white/70 px-4 py-3.5 text-sm font-medium text-[#30242B] outline-none transition focus:border-[#C76B42] focus:bg-white focus:ring-4 focus:ring-[#C76B42]/10"
                    >
                      <option value="" disabled>
                        Select a subject
                      </option>

                      <option value="General Question">
                        General Question
                      </option>

                      <option value="Technical Support">
                        Technical Support
                      </option>

                      <option value="Business Enquiry">
                        Business Enquiry
                      </option>

                      <option value="Feedback">
                        Feedback
                      </option>
                    </select>
                  </div>

                </div>

                {/* Message */}

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#756970]"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    className="w-full resize-none rounded-2xl border border-white/90 bg-white/70 px-4 py-3.5 text-sm font-medium leading-7 text-[#30242B] outline-none transition placeholder:text-[#AAA0A4] focus:border-[#C76B42] focus:bg-white focus:ring-4 focus:ring-[#C76B42]/10"
                  />
                </div>

                {/* STATUS */}

                <AnimatePresence mode="wait">

                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="rounded-2xl border border-[#C76B42]/20 bg-[#C76B42]/10 px-4 py-3 text-sm font-semibold text-[#43305F]"
                    >
                      ✓ Message sent successfully. We'll get back to you soon.
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
                    >
                      Something went wrong while sending your message. Please try again.
                    </motion.div>
                  )}

                  {status === "config" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="rounded-2xl border border-[#C76B42]/20 bg-[#C76B42]/10 px-4 py-3 text-sm font-semibold text-[#43305F]"
                    >
                      Add your Web3Forms access key in Contact.jsx before submitting.
                    </motion.div>
                  )}

                </AnimatePresence>

                {/* BUTTON */}

                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={
                    status === "sending"
                      ? {}
                      : {
                          y: -2,
                          scale: 1.01,
                        }
                  }
                  whileTap={
                    status === "sending"
                      ? {}
                      : {
                          scale: 0.98,
                        }
                  }
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-[#43305F] px-6 py-4 font-bold text-white shadow-[0_14px_35px_rgba(67,48,95,0.2)] transition disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span className="absolute inset-0 -translate-x-full bg-[#C76B42] transition duration-500 group-hover:translate-x-0" />

                  <span className="relative">
                    {status === "sending"
                      ? "Sending message..."
                      : "Send message"}
                  </span>

                  <motion.span
                    animate={
                      status === "sending"
                        ? { rotate: 360 }
                        : { rotate: 0 }
                    }
                    transition={
                      status === "sending"
                        ? {
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }
                        : {}
                    }
                    className="relative"
                  >
                    {status === "sending" ? "◌" : "↗"}
                  </motion.span>
                </motion.button>

                <p className="text-center text-xs leading-5 text-[#9A8F94]">
                  Your message will be securely delivered to the SR Billing
                  support inbox.
                </p>

              </form>
            </motion.div>

          </div>

        </div>
      </section>

      {/* =========================================================
          FAQ
      ========================================================== */}

      <section className="px-5 pb-24 sm:px-6">

        <div className="mx-auto max-w-4xl">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#C76B42]">
              Quick answers
            </div>

            <h2 className="SR Billing-display mt-3 text-4xl font-black tracking-[-0.04em] text-[#30242B] sm:text-5xl">
              Before you ask.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#756970]">
              A few answers to the questions we hear most often.
            </p>
          </motion.div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.question}
                faq={faq}
                index={index}
                openIndex={openIndex}
                setOpenIndex={setOpenIndex}
              />
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================== */}

      <section className="px-5 pb-12 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-[#30242B] px-6 py-14 text-center shadow-[0_25px_90px_rgba(48,36,43,0.18)] sm:px-10 sm:py-16"
        >

          <FloatingOrb className="left-[10%] top-[-100px] h-64 w-64 bg-[#43305F]/50" />

          <FloatingOrb className="right-[5%] bottom-[-100px] h-64 w-64 bg-[#C76B42]/30" />

          <div className="relative">

            <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#E4A17F]">
              Ready when you are
            </div>

            <h2 className="SR Billing-display mx-auto mt-4 max-w-3xl text-4xl font-black tracking-[-0.04em] text-white sm:text-6xl">
              Let's get your shop
              <span className="text-[#E4A17F]"> billing.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
              Download SR Billing and experience a simpler way to manage
              everyday billing.
            </p>

            <Link
              to="/download"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#C76B42] px-7 py-4 text-sm font-black text-white shadow-[0_12px_35px_rgba(199,107,66,0.25)] transition hover:-translate-y-1 hover:bg-[#d47a50]"
            >
              Download SR Billing
              <span>→</span>
            </Link>

          </div>

        </motion.div>

      </section>

    </div>
  );
}

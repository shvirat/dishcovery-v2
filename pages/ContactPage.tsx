import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef } from "react";
import {
  Mail,
  User,
  MessageSquare,
  Send,
  Heart,
  Phone,
  MapPin,
  CheckCircle,
  AlertCircle,
  ArrowLeft
} from "lucide-react";

const WEB3FORMS_KEY = import.meta.env.VITE_W3F_KEY;

export default function ContactPage() {

  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", WEB3FORMS_KEY);
    formData.append("subject", "New Contact Message - Dishcovery");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        formRef.current?.reset();
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
          Get in <span className="text-orange-500">Touch</span>
        </h1>
        <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Have a question, suggestion, or just want to say hello?
          I’d love to hear from you.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
        {/* Left */}
        <div className="space-y-8 text-slate-600 dark:text-slate-400 text-lg">
          <p>
            Dishcovery was built with passion for food and technology.
            Whether you have feedback, recipe suggestions, feature ideas,
            or found something that can be improved — your message matters.
          </p>

          <p>
            I personally read every message and try my best to respond.
            Let’s make Dishcovery better together.
          </p>

          <div className="pt-6 space-y-5">
            <ContactLink icon={<Mail size={18} />} href="mailto:genpixel@yahoo.com" label="genpixel@yahoo.com" />
            <ContactLink icon={<Phone size={18} />} href="tel:+919876543210" label="+91 98765 43210" />
            <ContactLink
              icon={<MapPin size={18} />}
              href="https://www.google.com/maps/search/?api=1&query=New+Delhi+India"
              label="New Delhi, India"
              external
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500 pt-4">
            <Heart className="text-orange-500" size={16} />
            Built with care, powered by curiosity
          </div>
        </div>

        {/* Right: Form */}
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-900
                     border border-slate-100 dark:border-slate-800
                     rounded-[2rem] p-8
                     shadow-2xl space-y-6"
        >
          <FormField label="Your Name" name="name" icon={<User size={18} />} placeholder="Your name" />
          <FormField label="Email Address" name="email" icon={<Mail size={18} />} placeholder="you@example.com" />

          {/* Message */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider ml-1">
              Message
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-4 text-slate-400" size={18} />
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Write your message here..."
                className="w-full bg-slate-50 dark:bg-slate-800
                           border border-slate-200 dark:border-slate-700
                           rounded-2xl py-3.5 pl-12 pr-4
                           focus:outline-none focus:ring-2
                           focus:ring-orange-500/20 focus:border-orange-500
                           transition-all resize-none"
              />
            </div>
          </div>

          {/* Status */}
          {success && (
            <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
              <CheckCircle size={16} />
              Message sent successfully!
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm font-medium">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full font-bold py-4 rounded-2xl transition-all
                        flex items-center justify-center gap-2 text-white
                        ${loading
                          ? "bg-orange-400 cursor-not-allowed"
                          : "bg-orange-500 hover:bg-orange-600 shadow-xl shadow-orange-500/20"}`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send size={18} />
                Send Message
              </>
            )}
          </button>
        </motion.form>
      </div>
            <div className="mt-12 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-orange-500 font-bold hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function ContactLink({
  href,
  icon,
  label,
  external = false
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center gap-3 hover:text-orange-500 transition-colors"
    >
      <span className="p-2 rounded-lg bg-orange-100 dark:bg-orange-500/10 text-orange-500">
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </a>
  );
}

function FormField({
  label,
  name,
  icon,
  placeholder
}: {
  label: string;
  name: string;
  icon: React.ReactNode;
  placeholder: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold uppercase tracking-wider ml-1">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
        <input
          name={name}
          required
          placeholder={placeholder}
          className="w-full bg-slate-50 dark:bg-slate-800
                     border border-slate-200 dark:border-slate-700
                     rounded-2xl py-3.5 pl-12 pr-4
                     focus:outline-none focus:ring-2
                     focus:ring-orange-500/20 focus:border-orange-500
                     transition-all"
        />
      </div>
    </div>
  );
}

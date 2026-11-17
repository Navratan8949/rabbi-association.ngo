"use client"

import { useState } from "react"
import { ArrowRight, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react"
import { createContact } from "@/service/contact.service"
import { useLanguage } from "@/context/LanguageContext"

export function ContactForm() {
  const { t, isRTL } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: ""
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await createContact(formData)
      setSuccess(true)
      setFormData({ name: "", email: "", mobile: "", subject: "", message: "" })
    } catch (err) {
      setError(err.response?.data?.message || t("contact.error", "Failed to send message. Please try again."))
    } finally {
      setLoading(false)
    }
  }

  const inputClasses = "w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-base text-navy placeholder:text-slate-500 transition-all hover:bg-slate-100 hover:border-slate-300 focus:border-accent focus:bg-white focus:outline-none focus:ring-4 focus:ring-accent/20 disabled:opacity-50"

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

  return (
    <form className="space-y-6" onSubmit={handleSubmit} dir={isRTL ? "rtl" : "ltr"}>
      {success && (
        <div className="rounded-2xl bg-blue-50 p-5 text-blue-800 flex items-start gap-4 border border-blue-100/50 shadow-sm">
          <CheckCircle2 className="size-6 shrink-0 text-blue-600 mt-0.5" />
          <span className="font-medium">{t("contact.success", "Thank you! Your message has been sent successfully. Our team will get back to you shortly.")}</span>
        </div>
      )}

      {error && (
        <div className="rounded-2xl bg-rose-50 p-5 text-rose-800 font-medium border border-rose-100/50 shadow-sm">
          {error}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="relative">
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t("membership.personal_fields.name", "Your Full Name")}
            disabled={loading}
            className={inputClasses}
            required
          />
        </div>

        <div className="relative">
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("membership.personal_fields.email", "Email Address")}
            disabled={loading}
            className={inputClasses}
            required
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="relative">
          <input
            type="tel"
            id="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder={t("membership.personal_fields.mobile", "Phone Number")}
            disabled={loading}
            className={inputClasses}
          />
        </div>

        <div className="relative">
          <input
            type="text"
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder={t("contact.subject_placeholder", "Subject of Inquiry")}
            disabled={loading}
            className={inputClasses}
            required
          />
        </div>
      </div>

      <div className="relative">
        <textarea
          id="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={t("contact.message_placeholder", "How can we help you? Please describe in detail...")}
          rows={5}
          disabled={loading}
          className={`${inputClasses} resize-none`}
          required
        ></textarea>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="group inline-flex h-14 w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-navy px-10 text-base font-bold text-white transition-all hover:bg-navy/90 hover:shadow-xl hover:shadow-navy/20 hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          {loading ? <Loader2 className="size-5 animate-spin" /> : t("contact.send_message", "Send Message")}
          {!loading && <ArrowIcon className="size-5 transition-transform group-hover:translate-x-1" />}
        </button>
      </div>
    </form>
  )
}

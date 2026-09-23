"use client"
import { useState } from "react"
import { Loader2, CheckCircle2 } from "lucide-react"
import api from "@/service/api"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { setUser } from "@/redux/features/userSlice"

export function VolunteerFormClient() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const formData = new FormData(e.currentTarget)
      const res = await api.post("/volunteer/public-apply", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      
      if (res.data?.token && res.data?.user) {
        localStorage.setItem("token", res.data.token)
        dispatch(setUser(res.data.user))
        
        setSuccess(true)
        e.target.reset()
        
        setTimeout(() => {
          router.push("/volunteer-portal")
        }, 1500)
      } else {
        setSuccess(true)
        e.target.reset()
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const inputClasses = "h-11 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50"
  const labelClasses = "text-xs font-bold text-navy uppercase tracking-wider mb-1 block"
  const sectionTitleClasses = "text-lg font-bold text-primary mb-4"

  return (
    <form className="grid gap-8 rounded-[2rem] border border-border/70 bg-white p-6 shadow-sm sm:p-10" onSubmit={handleSubmit}>
      {success && (
        <div className="rounded-2xl bg-blue-50 p-5 text-blue-800 flex items-start gap-4 border border-blue-100/50 shadow-sm">
          <CheckCircle2 className="size-6 shrink-0 text-blue-600 mt-0.5" />
          <div>
            <span className="font-bold text-base block mb-1">Application Submitted!</span>
            <span className="font-medium text-sm">Your volunteer application has been submitted successfully. Redirecting to your dashboard...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-2xl bg-rose-50 p-5 text-rose-800 font-medium border border-rose-100/50 shadow-sm">
          {error}
        </div>
      )}

      <div>
        <h3 className={sectionTitleClasses}>Personal Details</h3>
        <div className="grid sm:grid-cols-2 gap-5 mb-5">
          <div>
            <label className={labelClasses}>Full Name *</label>
            <input name="fullName" type="text" placeholder="John Doe" className={inputClasses} required disabled={loading} />
          </div>
          <div>
            <label className={labelClasses}>Date of Birth *</label>
            <input name="dob" type="date" className={inputClasses} required disabled={loading} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mb-5">
          <div>
            <label className={labelClasses}>Email Address *</label>
            <input name="email" type="email" placeholder="john@example.com" className={inputClasses} required disabled={loading} />
          </div>
          <div>
            <label className={labelClasses}>Phone Number *</label>
            <input name="phone" type="tel" placeholder="+91 XXXXX XXXXX" className={inputClasses} required disabled={loading} />
          </div>
        </div>

        <div className="mb-5">
          <label className={labelClasses}>Full Address *</label>
          <input name="address" type="text" placeholder="House No, Street, Landmark" className={inputClasses} required disabled={loading} />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClasses}>State *</label>
            <input name="state" type="text" placeholder="E.g. Maharashtra" className={inputClasses} required disabled={loading} />
          </div>
          <div>
            <label className={labelClasses}>District *</label>
            <input name="district" type="text" placeholder="E.g. Pune" className={inputClasses} required disabled={loading} />
          </div>
        </div>
      </div>

      <div>
        <h3 className={sectionTitleClasses}>Volunteering Details</h3>
        <div className="grid sm:grid-cols-2 gap-5 mb-5">
          <div>
            <label className={labelClasses}>Area of Interest</label>
            <input name="profession" type="text" placeholder="E.g. Education, Environment" className={inputClasses} disabled={loading} />
          </div>
          <div>
            <label className={labelClasses}>Relevant Skills</label>
            <input name="skills" type="text" placeholder="E.g. Design, Teaching" className={inputClasses} disabled={loading} />
          </div>
        </div>

        <div>
          <label className={labelClasses}>Availability (Optional)</label>
          <input name="availability" type="text" placeholder="E.g. Weekends only, 5 hours/week" className={inputClasses} disabled={loading} />
        </div>
      </div>

      <div>
        <h3 className={sectionTitleClasses}>Account & Documents</h3>
        <div className="mb-5">
          <label className={labelClasses}>Create Password *</label>
          <input name="password" type="password" placeholder="Choose a secure password for your portal account" className={inputClasses} required minLength={6} disabled={loading} />
        </div>
        
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="rounded-xl border border-dashed border-slate-300 p-4 text-center bg-white hover:bg-slate-50 transition-colors flex flex-col justify-center">
            <label className="cursor-pointer block w-full">
              <span className={labelClasses}>Profile Photo *</span>
              <span className="text-[11px] font-medium text-slate-500 mb-3 block">Max 2MB (JPG/PNG)</span>
              <input name="profileImage" type="file" accept="image/*" className="mx-auto block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" disabled={loading} required />
            </label>
          </div>
          <div className="rounded-xl border border-dashed border-slate-300 p-4 text-center bg-white hover:bg-slate-50 transition-colors flex flex-col justify-center">
            <label className="cursor-pointer block w-full">
              <span className={labelClasses}>ID Proof (Aadhar/PAN) *</span>
              <span className="text-[11px] font-medium text-slate-500 mb-3 block">Max 5MB (PDF/JPG)</span>
              <input name="idProof" type="file" accept="image/*,.pdf" className="mx-auto block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" disabled={loading} required />
            </label>
          </div>
        </div>
      </div>

      <div className="pt-4 relative z-10">
        <button type="submit" disabled={loading} className="w-full inline-flex h-14 items-center justify-center rounded-xl bg-primary px-8 text-base font-bold tracking-wide text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.01] disabled:opacity-50 disabled:hover:scale-100 shadow-xl shadow-primary/20">
          {loading ? <Loader2 className="mr-2 size-5 animate-spin" /> : null}
          SUBMIT APPLICATION &rarr;
        </button>
        <p className="text-center text-[10px] text-muted-foreground mt-3 uppercase tracking-wider">
          By submitting this form, you agree to our Terms and Conditions
        </p>
      </div>
    </form>
  )
}

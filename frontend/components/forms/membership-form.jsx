"use client";
import { useState, useEffect } from "react";
import { Loader2, CheckCircle2, Lock } from "lucide-react";
import api from "@/service/api";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function MembershipFormClient() {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Client-side rendering fix
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [selectedTier, setSelectedTier] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");

  const tiers = {
    "General Member": 199,
    "Ward Level": 501,
    "Panchayat Level": 1001,
    "Block Level": 2001,
    "District Level": 2501,
    "Division Level": 5001,
    "State Level": 10001,
    "Sthayi Sadasya": 11000,
  };

  const handleTierChange = (e) => {
    const tier = e.target.value;
    setSelectedTier(tier);
    setPaymentAmount(tiers[tier] || "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData(e.currentTarget);

      const res = await api.post("/members/apply", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.success) {
        setSuccess(true);
        e.target.reset();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "h-11 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50";
  const labelClasses =
    "text-xs font-bold text-navy uppercase tracking-wider mb-1 block";
  const sectionTitleClasses =
    "text-lg font-bold text-primary mb-4 pb-2 border-b border-border/50";

  if (!mounted) return null;

  if (!isAuthenticated || !user) {
    return (
      <div className="rounded-[2.5rem] border border-border/70 bg-white p-12 text-center shadow-lg">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-50 mb-6 border border-slate-100">
          <Lock className="h-10 w-10 text-slate-400" />
        </div>
        <h3 className="text-2xl font-bold text-navy mb-4">
          Authentication Required
        </h3>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          You must be logged into your account to apply for a Rabbi Association
          Membership. If you do not have an account, please create one first.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/auth/login"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-navy px-8 text-sm font-bold text-white transition-all hover:bg-navy/90 hover:scale-105"
          >
            Log In Now
          </Link>
          <Link
            href="/auth/signup"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-white px-8 text-sm font-bold text-navy transition-all hover:bg-slate-50 hover:scale-105"
          >
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  if (user?.role === "member") {
    return (
      <div className="rounded-[2.5rem] border border-border/70 bg-white p-12 text-center shadow-lg">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-50 mb-6 border border-green-100">
          <CheckCircle2 className="h-10 w-10 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-navy mb-4">
          You are already a Member!
        </h3>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          Your account is already registered as a member. You can access your
          membership details from your dashboard.
        </p>
        <Link
          href="/member"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-navy px-8 text-sm font-bold text-white transition-all hover:bg-navy/90 hover:scale-105"
        >
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <form
      className="grid gap-10 rounded-[2.5rem] border border-border/70 bg-white p-8 sm:p-12 shadow-lg relative overflow-hidden"
      onSubmit={handleSubmit}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      {success && (
        <div className="rounded-2xl bg-green-50 p-6 text-green-800 flex items-start gap-4 border border-green-100 shadow-sm relative z-10">
          <CheckCircle2 className="size-6 shrink-0 text-green-600 mt-0.5" />
          <div>
            <span className="font-bold text-lg block mb-1">
              Application Submitted Successfully!
            </span>
            <span className="font-medium">
              Your membership application is currently under review by our
              administration. You can track your status in the Member Dashboard.
            </span>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-2xl bg-rose-50 p-5 text-rose-800 font-medium border border-rose-100/50 shadow-sm relative z-10">
          {error}
        </div>
      )}

      <div className="relative z-10">
        <h3 className={sectionTitleClasses}>Personal Information</h3>
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label className={labelClasses}>Full Name *</label>
            <input
              name="fullName"
              type="text"
              defaultValue={user?.fullName}
              className={inputClasses}
              required
              disabled
            />
          </div>
          <div>
            <label className={labelClasses}>Gender *</label>
            <select
              name="gender"
              className={inputClasses}
              required
              defaultValue={user?.gender || ""}
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label className={labelClasses}>Date of Birth *</label>
            <input name="dob" type="date" className={inputClasses} required />
          </div>
          <div>
            <label className={labelClasses}>Email Address *</label>
            <input
              name="email"
              type="email"
              defaultValue={user?.email}
              className={inputClasses}
              required
              disabled
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label className={labelClasses}>Phone Number *</label>
            <input
              name="mobile"
              type="tel"
              defaultValue={user?.mobile}
              className={inputClasses}
              required
              disabled
            />
          </div>
          <div>
            <label className={labelClasses}>Blood Group *</label>
            <select
              name="bloodGroup"
              className={inputClasses}
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select Blood Group
              </option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className={labelClasses}>Full Address *</label>
          <input
            name="address"
            type="text"
            placeholder="House No, Street, Landmark"
            className={inputClasses}
            required
          />
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          <div>
            <label className={labelClasses}>State *</label>
            <input
              name="state"
              type="text"
              placeholder="E.g. Maharashtra"
              className={inputClasses}
              required
            />
          </div>
          <div>
            <label className={labelClasses}>District *</label>
            <input
              name="district"
              type="text"
              placeholder="E.g. Pune"
              className={inputClasses}
              required
            />
          </div>
          <div>
            <label className={labelClasses}>Pincode *</label>
            <input
              name="postalCode"
              type="text"
              placeholder="E.g. 411001"
              className={inputClasses}
              required
            />
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <h3 className={sectionTitleClasses}>Additional Details</h3>
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label className={labelClasses}>Guardian's Name *</label>
            <input
              name="guardianName"
              type="text"
              placeholder="Father/Mother/Spouse Name"
              className={inputClasses}
              required
            />
          </div>
          <div>
            <label className={labelClasses}>Guardian's Mobile *</label>
            <input
              name="guardianMobile"
              type="tel"
              placeholder="Guardian's Contact Number"
              className={inputClasses}
              required
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>Profession / Occupation *</label>
            <input
              name="profession"
              type="text"
              placeholder="E.g. Teacher, Engineer, Business"
              className={inputClasses}
              required
            />
          </div>
          <div>
            <label className={labelClasses}>Aadhar Number *</label>
            <input
              name="aadharNo"
              type="text"
              placeholder="12-digit Aadhar Number"
              className={inputClasses}
              required
            />
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <h3 className={sectionTitleClasses}>Membership Tier & Payment</h3>
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label className={labelClasses}>Select Membership Tier *</label>
            <select
              name="roleApplied"
              className={inputClasses}
              required
              value={selectedTier}
              onChange={handleTierChange}
            >
              <option value="" disabled>
                Select Membership Tier
              </option>
              <option value="General Member">General Member - ₹199</option>
              <option value="Ward Level">Ward Level - ₹501</option>
              <option value="Panchayat Level">Panchayat Level - ₹1001</option>
              <option value="Block Level">Block Level - ₹2001</option>
              <option value="District Level">District Level - ₹2501</option>
              <option value="Division Level">Division Level - ₹5001</option>
              <option value="State Level">State Level - ₹10001</option>
              <option value="Sthayi Sadasya">
                Sthayi Sadasya (Permanent) - ₹11000
              </option>
            </select>
          </div>
          <div>
            <label className={labelClasses}>Payment Amount (₹) *</label>
            <input
              name="paymentAmount"
              type="number"
              placeholder="Amount"
              className={inputClasses}
              required
              value={paymentAmount}
              readOnly
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>Transaction ID / UTR No. *</label>
            <input
              name="transactionId"
              type="text"
              placeholder="E.g. UPI Ref / NEFT UTR"
              className={inputClasses}
              required
            />
          </div>
          <div className="rounded-xl border border-dashed border-slate-300 p-4 text-center bg-white hover:bg-slate-50 transition-colors">
            <label className="cursor-pointer block w-full">
              <span className={labelClasses}>Payment Screenshot *</span>
              <input
                name="paymentScreenshot"
                type="file"
                accept="image/*"
                className="mx-auto block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer mt-2"
                required
              />
            </label>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <h3 className={sectionTitleClasses}>Document Uploads</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-xl border border-dashed border-slate-300 p-4 text-center bg-white hover:bg-slate-50 transition-colors flex flex-col justify-center">
            <label className="cursor-pointer block w-full">
              <span className={labelClasses}>Profile Photo *</span>
              <span className="text-[11px] font-medium text-slate-500 mb-3 block">
                Passport Size (JPG/PNG)
              </span>
              <input
                name="profileImage"
                type="file"
                accept="image/*"
                className="mx-auto block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                required
              />
            </label>
          </div>

          <div className="rounded-xl border border-dashed border-slate-300 p-4 text-center bg-white hover:bg-slate-50 transition-colors flex flex-col justify-between">
            <div>
              <span className={labelClasses}>ID Proof Type *</span>
              <select
                name="idProofType"
                className={`${inputClasses} mb-4`}
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Select ID Type
                </option>
                <option value="Aadhar Card">Aadhar Card</option>
                <option value="PAN Card">PAN Card</option>
                <option value="Voter ID">Voter ID</option>
                <option value="Driving License">Driving License</option>
              </select>
            </div>
            <label className="cursor-pointer block w-full">
              <span className={labelClasses}>Upload ID Proof *</span>
              <input
                name="idProof"
                type="file"
                accept="image/*,.pdf"
                className="mx-auto block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer mt-1"
                required
              />
            </label>
          </div>

          <div className="rounded-xl border border-dashed border-slate-300 p-4 text-center bg-white hover:bg-slate-50 transition-colors flex flex-col justify-center">
            <label className="cursor-pointer block w-full">
              <span className={labelClasses}>Other Document (Optional)</span>
              <span className="text-[11px] font-medium text-slate-500 mb-3 block">
                Any supporting doc (PDF/JPG)
              </span>
              <input
                name="otherDoc"
                type="file"
                accept="image/*,.pdf"
                className="mx-auto block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="pt-6 relative z-10">
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex h-14 items-center justify-center rounded-xl bg-primary px-8 text-base font-bold tracking-wide text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.01] disabled:opacity-50 disabled:hover:scale-100 shadow-xl shadow-primary/20"
        >
          {loading ? <Loader2 className="mr-2 size-5 animate-spin" /> : null}
          SUBMIT MEMBERSHIP APPLICATION &rarr;
        </button>
        <p className="text-center text-xs text-slate-500 mt-4 font-medium uppercase tracking-wider">
          By submitting this application, you agree to the Terms and Conditions
          of the Association
        </p>
      </div>
    </form>
  );
}

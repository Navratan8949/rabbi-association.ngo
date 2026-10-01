"use client";
import Link from "next/link";
import { useState } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    try {
      const api = require("@/service/api").default;
      await api.post("/auth/forgot-password", { email });
      setIsSubmitted(true);
      toast.success("Reset link sent successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Reset Password"
      subtitle="Enter your email to receive a password reset link."
      footer={
        <>
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-bold text-[#051e57] hover:text-amber-500 transition-colors"
          >
            Back to login
          </Link>
        </>
      }
    >
      {!isSubmitted ? (
        <form onSubmit={onSubmit} className="grid gap-5">
          <div className="grid gap-1.5">
            <Label>Registered Email</Label>
            <Input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <Button
            type="submit"
            disabled={loading}
            className="mt-2 bg-[#051e57] text-white hover:bg-[#051e57]/90"
          >
            {loading ? "Sending link..." : "Send Reset Link"}
          </Button>
        </form>
      ) : (
        <div className="text-center py-6">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-100 text-green-600">
            <Mail className="size-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Check your email</h3>
          <p className="text-slate-500 text-[15px] leading-relaxed">
            We've sent a password reset link to <br />
            <span className="font-bold text-slate-700">{email}</span>
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="mt-8 w-full border-slate-200"
          >
            Try another email
          </Button>
        </div>
      )}
    </AuthShell>
  );
}

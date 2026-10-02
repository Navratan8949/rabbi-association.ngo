"use client";
import { useState, useEffect } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/service/api";
import { CheckCircle2, Eye, EyeOff } from "lucide-react";

import { Suspense } from "react";

function ResetPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing reset token");
      router.push("/login");
    }
  }, [token, router]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!password || !confirmPassword) return;
    
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);
    try {
      await api.post("/auth/reset-password", { token, password });
      setIsSuccess(true);
      toast.success("Password reset successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password. Token may be expired.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Create New Password"
      subtitle="Enter a strong new password for your account."
    >
      {!isSuccess ? (
        <form onSubmit={onSubmit} className="grid gap-5">
          <div className="grid gap-1.5">
            <Label>New Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pr-11"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-navy transition-colors"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>
          
          <div className="grid gap-1.5">
            <Label>Confirm New Password</Label>
            <div className="relative">
              <Input
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                className="pr-11"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-navy transition-colors"
                tabIndex={-1}
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>
          
          <Button
            type="submit"
            disabled={loading || !token}
            className="mt-2 bg-[#051e57] text-white hover:bg-[#051e57]/90"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      ) : (
        <div className="text-center py-6">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle2 className="size-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Password Reset Successful</h3>
          <p className="text-slate-500 text-[15px] leading-relaxed mb-6">
            You can now log in using your new password.
          </p>
          <Button
            onClick={() => router.push("/login")}
            className="w-full bg-[#051e57] text-white hover:bg-[#051e57]/90"
          >
            Go to Login
          </Button>
        </div>
      )}
    </AuthShell>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}

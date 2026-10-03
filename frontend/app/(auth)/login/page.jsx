"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { memberLogin } from "@/service/auth.service";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUser, fetchUser, selectUser } from "@/redux/features/userSlice";
import { Eye, EyeOff } from "lucide-react";

export default function MemberLoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ emailOrMobile: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        router.replace("/admin");
      } else if (user.role === "volunteer") {
        router.replace("/volunteer-portal");
      } else {
        router.replace("/member");
      }
    }
  }, [user, router]);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await memberLogin(form.emailOrMobile, form.password);
      dispatch(
        setUser({
          user: response.user || response.data,
          token: response.token,
        }),
      );
      // Fetch full profile data
      await dispatch(fetchUser()).unwrap();

      toast.success("Logged in successfully!");
      const loggedUser = response.user || response.data;
      if (loggedUser?.role === "admin") {
        router.push("/admin");
      } else if (loggedUser?.role === "volunteer") {
        router.push("/volunteer-portal");
      } else {
        router.push("/member");
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err?.message || "Login failed",
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <AuthShell
      title="Member login"
      subtitle="Sign in with email or mobile."
      image="/placeholder.svg"
      footer={
        <>
          New here?{" "}
          <Link
            href="/signup"
            className="font-semibold text-navy hover:underline"
          >
            Create account
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <Label>Email or mobile</Label>
          <Input
            className="h-11 rounded-xl"
            value={form.emailOrMobile}
            onChange={(e) =>
              setForm({ ...form, emailOrMobile: e.target.value })
            }
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label>Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-[#051e57] hover:text-amber-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              className="h-11 rounded-xl pr-11"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <div
              role="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-navy transition-colors flex items-center justify-center p-1"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </div>
          </div>
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="mt-2 h-11 rounded-xl bg-accent font-semibold text-accent-foreground hover:bg-accent/90"
        >
          {loading ? "Signing in…" : "Login"}
        </Button>
      </form>
    </AuthShell>
  );
}

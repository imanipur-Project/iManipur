import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "../lib/supabase";

export const Route = createFileRoute("/uplink")({
  component: UplinkRoute,
});

function UplinkRoute() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningIn(true);
    setError(null);

    if (!supabase) {
      setError("CMS is not configured on this deployment.");
      setIsSigningIn(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setIsSigningIn(false);
    } else {
      toast.success("Uplink established.");
      navigate({ to: "/" });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md p-8 border border-border bg-[#121212] rounded-none shadow-[inset_0_0_20px_rgba(202,146,29,0.05)]">
        <h1 className="text-2xl font-display text-primary mb-6">Secure Uplink</h1>

        {error && (
          <div
            role="alert"
            className="mb-4 p-3 border border-red-900/50 bg-red-900/20 text-red-500 text-sm rounded-none"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSignIn} className="flex flex-col gap-4">
          <div>
            <label htmlFor="uplink-email" className="label-mono text-muted-foreground mb-1 block">
              Agent Email
            </label>
            <input
              id="uplink-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-black border border-border text-foreground focus:border-primary outline-none focus:shadow-[inset_0_0_10px_rgba(202,146,29,0.2)] transition-all rounded-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="uplink-password"
              className="label-mono text-muted-foreground mb-1 block"
            >
              Passcode
            </label>
            <input
              id="uplink-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-black border border-border text-foreground focus:border-primary outline-none focus:shadow-[inset_0_0_10px_rgba(202,146,29,0.2)] transition-all rounded-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSigningIn}
            className="mt-4 w-full p-3 bg-primary/20 border border-primary text-primary hover:bg-primary/30 transition-all uppercase tracking-widest font-mono text-sm"
          >
            {isSigningIn ? "Authenticating..." : "Establish Uplink"}
          </button>
        </form>

        <p className="mt-6 text-center text-muted-foreground/50 font-mono text-[10px] uppercase tracking-widest">
          Authorised personnel only.
        </p>
      </div>
    </div>
  );
}

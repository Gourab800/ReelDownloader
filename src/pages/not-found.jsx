import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center dark text-foreground"
      style={{ background: "linear-gradient(135deg, #0f0f1a 0%, #1a0a2e 40%, #0d1b2a 100%)" }}>
      <h1 className="text-4xl font-bold text-white mb-4">404</h1>
      <p className="text-white/50">Page not found</p>
    </div>
  );
}

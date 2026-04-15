import { useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import NotFound from "@/pages/not-found";
import {
  Instagram,
  Download,
  Loader2,
  AlertCircle,
  Film,
  Video,
  CheckCircle2,
  Link as LinkIcon,
  X,
} from "lucide-react";

const queryClient = new QueryClient();

function Home() {
  const [url, setUrl] = useState("");
  // state.status: "idle" | "loading" | "success" | "error"
  const [state, setState] = useState({ status: "idle" })

  const handleFetch = async () => {
    if (!url.trim()) return;
    setState({ status: "loading" });
    try {
      const BASE = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${BASE}/api/instagram/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.videos?.length) {
        setState({
          status: "error",
          message:
            data.error ||
            "Could not extract video. Make sure the post is public.",
        });
      } else {
        setState({ status: "success", data });
      }
    } catch {
      setState({
        status: "error",
        message: "Network error. Please try again.",
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleFetch();
  };

  const isLoading = state.status === "loading";
  const isSuccess = state.status === "success";
  const isError = state.status === "error";

  return (
    <div
      className="min-h-screen flex flex-col dark text-foreground"
      style={{
        background:
          "linear-gradient(135deg, #0f0f1a 0%, #1a0a2e 40%, #0d1b2a 100%)",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* Ambient background blobs */}
      <div
        style={{
          position: "fixed",
          top: "-10%",
          right: "-5%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(131,58,180,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "-10%",
          left: "-5%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(193,53,132,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <header className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg"
            style={{
              background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
            }}
          >
            <Instagram className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-semibold text-base tracking-tight">
            InstaLoad
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            className="text-xs font-medium border-0 px-2.5 py-1"
            style={{ background: "rgba(131,58,180,0.2)", color: "#c084fc" }}
          >
            Free &middot; No Login Required
          </Badge>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="text-center mb-10 max-w-xl">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span
              className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{
                background: "rgba(131,58,180,0.15)",
                color: "#a855f7",
                border: "1px solid rgba(168,85,247,0.2)",
              }}
            >
              Instagram Downloader
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Download Instagram
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #c084fc, #f472b6, #fb923c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Videos &amp; Reels
            </span>
          </h1>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Paste any public Instagram post, reel, or story link and download
            the video in high quality &mdash; no watermark, no account needed.
          </p>
        </div>

        <div
          className="w-full max-w-2xl rounded-2xl p-6 mb-4 shadow-2xl"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <LinkIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: "rgba(255,255,255,0.3)" }}
              />
              <Input
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setState({ status: "idle" });
                }}
                onKeyDown={handleKeyDown}
                placeholder="https://www.instagram.com/reel/..."
                className="pl-10 pr-9 h-12 text-sm rounded-xl border-0 text-white placeholder:text-white/25 focus-visible:ring-1 focus-visible:ring-purple-500 transition-shadow"
                style={{ background: "rgba(255,255,255,0.06)" }}
                disabled={isLoading}
              />
              {url && !isLoading && (
                <button
                  onClick={() => {
                    setUrl("");
                    setState({ status: "idle" });
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full transition-all duration-150 hover:opacity-100 opacity-50"
                  style={{ background: "rgba(255,255,255,0.12)" }}
                  aria-label="Clear URL"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              )}
            </div>
            <Button
              onClick={handleFetch}
              disabled={isLoading || !url.trim()}
              className="h-12 px-6 rounded-xl font-semibold text-sm transition-all duration-200"
              style={{
                background: isLoading
                  ? "rgba(131,58,180,0.4)"
                  : "linear-gradient(135deg, #833ab4, #fd1d1d)",
                border: "none",
                color: "white",
                minWidth: 120,
              }}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Fetching...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Fetch
                </span>
              )}
            </Button>
          </div>

          {state.status === "idle" && (
            <p
              className="text-xs mt-3 text-center"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Paste a link above, then click Fetch.
            </p>
          )}

          {isError && (
            <div
              className="mt-4 flex items-start gap-3 p-4 rounded-xl"
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.15)",
              }}
            >
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
              <p className="text-sm text-red-400">{state.message}</p>
            </div>
          )}
        </div>

        {isSuccess && (
          <div
            className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl animate-fade-in"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Header row */}
            <div
              className="flex items-start gap-4 p-5 border-b"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background: "rgba(131,58,180,0.15)",
                  border: "1px solid rgba(131,58,180,0.2)",
                }}
              >
                <Video className="w-5 h-5" style={{ color: "#a855f7" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span className="text-xs font-medium text-green-400">
                    Video found
                  </span>
                </div>
                <p className="text-white font-medium text-sm truncate">
                  {state.data.title || "Instagram Video"}
                </p>
              </div>
            </div>

            {/* Video player */}
            <div className="px-5 pt-5">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Preview
              </p>
              <video
                src={state.data.videos[0].url}
                controls
                playsInline
                className="w-full rounded-xl"
                style={{
                  background: "#000",
                  maxHeight: 360,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              />
            </div>

            {/* Download options */}
            <div className="p-5">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Download
              </p>
              <div className="flex flex-col gap-2.5">
                {state.data.videos.map((v, i) => (
                  <a
                    key={i}
                    href={`${import.meta.env.VITE_API_URL || ""}/api/instagram/proxy-download?url=${encodeURIComponent(v.url)}&filename=${encodeURIComponent((state.data.title || "instagram-video").replace(/[^a-z0-9_\-\s]/gi, "").trim() + ".mp4")}`}
                    download={`${(state.data.title || "instagram-video").replace(/[^a-z0-9_\-\s]/gi, "").trim()}.mp4`}
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 no-underline hover:scale-[1.01]"
                    style={{
                      background:
                        i === 0
                          ? "rgba(131,58,180,0.18)"
                          : "rgba(255,255,255,0.04)",
                      border:
                        i === 0
                          ? "1px solid rgba(131,58,180,0.3)"
                          : "1px solid rgba(255,255,255,0.06)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        i === 0
                          ? "rgba(131,58,180,0.28)"
                          : "rgba(255,255,255,0.07)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        i === 0
                          ? "rgba(131,58,180,0.18)"
                          : "rgba(255,255,255,0.04)";
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          background:
                            i === 0
                              ? "rgba(131,58,180,0.3)"
                              : "rgba(255,255,255,0.06)",
                        }}
                      >
                        <Film
                          className="w-4 h-4"
                          style={{
                            color:
                              i === 0 ? "#c084fc" : "rgba(255,255,255,0.4)",
                          }}
                        />
                      </div>
                      <div>
                        <p
                          className="text-sm font-semibold"
                          style={{
                            color:
                              i === 0 ? "#e9d5ff" : "rgba(255,255,255,0.85)",
                          }}
                        >
                          {v.quality}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "rgba(255,255,255,0.3)" }}
                        >
                          .{v.ext} &middot; MP4 Video
                        </p>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200"
                      style={{
                        background:
                          i === 0
                            ? "linear-gradient(135deg, #833ab4, #fd1d1d)"
                            : "rgba(255,255,255,0.08)",
                        color: i === 0 ? "white" : "rgba(255,255,255,0.6)",
                      }}
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-6 mt-12">
          {[
            { icon: <Download className="w-4 h-4" />, label: "No Watermark" },
            { icon: <Film className="w-4 h-4" />, label: "HD Quality" },
            { icon: <CheckCircle2 className="w-4 h-4" />, label: "100% Free" },
            { icon: <Instagram className="w-4 h-4" />, label: "Reels & Posts" },
          ].map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-2"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              <span style={{ color: "#a855f7" }}>{f.icon}</span>
              <span className="text-xs font-medium">{f.label}</span>
            </div>
          ))}
        </div>
      </main>

      <footer className="relative z-10 py-5 text-center border-t border-white/5">
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
          Only works with public Instagram content &middot; For personal use
          only
        </p>
      </footer>
    </div>
  );
}

function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter>
          <AppRouter />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

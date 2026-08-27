import { MessageCircleOff, ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-[600px] w-[500px] bg-[#0b0815ad] flex items-center justify-center px-4 sm:px-6 overflow-hidden relative rounded-lg backdrop-blur-lg">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(0, -18px); }
        }
        @keyframes pulseRing {
          0% { transform: scale(0.9); opacity: 0.55; }
          70% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes drift {
          0% { background-position: 0 0; }
          100% { background-position: 120px 120px; }
        }
        .fade-up { opacity: 0; animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-1 { animation-delay: 0.05s; }
        .delay-2 { animation-delay: 0.16s; }
        .delay-3 { animation-delay: 0.26s; }
        .delay-4 { animation-delay: 0.36s; }
        .delay-5 { animation-delay: 0.46s; }
        .orb-float { animation: floatSlow 7s ease-in-out infinite; }
        .ring-ping { animation: pulseRing 2.6s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
        .grid-drift { animation: drift 14s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .fade-up, .orb-float, .ring-ping, .grid-drift { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.07] grid-drift"
        style={{
          backgroundImage:
            "radial-gradient(circle, #a78bfa 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0b0815_78%)]" />

      {/* Ambient glows */}
      <div className="absolute -top-16 -left-12 w-56 h-56 sm:w-80 sm:h-80 rounded-full bg-[#47259a]/20 blur-[100px] orb-float" />
      <div
        className="absolute -bottom-20 -right-14 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-[#6d4ad8]/15 blur-[110px] orb-float"
        style={{ animationDelay: "1.2s" }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg w-full">
        {/* Eyebrow */}
        <span className="fade-up delay-1 text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-[#a081ff] mb-4 sm:mb-6">
          Error · Conversation not found
        </span>

        {/* Icon */}
        <div className="fade-up delay-2 relative flex items-center justify-center size-16 sm:size-24 mb-5 sm:mb-8">
          <span className="absolute inset-0 rounded-full border border-[#8b5cf6]/40 ring-ping" />
          <div className="absolute inset-0 rounded-full bg-[#47259a]/25 blur-2xl" />
          <div className="relative flex items-center justify-center size-14 sm:size-20 rounded-2xl sm:rounded-3xl border border-[#583ead]/30 bg-[#111827]/80 shadow-xl shadow-[#47259a]/20 backdrop-blur-sm">
            <MessageCircleOff className="size-6 sm:size-9 text-[#a78bfa]" strokeWidth={1.8} />
          </div>
        </div>

        {/* 404 */}
        <h1 className="fade-up delay-3 text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight bg-gradient-to-r from-[#8b6ce8] via-[#6d4ad8] to-[#47259a] bg-clip-text text-transparent leading-none">
          404
        </h1>

        {/* Title */}
        <h2 className="fade-up delay-3 mt-3 sm:mt-5 text-lg sm:text-2xl font-semibold text-slate-100">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="fade-up delay-4 mt-2 sm:mt-3 max-w-xs sm:max-w-md text-xs sm:text-sm leading-5 sm:leading-6 text-slate-400 px-2">
          Looks like this conversation took a wrong turn. The page you're
          looking for doesn't exist or may have been moved.
        </p>

        {/* Buttons */}
        <div className="fade-up delay-5 mt-6 sm:mt-9 flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 rounded-xl border border-slate-700/60 bg-[#111827]/80 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-slate-300 transition-all duration-200 hover:border-[#583ead]/50 hover:bg-[#47259a]/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0815] active:scale-[0.97]"
          >
            <ArrowLeft className="size-3.5 sm:size-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Go back
          </button>

          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#6d4ad8] to-[#47259a] px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white shadow-lg shadow-[#47259a]/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-[#47259a]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a78bfa]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0815] active:scale-[0.97]"
          >
            <Home className="size-3.5 sm:size-4 transition-transform duration-200 group-hover:scale-110" />
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
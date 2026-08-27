
function MainPageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-[#0f0b1a]">
      <div className="flex flex-col items-center">

        {/* Logo */}
        <div className="relative flex size-16 items-center justify-center">

          {/* Soft Glow */}
          <div className="absolute size-20 rounded-full bg-[#47259a]/20 blur-2xl animate-pulse" />

          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-2xl border border-[#583ead]/30 animate-pulse" />

          {/* Logo */}
          <div className="relative flex size-14 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#6d4ad8] to-[#47259a] shadow-lg shadow-[#47259a]/40">
            <img
              src="/loadingIcon.png"
              alt="ChitChat"
              className="size-10 object-contain"
            />
          </div>
        </div>

        {/* Brand */}
        <h1 className="mt-5 text-xl font-semibold tracking-wide text-slate-200">
          ChitChat
        </h1>

        {/* Loading Dots */}
        <div className="mt-3 flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-[#6d4ad8] animate-bounce [animation-delay:-0.3s]" />
          <span className="size-1.5 rounded-full bg-[#6d4ad8] animate-bounce [animation-delay:-0.15s]" />
          <span className="size-1.5 rounded-full bg-[#6d4ad8] animate-bounce" />
        </div>

      </div>
    </div>
  );
}

export default MainPageLoader;


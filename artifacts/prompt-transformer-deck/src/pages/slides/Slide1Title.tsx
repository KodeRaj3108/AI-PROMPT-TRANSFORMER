const base = import.meta.env.BASE_URL;

export default function Slide1Title() {
  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: '#0a0b10' }}
    >
      {/* Radial gradient atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 15% 0%, rgba(99,102,241,0.28), transparent 45%), radial-gradient(circle at 85% 100%, rgba(139,92,246,0.2), transparent 45%)',
        }}
      />
      {/* Hero image */}
      <img
        src={`${base}hero.jpg`}
        crossOrigin="anonymous"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.22 }}
      />
      {/* Bottom-up gradient: make text legible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, #0a0b10 38%, rgba(10,11,16,0.55) 68%, transparent 100%)',
        }}
      />
      {/* Top-left subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 0% 100%, rgba(10,11,16,0.7) 0%, transparent 55%)',
        }}
      />
      {/* Content — pinned to bottom-left */}
      <div className="absolute left-0 right-0 bottom-0 px-[6vw] pb-[7vh]">

        {/* Logo mark + name */}
        <div className="flex items-center mb-[2.5vh]" style={{ gap: '1vw' }}>
          <div
            className="flex items-center justify-center font-mono font-bold text-white"
            style={{
              width: '3vw',
              height: '3vw',
              fontSize: '1.4vw',
              borderRadius: '0.6vw',
              background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
              boxShadow: '0 0 28px rgba(99,102,241,0.55)',
            }}
          >
            ⌁
          </div>
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '1.1vw',
              color: '#64748b',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
            className="font-extrabold text-[18px]">
            AI Prompt Transformer
          </span>
        </div>

        {/* Accent rule */}
        <div
          style={{
            width: '5vw',
            height: '0.3vh',
            background: 'linear-gradient(90deg, #6366f1, #7c3aed)',
            marginBottom: '2.5vh',
            borderRadius: '999px',
          }}
        />

        {/* Headline line 1 */}
        <div
          className="font-display font-bold text-white leading-none tracking-tight"
          style={{ fontSize: '6vw', marginBottom: '0.6vh' }}
        >
          Rough idea →
        </div>

        {/* Headline line 2 — gradient text */}
        <div
          className="font-display font-bold leading-none tracking-tight"
          style={{
            fontSize: '6vw',
            marginBottom: '3.5vh',
            background: 'linear-gradient(90deg, #818cf8 0%, #a78bfa 60%, #c4b5fd 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          5 model-tuned prompts.
        </div>

        {/* Subtitle */}
        <p
          className="text-slate-300 leading-relaxed"
          style={{ fontSize: '2vw', maxWidth: '52vw' }}
        >
          Instantly optimized for ChatGPT, Claude, Gemini, Grok, and Cursor.
        </p>
      </div>
    </div>
  );
}

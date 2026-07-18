export default function Slide5GetStarted() {
  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: '#0a0b10' }}
    >
      {/* Radial gradient — matches title slide */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 85% 0%, rgba(99,102,241,0.22), transparent 45%), radial-gradient(circle at 15% 100%, rgba(139,92,246,0.16), transparent 45%)',
        }}
      />

      {/* Decorative glow orb top-right */}
      <div
        className="absolute"
        style={{
          top: '-8vh',
          right: '-8vw',
          width: '35vw',
          height: '35vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
        }}
      />

      <div className="relative flex flex-col h-full px-[5vw] pt-[6vh] pb-[6vh]">

        {/* Header */}
        <div className="mb-[4vh]">
          <div className="flex items-center mb-[2vh]" style={{ gap: '1.2vw' }}>
            <div
              style={{
                width: '0.5vw',
                height: '3vh',
                background: 'linear-gradient(180deg, #6366f1, #7c3aed)',
                borderRadius: '999px',
              }}
            />
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1.2vw',
                color: '#6366f1',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              Quick Start
            </span>
          </div>
          <div
            className="font-display font-bold text-white leading-tight tracking-tight"
            style={{ fontSize: '4vw' }}
          >
            Get Started in Seconds
          </div>
        </div>

        {/* 4 step cards in 2×2 grid */}
        <div className="flex-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '2vh 2vw' }}>

          {/* Step 1 */}
          <div
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '1vw',
              padding: '3vh 2.5vw',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5vh',
            }}
          >
            <div
              className="font-display font-bold"
              style={{
                fontSize: '3.5vw',
                lineHeight: 1,
                background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              01
            </div>
            <p className="text-slate-200 font-display leading-relaxed" style={{ fontSize: '2vw', textWrap: 'pretty' }}>
              Get a free API key at console.anthropic.com
            </p>
          </div>

          {/* Step 2 */}
          <div
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '1vw',
              padding: '3vh 2.5vw',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5vh',
            }}
          >
            <div
              className="font-display font-bold"
              style={{
                fontSize: '3.5vw',
                lineHeight: 1,
                background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              02
            </div>
            <p className="text-slate-200 font-display leading-relaxed" style={{ fontSize: '2vw', textWrap: 'pretty' }}>
              Paste it into the Connect to Claude card
            </p>
          </div>

          {/* Step 3 */}
          <div
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '1vw',
              padding: '3vh 2.5vw',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5vh',
            }}
          >
            <div
              className="font-display font-bold"
              style={{
                fontSize: '3.5vw',
                lineHeight: 1,
                background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              03
            </div>
            <p className="text-slate-200 font-display leading-relaxed" style={{ fontSize: '2vw', textWrap: 'pretty' }}>
              Type your rough idea and hit Transform
            </p>
          </div>

          {/* Step 4 */}
          <div
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '1vw',
              padding: '3vh 2.5vw',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5vh',
            }}
          >
            <div
              className="font-display font-bold"
              style={{
                fontSize: '3.5vw',
                lineHeight: 1,
                background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              04
            </div>
            <p className="text-slate-200 font-display leading-relaxed" style={{ fontSize: '2vw', textWrap: 'pretty' }}>
              Your history is saved locally — nothing leaves your browser
            </p>
          </div>

        </div>

        {/* Bottom tagline */}
        <div className="flex items-center justify-center mt-[3vh]" style={{ gap: '1.5vw' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
          <div className="flex items-center" style={{ gap: '0.8vw' }}>
            <div
              className="flex items-center justify-center font-mono font-bold text-white"
              style={{
                width: '2vw',
                height: '2vw',
                fontSize: '0.9vw',
                borderRadius: '0.4vw',
                background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
              }}
            >
              ⌁
            </div>
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1.2vw',
                color: '#64748b',
                letterSpacing: '0.12em',
              }}
            >
              AI Prompt Transformer
            </span>
          </div>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
        </div>

      </div>
    </div>
  );
}

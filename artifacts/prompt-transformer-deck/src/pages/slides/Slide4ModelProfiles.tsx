const base = import.meta.env.BASE_URL;

export default function Slide4ModelProfiles() {
  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: '#0a0b10' }}
    >
      {/* Atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 5% 50%, rgba(99,102,241,0.1), transparent 40%), radial-gradient(circle at 95% 50%, rgba(139,92,246,0.08), transparent 40%)',
        }}
      />

      <div className="relative flex flex-col h-full px-[5vw] pt-[6vh] pb-[6vh]">

        {/* Header */}
        <div className="mb-[3.5vh]">
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
              Output Profiles
            </span>
          </div>
          <div
            className="font-display font-bold text-white leading-tight tracking-tight"
            style={{ fontSize: '4vw' }}
          >
            5 Model Profiles
          </div>
        </div>

        {/* 5 model rows */}
        <div className="flex flex-col flex-1" style={{ gap: '1.8vh' }}>

          {/* ChatGPT */}
          <div
            className="flex items-center flex-1"
            style={{
              background: 'rgba(255,255,255,0.035)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '0.8vw',
              padding: '0 2.5vw',
              gap: '2vw',
            }}
          >
            <img src={`${base}icons/chatgpt.svg`} crossOrigin="anonymous" alt="ChatGPT" style={{ width: '2.4vw', height: '2.4vw', flexShrink: 0 }} />
            <div className="font-display font-bold text-white" style={{ fontSize: '2.8vw', width: '16vw', flexShrink: 0 }}>ChatGPT</div>
            <div
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1.1vw',
                color: '#34d399',
                background: 'rgba(52,211,153,0.1)',
                border: '1px solid rgba(52,211,153,0.25)',
                borderRadius: '999px',
                padding: '0.4vh 1.2vw',
                flexShrink: 0,
                whiteSpace: 'nowrap',
              }}
            >
              chatgpt
            </div>
            <p className="text-slate-400 leading-snug" style={{ fontSize: '1.8vw', textWrap: 'pretty' }}>
              Step-by-step formatting, explicit system-role definition, and markdown structure
            </p>
          </div>

          {/* Claude */}
          <div
            className="flex items-center flex-1"
            style={{
              background: 'rgba(255,255,255,0.035)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '0.8vw',
              padding: '0 2.5vw',
              gap: '2vw',
            }}
          >
            <img src={`${base}icons/claude.svg`} crossOrigin="anonymous" alt="Claude" style={{ width: '2.4vw', height: '2.4vw', flexShrink: 0 }} />
            <div className="font-display font-bold text-white" style={{ fontSize: '2.8vw', width: '16vw', flexShrink: 0 }}>Claude</div>
            <div
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1.1vw',
                color: '#fb923c',
                background: 'rgba(251,146,60,0.1)',
                border: '1px solid rgba(251,146,60,0.25)',
                borderRadius: '999px',
                padding: '0.4vh 1.2vw',
                flexShrink: 0,
                whiteSpace: 'nowrap',
              }}
            >
              claude
            </div>
            <p className="text-slate-400 leading-snug" style={{ fontSize: '1.8vw', textWrap: 'pretty' }}>
              XML tags for variable isolation, structural clarity, and room for deep reasoning
            </p>
          </div>

          {/* Gemini */}
          <div
            className="flex items-center flex-1"
            style={{
              background: 'rgba(255,255,255,0.035)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '0.8vw',
              padding: '0 2.5vw',
              gap: '2vw',
            }}
          >
            <img src={`${base}icons/gemini.svg`} crossOrigin="anonymous" alt="Gemini" style={{ width: '2.4vw', height: '2.4vw', flexShrink: 0 }} />
            <div className="font-display font-bold text-white" style={{ fontSize: '2.8vw', width: '16vw', flexShrink: 0 }}>Gemini</div>
            <div
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1.1vw',
                color: '#60a5fa',
                background: 'rgba(96,165,250,0.1)',
                border: '1px solid rgba(96,165,250,0.25)',
                borderRadius: '999px',
                padding: '0.4vh 1.2vw',
                flexShrink: 0,
                whiteSpace: 'nowrap',
              }}
            >
              gemini
            </div>
            <p className="text-slate-400 leading-snug" style={{ fontSize: '1.8vw', textWrap: 'pretty' }}>
              Logical headings, explicit formatting instructions, token-efficient and tightly constrained
            </p>
          </div>

          {/* Grok */}
          <div
            className="flex items-center flex-1"
            style={{
              background: 'rgba(255,255,255,0.035)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '0.8vw',
              padding: '0 2.5vw',
              gap: '2vw',
            }}
          >
            <img src={`${base}icons/grok.svg`} crossOrigin="anonymous" alt="Grok" style={{ width: '2.4vw', height: '2.4vw', flexShrink: 0 }} />
            <div className="font-display font-bold text-white" style={{ fontSize: '2.8vw', width: '16vw', flexShrink: 0 }}>Grok</div>
            <div
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1.1vw',
                color: '#f87171',
                background: 'rgba(248,113,113,0.1)',
                border: '1px solid rgba(248,113,113,0.25)',
                borderRadius: '999px',
                padding: '0.4vh 1.2vw',
                flexShrink: 0,
                whiteSpace: 'nowrap',
              }}
            >
              grok
            </div>
            <p className="text-slate-400 leading-snug" style={{ fontSize: '1.8vw', textWrap: 'pretty' }}>
              Direct, high-impact brevity with real-time context scaffolding
            </p>
          </div>

          {/* Cursor */}
          <div
            className="flex items-center flex-1"
            style={{
              background: 'rgba(255,255,255,0.035)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '0.8vw',
              padding: '0 2.5vw',
              gap: '2vw',
            }}
          >
            <img src={`${base}icons/cursor.svg`} crossOrigin="anonymous" alt="Cursor" style={{ width: '2.4vw', height: '2.4vw', flexShrink: 0 }} />
            <div className="font-display font-bold text-white" style={{ fontSize: '2.8vw', width: '16vw', flexShrink: 0 }}>Cursor</div>
            <div
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1.1vw',
                color: '#22d3ee',
                background: 'rgba(34,211,238,0.1)',
                border: '1px solid rgba(34,211,238,0.25)',
                borderRadius: '999px',
                padding: '0.4vh 1.2vw',
                flexShrink: 0,
                whiteSpace: 'nowrap',
              }}
            >
              cursor
            </div>
            <p className="text-slate-400 leading-snug" style={{ fontSize: '1.8vw', textWrap: 'pretty' }}>
              File/folder hints, language constraints, and .cursorrules-style directives
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

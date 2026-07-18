export default function Slide2Problem() {
  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: '#0a0b10' }}
    >
      {/* Subtle radial gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 90% 10%, rgba(99,102,241,0.12), transparent 50%), radial-gradient(circle at 10% 90%, rgba(139,92,246,0.08), transparent 50%)',
        }}
      />

      {/* Slide content */}
      <div className="relative flex flex-col h-full px-[5vw] pt-[6vh] pb-[6vh]">

        {/* Slide label */}
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
            The Challenge
          </span>
        </div>

        {/* Headline */}
        <div
          className="font-display font-bold text-white leading-tight tracking-tight"
          style={{ fontSize: '4vw', marginBottom: '4vh', maxWidth: '75vw', textWrap: 'balance' }}
        >
          The Problem with Generic Prompts
        </div>

        {/* Three statement cards */}
        <div className="flex flex-col flex-1" style={{ gap: '2vh' }}>

          {/* Card 1 */}
          <div
            className="flex items-start flex-1"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '1vw',
              padding: '2.8vh 2.5vw',
              gap: '1.8vw',
            }}
          >
            <div
              style={{
                width: '0.8vw',
                height: '0.8vw',
                borderRadius: '50%',
                background: '#6366f1',
                flexShrink: 0,
                marginTop: '0.8vh',
                boxShadow: '0 0 10px rgba(99,102,241,0.6)',
              }}
            />
            <p
              className="text-slate-200 leading-relaxed"
              style={{ fontSize: '2.1vw', textWrap: 'pretty' }}
            >
              The same prompt gets wildly different results across ChatGPT, Claude, Gemini, Grok, and Cursor
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="flex items-start flex-1"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '1vw',
              padding: '2.8vh 2.5vw',
              gap: '1.8vw',
            }}
          >
            <div
              style={{
                width: '0.8vw',
                height: '0.8vw',
                borderRadius: '50%',
                background: '#7c3aed',
                flexShrink: 0,
                marginTop: '0.8vh',
                boxShadow: '0 0 10px rgba(124,58,237,0.6)',
              }}
            />
            <p
              className="text-slate-200 leading-relaxed"
              style={{ fontSize: '2.1vw', textWrap: 'pretty' }}
            >
              Most people write one prompt and paste it everywhere — leaving quality on the table
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="flex items-start flex-1"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '1vw',
              padding: '2.8vh 2.5vw',
              gap: '1.8vw',
            }}
          >
            <div
              style={{
                width: '0.8vw',
                height: '0.8vw',
                borderRadius: '50%',
                background: '#818cf8',
                flexShrink: 0,
                marginTop: '0.8vh',
                boxShadow: '0 0 10px rgba(129,140,248,0.6)',
              }}
            />
            <p
              className="text-slate-200 leading-relaxed"
              style={{ fontSize: '2.1vw', textWrap: 'pretty' }}
            >
              Each model has its own conventions, structure, and strengths
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

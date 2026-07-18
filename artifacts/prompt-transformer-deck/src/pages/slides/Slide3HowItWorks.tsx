export default function Slide3HowItWorks() {
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
            'radial-gradient(circle at 50% 0%, rgba(99,102,241,0.14), transparent 55%)',
        }}
      />

      <div className="relative flex flex-col h-full px-[4vw] pt-[6vh] pb-[5vh]">

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
              The Process
            </span>
          </div>
          <div
            className="font-display font-bold text-white leading-tight tracking-tight"
            style={{ fontSize: '4vw' }}
          >
            How It Works
          </div>
        </div>

        {/* 4 Step cards — horizontal row */}
        <div className="flex flex-1" style={{ gap: '2vw' }}>

          {/* Step 1 */}
          <div
            className="flex flex-col flex-1"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '1vw',
              padding: '3vh 2vw',
            }}
          >
            <div
              className="font-display font-bold leading-none"
              style={{
                fontSize: '4.5vw',
                background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '2.5vh',
              }}
            >
              01
            </div>
            <div
              style={{
                width: '100%',
                height: '1px',
                background: 'rgba(255,255,255,0.1)',
                marginBottom: '2.5vh',
              }}
            />
            <p
              className="text-slate-200 leading-relaxed font-display"
              style={{ fontSize: '2vw', textWrap: 'pretty' }}
            >
              Paste your rough idea into the transformer
            </p>
          </div>

          {/* Step 2 */}
          <div
            className="flex flex-col flex-1"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '1vw',
              padding: '3vh 2vw',
            }}
          >
            <div
              className="font-display font-bold leading-none"
              style={{
                fontSize: '4.5vw',
                background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '2.5vh',
              }}
            >
              02
            </div>
            <div
              style={{
                width: '100%',
                height: '1px',
                background: 'rgba(255,255,255,0.1)',
                marginBottom: '2.5vh',
              }}
            />
            <p
              className="text-slate-200 leading-relaxed font-display"
              style={{ fontSize: '2vw', textWrap: 'pretty' }}
            >
              Claude rewrites it into 5 distinct, model-optimized versions in one shot
            </p>
          </div>

          {/* Step 3 */}
          <div
            className="flex flex-col flex-1"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '1vw',
              padding: '3vh 2vw',
            }}
          >
            <div
              className="font-display font-bold leading-none"
              style={{
                fontSize: '4.5vw',
                background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '2.5vh',
              }}
            >
              03
            </div>
            <div
              style={{
                width: '100%',
                height: '1px',
                background: 'rgba(255,255,255,0.1)',
                marginBottom: '2.5vh',
              }}
            />
            <p
              className="text-slate-200 leading-relaxed font-display"
              style={{ fontSize: '2vw', textWrap: 'pretty' }}
            >
              Each output follows that model's specific design conventions
            </p>
          </div>

          {/* Step 4 */}
          <div
            className="flex flex-col flex-1"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '1vw',
              padding: '3vh 2vw',
            }}
          >
            <div
              className="font-display font-bold leading-none"
              style={{
                fontSize: '4.5vw',
                background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '2.5vh',
              }}
            >
              04
            </div>
            <div
              style={{
                width: '100%',
                height: '1px',
                background: 'rgba(255,255,255,0.1)',
                marginBottom: '2.5vh',
              }}
            />
            <p
              className="text-slate-200 leading-relaxed font-display"
              style={{ fontSize: '2vw', textWrap: 'pretty' }}
            >
              Copy or one-click test directly in the target AI
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

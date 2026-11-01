// Small SVG illustrations for each project card. Lines marked `draw-line`
// draw themselves when the card scrolls into view (see index.css).

const mono = { fontFamily: "'DM Mono', monospace" }

function Forecast() {
  const history = 'M12 120 L38 108 L62 114 L86 92 L110 98 L134 74 L158 80 L182 58'
  return (
    <g>
      {[44, 80, 116].map((y) => (
        <line key={y} x1="12" x2="308" y1={y} y2={y} stroke="#fff" strokeOpacity="0.06" />
      ))}
      <line x1="182" x2="182" y1="28" y2="148" stroke="#fff" strokeOpacity="0.18" strokeDasharray="3 4" />
      <path d="M182 58 L230 44 L276 34 L308 24 L308 78 L276 64 L230 62 Z" fill="#a8f0d2" fillOpacity="0.12" className="fade-late" style={{ '--dl': '1.6s' }} />
      <path d={history} pathLength="1" className="draw-line" stroke="#e4e4e7" strokeOpacity="0.8" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M182 58 L230 52 L276 48 L308 44" pathLength="1" className="draw-line" style={{ '--dl': '1.5s' }} stroke="#a8f0d2" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <circle cx="182" cy="58" r="4" fill="#9b7bff" />
      <text x="190" y="152" fill="#a1a1aa" fontSize="9" style={mono}>forecast</text>
      <text x="12" y="152" fill="#a1a1aa" fontSize="9" style={mono}>history</text>
    </g>
  )
}

function Rag() {
  const docs = [34, 74, 114]
  return (
    <g>
      <rect x="10" y="64" width="56" height="32" rx="9" fill="#9b7bff" fillOpacity="0.18" stroke="#9b7bff" strokeOpacity="0.6" />
      <text x="22" y="84" fill="#e4e4e7" fontSize="10" style={mono}>query</text>
      {docs.map((y, i) => (
        <g key={y}>
          <path d={`M66 80 C 96 80, 96 ${y + 11}, 126 ${y + 11}`} pathLength="1" className="draw-line" style={{ '--dl': `${0.3 + i * 0.15}s` }} stroke={i === 1 ? '#a8f0d2' : '#fff'} strokeOpacity={i === 1 ? 0.9 : 0.25} strokeWidth="1.5" fill="none" />
          <rect x="126" y={y} width="76" height="22" rx="6" fill="#fff" fillOpacity="0.04" stroke={i === 1 ? '#a8f0d2' : '#fff'} strokeOpacity={i === 1 ? 0.8 : 0.2} />
          <rect x="134" y={y + 7} width={i === 1 ? 44 : 34} height="3" rx="1.5" fill="#fff" fillOpacity="0.35" />
          <rect x="134" y={y + 13} width="26" height="3" rx="1.5" fill="#fff" fillOpacity="0.2" />
        </g>
      ))}
      <path d="M202 85 C 228 85, 232 80, 250 80" pathLength="1" className="draw-line" style={{ '--dl': '1.1s' }} stroke="#a8f0d2" strokeWidth="1.5" fill="none" />
      <rect x="250" y="62" width="58" height="36" rx="10" fill="#a8f0d2" fillOpacity="0.14" stroke="#a8f0d2" strokeOpacity="0.7" />
      <text x="260" y="84" fill="#a8f0d2" fontSize="10" style={mono}>answer</text>
    </g>
  )
}

function Api() {
  return (
    <g>
      {/* Three balanced nodes, matching the horizontal flow of the other project illustrations. */}
      <rect x="10" y="62" width="76" height="36" rx="9" fill="#fff" fillOpacity="0.05" stroke="#fff" strokeOpacity="0.3" />
      <text x="25" y="84" fill="#e4e4e7" fontSize="10" style={mono}>client</text>

      <path d="M86 80 H122" pathLength="1" className="draw-line" stroke="#ff776d" strokeWidth="1.8" fill="none" />
      <path d="M206 80 H234" pathLength="1" className="draw-line" style={{ '--dl': '0.9s' }} stroke="#f5d58a" strokeWidth="1.8" fill="none" />

      <rect x="122" y="62" width="84" height="36" rx="9" fill="#8b5cf6" fillOpacity="0.12" stroke="#ff776d" strokeOpacity="0.65" />
      <text x="136" y="76" fill="#ffaaa3" fontSize="8.5" style={mono}>POST</text>
      <text x="133" y="88" fill="#f8f4ed" fontSize="9.5" style={mono}>/predict</text>
      <circle cx="194" cy="70" r="2" fill="#ff776d" />

      <rect x="234" y="62" width="74" height="36" rx="9" fill="#a8f0d2" fillOpacity="0.1" stroke="#a8f0d2" strokeOpacity="0.55" />
      <text x="246" y="76" fill="#a8f0d2" fontSize="8.5" style={mono}>JSON</text>
      <text x="246" y="88" fill="#a8f0d2" fontSize="9.5" style={mono}>{'{ "ok": true }'}</text>
    </g>
  )
}

function Agent() {
  const tools = [30, 73, 116]
  const names = ['search', 'code', 'api']
  return (
    <g>
      <rect x="10" y="64" width="56" height="32" rx="9" fill="#9b7bff" fillOpacity="0.18" stroke="#9b7bff" strokeOpacity="0.6" />
      <text x="24" y="84" fill="#e4e4e7" fontSize="10" style={mono}>task</text>
      <path d="M66 80 H122" pathLength="1" className="draw-line" stroke="#fff" strokeOpacity="0.3" strokeWidth="1.5" fill="none" />
      <rect x="122" y="56" width="84" height="48" rx="12" fill="#8b5cf6" fillOpacity="0.15" stroke="#9b7bff" strokeOpacity="0.7" />
      <text x="148" y="84" fill="#f8f4ed" fontSize="10" style={mono}>agent</text>
      {tools.map((y, i) => (
        <g key={y}>
          <path d={`M206 80 C 230 80, 228 ${y + 11}, 250 ${y + 11}`} pathLength="1" className="draw-line" style={{ '--dl': `${0.4 + i * 0.15}s` }} stroke={i === 1 ? '#a8f0d2' : '#fff'} strokeOpacity={i === 1 ? 0.9 : 0.25} strokeWidth="1.5" fill="none" />
          <rect x="250" y={y} width="58" height="22" rx="6" fill="#fff" fillOpacity="0.04" stroke={i === 1 ? '#a8f0d2' : '#fff'} strokeOpacity={i === 1 ? 0.8 : 0.2} />
          <text x="258" y={y + 15} fill="#d4d4d8" fontSize="9" style={mono}>{names[i]}</text>
        </g>
      ))}
    </g>
  )
}

function Dashboard() {
  const bars = [[22, 52], [52, 36], [82, 68], [112, 28], [142, 48]]
  return (
    <g>
      <line x1="12" x2="180" y1="140" y2="140" stroke="#fff" strokeOpacity="0.15" />
      {bars.map(([x, h]) => (
        <rect key={x} x={x} y={140 - h} width="18" height={h} rx="3" fill="#9b7bff" fillOpacity="0.35" />
      ))}
      <path d="M31 94 L61 108 L91 76 L121 112 L151 92" pathLength="1" className="draw-line" stroke="#a8f0d2" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="200" y="30" width="108" height="44" rx="9" fill="#fff" fillOpacity="0.04" stroke="#fff" strokeOpacity="0.2" />
      <text x="212" y="48" fill="#a1a1aa" fontSize="8.5" style={mono}>rows cleaned</text>
      <rect x="212" y="56" width="70" height="4" rx="2" fill="#a8f0d2" fillOpacity="0.7" />
      <rect x="200" y="86" width="108" height="44" rx="9" fill="#fff" fillOpacity="0.04" stroke="#fff" strokeOpacity="0.2" />
      <text x="212" y="104" fill="#a1a1aa" fontSize="8.5" style={mono}>insights</text>
      <rect x="212" y="112" width="44" height="4" rx="2" fill="#9b7bff" fillOpacity="0.8" />
    </g>
  )
}

function Classifier() {
  const a = [[44, 118], [64, 130], [82, 112], [58, 100], [100, 126], [38, 138]]
  const b = [[210, 40], [236, 56], [262, 34], [286, 58], [248, 28], [224, 70]]
  return (
    <g>
      <path d="M70 150 L250 20" pathLength="1" className="draw-line" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4 4" fill="none" style={{ strokeDasharray: '4 4', strokeDashoffset: 0 }} />
      {a.map(([x, y]) => <circle key={`a${x}`} cx={x} cy={y} r="5" fill="#9b7bff" fillOpacity="0.8" />)}
      {b.map(([x, y]) => <circle key={`b${x}`} cx={x} cy={y} r="5" fill="#a8f0d2" fillOpacity="0.85" />)}
      <text x="12" y="152" fill="#a1a1aa" fontSize="9" style={mono}>class A</text>
      <text x="262" y="100" fill="#a1a1aa" fontSize="9" style={mono}>class B</text>
    </g>
  )
}

const arts = { forecast: Forecast, rag: Rag, api: Api, agent: Agent, dashboard: Dashboard, classifier: Classifier }

export default function ProjectArt({ name }) {
  const Art = arts[name]
  if (!Art) return null
  return (
    <svg viewBox="0 0 320 168" className="h-full w-full" role="img" aria-label={`Illustration for the ${name} project`}>
      <Art />
    </svg>
  )
}

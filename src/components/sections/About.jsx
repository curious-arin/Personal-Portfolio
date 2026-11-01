
import SectionHeading from "../common/SectionHeading";
import Container from "../common/Container";
import Reveal from "../common/Reveal";

const B = ({ children }) => (
  <b className="font-bold text-zinc-100">{children}</b>
);

const highlights = [
  [
    "🎯",
    <>
      <B>Data Analytics:</B> <B>Python</B>, <B>SQL</B>, <B>NumPy</B>,{" "}
      <B>pandas</B> and <B>Matplotlib</B> for data cleaning, exploratory
      analysis, visualization and extracting actionable insights.
    </>,
  ],
  [
    "🧠",
    <>
      <B>Machine Learning:</B> <B>scikit-learn</B>, <B>feature engineering</B>,{" "}
      <B>model evaluation</B>, <B>deep learning</B> and{" "}
      <B>time-series forecasting</B> to build predictive solutions.
    </>,
  ],
  [
    "⚡",
    <>
      <B>Deep Learning:</B> <B>PyTorch</B>, <B>neural networks</B>, <B>LSTMs</B>{" "}
      and <B>sequence modeling</B> for learning complex patterns and solving
      real-world problems.
    </>,
  ],
  [
    "🤖",
    <>
      <B>Generative AI &amp; Agentic AI:</B> <B>LLMs</B>, <B>RAG pipelines</B>,{" "}
      <B>vector databases</B>, <B>embeddings</B> and <B>AI agents</B> to develop
      context-aware intelligent applications.
    </>,
  ],
  [
    "🚀",
    <>
      <B>Backend &amp; MLOps:</B> <B>FastAPI</B>, <B>REST APIs</B>,{" "}
      <B>Docker</B>, <B>Git/GitHub</B> and <B>model deployment</B> to build,
      integrate and deploy production-ready AI solutions.
    </>,
  ],
];

// Python code displayed in the profile card.
const codeLines = [
  [
    0,
    <>
      <span className="text-violet">class</span>{" "}
      <span className="text-mint">ArinSharma</span>:
    </>,
  ],
  [
    1,
    <>
      <span className="text-violet">def</span>{" "}
      <span className="text-sky-300">__init__</span>(self):
    </>,
  ],
  [
    2,
    <>
      <span className="text-zinc-500">self.</span>
      <span className="text-zinc-300">focus</span> ={" "}
      <span className="text-cyan-200">"Research & Development"</span>
    </>,
  ],
  [
    2,
    <>
      <span className="text-zinc-500">self.</span>
      <span className="text-zinc-300">mindset</span> ={" "}
      <span className="text-cyan-200">"Learn by building"</span>
    </>,
  ],
  [
    2,
    <>
      <span className="text-zinc-500">self.</span>
      <span className="text-zinc-300">passion</span> ={" "}
      <span className="text-cyan-200">"Solving real problems"</span>
    </>,
  ],
  [
    2,
    <>
      <span className="text-zinc-500">self.</span>
      <span className="text-zinc-300">belief</span> ={" "}
      <span className="text-cyan-200">"Always curious"</span>
    </>,
  ],
  [
    2,
    <>
      <span className="text-zinc-500">self.</span>
      <span className="text-zinc-300">status</span> ={" "}
      <span className="text-cyan-200">"Always exploring"</span>
    </>,
  ],
  [
    1,
    <>
      <span className="text-violet">return</span>{" "}
      <span className="text-mint">keep_learning</span>()
      <span className="caret ml-0.5 text-violet">▍</span>
    </>,
  ],
];

const indent = ["pl-0", "pl-3 sm:pl-4", "pl-6 sm:pl-8"];

function CodeCard() {
  return (
    <Reveal className="mx-auto w-full max-w-md lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:mx-0 lg:max-w-none">
      <div className="glass relative overflow-hidden rounded-[1.75rem] p-5 shadow-2xl sm:p-6">
        {/* Animated background */}
        <div
          className="grid-bg absolute inset-0 opacity-60"
          aria-hidden="true"
        />

        <div
          className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet/20 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="absolute -bottom-12 -left-10 h-36 w-36 rounded-full bg-cyan-300/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative">
          {/* Window header */}
          <div
            className="flex items-center gap-2 border-b border-white/[0.08] pb-4"
            aria-hidden="true"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />

            <span className="ml-2 font-mono text-xs text-zinc-400">
              profile.py
            </span>
          </div>

          {/* Python code */}
          <div
            className="space-y-1 overflow-x-auto py-6 font-mono text-[11px] leading-7 min-[380px]:text-xs sm:py-8 sm:text-sm"
            role="img"
            aria-label="Python profile describing Arin Sharma"
          >
            {codeLines.map(([level, line], i) => (
              <p
                key={i}
                className="type-line whitespace-pre"
                style={{
                  "--d": `${350 + i * 230}ms`,
                }}
              >
                <span className="mr-2 inline-block w-4 text-right text-zinc-600 sm:mr-3">
                  {i + 1}
                </span>

                <span className={`inline-block ${indent[level]}`}>
                  {line}
                </span>
              </p>
            ))}
          </div>

          {/* Bottom status */}
          <div className="flex items-center justify-between border-t border-white/[0.08] pt-4 font-mono text-[10px] text-zinc-500 sm:text-xs">
  <span className="ml-auto flex items-center gap-2">
    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
    Always learning
  </span>
</div>
        </div>
      </div>
    </Reveal>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="page-section surface-a isolate overflow-hidden"
    >
      <Container>
        <SectionHeading
          eyebrow="A little about me"
          title={
            <>
              About <span className="text-violet">me.</span>
            </>
          }
        />

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-14">
          {/* Code card */}
          <CodeCard />

          {/* Skill highlights */}
          <div className="min-w-0">
            <ul className="space-y-2.5 sm:space-y-3">
              {highlights.map(([emoji, content], i) => (
                <Reveal as="li" key={i} delay={Math.min(i, 5) * 60}>
                  <div className="flex gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 text-sm leading-6 text-zinc-400 transition-colors hover:border-violet/30 hover:bg-violet/[0.04] sm:gap-4 sm:p-4 sm:text-[15px] sm:leading-7">
                    <span
                      className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-violet/10 text-base"
                      aria-hidden="true"
                    >
                      {emoji}
                    </span>

                    <p className="min-w-0">{content}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

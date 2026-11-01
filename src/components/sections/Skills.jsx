import { useRef } from 'react'
import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import Reveal from '../common/Reveal'
import useAutoScroll from '../../hooks/useAutoScroll'
import { Bot, BrainCircuit, Database, Network, Workflow, Braces, Cloud, Code2 } from 'lucide-react'

const techStack = [
  { name: 'Python', logo: 'python/python-original.svg' },
  { name: 'NumPy', logo: 'numpy/numpy-original.svg' },
  { name: 'Pandas', logo: 'pandas/pandas-original.svg' },
  { name: 'Matplotlib', logo: 'matplotlib/matplotlib-original.svg' },
  { name: 'scikit-learn', logo: 'scikitlearn/scikitlearn-original.svg' },
  { name: 'PyTorch', logo: 'pytorch/pytorch-original.svg' },
  { name: 'Jupyter', logo: 'jupyter/jupyter-original.svg' },
  { name: 'SQL', logo: 'postgresql/postgresql-original.svg' },
  { name: 'Git', logo: 'git/git-original.svg' },
  { name: 'GitHub', logo: 'github/github-original.svg', invert: true },
  { name: 'FastAPI', logo: 'fastapi/fastapi-original.svg' },
  { name: 'Docker', logo: 'docker/docker-original.svg' },
  { name: 'Traditional ML', Icon: BrainCircuit },
  { name: 'LSTM', Icon: Workflow },
  { name: 'Generative AI', Icon: Bot },
  { name: 'RAG', Icon: Network },
  { name: 'Vector databases', Icon: Database },
  { name: 'APIs', Icon: Braces },
  { name: 'Deployment', Icon: Cloud },
  { name: 'Data structures', Icon: Code2 },
  { name: 'Feature engineering', Icon: BrainCircuit },
]

const logoBase = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/'

function SkillTile({ skill, copy }) {
  const Icon = skill.Icon
  return (
    <li
      aria-hidden={copy || undefined}
      className={`flex min-h-[4.75rem] flex-col items-center justify-center gap-1.5 rounded-xl border border-violet-300/[0.12] bg-[#151018]/90 p-1.5 text-center sm:min-h-[6.5rem] sm:gap-2.5 sm:p-3 transition duration-300 hover:border-cyan-300/30 hover:bg-violet-950/40 motion-safe:hover:-translate-y-1`}
    >
      <span className="grid h-7 w-7 shrink-0 place-items-center sm:h-9 sm:w-9">
        {skill.logo ? (
          <img
            src={`${logoBase}${skill.logo}`}
            alt=""
            width="32"
            height="32"
            loading="lazy"
            decoding="async"
            className={`h-6 w-6 object-contain sm:h-8 sm:w-8 ${skill.invert ? 'brightness-0 invert' : ''}`}
          />
        ) : (
          <Icon className="h-6 w-6 text-violet sm:h-7 sm:w-7" aria-hidden="true" />
        )}
      </span>
      <span className="text-[10.5px] font-semibold leading-tight text-zinc-200 [overflow-wrap:anywhere] min-[480px]:text-xs sm:text-sm">{skill.name}</span>
    </li>
  )
}

export default function Skills() {
  const railRef = useRef(null)
  useAutoScroll(railRef)

  return (
    <section id="skills" className="page-section surface-b border-y border-violet-400/10">
      <Container>
        <SectionHeading
          eyebrow="Tools of the trade"
          title={<>My tech <span className="text-violet">stack.</span></>}
          description="The languages, libraries, and tools I’m learning and using across data science, machine learning, and AI projects."
        />
        <Reveal>
          {/* 3 rows that drift sideways and can be swiped: 4 columns visible on phones, 5 on tablets, 7 on laptops. */}
          <ul ref={railRef} className="rail skills-rail" aria-label="Technologies I work with">
            {techStack.map((skill) => (
              <SkillTile key={skill.name} skill={skill} />
            ))}
            {techStack.map((skill) => (
              <SkillTile key={`${skill.name}-copy`} skill={skill} copy />
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}

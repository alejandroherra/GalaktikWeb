import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Languages, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

type Language = 'es' | 'en';

import Outlier1 from '../assets/OutlierProof.webp';
import Outlier2 from '../assets/OutlierProof2.webp';
import Outlier3 from '../assets/OutlierProof3.webp';
import ProofCustomer from '../assets/ProofCustomer.jpeg';
import ScaleProof from '../assets/ScaleProof.png';

type SignContent = {
  id: string;
  worldX: number;
  title: { es: string; en: string };
  icon: string;
  content: { es: React.ReactNode; en: React.ReactNode };
  proofs?: string[];
};

// ── World constants ──────────────────────────────────────────────────────────
const CASTLE_WORLD_X = 6800;  // visual position of the castle wall
const WORLD_WIDTH = 7600;
// MAX_SCROLL is computed at runtime from window.innerWidth so the
// player's screen-center never reaches (or passes) the castle.
const getMaxScroll = () => CASTLE_WORLD_X - window.innerWidth / 2 - 80;

// Detect touch-primary devices (phones, tablets)
const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  (navigator.maxTouchPoints > 0 || 'ontouchstart' in window);

// ── Skills data ──────────────────────────────────────────────────────────────
type Skill = { name: string; icon: string; color: string };

const SKILL_ROWS: Skill[][] = [
  // Row 1 — Frontend & DevOps
  [
    { name: 'React', icon: '⚛️', color: '#61DAFB' },
    { name: 'Angular', icon: '🔺', color: '#DD0031' },
    { name: 'Tailwind', icon: '🌊', color: '#38BDF8' },
    { name: 'Node.js', icon: '🟢', color: '#6DA55F' },
    { name: 'NPM', icon: '📦', color: '#CB3837' },
    { name: 'Docker', icon: '🐳', color: '#2496ED' },
    { name: 'Git', icon: '🌿', color: '#F05032' },
    { name: 'GitHub', icon: '🐙', color: '#A78BFA' },
  ],
  // Row 2 — AI Tools, Databases & Languages
  [
    { name: 'N8N', icon: '🔄', color: '#EA4B71' },
    { name: 'Claude Code', icon: '🧠', color: '#C17BFF' },
    { name: 'OpenCode', icon: '🤖', color: '#10B981' },
    { name: 'MongoDB', icon: '🍃', color: '#4DB33D' },
    { name: 'Firebase', icon: '🔥', color: '#FFA000' },
    { name: 'English C1', icon: '🇺🇸', color: '#60A5FA' },
    { name: 'Español', icon: '🇨🇷', color: '#34D399' },
    { name: 'Português B2', icon: '🇧🇷', color: '#FBBF24' },
  ],
];

// ── Signs content ─────────────────────────────────────────────────────────────
const SIGNS: SignContent[] = [
  {
    id: 'customer-service',
    worldX: 1400,
    icon: '💬',
    title: { es: 'Servicio al Cliente', en: 'Customer Service' },
    content: {
      es: (
        <div className="space-y-4">
          <p className="leading-relaxed bg-black/20 p-4 rounded-lg border border-amber-500/30 text-gray-200">
            Más de <strong className="text-amber-400">4 años</strong> de experiencia en atención al cliente de alto desempeño.
          </p>
          <ul className="space-y-3 text-gray-300">
            <li className="flex gap-3 items-start">
              <span className="text-amber-400 mt-1">▸</span>
              <span><strong className="text-white">Amazon</strong> – 1 año en soporte al cliente en inglés. Métricas sobresalientes de satisfacción (CSAT).</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-amber-400 mt-1">▸</span>
              <span><strong className="text-white">Concentrix</strong> – 3 años como <em>Supervisor de Chats</em>. Liderazgo de equipos, coaching y seguimiento de KPIs.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-amber-400 mt-1">▸</span>
              <span>Capacidad de <strong className="text-white">humanizar</strong> la atención técnica: comunicación empática, resolución de conflictos y escalaciones.</span>
            </li>
          </ul>
        </div>
      ),
      en: (
        <div className="space-y-4">
          <p className="leading-relaxed bg-black/20 p-4 rounded-lg border border-amber-500/30 text-gray-200">
            Over <strong className="text-amber-400">4 years</strong> of high-performance customer service experience.
          </p>
          <ul className="space-y-3 text-gray-300">
            <li className="flex gap-3 items-start">
              <span className="text-amber-400 mt-1">▸</span>
              <span><strong className="text-white">Amazon</strong> – 1 year of English customer support. Outstanding CSAT metrics.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-amber-400 mt-1">▸</span>
              <span><strong className="text-white">Concentrix</strong> – 3 years as <em>Chat Supervisor</em>. Team leadership, coaching, and KPI tracking.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-amber-400 mt-1">▸</span>
              <span>Ability to <strong className="text-white">humanize</strong> technical support: empathetic communication, conflict resolution, and escalations.</span>
            </li>
          </ul>
        </div>
      ),
    },
    proofs: [ProofCustomer],
  },
  {
    id: 'programming',
    worldX: 2400,
    icon: '💻',
    title: { es: 'Programación', en: 'Programming' },
    content: {
      es: (
        <div className="space-y-4">
          <p className="leading-relaxed bg-black/20 p-4 rounded-lg border border-amber-500/30 text-gray-200">
            <strong className="text-amber-400">6 años</strong> de trayectoria en desarrollo de software con múltiples proyectos entregados en producción.
          </p>
          <ul className="space-y-3 text-gray-300">
            <li className="flex gap-3 items-start">
              <span className="text-amber-400 mt-1">▸</span>
              <span><strong className="text-white">Extensiones para VS Code:</strong> Creador y mantenedor de extensiones de herramientas como Prettier, usadas activamente por la comunidad.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-amber-400 mt-1">▸</span>
              <span><strong className="text-white">Proyectos Mundiales:</strong> He trabajado en múltiples proyectos "worldwide" como programador MID Front End y en QA Testing, garantizando escalabilidad y calidad.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-amber-400 mt-1">▸</span>
              <span><strong className="text-white">Principal Software Engineer</strong> en <em className="text-amber-400">GalaktikWeb</em>, mi empresa propia, liderando arquitectura, decisiones técnicas y entrega de proyectos a clientes.</span>
            </li>
          </ul>
        </div>
      ),
      en: (
        <div className="space-y-4">
          <p className="leading-relaxed bg-black/20 p-4 rounded-lg border border-amber-500/30 text-gray-200">
            <strong className="text-amber-400">6 years</strong> of software development with multiple projects delivered in production.
          </p>
          <ul className="space-y-3 text-gray-300">
            <li className="flex gap-3 items-start">
              <span className="text-amber-400 mt-1">▸</span>
              <span><strong className="text-white">VS Code Extensions:</strong> Creator and maintainer of extensions for tools like Prettier, actively used by the community.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-amber-400 mt-1">▸</span>
              <span><strong className="text-white">Worldwide Projects:</strong> I have worked on multiple worldwide projects as a MID Front End Developer and doing QA Testing, ensuring scalability and quality.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-amber-400 mt-1">▸</span>
              <span><strong className="text-white">Principal Software Engineer</strong> at <em className="text-amber-400">GalaktikWeb</em>, my own company, leading architecture, technical decisions and client project delivery.</span>
            </li>
          </ul>
        </div>
      ),
    },
    proofs: [],
  },
  {
    id: 'ai',
    worldX: 3900,
    icon: '🤖',
    title: { es: 'Inteligencia Artificial', en: 'Artificial Intelligence' },
    content: {
      es: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/30 p-4 rounded-lg">
            <h4 className="text-purple-300 font-bold text-lg mb-1">QA Front End en Scale AI (Puesto actual)</h4>
            <p className="text-gray-300 text-sm">Transición de evaluador a <strong className="text-white">Quality Manager</strong>, auditando coders de LATAM e India en proyectos de alto nivel.</p>
          </div>
          {/* Company badges */}
          <div className="flex flex-wrap gap-2">
            {['Scale AI', 'xAI', 'OpenAI', 'Google', 'Meta'].map(c => (
              <span key={c} className="px-2 py-1 rounded-md text-[10px] font-bold border border-purple-500/40 text-purple-300" style={{ background: 'rgba(168,85,247,0.12)', fontFamily: 'system-ui,sans-serif' }}>{c}</span>
            ))}
          </div>
          <ul className="space-y-3 text-gray-300">
            <li className="flex gap-3 items-start">
              <span className="text-purple-400 mt-1">▸</span>
              <span><strong className="text-white">Auditor de tareas:</strong> Reviso y evalúo el trabajo de coders de LATAM e India, asegurando calidad y estándares en cada entrega.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-purple-400 mt-1">▸</span>
              <span><strong className="text-white">Quality Manager (QM):</strong> Doy visto bueno a tareas <em className="text-yellow-300">golden</em>, lidero proyectos, conduzco onboardings y resuelvo dudas del equipo.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-purple-400 mt-1">▸</span>
              <span><strong className="text-white">Modelos frontera de IA:</strong> He participado y trabajado con más de 70 proyectos distintos en inteligencia artificial involucrando modelos como GPT-2.5, GPT-3, Grok, DeepSeek, Ollama, y Gemini 3.</span>
            </li>
          </ul>
        </div>
      ),
      en: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/30 p-4 rounded-lg">
            <h4 className="text-purple-300 font-bold text-lg mb-1">QA Front End at Scale AI (Current Role)</h4>
            <p className="text-gray-300 text-sm">Transitioned from evaluator to <strong className="text-white">Quality Manager</strong>, auditing LATAM and India coders on high level projects.</p>
          </div>
          {/* Company badges */}
          <div className="flex flex-wrap gap-2">
            {['Scale AI', 'xAI', 'OpenAI', 'Google', 'Meta'].map(c => (
              <span key={c} className="px-2 py-1 rounded-md text-[10px] font-bold border border-purple-500/40 text-purple-300" style={{ background: 'rgba(168,85,247,0.12)', fontFamily: 'system-ui,sans-serif' }}>{c}</span>
            ))}
          </div>
          <ul className="space-y-3 text-gray-300">
            <li className="flex gap-3 items-start">
              <span className="text-purple-400 mt-1">▸</span>
              <span><strong className="text-white">Task Auditor:</strong> Review and evaluate work from LATAM and India coders, ensuring quality and standards on every delivery.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-purple-400 mt-1">▸</span>
              <span><strong className="text-white">Quality Manager (QM):</strong> Approve <em className="text-yellow-300">golden tasks</em>, lead projects, run onboardings and resolve team questions.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-purple-400 mt-1">▸</span>
              <span><strong className="text-white">Frontier AI models:</strong> Participated and worked with more than 70 different artificial intelligence projects involving models like GPT-2.5, GPT-3, Grok, DeepSeek, Ollama, and Gemini 3.</span>
            </li>
          </ul>
        </div>
      ),
    },
    proofs: [Outlier1, Outlier2, Outlier3, ScaleProof],
  },
  {
    // Skills sign — placed well before the castle
    id: 'skills',
    worldX: 5400,
    icon: '🛠️',
    title: { es: 'Habilidades', en: 'Skills' },
    content: {
      es: <SkillsGrid lang="es" />,
      en: <SkillsGrid lang="en" />,
    },
  },
];

// ── Skills data — 3 clean sections, all rows fill perfectly ─────────────────
// Row 1 + Row 2 (10 items total, 2×5 grid)
const TECH_STACK: Skill[] = [
  { name: 'React', icon: '⚛️', color: '#61DAFB' },
  { name: 'Redux', icon: '🟣', color: '#764ABC' },
  { name: 'Angular', icon: '🔺', color: '#DD0031' },
  { name: 'Tailwind', icon: '🌊', color: '#38BDF8' },
  { name: 'Node.js', icon: '🟢', color: '#6DA55F' },
  { name: 'NPM', icon: '📦', color: '#CB3837' },
  { name: 'Docker', icon: '🐳', color: '#2496ED' },
  { name: 'Git', icon: '🌿', color: '#F05032' },
  { name: 'GitHub', icon: '🐙', color: '#A78BFA' },
  { name: 'AI APIs', icon: '🔌', color: '#F59E0B' },
];

// Row 3 — AI Tools & DB (5 items, grid-cols-5 = perfect 1 row)
const TOOLS_DB: Skill[] = [
  { name: 'N8N', icon: '🔄', color: '#EA4B71' },
  { name: 'Claude Code', icon: '🧠', color: '#C17BFF' },
  { name: 'OpenCode', icon: '🤖', color: '#10B981' },
  { name: 'MongoDB', icon: '🍃', color: '#4DB33D' },
  { name: 'Firebase', icon: '🔥', color: '#FFA000' },
];

// Row 4 — Languages (3 items, grid-cols-3 = perfect 1 row)
const LANG_SKILLS: Skill[] = [
  { name: 'English C1', icon: '🇺🇸', color: '#60A5FA' },
  { name: 'Español', icon: '🇨🇷', color: '#34D399' },
  { name: 'Português B2', icon: '🇧🇷', color: '#FBBF24' },
];

function SkillBadge({ skill }: { skill: Skill }) {
  return (
    <div
      className="flex flex-col items-center gap-1.5 p-2 rounded-xl border border-white/10 hover:border-white/30 transition-colors"
      style={{ background: `${skill.color}18` }}
    >
      <span className="text-2xl leading-none">{skill.icon}</span>
      <span
        className="text-center leading-tight font-bold"
        style={{ fontFamily: 'system-ui, sans-serif', fontSize: '10px', color: skill.color }}
      >
        {skill.name}
      </span>
    </div>
  );
}

function SkillsGrid({ lang }: { lang: Language }) {
  return (
    <div className="space-y-4">

      {/* Section 1: Tech Stack — 2 perfect rows of 5 */}
      <div className="space-y-2">
        <p className="text-gray-500 text-[10px] uppercase tracking-widest" style={{ fontFamily: 'system-ui, sans-serif' }}>
          {lang === 'es' ? '⚙️ Tech Stack' : '⚙️ Tech Stack'}
        </p>
        <div className="grid grid-cols-5 gap-2">
          {TECH_STACK.slice(0, 5).map(s => <SkillBadge key={s.name} skill={s} />)}
        </div>
        <div className="grid grid-cols-5 gap-2">
          {TECH_STACK.slice(5).map(s => <SkillBadge key={s.name} skill={s} />)}
        </div>
      </div>

      <div className="border-t border-white/10" />

      {/* Section 2: AI Tools & Databases — 1 perfect row of 5 */}
      <div className="space-y-2">
        <p className="text-gray-500 text-[10px] uppercase tracking-widest" style={{ fontFamily: 'system-ui, sans-serif' }}>
          {lang === 'es' ? '🤖 IA, Herramientas & BD' : '🤖 AI, Tools & DB'}
        </p>
        <div className="grid grid-cols-5 gap-2">
          {TOOLS_DB.map(s => <SkillBadge key={s.name} skill={s} />)}
        </div>
      </div>

      <div className="border-t border-white/10" />

      {/* Section 3: Languages — 1 perfect row of 3 */}
      <div className="space-y-2">
        <p className="text-gray-500 text-[10px] uppercase tracking-widest" style={{ fontFamily: 'system-ui, sans-serif' }}>
          {lang === 'es' ? '🌎 Idiomas' : '🌎 Languages'}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {LANG_SKILLS.map(s => <SkillBadge key={s.name} skill={s} />)}
        </div>
      </div>

    </div>
  );
}

// ── Stable cloud positions (computed once, never random on render) ─────────────
const CLOUD_DATA = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  top: 6 + ((i * 47) % 30),
  left: i * 380 + ((i * 137) % 200),
  width: 80 + ((i * 73) % 130),
  height: 35 + ((i * 41) % 40),
}));

// ── Pixel-art Mario character ─────────────────────────────────────────────────
function MarioCharacter({ isWalking }: { isWalking: boolean }) {
  return (
    <motion.div
      className="relative flex flex-col items-center"
      animate={{ y: isWalking ? [-1, 1, -1] : 0 }}
      transition={{ repeat: Infinity, duration: 0.25, ease: 'linear' }}
    >
      {/* Hat top */}
      <div className="w-10 h-3 bg-red-600 border-2 border-black" />
      {/* Hat brim */}
      <div className="w-14 h-2 bg-red-600 border-2 border-black border-t-0 -mt-px" />
      {/* Face */}
      <div className="w-12 h-8 bg-amber-300 border-2 border-black border-t-0 flex flex-col items-center pt-1 gap-1">
        <div className="flex gap-3">
          <div className="w-2 h-2 bg-black" />
          <div className="w-2 h-2 bg-black" />
        </div>
        <div className="w-10 h-2 bg-amber-900 border border-black rounded-sm" />
      </div>
      {/* Overalls */}
      <div className="w-12 h-8 bg-blue-700 border-2 border-black border-t-0 flex items-center justify-center">
        <div className="w-5 h-4 bg-amber-400 border border-black" />
      </div>
      {/* Legs */}
      <div className="flex gap-1 -mt-px">
        <motion.div
          className="w-5 h-5 bg-blue-700 border-2 border-black"
          animate={{ rotate: isWalking ? [0, 30, 0, -30, 0] : 0 }}
          transition={{ repeat: Infinity, duration: 0.4, ease: 'linear' }}
          style={{ transformOrigin: 'top center' }}
        />
        <motion.div
          className="w-5 h-5 bg-blue-700 border-2 border-black"
          animate={{ rotate: isWalking ? [0, -30, 0, 30, 0] : 0 }}
          transition={{ repeat: Infinity, duration: 0.4, ease: 'linear', delay: 0.2 }}
          style={{ transformOrigin: 'top center' }}
        />
      </div>
      {/* Shoes */}
      <div className="flex gap-1 -mt-px">
        <div className="w-6 h-3 bg-amber-900 border-2 border-black" />
        <div className="w-6 h-3 bg-amber-900 border-2 border-black" />
      </div>
    </motion.div>
  );
}

// ── Wooden sign component ─────────────────────────────────────────────────────
function Sign({
  sign,
  lang,
  isNear,
  showHint,
  onClick,
}: {
  sign: SignContent;
  lang: Language;
  isNear: boolean;
  showHint: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className="absolute bottom-[14vh] flex flex-col items-center pointer-events-none"
      style={{ left: `${sign.worldX}px`, transform: 'translateX(-65px)' }}
    >
      <AnimatePresence>
        {showHint && (
          <motion.div
            key="hint"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute -top-12 flex flex-col items-center text-yellow-300"
          >
            <motion.div
              animate={{ y: [-3, 3, -3] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="text-xs font-pixel"
            >
              ▼ X
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Board */}
      <div
        onClick={onClick}
        className={`w-[130px] h-[90px] flex flex-col items-center justify-center shadow-[4px_4px_0_rgba(0,0,0,0.4)] relative transition-transform duration-200 pointer-events-auto cursor-pointer hover:scale-110 ${isNear ? 'scale-110' : ''}`}
        style={{
          background: 'linear-gradient(160deg, #d4922a 0%, #b87420 50%, #8a5a10 100%)',
          border: '4px solid #6b4010',
          borderRadius: '4px',
        }}
      >
        {/* Wood grain */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,0,0,0.5) 11px)',
          }}
        />
        <span className="text-2xl mb-1">{sign.icon}</span>
        <span className="text-[9px] text-center text-amber-900 font-pixel px-2 leading-tight font-bold">
          {sign.title[lang]}
        </span>
        {/* Corner nails */}
        {(['top-1.5 left-1.5', 'top-1.5 right-1.5', 'bottom-1.5 left-1.5', 'bottom-1.5 right-1.5'] as const).map(
          pos => (
            <div
              key={pos}
              className={`absolute ${pos} w-2 h-2 rounded-full bg-amber-600 border border-amber-900 shadow-sm`}
            />
          )
        )}
      </div>

      {/* Post */}
      <div
        className="w-[14px]"
        style={{
          height: '55px',
          background: 'linear-gradient(90deg, #8a5a10, #d4922a 40%, #8a5a10)',
          border: '2px solid #6b4010',
        }}
      />
    </div>
  );
}

// ── Sign Modal (responsive: tabs on mobile, side-by-side on desktop) ─────────
function SignModal({
  modal,
  lang,
  onClose,
}: {
  modal: SignContent;
  lang: Language;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'info' | 'proof'>('info');
  const [enlargedImg, setEnlargedImg] = useState<string | null>(null);
  const hasProof = modal.proofs && modal.proofs.length > 0;

  return (
    <motion.div
      key="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.88, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.88, y: 30 }}
        transition={{ type: 'spring', damping: 22, stiffness: 320 }}
        className="relative w-full max-h-[90vh] overflow-hidden rounded-2xl flex flex-col"
        style={{
          maxWidth: hasProof ? '860px' : '560px',
          background: 'linear-gradient(135deg, #1e1e2e 0%, #2a2a3e 100%)',
          border: '4px solid #d4922a',
          boxShadow: '0 0 40px rgba(212,146,42,0.3), 8px 8px 0 rgba(0,0,0,0.5)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 text-gray-400 hover:text-white transition-colors"
        >
          <X size={22} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 px-5 pt-5 pb-3 shrink-0">
          <span className="text-3xl">{modal.icon}</span>
          <h2 className="text-amber-400 leading-tight" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 'clamp(9px, 2.5vw, 13px)' }}>
            {modal.title[lang]}
          </h2>
        </div>

        {/* Mobile tabs (only shown on small screens when proof panel exists) */}
        {hasProof && (
          <div className="md:hidden flex shrink-0 border-b-2 border-black/40 px-5" style={{ fontFamily: 'system-ui, sans-serif' }}>
            {(['info', 'proof'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 text-xs font-bold border-b-2 transition-colors mr-2 -mb-[2px] ${activeTab === tab
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-gray-500 hover:text-gray-300'
                  }`}
              >
                {tab === 'info'
                  ? (lang === 'es' ? 'Info' : 'Info')
                  : (lang === 'es' ? 'Prueba' : 'Proof')}
              </button>
            ))}
          </div>
        )}

        {/* Body: side-by-side on desktop, tabbed on mobile */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden min-h-0">

          {/* Info panel — always visible on desktop, tab-controlled on mobile */}
          <div
            className={`flex-1 overflow-y-auto p-5 ${hasProof && activeTab !== 'info' ? 'hidden md:block' : ''}`}
          >
            <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '14px' }}>
              {modal.content[lang]}
            </div>
          </div>

          {/* Proof of Work panel */}
          {hasProof && (
            <div
              className={`md:w-60 shrink-0 flex flex-col gap-3 p-5 border-black/40
                md:border-l-2 md:border-t-0
                ${activeTab !== 'proof' ? 'hidden md:flex' : 'flex border-t-2 md:border-t-0'} overflow-y-auto`}
              style={{ background: 'rgba(0,0,0,0.3)' }}
            >
              <h3
                className="text-center text-gray-400 mb-1 shrink-0"
                style={{ fontFamily: 'system-ui, sans-serif', fontSize: '11px', fontWeight: 600 }}
              >
                {lang === 'es' ? 'Prueba de Trabajo' : 'Proof of Work'}
              </h3>
              {modal.proofs!.map((src, i) => (
                <div
                  key={i}
                  onClick={() => setEnlargedImg(src)}
                  className="cursor-pointer overflow-hidden shrink-0 rounded-lg border border-white/10 aspect-video bg-black/40 flex items-center justify-center hover:scale-[1.03] hover:border-amber-400/50 transition-all shadow-md group"
                >
                  <img src={src} className="w-full h-full object-cover group-hover:brightness-110 transition-all" alt="Proof of Work" loading="lazy" />
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Enlarged Image Overlay */}
      <AnimatePresence>
        {enlargedImg && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            onClick={(e) => { e.stopPropagation(); setEnlargedImg(null); }}
            className="fixed inset-0 z-[200] bg-black/90 flex flex-col items-center justify-center p-4 cursor-pointer"
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              src={enlargedImg}
              className="max-w-[95vw] max-h-[85vh] rounded-xl shadow-[0_0_50px_rgba(212,146,42,0.4)] border-2 border-amber-400 object-contain cursor-default"
              onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing it if they just want to look
            />

            <button
              onClick={(e) => { e.stopPropagation(); setEnlargedImg(null); }}
              className="mt-6 flex items-center gap-2 bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 px-6 py-3 rounded-full border border-amber-500/50 transition-colors font-bold tracking-wide"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              <X size={20} /> {lang === 'es' ? 'Cerrar Imagen' : 'Close Image'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function PortfolioGame() {
  const [lang, setLang] = useState<Language>('es');
  const [scrollPos, setScrollPos] = useState(0);
  const [activeModal, setActiveModal] = useState<SignContent | null>(null);
  const [showThanks, setShowThanks] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  // Detect touch once on mount so we show the right instructions
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => { setIsTouch(isTouchDevice()); }, []);

  const keysRef = useRef<Record<string, boolean>>({});

  // Compute max scroll at runtime so the castle truly blocks movement
  const maxScrollRef = useRef(getMaxScroll());
  useEffect(() => {
    const onResize = () => { maxScrollRef.current = getMaxScroll(); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Single long-lived game loop
  useEffect(() => {
    let rafId: number;
    const SPEED = 6;

    const loop = () => {
      const k = keysRef.current;
      const moving = !!(k['ArrowRight'] || k['d'] || k['ArrowLeft'] || k['a']);
      setIsWalking(moving);

      if (!activeModal && moving) {
        setScrollPos(prev => {
          if (k['ArrowRight'] || k['d']) return Math.min(prev + SPEED, maxScrollRef.current);
          if (k['ArrowLeft'] || k['a']) return Math.max(prev - SPEED, 0);
          return prev;
        });
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [activeModal]);

  // Keyboard listeners — write to ref only, no re-renders
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true;
      if ((e.key.toLowerCase() === 'x' || e.key.toLowerCase() === 'e') && !activeModal) {
        tryOpenSign();
      }
      if (e.key === 'Escape') setActiveModal(null);
    };
    const up = (e: KeyboardEvent) => { keysRef.current[e.key] = false; };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeModal, scrollPos]);

  const screenCenterX = typeof window !== 'undefined' ? window.innerWidth / 2 : 640;
  const PROXIMITY = 220; // px — how close the sign world-x must be to screen center

  // Find any sign currently near the player
  const nearbySign = useMemo(
    () => SIGNS.find(s => Math.abs(s.worldX - scrollPos - screenCenterX) < PROXIMITY),
    [scrollPos, screenCenterX]
  );

  // Show "Gracias" button when player approaches the castle
  const nearEnd = scrollPos >= maxScrollRef.current - 60;

  function tryOpenSign() {
    const center = typeof window !== 'undefined' ? window.innerWidth / 2 : 640;
    const sign = SIGNS.find(s => Math.abs(s.worldX - scrollPos - center) < PROXIMITY);
    if (sign) setActiveModal(sign);
  }

  return (
    <>
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
        <style>{`body { margin: 0 !important; overflow: hidden !important; background-color: #5c94fc !important; }`}</style>
      </Helmet>
      <div
        className="relative w-screen h-screen overflow-hidden select-none"
        style={{ background: '#5c94fc', fontFamily: "'Press Start 2P', cursive" }}
      >
        {/* ── HUD ───────────────────────────────────────────────────────────── */}
        <div className="absolute top-3 right-3 z-50">
          <button
            onClick={() => setLang(l => (l === 'es' ? 'en' : 'es'))}
            className="flex items-center gap-2 bg-black/60 hover:bg-black/80 px-3 py-2 rounded-lg transition-colors border-2 border-white/20 text-white text-xs"
          >
            <Languages size={16} />
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
        </div>

        <div className="absolute top-3 left-3 z-50 p-3 bg-black/55 rounded-xl border border-white/10 text-white leading-relaxed"
          style={{ fontSize: '9px', maxWidth: '200px' }}
        >
          {isTouch ? (
            <>
              <p className="text-yellow-200 font-bold mb-1">
                {lang === 'es' ? '👉 Cómo jugar (móvil)' : '👉 How to play (mobile)'}
              </p>
              <p>{lang === 'es' ? '◄ ► Botones para moverte' : '◄ ► Tap arrows to move'}</p>
              <p className="text-yellow-300 mt-1">{lang === 'es' ? 'Toca el cartel o el botón X' : 'Tap the sign or press X'}</p>
            </>
          ) : (
            <>
              <p className="text-yellow-200 font-bold mb-1">
                {lang === 'es' ? '⌨️ Cómo jugar' : '⌨️ How to play'}
              </p>
              <p>{lang === 'es' ? '← → Flechas del teclado' : '← → Keyboard arrows'}</p>
              <p className="text-yellow-300 mt-1">{lang === 'es' ? 'X o clic en el cartel' : 'X or click the sign'}</p>
            </>
          )}
        </div>

        {/* ── WORLD LAYER 1: Clouds (parallax 0.25×) ────────────────────────── */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `translateX(${-scrollPos * 0.25}px)`,
            width: `${WORLD_WIDTH}px`,
          }}
        >
          {CLOUD_DATA.map(c => (
            <div
              key={c.id}
              className="absolute bg-white/85 rounded-full"
              style={{ top: `${c.top}%`, left: `${c.left}px`, width: `${c.width}px`, height: `${c.height}px` }}
            />
          ))}
        </div>

        {/* ── WORLD LAYER 2: Foreground (1×) ────────────────────────────────── */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translateX(${-scrollPos}px)`, width: `${WORLD_WIDTH}px` }}
        >
          {/* Brick ground */}
          <div
            className="absolute bottom-0 w-full border-t-8 border-[#903000]"
            style={{
              height: '14vh',
              backgroundColor: '#c84800',
              backgroundImage: `
              linear-gradient(#903000 1px, transparent 1px),
              linear-gradient(90deg, #903000 1px, transparent 1px)
            `,
              backgroundSize: '64px 32px',
            }}
          />

          {/* Decorative green pipes */}
          {[500, 1700, 3000, 4600].map((px, i) => (
            <div key={i} className="absolute bottom-[14vh] flex flex-col items-center" style={{ left: px }}>
              <div className="w-20 h-5 bg-green-600 border-4 border-green-900 border-b-0" />
              <div className="w-16 h-16 bg-green-700 border-4 border-green-900 border-t-0" />
            </div>
          ))}

          {/* Signs */}
          {SIGNS.map(sign => (
            <Sign
              key={sign.id}
              sign={sign}
              lang={lang}
              isNear={nearbySign?.id === sign.id}
              showHint={nearbySign?.id === sign.id && !activeModal}
              onClick={() => setActiveModal(sign)}
            />
          ))}

          {/* ── CASTLE (end wall — player cannot pass) ───────────────────── */}
          <div
            className="absolute bottom-[14vh] flex flex-col items-end"
            style={{ left: `${CASTLE_WORLD_X}px` }}
          >
            {/* Battlements row */}
            <div className="flex">
              {[1, 0, 1, 0, 1, 0, 1, 0, 1].map((up, i) => (
                <div
                  key={i}
                  className="w-12 border-2 border-gray-600"
                  style={{ height: up ? '56px' : '32px', background: '#9ca3af' }}
                />
              ))}
            </div>
            {/* Main wall */}
            <div
              className="border-2 border-gray-600"
              style={{
                width: '108px',
                height: '24vh',
                background: '#9ca3af',
                backgroundImage: `
                linear-gradient(#6b7280 1px, transparent 1px),
                linear-gradient(90deg, #6b7280 1px, transparent 1px)
              `,
                backgroundSize: '36px 36px',
              }}
            >
              {/* Door arch */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-700"
                style={{ width: '36px', height: '48px', borderRadius: '18px 18px 0 0' }}
              >
                {/* Flag pole */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-1 h-20 bg-gray-600 border border-gray-800" />
                {/* Flag */}
                <motion.div
                  animate={{ skewX: [-5, 5, -5] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                  className="absolute -top-20 left-1 w-8 h-5 bg-red-500 border border-red-800 flex items-center justify-center"
                  style={{ fontSize: '7px', color: 'white', transformOrigin: 'left center' }}
                >
                  🏁
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* ── PLAYER (fixed at screen center) ─────────────────────────────── */}
        <div className="absolute bottom-[14vh] z-20" style={{ left: screenCenterX - 32 }}>
          <MarioCharacter isWalking={isWalking} />
        </div>

        {/* ── CONTROLS ────────────────────────────────────────────── */}
        <div className="absolute bottom-4 left-4 right-4 z-50 flex justify-between items-end">
          {/* Arrow buttons: hidden on large screens (desktop uses keyboard) */}
          <div className="flex gap-3 lg:invisible lg:pointer-events-none">
            {[
              { key: 'ArrowLeft', Icon: ChevronLeft },
              { key: 'ArrowRight', Icon: ChevronRight },
            ].map(({ key, Icon }) => (
              <button
                key={key}
                onPointerDown={() => { keysRef.current[key] = true; }}
                onPointerUp={() => { keysRef.current[key] = false; }}
                onPointerLeave={() => { keysRef.current[key] = false; }}
                className="w-14 h-14 bg-black/50 active:bg-black/70 rounded-full flex items-center justify-center border-2 border-white/30 text-white touch-none"
              >
                <Icon size={28} />
              </button>
            ))}
          </div>

          <button
            onClick={tryOpenSign}
            className={`w-14 h-14 rounded-full flex items-center justify-center border-2 font-bold text-base transition-all duration-200
            ${nearbySign && !activeModal
                ? 'bg-yellow-400 border-yellow-200 text-black shadow-[0_0_20px_rgba(250,204,21,0.8)] scale-110'
                : 'bg-black/40 border-white/20 text-white/40'}`}
          >
            X
          </button>
        </div>

        {/* ── "GRACIAS POR LEER" floating button near end ──────────────────── */}
        <AnimatePresence>
          {nearEnd && !activeModal && !showThanks && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
            >
              <motion.button
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
                onClick={() => setShowThanks(true)}
                className="pointer-events-auto px-8 py-5 text-center text-white rounded-2xl border-4 border-yellow-300 shadow-[0_0_40px_rgba(250,204,21,0.5)]"
                style={{
                  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: '11px',
                  lineHeight: 2,
                }}
              >
                <Sparkles className="inline mb-1 mr-2 text-yellow-300" size={20} />
                {lang === 'es' ? '¡Gracias por leer!' : 'Thanks for reading!'}
                <br />
                <span className="text-[9px] text-yellow-300 mt-1 block">
                  {lang === 'es' ? 'Haz clic para cerrar' : 'Click to close'}
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── SIGN MODAL ──────────────────────────────────────────────────── */}
        <AnimatePresence>
          {activeModal && (
            <SignModal
              modal={activeModal}
              lang={lang}
              onClose={() => setActiveModal(null)}
            />
          )}
        </AnimatePresence>

        {/* ── FINAL "GRACIAS" SCREEN ─────────────────────────────────────── */}
        <AnimatePresence>
          {showThanks && (
            <motion.div
              key="thanks-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[200] flex flex-col items-center justify-center bg-black/95"
            >
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 15 }}
                className="text-center px-8 max-w-md"
              >
                <p className="text-yellow-400 text-5xl mb-6">⭐</p>
                <h1 className="text-white mb-5 text-lg leading-loose">
                  {lang === 'es' ? '¡Gracias por leer!' : 'Thanks for reading!'}
                </h1>
                <p className="text-gray-300 mb-8 text-[10px] leading-loose max-w-sm mx-auto">
                  {lang === 'es'
                    ? 'Aprecio el tiempo que dedicaste. Espero tener la oportunidad de entrar en contacto contigo — por llamada o cualquier medio. 🤝'
                    : 'I appreciate the time you took. I hope to have the opportunity to connect with you — by call or any other means. 🤝'}
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <button
                    onClick={() => window.close()}
                    className="px-5 py-3 bg-red-700 hover:bg-red-600 text-white rounded-xl text-[9px] border-2 border-red-400 transition-colors"
                  >
                    {lang === 'es' ? 'Cerrar pestaña' : 'Close tab'}
                  </button>
                  <button
                    onClick={() => { window.location.href = '/'; }}
                    className="px-5 py-3 bg-blue-700 hover:bg-blue-600 text-white rounded-xl text-[9px] border-2 border-blue-400 transition-colors"
                  >
                    {lang === 'es' ? 'Por si quieres checar' : 'If you want to check it out'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

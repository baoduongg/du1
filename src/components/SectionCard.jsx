import { motion } from 'framer-motion';
import { memo } from 'react';

const SectionCard = memo(({ section, index, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    whileHover={{ scale: 1.05, y: -8 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => onClick(section)}
    className="group relative bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] cursor-pointer border border-white/5 hover:border-blue-500/30 transition-all duration-500 min-w-[240px] max-w-[280px] overflow-hidden"
  >
    {/* Animated Gradient Background */}
    <div className="absolute inset-0 bg-linear-to-br from-blue-600/5 via-transparent to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

    {/* Content */}
    <div className="relative z-10 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-2xl bg-linear-to-br ${section.details.color} flex items-center justify-center text-white text-lg font-black shadow-2xl border border-white/10`}
        >
          {section.id}
        </div>
        <h3 className="text-xl font-black text-white tracking-tight leading-tight">{section.title}</h3>
      </div>

      <p className="text-sm text-slate-400 leading-relaxed font-medium">
        {section.description}
      </p>

      {/* Action Link */}
      <div className="flex items-center gap-2 mt-2 text-blue-400 text-[11px] font-black uppercase tracking-widest group-hover:text-blue-300 transition-colors">
        <span>Khám phá ngay</span>
        <svg
          className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </div>
    </div>

    {/* Decorative Accent */}
    <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full group-hover:bg-blue-500/20 transition-all duration-700" />
  </motion.div>
));

SectionCard.displayName = 'SectionCard';

export default SectionCard;

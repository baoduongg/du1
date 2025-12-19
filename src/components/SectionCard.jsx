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
    className="group relative bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl cursor-pointer border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 min-w-[220px] max-w-[260px] overflow-hidden"
  >
    {/* Glow effect on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    {/* Content */}
    <div className="relative z-10 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${section.details.color} flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30`}
        >
          {section.id}
        </div>
        <h3 className="text-lg font-bold text-white">{section.title}</h3>
      </div>
      <p className="text-sm text-slate-400 leading-relaxed">
        {section.description}
      </p>

      {/* Arrow indicator */}
      <div className="flex items-center gap-2 mt-2 text-cyan-400 text-xs font-medium">
        <span>Khám phá</span>
        <svg
          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>

    {/* Corner accent */}
    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-transparent blur-2xl" />
  </motion.div>
));

SectionCard.displayName = 'SectionCard';

export default SectionCard;

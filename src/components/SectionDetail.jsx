import { motion } from 'framer-motion';
import { memo, useMemo } from 'react';

const SectionDetail = memo(({ section, sections, onSectionClick }) => {
  const otherSections = useMemo(
    () => sections.filter((s) => s.id !== 0 && s.id !== section.id),
    [sections, section.id]
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="absolute top-8 right-8 z-50 bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-500/30 p-8 max-w-md overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 blur-3xl" />

      {/* Header với gradient */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="relative z-10 mb-6"
      >
        <div
          className={`bg-gradient-to-br ${section.details.color} p-6 rounded-2xl shadow-lg shadow-blue-500/20`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 rounded-xl bg-slate-900/30 backdrop-blur-sm flex items-center justify-center text-white font-bold text-2xl border border-white/20">
              {section.id}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{section.title}</h2>
              <div className="h-0.5 w-16 bg-white/50 mt-1 rounded-full" />
            </div>
          </div>
          <p className="text-white/90 text-sm leading-relaxed">
            {section.description}
          </p>
        </div>
      </motion.div>

      {/* Thông tin chi tiết */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="relative z-10 space-y-5"
      >
        {/* Số lượng thành viên */}
        <div className="flex items-center gap-4 p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="text-white font-bold text-xl">
              {section.details.members}
            </span>
          </div>
          <div>
            <p className="text-xs text-cyan-400 font-medium uppercase tracking-wider">
              Team Members
            </p>
            <p className="text-lg text-white font-bold">
              {section.details.members} người
            </p>
          </div>
        </div>

        {/* Đặc điểm */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <div className="w-1 h-4 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full" />
            Đặc điểm nổi bật
          </h3>
          <div className="space-y-2">
            {section.details.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                className="group flex items-center gap-3 p-3 bg-slate-800/30 backdrop-blur-sm rounded-lg border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300"
              >
                <svg
                  className="w-5 h-5 text-cyan-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-slate-300 group-hover:text-white transition-colors">
                  {feature}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex flex-col gap-2 pt-4 border-t border-slate-700/50"
        >
          <p className="text-xs text-cyan-400 font-medium uppercase tracking-wider mb-2">
            Khám phá thêm
          </p>
          <div className="flex gap-2">
            {otherSections.map((s) => (
              <motion.button
                key={s.id}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSectionClick(s)}
                className={`flex-1 py-3 px-4 rounded-xl bg-gradient-to-r ${s.details.color} text-white text-xs font-semibold shadow-lg hover:shadow-xl transition-all border border-white/20`}
              >
                <span className="block truncate">{s.title}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

SectionDetail.displayName = 'SectionDetail';

export default SectionDetail;

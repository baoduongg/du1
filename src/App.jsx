import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, {
  Suspense,
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
  memo,
  use,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { IsometricOffice } from './components/IsometricOffice.jsx';
import GUI from 'lil-gui';

// Memoized SectionCard component - Tech style
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

// Memoized SectionDetail component - Tech style
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
      className="absolute top-8 right-8 z-10 bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-500/30 p-8 max-w-md overflow-hidden"
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

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [openDuration, setOpenDuration] = useState(0);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isFollowingPath, setIsFollowingPath] = useState(false);

  // Memoize sections data để tránh re-create mỗi render
  const sections = useMemo(
    () => [
      {
        id: 0,
        title: 'Lối vào chính',
        description: 'Chào mừng bạn đến với văn phòng',
        position: [0, 2.5, -6],
        lookAt: [0, 1, -50],
        path: [], // Không cần path cho điểm xuất phát
        details: {
          members: 0,
          features: ['Lối vào chính', 'Khu vực tiếp tân', 'Bảng thông báo'],
          color: 'from-blue-500 to-cyan-500',
        },
      },
      {
        id: 1,
        title: 'Khu vực PBQ',
        description: 'Khám phá khu vực PM, BA, QC',
        position: [4.5, 9, -30],
        lookAt: [100, -100, 51],
        // Định nghĩa lộ trình di chuyển (waypoints)
        path: [
          { position: [3, 3.5, -7], lookAt: [0, 1, -50] },
          // { position: [3, 10, -29], lookAt: [100, -100, 31] },
        ],
        details: {
          members: 12,
          features: [
            'Project Managers',
            'Business Analysts',
            'Quality Control',
          ],
          color: 'from-purple-500 to-pink-500',
        },
      },
      {
        id: 2,
        title: 'Khu vực Mainland',
        description: 'Các bạn khu vực trước chỗ ngồi anh Vinh',
        position: [-35, 12, -37],
        lookAt: [46, -60, 36],
        // Lộ trình tránh vật cản
        path: [
          { position: [0, 5, -10], lookAt: [-10, 0, -20] },
          { position: [-15, 8, -25], lookAt: [-30, 0, -30] },
          { position: [-35, 12, -37], lookAt: [46, -60, 36] },
        ],
        details: {
          members: 15,
          features: [
            'Development Team',
            'Collaboration Space',
            'Meeting Point',
          ],
          color: 'from-green-500 to-teal-500',
        },
      },
      {
        id: 3,
        title: 'Phòng SAR',
        description: 'Các bạn khu vực xã đảo chỗ anh Quí',
        position: [19, 8, -42],
        lookAt: [-50, -50, 0],
        // Lộ trình curve
        path: [
          { position: [0, 3, -8], lookAt: [80, 1, -50] },
          { position: [4, 3, -8], lookAt: [0, 1, -50] },
          { position: [4, 3, -25], lookAt: [0, 1, -50] },
          { position: [4, 3, -29], lookAt: [100, 1, -30] },
          { position: [15, 3, -29], lookAt: [14, 1, -100] },
          { position: [19, 8, -42], lookAt: [-50, -50, 0] },
        ],
        details: {
          members: 8,
          features: [
            'Special Administrative Region',
            'Innovation Hub',
            'Creative Corner',
          ],
          color: 'from-orange-500 to-red-500',
        },
      },
    ],
    []
  );

  // Memoize handlers để tránh re-create mỗi render
  const handleStart = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handleSectionClick = useCallback((section) => {
    setSelectedSection(section);
  }, []);

  // Memoize CameraScroll component
  const CameraScroll = useMemo(() => {
    return ({ isPlaying, selectedSection, setIsFollowingPath }) => {
      const { camera } = useThree();

      // Memoize vector positions
      const start = useRef(new THREE.Vector3(0, 2.5, 6));
      const end = useRef(new THREE.Vector3(0, 2.5, -6));
      const lookAtEnd = useRef(new THREE.Vector3(0, 1, -50));
      const targetVector = useRef(new THREE.Vector3());
      const targetLookAt = useRef(new THREE.Vector3());
      const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

      // State cho path animation
      const pathProgress = useRef(0);
      const currentPathIndex = useRef(0);
      const isFollowingPath = useRef(false);
      const activePath = useRef(null);

      useEffect(() => {
        if (!isPlaying) {
          camera.position.copy(start.current);
        }
      }, [isPlaying, camera]);

      // Reset path khi chuyển section
      useEffect(() => {
        if (
          selectedSection &&
          selectedSection.path &&
          selectedSection.path.length > 0
        ) {
          pathProgress.current = 0;
          currentPathIndex.current = 0;
          isFollowingPath.current = true;
          activePath.current = selectedSection.path;
          setIsFollowingPath(true);
        }
      }, [selectedSection]);

      useFrame((_, delta) => {
        // Animation di chuyển đến section được chọn với path
        if (selectedSection) {
          // Nếu có path, đi theo lộ trình với smooth interpolation
          if (
            isFollowingPath.current &&
            activePath.current &&
            activePath.current.length > 0
          ) {
            const path = activePath.current;
            const totalPoints = path.length;

            // Tăng progress dần dần
            pathProgress.current += delta * 0.5; // Tốc độ di chuyển

            // Tính index và fractional part cho smooth interpolation
            const clampedProgress = Math.min(
              pathProgress.current,
              totalPoints - 0.001
            );
            const currentIndex = Math.floor(clampedProgress);
            const nextIndex = Math.min(currentIndex + 1, totalPoints - 1);
            const t = clampedProgress - currentIndex; // 0 to 1 between waypoints

            // Easing function cho smooth acceleration/deceleration
            const easeInOutCubic = (x) => {
              return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
            };
            const easedT = easeInOutCubic(t);

            if (currentIndex < totalPoints) {
              const currentWaypoint = path[currentIndex];
              const nextWaypoint = path[nextIndex];

              // Smooth interpolation giữa 2 waypoints
              targetVector.current.set(...currentWaypoint.position);
              const nextPos = new THREE.Vector3(...nextWaypoint.position);
              targetVector.current.lerp(nextPos, easedT);

              targetLookAt.current.set(...currentWaypoint.lookAt);
              const nextLook = new THREE.Vector3(...nextWaypoint.lookAt);
              targetLookAt.current.lerp(nextLook, easedT);

              // Smooth camera movement
              camera.position.lerp(
                targetVector.current,
                1 - Math.exp(-5 * delta)
              );
              currentLookAt.current.lerp(
                targetLookAt.current,
                1 - Math.exp(-5 * delta)
              );
              camera.lookAt(currentLookAt.current);

              // Kết thúc khi đến waypoint cuối
              if (pathProgress.current >= totalPoints - 0.1) {
                isFollowingPath.current = false;
                setIsFollowingPath(false);
              }
            }
          } else {
            // Không có path, di chuyển trực tiếp với smooth lerp
            targetVector.current.set(...selectedSection.position);
            camera.position.lerp(
              targetVector.current,
              1 - Math.exp(-2 * delta)
            );

            targetLookAt.current.set(...selectedSection.lookAt);
            currentLookAt.current.lerp(
              targetLookAt.current,
              1 - Math.exp(-3 * delta)
            );
            camera.lookAt(currentLookAt.current);
          }

          return;
        }

        // Animation ban đầu
        if (!isPlaying) return;

        const speed = 1;
        const distance = camera.position.distanceTo(end.current);
        const totalDistance = start.current.distanceTo(end.current);
        const processMax05 = Math.min(1 - distance / totalDistance, 0.5);

        setOpenDuration(processMax05);
        camera.position.lerp(end.current, 1 - Math.exp(-speed * delta));
        currentLookAt.current.lerp(
          lookAtEnd.current,
          1 - Math.exp(-speed * delta)
        );
        camera.lookAt(currentLookAt.current);
      });

      return null;
    };
  }, []);

  const cameraPosDebug = useState([0, 2, -6]);
  const lookAtDebug = useState([0, 1, -50]);
  const CameraDebug = () => {
    const { camera } = useThree();
    useFrame(() => {
      camera.position.set(...cameraPosDebug[0]);
      camera.lookAt(...lookAtDebug[0]);
    });
    return null;
  };
  useEffect(() => {
    const gui = new GUI();
    const debug = {
      x: 0,
      y: 2,
      z: -6,
      lookAtX: 0,
      lookAtY: 1,
      lookAtZ: -50,
    };
    const folder = gui.addFolder('Camera Position Debug');
    folder.add(debug, 'x', -50, 50, 0.1).onChange((value) => {
      cameraPosDebug[1]([value, debug.y, debug.z]);
    });
    folder.add(debug, 'y', -50, 50, 0.1).onChange((value) => {
      cameraPosDebug[1]([debug.x, value, debug.z]);
    });
    folder.add(debug, 'z', -50, 50, 0.1).onChange((value) => {
      cameraPosDebug[1]([debug.x, debug.y, value]);
    });
    folder.add(debug, 'lookAtX', -200, 200, 0.1).onChange((value) => {
      lookAtDebug[1]([value, debug.lookAtY, debug.lookAtZ]);
    });
    folder.add(debug, 'lookAtY', -200, 200, 0.1).onChange((value) => {
      lookAtDebug[1]([debug.lookAtX, value, debug.lookAtZ]);
    });
    folder.add(debug, 'lookAtZ', -200, 200, 0.1).onChange((value) => {
      lookAtDebug[1]([debug.lookAtX, debug.lookAtY, value]);
    });
    return () => {
      gui.destroy();
    };
  }, []);
  return (
    <div className="fixed w-full h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      {/* Màn hình chào mừng chuyên nghiệp */}
      <AnimatePresence mode="wait">
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="absolute inset-0 z-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden"
          >
            {/* Animated background grid */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

            {/* Floating particles effect */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full"
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    opacity: 0,
                  }}
                  animate={{
                    y: [null, Math.random() * window.innerHeight],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Main content container */}
            <div className="relative h-full flex flex-col items-center justify-center px-4 max-w-6xl mx-auto">
              {/* Logo/Brand section */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.6, type: 'spring' }}
                className="mb-8"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/50">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
              </motion.div>

              {/* Main heading */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="text-center space-y-6 mb-12"
              >
                <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-cyan-300 to-blue-500">
                  Chào mừng đến với DU1
                </h1>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="h-1 bg-linear-to-r from-transparent via-cyan-500 to-transparent mx-auto"
                />
              </motion.div>

              {/* Subtitle with tech keywords */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="text-center space-y-4 mb-12 max-w-3xl"
              >
                <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
                  Khám phá không gian làm việc của team
                </p>
                <div className="flex flex-wrap justify-center gap-3 mt-6">
                  {[
                    'Innovation',
                    'Technology',
                    'Collaboration',
                    'Excellence',
                  ].map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                      className="px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full text-cyan-300 text-sm font-medium"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 20px 60px rgba(59, 130, 246, 0.5)',
                }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStart}
                className="group relative px-10 py-4 bg-linear-to-r from-blue-600 to-cyan-600 rounded-xl font-semibold text-lg text-white shadow-2xl shadow-blue-500/40 overflow-hidden transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Khám phá ngay
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-cyan-600 to-blue-600"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              {/* Footer hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex flex-col items-center gap-2 text-slate-400"
                >
                  <span className="text-sm font-medium">Scroll to explore</span>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hiển thị 3 sections khi openDuration === 0.5 */}
      <AnimatePresence>
        {openDuration === 0.5 && !isFollowingPath && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex gap-4 px-4"
          >
            {sections
              .slice(1)
              .filter((s) => s.id !== selectedSection?.id)
              .map((section, index) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  index={index + 1}
                  onClick={handleSectionClick}
                />
              ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nút quay lại khi đã chọn section */}
      <AnimatePresence>
        {selectedSection && selectedSection.id !== 0 && !isFollowingPath && (
          <motion.button
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedSection(sections[0])}
            className="absolute top-8 left-8 z-10 px-6 py-3 bg-white/90 backdrop-blur-md rounded-full font-semibold text-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            ← Quay lại
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hiển thị thông tin chi tiết về section được chọn */}
      <AnimatePresence>
        {selectedSection && selectedSection.id !== 0 && !isFollowingPath && (
          <SectionDetail
            section={selectedSection}
            sections={sections}
            onSectionClick={handleSectionClick}
          />
        )}
      </AnimatePresence>

      <Canvas>
        <CameraScroll
          isPlaying={isPlaying}
          selectedSection={selectedSection}
          setIsFollowingPath={setIsFollowingPath}
        />
        {/* <CameraDebug /> */}
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          {/* <axesHelper args={[5]} /> */}
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={1} />
          <IsometricOffice
            openDuration={openDuration}
            sectionId={selectedSection?.id}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;

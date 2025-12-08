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

// Memoized SectionCard component
const SectionCard = memo(({ section, index, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    whileHover={{ scale: 1.05, y: -5 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => onClick(section)}
    className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl cursor-pointer hover:shadow-purple-500/30 transition-all duration-300 min-w-[200px] max-w-[250px]"
  >
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
          {section.id}
        </div>
        <h3 className="text-lg font-bold text-gray-800">{section.title}</h3>
      </div>
      <p className="text-sm text-gray-600">{section.description}</p>
    </div>
  </motion.div>
));

SectionCard.displayName = 'SectionCard';

// Memoized SectionDetail component
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
      className="absolute top-8 right-8 z-10 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-md"
    >
      {/* Header với gradient */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className={`bg-linear-to-r ${section.details.color} p-6 rounded-2xl mb-6 shadow-lg`}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-xl">
            {section.id}
          </div>
          <h2 className="text-2xl font-bold text-white">{section.title}</h2>
        </div>
        <p className="text-white/90 text-sm">{section.description}</p>
      </motion.div>

      {/* Thông tin chi tiết */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="space-y-4"
      >
        {/* Số lượng thành viên */}
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {section.details.members}
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Thành viên</p>
            <p className="text-sm text-gray-700 font-semibold">
              {section.details.members} người
            </p>
          </div>
        </div>

        {/* Đặc điểm */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
            Đặc điểm nổi bật
          </h3>
          <div className="space-y-2">
            {section.details.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
              >
                <div
                  className={`w-2 h-2 rounded-full bg-linear-to-r ${section.details.color}`}
                />
                <p className="text-sm text-gray-700">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="flex gap-2 pt-4"
        >
          {otherSections.map((s) => (
            <motion.button
              key={s.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSectionClick(s)}
              className={`flex-1 py-2 px-3 rounded-lg bg-linear-to-r ${s.details.color} text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all`}
            >
              {s.title}
            </motion.button>
          ))}
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

  // Memoize sections data để tránh re-create mỗi render
  const sections = useMemo(
    () => [
      {
        id: 0,
        title: 'Lối vào chính',
        description: 'Chào mừng bạn đến với văn phòng',
        position: [0, 2, -6],
        lookAt: [0, 1, -50],
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
    return ({ isPlaying, selectedSection }) => {
      const { camera } = useThree();

      // Memoize vector positions
      const start = useRef(new THREE.Vector3(0, 2.5, 6));
      const end = useRef(new THREE.Vector3(0, 2.5, -6));
      const targetVector = useRef(new THREE.Vector3());
      const targetLookAt = useRef(new THREE.Vector3());
      const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

      useEffect(() => {
        if (!isPlaying) {
          camera.position.copy(start.current);
        }
      }, [isPlaying, camera]);

      useFrame((_, delta) => {
        // Animation di chuyển đến section được chọn
        if (selectedSection) {
          // Smooth position lerp
          targetVector.current.set(...selectedSection.position);
          camera.position.lerp(targetVector.current, 1 - Math.exp(-delta));

          // Smooth lookAt transition với lerp
          targetLookAt.current.set(...selectedSection.lookAt);
          currentLookAt.current.lerp(
            targetLookAt.current,
            1 - Math.exp(-3 * delta)
          );
          camera.lookAt(currentLookAt.current);

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
    folder.add(debug, 'lookAtX', -100, 100, 0.1).onChange((value) => {
      lookAtDebug[1]([value, debug.lookAtY, debug.lookAtZ]);
    });
    folder.add(debug, 'lookAtY', -100, 100, 0.1).onChange((value) => {
      lookAtDebug[1]([debug.lookAtX, value, debug.lookAtZ]);
    });
    folder.add(debug, 'lookAtZ', -100, 100, 0.1).onChange((value) => {
      lookAtDebug[1]([debug.lookAtX, debug.lookAtY, value]);
    });
    return () => {
      gui.destroy();
    };
  }, []);
  return (
    <div className="fixed w-full h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      {/* Màn hình chào mừng với Framer Motion */}
      <AnimatePresence mode="wait">
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              filter: 'blur(10px)',
            }}
            transition={{
              duration: 0.8,
              ease: [0.43, 0.13, 0.23, 0.96], // Custom easing cho smooth hơn
            }}
            className="absolute inset-0 z-20 bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 flex flex-col items-center justify-center gap-8"
          >
            <div className="text-center space-y-4 px-4">
              <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
                className="text-6xl md:text-7xl font-bold text-white drop-shadow-2xl"
              >
                Chào mừng bạn
              </motion.h1>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
                className="text-xl md:text-2xl text-white/90 font-light"
              >
                Khám phá văn phòng 3D của chúng tôi
              </motion.p>
            </div>

            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.6,
                duration: 0.5,
                type: 'spring',
                stiffness: 200,
              }}
              whileHover={{
                scale: 1.1,
                boxShadow: '0 20px 40px rgba(168, 85, 247, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="relative px-8 py-4 bg-white text-purple-600 rounded-full font-semibold text-lg shadow-2xl"
            >
              <span className="relative z-10">Bắt đầu khám phá</span>
              <motion.div
                className="absolute inset-0 rounded-full bg-linear-to-r from-purple-400 to-pink-400"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.2 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hiển thị 3 sections khi openDuration === 0.5 */}
      <AnimatePresence>
        {openDuration === 0.5 && (
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
        {selectedSection && selectedSection.id !== 0 && (
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
        {selectedSection && selectedSection.id !== 0 && (
          <SectionDetail
            section={selectedSection}
            sections={sections}
            onSectionClick={handleSectionClick}
          />
        )}
      </AnimatePresence>

      <Canvas>
        <CameraScroll isPlaying={isPlaying} selectedSection={selectedSection} />
        {/* <CameraDebug /> */}
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <axesHelper args={[5]} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={1} />
          <IsometricOffice openDuration={openDuration} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;

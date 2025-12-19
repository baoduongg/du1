import { Canvas } from '@react-three/fiber';
import React, { Suspense, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stats } from '@react-three/drei';
import GUI from 'lil-gui';

import { IsometricOffice } from './components/IsometricOffice.jsx';
import WelcomeScreen from './components/WelcomeScreen.jsx';
import SectionCard from './components/SectionCard.jsx';
import SectionDetail from './components/SectionDetail.jsx';
import CameraController from './components/CameraController.jsx';
import CameraFixed from './components/CameraFixed.jsx';
import { useSections } from './hooks/useSections.js';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [openDuration, setOpenDuration] = useState(0);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isFollowingPath, setIsFollowingPath] = useState(false);
  const [focusSeatPosition, setFocusSeatPosition] = useState(null);
  const [cameraMode, setCameraMode] = useState('controller'); // 'controller' hoặc 'fixed'
  // Get sections data from custom hook
  const sections = useSections();

  // Memoize handlers để tránh re-create mỗi render
  const handleStart = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handleSectionClick = useCallback((section) => {
    setSelectedSection(section);
  }, []);

  const cameraPosDebug = useState([0, 2, -6]);
  const lookAtDebug = useState([0, 1, -50]);

  const handleFocusMember = useCallback((position) => {
    if (position) {
      setFocusSeatPosition(position);
    } else {
      setFocusSeatPosition(null);
    }
  }, []);

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
  }, [cameraPosDebug, lookAtDebug]);

  return (
    <div className="fixed w-full h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      {/* Màn hình chào mừng chuyên nghiệp */}
      <WelcomeScreen isPlaying={isPlaying} onStart={handleStart} />

      {/* Hiển thị 3 sections khi openDuration === 0.5 */}
      <AnimatePresence>
        {openDuration === 0.5 && !isFollowingPath && !focusSeatPosition && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute bottom-1 z-10 flex gap-4 px-4"
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

      {/* Nút quay lại khi đã chọn section hoặc đang focus member */}
      <AnimatePresence>
        {selectedSection && selectedSection.id !== 0 && !isFollowingPath && (
          <motion.button
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              if (focusSeatPosition) {
                // Nếu đang focus vào seat, quay lại overview section
                setFocusSeatPosition(null);
              } else {
                // Nếu không, quay lại trang chính
                setSelectedSection(sections[0]);
              }
            }}
            className="absolute top-8 left-8 z-10 px-6 py-3 bg-white/90 backdrop-blur-md rounded-full font-semibold text-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            ← {focusSeatPosition ? 'Quay lại overview' : 'Quay lại'}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hiển thị thông tin chi tiết về section được chọn */}
      <AnimatePresence>
        {selectedSection &&
          selectedSection.id !== 0 &&
          !isFollowingPath &&
          !focusSeatPosition && (
            <SectionDetail
              section={selectedSection}
              sections={sections}
              onSectionClick={handleSectionClick}
            />
          )}
      </AnimatePresence>

      <Canvas>
        {/* Stats để theo dõi hiệu suất render */}
        <Stats showPanel={0} className="stats-panel" />

        <CameraController
          enable={cameraMode === 'controller'}
          isPlaying={isPlaying}
          selectedSection={selectedSection}
          focusSeatPosition={focusSeatPosition}
          setIsFollowingPath={setIsFollowingPath}
          setOpenDuration={setOpenDuration}
        />
        <CameraFixed
          enable={cameraMode === 'fixed'}
          cameraPosDebug={cameraPosDebug}
          lookAtDebug={lookAtDebug}
        />
        {/* <CameraDebug cameraPosDebug={cameraPosDebug} lookAtDebug={lookAtDebug} /> */}
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          {/* <axesHelper args={[5]} /> */}
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={1} />
          <IsometricOffice
            openDuration={openDuration}
            sectionId={selectedSection?.id}
            onFocusMember={handleFocusMember}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;

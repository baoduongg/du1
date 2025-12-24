import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
const path = '/src/assets/models/isometric_office/test.glb';
import { motion, AnimatePresence } from 'framer-motion';
import { DeskInstances } from './DeskInstances.jsx';
import { WORKSTATION_POSITIONS } from '../data/workstations.js';

const SEAT_DATA = {
  phongdbt: {
    name: 'Phong',
    role: 'Senior Developer',
    status: 'Online',
    section_id: 3,
    bio: 'Chuyên gia về React và Three.js với hơn 5 năm kinh nghiệm xây dựng các ứng dụng web tương tác.',
    skills: ['React', 'Three.js', 'Node.js'],
    socials: { github: '#', linkedin: '#' },
    cameraPosition: [5.878, 4, -37.724],
    cameraLookAt: [5.878, 0.899, -42.724]
  },
  ylpb: {
    name: 'Bảo Ý',
    role: 'Frontend Developer',
    status: 'Online',
    section_id: 3,
    bio: 'Đam mê tạo ra các giao diện người dùng mượt mà và trải nghiệm người dùng tuyệt vời.',
    skills: ['Vue.js', 'Tailwind', 'Framer Motion'],
    socials: { github: '#', linkedin: '#' },
    cameraPosition: [8.278, 4, -37.724],
    cameraLookAt: [8.278, 0.899, -42.724]
  },
  nhulpb: {
    name: 'Bảo Như',
    role: 'UI/UX Designer',
    status: 'Online',
    section_id: 3,
    bio: 'Người đứng sau những thiết kế tinh tế và hiện đại của team DU1.',
    skills: ['Figma', 'Adobe XD', 'Prototyping'],
    socials: { dribbble: '#', behance: '#' },
    cameraPosition: [10.678, 4, -37.724],
    cameraLookAt: [10.678, 0.899, -42.724]
  },
  duongnb: {
    name: 'Dương',
    role: 'Fullstack Developer',
    status: 'Online',
    section_id: 3,
    bio: 'Chuyên gia về React và Three.js với hơn 5 năm kinh nghiệm xây dựng các ứng dụng web tương tác.',
    skills: ['React', 'Three.js', 'Node.js', 'MaUI', '...'],
    socials: { github: '#', stackoverflow: '#' },
    cameraPosition: [13.078, 4, -37.724],
    cameraLookAt: [13.078, 0.899, -42.724]
  },
  quinn: {
    name: 'Quinn',
    role: 'Team Leader',
    status: 'Online',
    section_id: 3,
    bio: 'Dẫn dắt team DU1 chinh phục những thử thách công nghệ mới nhất.',
    skills: ['Leadership', 'Architecture', 'Strategy'],
    socials: { linkedin: '#', twitter: '#' },
    cameraPosition: [15.478, 4, -37.724],
    cameraLookAt: [15.478, 0.899, -42.724]
  },
  tuanvm: {
    name: 'Tuấn',
    role: 'Flutter Leader',
    status: 'Online',
    section_id: 3,
    bio: 'Chuyên gia phát triển ứng dụng di động đa nền tảng với Flutter.',
    skills: ['Flutter', 'Dart', 'Firebase'],
    socials: { github: '#', linkedin: '#' },
    cameraPosition: [12.639, 5, -42.123],
    cameraLookAt: [12.639, 2.021, -37.123]
  },
  tamtm: {
    name: 'Tâm', role: 'Dev', status: 'Online', section_id: 3,
    bio: 'Nhiệt huyết và luôn sẵn sàng học hỏi công nghệ mới.',
    skills: ['Javascript', 'CSS'], socials: {},
    cameraPosition: [10.819, 5, -42.123],
    cameraLookAt: [10.819, 2.021, -37.123]
  },
  duyqk: {
    name: 'Duy', role: 'Dev', status: 'Online', section_id: 3,
    bio: 'Tập trung vào việc xây dựng các thành phần UI có thể tái sử dụng.',
    skills: ['React', 'TypeScript'], socials: {},
    cameraPosition: [8.945, 5, -42.123],
    cameraLookAt: [8.945, 2.021, -37.123]
  },
  luanpvd: {
    name: 'Luân', role: 'Dev', status: 'Online', section_id: 3,
    bio: 'Yêu thích việc tối ưu hóa quy trình phát triển phần mềm.',
    skills: ['Git', 'CI/CD'], socials: {},
    cameraPosition: [7.188, 5, -42.122],
    cameraLookAt: [7.188, 2.021, -37.122]
  },
  trind: {
    name: 'Trí', role: 'Dev', status: 'Online', section_id: 3,
    bio: 'Luôn tìm kiếm những giải pháp sáng tạo cho các vấn đề kỹ thuật.',
    skills: ['Go', 'Microservices'], socials: {},
    cameraPosition: [5.35, 5, -42.121],
    cameraLookAt: [5.35, 2.021, -37.121]
  },
  banglt: {
    name: 'Bằng', role: 'PM', status: 'Online', section_id: 3,
    bio: 'Đảm bảo mọi dự án đều về đích đúng hạn và đạt chất lượng cao nhất.',
    skills: ['Agile', 'Scrum', 'Management'], socials: {},
    cameraPosition: [12.648, 5, -28.011],
    cameraLookAt: [12.648, 2.021, -33.011]
  },
  hieucg: {
    name: 'Hiếu', role: 'Dev', status: 'Online', section_id: 3,
    bio: 'Chuyên gia về backend và xử lý dữ liệu lớn.',
    skills: ['Java', 'Spring Boot'], socials: {},
    cameraPosition: [10.809, 5, -28.011],
    cameraLookAt: [10.809, 2.021, -33.011]
  },
  hautc: {
    name: 'Hậu', role: 'Dev', status: 'Online', section_id: 3,
    bio: 'Đam mê xây dựng các ứng dụng web thời gian thực.', socials: {},
    cameraPosition: [8.995, 5, -28.011],
    cameraLookAt: [8.995, 2.021, -33.011]
  },
  minhpvl: {
    name: 'Minh', role: 'Dev', status: 'Online', section_id: 3,
    bio: 'Luôn chú trọng vào tính bảo mật và ổn định của hệ thống.', socials: {},
    cameraPosition: [7.178, 5, -28.01],
    cameraLookAt: [7.178, 2.021, -33.01]
  },
  hungnd: {
    name: 'Hùng', role: 'Dev', status: 'Online', section_id: 3,
    bio: 'Thích khám phá các công nghệ mới trong lĩnh vực AI và Machine Learning.', socials: {},
    cameraPosition: [5.358, 5, -28.009],
    cameraLookAt: [5.358, 2.021, -33.009]
  },
};

// Component hiển thị icon phía trên ghế
function SeatIcon({ visible, data, position, seatId, activeSeat, onToggle }) {
  const showInfo = activeSeat === seatId;
  const isOnline = data?.status === 'Online';

  if (!visible) return null;

  return (
    <Html
      position={position}
      center
      distanceFactor={10}
    >
      <div className="flex flex-col items-center -translate-y-24 relative group">
        {/* Main Floating Avatar */}
        <div
          className={`
            relative w-16 h-16 rounded-2xl cursor-pointer
            transition-all duration-500 ease-out
            hover:scale-110 hover:-translate-y-2
            ${showInfo ? 'scale-110 -translate-y-2' : ''}
          `}
          onClick={() => onToggle(seatId)}
        >
          {/* 3D Layered Effect */}
          <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse" />

          <div className={`
            absolute inset-0 rounded-2xl border-2 border-white/30 backdrop-blur-md
            flex items-center justify-center overflow-hidden shadow-2xl
            ${isOnline
              ? 'bg-linear-to-br from-blue-500/80 to-indigo-600/80'
              : 'bg-linear-to-br from-slate-600/80 to-slate-800/80'}
          `}>
            {/* Avatar Content */}
            <span className="text-2xl font-black text-white drop-shadow-md">
              {data?.name.charAt(0).toUpperCase()}
            </span>

            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent pointer-events-none" />
          </div>

          {/* Status Ring */}
          <div className={`
            absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white shadow-lg
            ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}
          `} />
        </div>

        {/* Floating Name Tag */}
        <div className={`
          mt-4 px-4 py-1.5 rounded-full backdrop-blur-xl border border-white/20
          text-sm font-bold text-white shadow-xl transition-all duration-300
          ${showInfo ? 'bg-blue-600/90 scale-110' : 'bg-slate-900/60 group-hover:bg-slate-900/80'}
        `}>
          {data?.name}
        </div>

        {/* Detailed Info Card - Premium Redesign */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="absolute top-full mt-6 bg-slate-900/95 backdrop-blur-2xl rounded-[2rem] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-white/10 min-w-[320px] z-50 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 blur-[80px] rounded-full" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/20 blur-[80px] rounded-full" />

              <div className="relative">
                {/* Header */}
                <div className="flex items-center gap-5 mb-6">
                  <div className={`
                    w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black text-white shadow-2xl
                    bg-linear-to-br from-blue-500 to-indigo-600 border border-white/20
                  `}>
                    {data?.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white tracking-tight leading-none mb-2">
                      {data?.name}
                    </h3>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-500/30">
                      {data?.role}
                    </span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                  "{data?.bio || 'Thành viên nhiệt huyết của team DU1 Creative.'}"
                </p>

                {/* Skills */}
                {data?.skills && (
                  <div className="mb-6">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">
                      Kỹ năng chuyên môn
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-slate-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Socials & Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div className="flex gap-3">
                    {/* Placeholder social icons */}
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                      <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                      <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                    </div>
                  </div>

                  <button
                    className="px-6 py-2 bg-white text-slate-950 rounded-xl text-xs font-black hover:bg-blue-400 transition-all active:scale-95"
                    onClick={() => onToggle(null)}
                  >
                    ĐÓNG
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Html>
  );
}

export function IsometricOffice(props) {
  const { nodes, materials } = useGLTF(path);

  const [durationDoor, setDurationDoor] = useState();
  const [activeSeat, setActiveSeat] = useState(null);
  const deskInstanceRef = useRef();
  const deskPositions = useMemo(
    () => [
      // Hàng 1 - Facing back (-38.047)
      {
        seatId: 'quinn',
        position: [15.478, 0.899, -42.724],
        rotation: [0, -1.571, 0],
        scale: [-0.464, -0.074, -0.913],
      },
      {
        seatId: 'duongnb',
        position: [13.078, 0.899, -42.724],
        rotation: [0, -1.571, 0],
        scale: [-0.464, -0.074, -0.913],
      },
      {
        seatId: 'nhulpb',
        position: [10.678, 0.899, -42.724],
        rotation: [0, -1.571, 0],
        scale: [-0.464, -0.074, -0.913],
      },
      {
        seatId: 'ylpb',
        position: [8.278, 0.899, -42.724],
        rotation: [0, -1.571, 0],
        scale: [-0.464, -0.074, -0.913],
      },
      {
        seatId: 'phongdbt',
        position: [5.878, 0.899, -42.724],
        rotation: [0, -1.571, 0],
        scale: [-0.464, -0.074, -0.913],
      },
      // Hàng 2 - Facing front (-37.123/-37.122/-37.121)
      {
        seatId: 'tuanvm',
        position: [12.639, 2.021, -37.123],
        rotation: [0, 1.57, 0],
        scale: [-0.464, -0.074, -0.913],
      },
      {
        seatId: 'tamtm',
        position: [10.819, 2.021, -37.123],
        rotation: [0, 1.57, 0],
        scale: [-0.464, -0.074, -0.913],
      },
      {
        seatId: 'duyqk',
        position: [8.945, 2.021, -37.123],
        rotation: [0, 1.57, 0],
        scale: [-0.464, -0.074, -0.913],
      },
      {
        seatId: 'luanpvd',
        position: [7.188, 2.021, -37.122],
        rotation: [0, 1.57, 0],
        scale: [-0.464, -0.074, -0.913],
      },
      {
        seatId: 'trind',
        position: [5.35, 2.021, -37.121],
        rotation: [0, 1.57, 0],
        scale: [-0.464, -0.074, -0.913],
      },
      // Hàng 3 - Facing back (-33.011/-33.01/-33.009)
      {
        seatId: 'banglt',
        position: [12.648, 2.021, -33.011],
        rotation: [0, -1.57, 0],
        scale: [-0.464, -0.074, -0.913],
      },
      {
        seatId: 'hieucg',
        position: [10.809, 2.021, -33.011],
        rotation: [0, -1.57, 0],
        scale: [-0.464, -0.074, -0.913],
      },
      {
        seatId: 'hautc',
        position: [8.995, 2.021, -33.011],
        rotation: [0, -1.57, 0],
        scale: [-0.464, -0.074, -0.913],
      },
      {
        seatId: 'minhpvl',
        position: [7.178, 2.021, -33.01],
        rotation: [0, -1.57, 0],
        scale: [-0.464, -0.074, -0.913],
      },
      {
        seatId: 'hungnd',
        position: [5.358, 2.021, -33.009],
        rotation: [0, -1.57, 0],
        scale: [-0.464, -0.074, -0.913],
      },
    ],
    []
  );

  const handleSeatToggle = (seatId) => {
    setActiveSeat(activeSeat === seatId ? null : seatId);
    if (props.onFocusMember) {
      if (seatId) {
        const seat = SEAT_DATA[seatId];
        const desk = deskPositions.find((d) => d.seatId === seatId);
        props.onFocusMember({
          position: seat.cameraPosition || [desk.position[0], desk.position[1] + 4, desk.position[2] + 5],
          lookAt: seat.cameraLookAt || desk.position
        });
      } else {
        props.onFocusMember(null);
      }
    }
  };

  useEffect(() => {
    setDurationDoor(props.openDuration);
  }, [props.openDuration]);

  return (
    <group {...props} dispose={null}>
      {deskPositions.map((desk) => (
        <SeatIcon
          key={desk.seatId}
          visible={props.sectionId === SEAT_DATA[desk.seatId].section_id}
          data={SEAT_DATA[desk.seatId]}
          position={desk.position}
          seatId={desk.seatId}
          activeSeat={activeSeat}
          onToggle={handleSeatToggle}
        />
      ))}

      <mesh
        name="GemCube"
        castShadow
        receiveShadow
        geometry={nodes.GemCube.geometry}
        material={materials.ProGlass}
        position={[0.246, 3.163, -42.569]}
        rotation={[-2.954, 1.569, 1.388]}
        scale={[3.266, 4.969, 4.498]}
      />
      <DeskInstances
        workstations={WORKSTATION_POSITIONS}
        nodes={nodes}
        materials={materials}
        onDeskClick={handleSeatToggle}
      />
      <mesh
        name="GemCube001"
        castShadow
        receiveShadow
        geometry={nodes.GemCube001.geometry}
        material={materials['ProGlass.001']}
        position={[1.701, 3.163, -20.239]}
        rotation={[-0.119, 1.568, -1.448]}
        scale={[3.266, 4.968, 2.085]}
      />
      <mesh
        name="Cube"
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={nodes.Cube.material}
        position={[0, -0.947, -32.712]}
        scale={[13.744, 1, 19.954]}
      />
      <mesh
        name="Cube001"
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={nodes.Cube001.material}
        position={[0, 2.414, -48.598]}
        scale={[31.028, 4.243, 1]}
      />
      <mesh
        name="Cube002"
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={nodes.Cube002.material}
        position={[24.825, 2.414, -31.915]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[17.57, 4.243, 1]}
      />
      <mesh
        name="Main_Door_Frame"
        castShadow
        receiveShadow
        geometry={nodes.Main_Door_Frame.geometry}
        material={materials.DoorFrameMeta}
        position={[-7.084, 7.749, -14.977]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[8.402, 0.6, 0.6]}>
        <mesh
          name="Door_Leaf_Left"
          castShadow
          receiveShadow
          geometry={nodes.Door_Leaf_Left.geometry}
          material={materials.ProGlass}
          position={[-0.42, -6.75, 0]}
          rotation={[0, -1.571, 0]}
          scale={[0.6, 12.5, 0.029]}
        />
        <mesh
          name="Door_Leaf_Right"
          castShadow
          receiveShadow
          geometry={nodes.Door_Leaf_Right.geometry}
          material={materials.ProGlass}
          position={[0.408, -6.952, -0.201]}
          rotation={[0, 1.571, 0]}
          scale={[0.6, 12.5, 0.029]}
        />
      </mesh>
    </group>
  )
}
useGLTF.preload(path);

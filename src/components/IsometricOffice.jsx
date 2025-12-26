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
    cameraPosition: [8.378, 4.399, -38.724],
    cameraLookAt: [5.878, 1.399, -42.724]
  },
  ylpb: {
    name: 'Bảo Ý',
    role: 'Frontend Developer',
    status: 'Online',
    section_id: 3,
    bio: 'Đam mê tạo ra các giao diện người dùng mượt mà và trải nghiệm người dùng tuyệt vời.',
    skills: ['Vue.js', 'Tailwind', 'Framer Motion'],
    socials: { github: '#', linkedin: '#' },
    cameraPosition: [10.778, 4.399, -38.724],
    cameraLookAt: [8.278, 1.399, -42.724]
  },
  nhulpb: {
    name: 'Bảo Như',
    role: 'UI/UX Designer',
    status: 'Online',
    section_id: 3,
    bio: 'Người đứng sau những thiết kế tinh tế và hiện đại của team DU1.',
    skills: ['Figma', 'Adobe XD', 'Prototyping'],
    socials: { dribbble: '#', behance: '#' },
    cameraPosition: [13.178, 4.399, -38.724],
    cameraLookAt: [10.678, 1.399, -42.724]
  },
  duongnb: {
    name: 'Dương',
    role: 'Fullstack Developer',
    status: 'Online',
    section_id: 3,
    bio: 'Chuyên gia về React và Three.js với hơn 5 năm kinh nghiệm xây dựng các ứng dụng web tương tác.',
    skills: ['React', 'Three.js', 'Node.js', 'MaUI', '...'],
    socials: { github: '#', stackoverflow: '#' },
    cameraPosition: [15.578, 4.399, -38.724],
    cameraLookAt: [13.078, 1.399, -42.724]
  },
  quinn: {
    name: 'Quinn',
    role: 'Team Leader',
    status: 'Online',
    section_id: 3,
    bio: 'Dẫn dắt team DU1 chinh phục những thử thách công nghệ mới nhất.',
    skills: ['Leadership', 'Architecture', 'Strategy'],
    socials: { linkedin: '#', twitter: '#' },
    cameraPosition: [17.978, 4.399, -38.724],
    cameraLookAt: [15.478, 1.399, -42.724]
  },
  tuanvm: {
    name: 'Tuấn',
    role: 'Flutter Leader',
    status: 'Online',
    section_id: 3,
    bio: 'Chuyên gia phát triển ứng dụng di động đa nền tảng với Flutter.',
    skills: ['Flutter', 'Dart', 'Firebase'],
    socials: { github: '#', linkedin: '#' },
    cameraPosition: [15.139, 5.521, -41.123],
    cameraLookAt: [12.639, 2.521, -37.123]
  },
  tamtm: {
    name: 'Tâm', role: 'Dev', status: 'Online', section_id: 3,
    bio: 'Nhiệt huyết và luôn sẵn sàng học hỏi công nghệ mới.',
    skills: ['Javascript', 'CSS'], socials: {},
    cameraPosition: [13.319, 5.521, -41.123],
    cameraLookAt: [10.819, 2.521, -37.123]
  },
  duyqk: {
    name: 'Duy', role: 'Dev', status: 'Online', section_id: 3,
    bio: 'Tập trung vào việc xây dựng các thành phần UI có thể tái sử dụng.',
    skills: ['React', 'TypeScript'], socials: {},
    cameraPosition: [11.445, 5.521, -41.123],
    cameraLookAt: [8.945, 2.521, -37.123]
  },
  luanpvd: {
    name: 'Luân', role: 'Dev', status: 'Online', section_id: 3,
    bio: 'Yêu thích việc tối ưu hóa quy trình phát triển phần mềm.',
    skills: ['Git', 'CI/CD'], socials: {},
    cameraPosition: [9.688, 5.521, -41.122],
    cameraLookAt: [7.188, 2.521, -37.122]
  },
  trind: {
    name: 'Trí', role: 'Dev', status: 'Online', section_id: 3,
    bio: 'Luôn tìm kiếm những giải pháp sáng tạo cho các vấn đề kỹ thuật.',
    skills: ['Go', 'Microservices'], socials: {},
    cameraPosition: [7.85, 5.521, -41.121],
    cameraLookAt: [5.35, 2.521, -37.121]
  },
  banglt: {
    name: 'Bằng', role: 'PM', status: 'Online', section_id: 3,
    bio: 'Đảm bảo mọi dự án đều về đích đúng hạn và đạt chất lượng cao nhất.',
    skills: ['Agile', 'Scrum', 'Management'], socials: {},
    cameraPosition: [15.148, 5.521, -29.011],
    cameraLookAt: [12.648, 2.521, -33.011]
  },
  hieucg: {
    name: 'Hiếu', role: 'Dev', status: 'Online', section_id: 3,
    bio: 'Chuyên gia về backend và xử lý dữ liệu lớn.',
    skills: ['Java', 'Spring Boot'], socials: {},
    cameraPosition: [13.309, 5.521, -29.011],
    cameraLookAt: [10.809, 2.521, -33.011]
  },
  hautc: {
    name: 'Hậu', role: 'Dev', status: 'Online', section_id: 3,
    bio: 'Đam mê xây dựng các ứng dụng web thời gian thực.', socials: {},
    cameraPosition: [11.495, 5.521, -29.011],
    cameraLookAt: [8.995, 2.521, -33.011]
  },
  minhpvl: {
    name: 'Minh', role: 'Dev', status: 'Online', section_id: 3,
    bio: 'Luôn chú trọng vào tính bảo mật và ổn định của hệ thống.', socials: {},
    cameraPosition: [9.678, 5.521, -29.01],
    cameraLookAt: [7.178, 2.521, -33.01]
  },
  hungnd: {
    name: 'Hùng', role: 'Dev', status: 'Online', section_id: 3,
    bio: 'Thích khám phá các công nghệ mới trong lĩnh vực AI và Machine Learning.', socials: {},
    cameraPosition: [7.858, 5.521, -29.009],
    cameraLookAt: [5.358, 2.521, -33.009]
  },
};

// Component hiển thị icon phía trên ghế - Premium Design
function SeatIcon({ visible, data, position, seatId, activeSeat, onToggle }) {
  const showInfo = activeSeat === seatId;
  const isOnline = data?.status === 'Online';

  if (!visible) return null;

  return (
    <Html
      position={position}
      center
      distanceFactor={12}
      zIndexRange={[0, 100]}
    >
      <div className="flex flex-col items-center -translate-y-12 relative">
        {/* State 1: Minimal Name Marker - Always visible when not active */}
        <AnimatePresence mode="wait">
          {!showInfo ? (
            <motion.div
              key="marker"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              whileHover={{ scale: 1.05, y: -2 }}
              onClick={() => onToggle(seatId)}
              className="cursor-pointer group flex flex-col items-center"
            >
              {/* Floating Dot Indicator */}
              <div className={`
                w-3 h-3 rounded-full mb-2 shadow-[0_0_15px_rgba(59,130,246,0.5)]
                transition-all duration-300 group-hover:scale-125
                ${isOnline ? 'bg-blue-400 animate-pulse' : 'bg-slate-500'}
              `} />

              {/* Name Tag */}
              <div className={`
                px-4 py-1.5 rounded-full backdrop-blur-md border border-white/20
                text-xs font-bold text-white tracking-wide shadow-lg
                bg-slate-900/40 group-hover:bg-blue-600/80 transition-all duration-300
                flex items-center gap-2
              `}>
                <span className="opacity-70">#</span>
                {data?.name}
              </div>
            </motion.div>
          ) : (
            /* State 2: Premium Detail Card - Visible when clicked */
            <motion.div
              key="profile"
              initial={{ opacity: 0, scale: 0.5, y: 50, rotateX: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20, rotateX: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative z-50 pt-20" // Offset for the avatar
              onClick={(e) => e.stopPropagation()}
            >
              {/* Profile Card Container */}
              <div className="relative bg-slate-950/80 backdrop-blur-3xl rounded-[2.5rem] p-8 shadow-[0_40px_120px_rgba(0,0,0,0.7)] border border-white/10 min-w-[340px] overflow-hidden group">

                {/* Advanced Light Effects */}
                <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full group-hover:bg-blue-600/30 transition-all duration-700" />
                <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-indigo-600/20 blur-[100px] rounded-full group-hover:bg-indigo-600/30 transition-all duration-700" />

                {/* Close Button - Top Right */}
                <button
                  onClick={() => onToggle(null)}
                  className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all active:scale-90"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                {/* Content Layout */}
                <div className="relative">
                  {/* Floating Avatar (Negative margin to burst out top) */}
                  <div className="absolute -top-24 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full scale-110 animate-pulse" />
                      <div className={`
                        w-24 h-24 rounded-3xl flex items-center justify-center text-4xl font-black text-white shadow-2xl
                        bg-linear-to-br from-blue-500 to-indigo-600 border-4 border-slate-950
                      `}>
                        {data?.name.charAt(0).toUpperCase()}
                      </div>
                      {/* Status Badge */}
                      <div className={`
                        absolute -bottom-1 -right-1 w-7 h-7 rounded-full border-4 border-slate-950 shadow-xl
                        ${isOnline ? 'bg-emerald-500' : 'bg-slate-500'}
                      `} />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="mt-6 text-center">
                    <h3 className="text-3xl font-black text-white tracking-tight mb-1">
                      {data?.name}
                    </h3>
                    <p className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                      {data?.role}
                    </p>

                    <div className="h-px w-12 bg-white/10 mx-auto mb-6" />

                    <p className="text-slate-400 text-sm leading-relaxed mb-8 italic px-4">
                      "{data?.bio || 'Crafting digital experiences at DU1 Creative.'}"
                    </p>

                    {/* Skill Pills */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                      {data?.skills?.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Action Footer */}
                    <div className="flex items-center gap-3">
                      <button className="flex-1 py-3 bg-white text-slate-950 rounded-2xl text-[11px] font-black tracking-widest uppercase hover:bg-blue-400 transition-all hover:-translate-y-0.5 active:translate-y-0">
                        View Profile
                      </button>
                      <div className="flex gap-2">
                        <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-all">
                          <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                        </div>
                      </div>
                    </div>
                  </div>
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

  // Global Material Refinement for Realism
  useMemo(() => {
    if (materials.Wood) {
      materials.Wood.roughness = 0.5;
      materials.Wood.metalness = 0.1;
      materials.Wood.color = new THREE.Color("#2c1e14"); // Darker, richer wood
    }
    if (materials.DarkMetal) {
      materials.DarkMetal.roughness = 0.2;
      materials.DarkMetal.metalness = 0.8;
      materials.DarkMetal.color = new THREE.Color("#1a1a1a");
    }
    if (materials.Screen) {
      materials.Screen.emissive = new THREE.Color("#0ea5e9");
      materials.Screen.emissiveIntensity = 0.1;
      materials.Screen.roughness = 0.1;
      materials.Screen.metalness = 0.5;
    }
    if (materials.ChairFabric) {
      materials.ChairFabric.roughness = 0.9;
      materials.ChairFabric.metalness = 0;
      materials.ChairFabric.color = new THREE.Color("#1e293b");
    }
  }, [materials]);

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

      <group
        name="linhtlm"
        position={[22.678, 0.899, -31.513]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[2.2, 0.08, 1]}>
        <mesh
          name="Cube1033"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033.geometry}
          material={materials.Wood}
        />
        <mesh
          name="Cube1033_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_1.geometry}
          material={materials.DarkMetal}
        />
        <mesh
          name="Cube1033_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_2.geometry}
          material={materials.Screen}
        />
        <mesh
          name="Cube1033_3"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_3.geometry}
          material={materials.ChairFabric}
        />
      </group>
      <group
        name="maidtk"
        position={[20.278, 0.899, -31.513]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[2.2, 0.08, 1]}>
        <mesh
          name="Cube1033"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033.geometry}
          material={materials.Wood}
        />
        <mesh
          name="Cube1033_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_1.geometry}
          material={materials.DarkMetal}
        />
        <mesh
          name="Cube1033_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_2.geometry}
          material={materials.Screen}
        />
        <mesh
          name="Cube1033_3"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_3.geometry}
          material={materials.ChairFabric}
        />
      </group>
      <group
        name="minhth"
        position={[15.478, 0.899, -29.636]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[2.2, 0.08, 1]}>
        <mesh
          name="Cube1033"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033.geometry}
          material={materials.Wood}
        />
        <mesh
          name="Cube1033_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_1.geometry}
          material={materials.DarkMetal}
        />
        <mesh
          name="Cube1033_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_2.geometry}
          material={materials.Screen}
        />
        <mesh
          name="Cube1033_3"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_3.geometry}
          material={materials.ChairFabric}
        />
      </group>
      <group
        name="nganvtt"
        position={[13.078, 0.899, -29.636]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[2.2, 0.08, 1]}>
        <mesh
          name="Cube1033"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033.geometry}
          material={materials.Wood}
        />
        <mesh
          name="Cube1033_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_1.geometry}
          material={materials.DarkMetal}
        />
        <mesh
          name="Cube1033_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_2.geometry}
          material={materials.Screen}
        />
        <mesh
          name="Cube1033_3"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_3.geometry}
          material={materials.ChairFabric}
        />
      </group>
      <group
        name="hunglt"
        position={[10.678, 0.899, -29.636]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[2.2, 0.08, 1]}>
        <mesh
          name="Cube1033"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033.geometry}
          material={materials.Wood}
        />
        <mesh
          name="Cube1033_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_1.geometry}
          material={materials.DarkMetal}
        />
        <mesh
          name="Cube1033_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_2.geometry}
          material={materials.Screen}
        />
        <mesh
          name="Cube1033_3"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_3.geometry}
          material={materials.ChairFabric}
        />
      </group>
      <group
        name="phuongtd"
        position={[8.278, 0.899, -29.636]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[2.2, 0.08, 1]}>
        <mesh
          name="Cube1033"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033.geometry}
          material={materials.Wood}
        />
        <mesh
          name="Cube1033_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_1.geometry}
          material={materials.DarkMetal}
        />
        <mesh
          name="Cube1033_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_2.geometry}
          material={materials.Screen}
        />
        <mesh
          name="Cube1033_3"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_3.geometry}
          material={materials.ChairFabric}
        />
      </group>
      <group
        name="hungtx"
        position={[5.878, 0.899, -29.636]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[2.2, 0.08, 1]}>
        <mesh
          name="Cube1033"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033.geometry}
          material={materials.Wood}
        />
        <mesh
          name="Cube1033_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_1.geometry}
          material={materials.DarkMetal}
        />
        <mesh
          name="Cube1033_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_2.geometry}
          material={materials.Screen}
        />
        <mesh
          name="Cube1033_3"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_3.geometry}
          material={materials.ChairFabric}
        />
      </group>
      <group name="thuyntm" position={[22.678, 0.899, -34.911]} scale={[2.2, 0.08, 1]}>
        <mesh
          name="Cube1033"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033.geometry}
          material={materials.Wood}
        />
        <mesh
          name="Cube1033_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_1.geometry}
          material={materials.DarkMetal}
        />
        <mesh
          name="Cube1033_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_2.geometry}
          material={materials.Screen}
        />
        <mesh
          name="Cube1033_3"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_3.geometry}
          material={materials.ChairFabric}
        />
      </group>
      <group
        name="banglt"
        position={[15.478, 0.899, -37.136]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[2.2, 0.08, 1]}>
        <mesh
          name="Cube1033"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033.geometry}
          material={materials.Wood}
        />
        <mesh
          name="Cube1033_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_1.geometry}
          material={materials.DarkMetal}
        />
        <mesh
          name="Cube1033_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_2.geometry}
          material={materials.Screen}
        />
        <mesh
          name="Cube1033_3"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_3.geometry}
          material={materials.ChairFabric}
        />
      </group>
      <group
        name="hieucg"
        position={[13.078, 0.899, -37.136]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[2.2, 0.08, 1]}>
        <mesh
          name="Cube1033"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033.geometry}
          material={materials.Wood}
        />
        <mesh
          name="Cube1033_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_1.geometry}
          material={materials.DarkMetal}
        />
        <mesh
          name="Cube1033_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_2.geometry}
          material={materials.Screen}
        />
        <mesh
          name="Cube1033_3"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_3.geometry}
          material={materials.ChairFabric}
        />
      </group>
      <group
        name="hautc"
        position={[10.678, 0.899, -37.136]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[2.2, 0.08, 1]}>
        <mesh
          name="Cube1033"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033.geometry}
          material={materials.Wood}
        />
        <mesh
          name="Cube1033_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_1.geometry}
          material={materials.DarkMetal}
        />
        <mesh
          name="Cube1033_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_2.geometry}
          material={materials.Screen}
        />
        <mesh
          name="Cube1033_3"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_3.geometry}
          material={materials.ChairFabric}
        />
      </group>
      <group
        name="minhpvl"
        position={[8.278, 0.899, -37.136]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[2.2, 0.08, 1]}>
        <mesh
          name="Cube1033"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033.geometry}
          material={materials.Wood}
        />
        <mesh
          name="Cube1033_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_1.geometry}
          material={materials.DarkMetal}
        />
        <mesh
          name="Cube1033_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_2.geometry}
          material={materials.Screen}
        />
        <mesh
          name="Cube1033_3"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_3.geometry}
          material={materials.ChairFabric}
        />
      </group>
      <group
        name="hungnd"
        position={[5.878, 0.899, -37.136]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[2.2, 0.08, 1]}>
        <mesh
          name="Cube1033"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033.geometry}
          material={materials.Wood}
        />
        <mesh
          name="Cube1033_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_1.geometry}
          material={materials.DarkMetal}
        />
        <mesh
          name="Cube1033_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_2.geometry}
          material={materials.Screen}
        />
        <mesh
          name="Cube1033_3"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_3.geometry}
          material={materials.ChairFabric}
        />
      </group>
      <group name="trind" position={[5.878, 0.899, -41.726]} scale={[2.2, 0.08, 1]}>
        <mesh
          name="Cube1033"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033.geometry}
          material={materials.Wood}
        />
        <mesh
          name="Cube1033_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_1.geometry}
          material={materials.DarkMetal}
        />
        <mesh
          name="Cube1033_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_2.geometry}
          material={materials.Screen}
        />
        <mesh
          name="Cube1033_3"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_3.geometry}
          material={materials.ChairFabric}
        />
      </group>
      <group name="luanpvd" position={[8.278, 0.899, -41.726]} scale={[2.2, 0.08, 1]}>
        <mesh
          name="Cube1033"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033.geometry}
          material={materials.Wood}
        />
        <mesh
          name="Cube1033_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_1.geometry}
          material={materials.DarkMetal}
        />
        <mesh
          name="Cube1033_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_2.geometry}
          material={materials.Screen}
        />
        <mesh
          name="Cube1033_3"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_3.geometry}
          material={materials.ChairFabric}
        />
      </group>
      <group name="duyqk" position={[10.678, 0.899, -41.726]} scale={[2.2, 0.08, 1]}>
        <mesh
          name="Cube1033"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033.geometry}
          material={materials.Wood}
        />
        <mesh
          name="Cube1033_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_1.geometry}
          material={materials.DarkMetal}
        />
        <mesh
          name="Cube1033_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_2.geometry}
          material={materials.Screen}
        />
        <mesh
          name="Cube1033_3"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_3.geometry}
          material={materials.ChairFabric}
        />
      </group>
      <group name="tamtm" position={[13.078, 0.899, -41.726]} scale={[2.2, 0.08, 1]}>
        <mesh
          name="Cube1033"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033.geometry}
          material={materials.Wood}
        />
        <mesh
          name="Cube1033_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_1.geometry}
          material={materials.DarkMetal}
        />
        <mesh
          name="Cube1033_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_2.geometry}
          material={materials.Screen}
        />
        <mesh
          name="Cube1033_3"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_3.geometry}
          material={materials.ChairFabric}
        />
      </group>
      <group name="tuanvm" position={[15.478, 0.899, -41.726]} scale={[2.2, 0.08, 1]}>
        <mesh
          name="Cube1033"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033.geometry}
          material={materials.Wood}
        />
        <mesh
          name="Cube1033_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_1.geometry}
          material={materials.DarkMetal}
        />
        <mesh
          name="Cube1033_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_2.geometry}
          material={materials.Screen}
        />
        <mesh
          name="Cube1033_3"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_3.geometry}
          material={materials.ChairFabric}
        />
      </group>
      <group
        name="quinn"
        position={[15.478, 0.899, -42.724]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[2.2, 0.08, 1]}>
        <mesh
          name="Cube1033"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033.geometry}
          material={materials.Wood}
        />
        <mesh
          name="Cube1033_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_1.geometry}
          material={materials.DarkMetal}
        />
        <mesh
          name="Cube1033_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_2.geometry}
          material={materials.Screen}
        />
        <mesh
          name="Cube1033_3"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_3.geometry}
          material={materials.ChairFabric}
        />
      </group>
      <group
        name="duongnb"
        position={[13.078, 0.899, -42.724]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[2.2, 0.08, 1]}>
        <mesh
          name="Cube1033"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033.geometry}
          material={materials.Wood}
        />
        <mesh
          name="Cube1033_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_1.geometry}
          material={materials.DarkMetal}
        />
        <mesh
          name="Cube1033_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_2.geometry}
          material={materials.Screen}
        />
        <mesh
          name="Cube1033_3"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_3.geometry}
          material={materials.ChairFabric}
        />
      </group>
      <group
        name="nhulpb"
        position={[10.678, 0.899, -42.724]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[2.2, 0.08, 1]}>
        <mesh
          name="Cube1033"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033.geometry}
          material={materials.Wood}
        />
        <mesh
          name="Cube1033_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_1.geometry}
          material={materials.DarkMetal}
        />
        <mesh
          name="Cube1033_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_2.geometry}
          material={materials.Screen}
        />
        <mesh
          name="Cube1033_3"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_3.geometry}
          material={materials.ChairFabric}
        />
      </group>
      <group
        name="ylpb"
        position={[8.278, 0.899, -42.724]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[2.2, 0.08, 1]}>
        <mesh
          name="Cube1033"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033.geometry}
          material={materials.Wood}
        />
        <mesh
          name="Cube1033_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_1.geometry}
          material={materials.DarkMetal}
        />
        <mesh
          name="Cube1033_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_2.geometry}
          material={materials.Screen}
        />
        <mesh
          name="Cube1033_3"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_3.geometry}
          material={materials.ChairFabric}
        />
      </group>
      <group
        name="phongdbt"
        position={[5.878, 0.899, -42.724]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[2.2, 0.08, 1]}>
        <mesh
          name="Cube1033"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033.geometry}
          material={materials.Wood}
        />
        <mesh
          name="Cube1033_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_1.geometry}
          material={materials.DarkMetal}
        />
        <mesh
          name="Cube1033_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_2.geometry}
          material={materials.Screen}
        />
        <mesh
          name="Cube1033_3"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_3.geometry}
          material={materials.ChairFabric}
        />
      </group>
      <group name="dinhbq" position={[5.878, 0.899, -46.961]} scale={[2.2, 0.08, 1]}>
        <mesh
          name="Cube1033"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033.geometry}
          material={materials.Wood}
        />
        <mesh
          name="Cube1033_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_1.geometry}
          material={materials.DarkMetal}
        />
        <mesh
          name="Cube1033_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_2.geometry}
          material={materials.Screen}
        />
        <mesh
          name="Cube1033_3"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_3.geometry}
          material={materials.ChairFabric}
        />
      </group>
      <group name="longvdh" position={[8.278, 0.899, -46.961]} scale={[2.2, 0.08, 1]}>
        <mesh
          name="Cube1033"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033.geometry}
          material={materials.Wood}
        />
        <mesh
          name="Cube1033_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_1.geometry}
          material={materials.DarkMetal}
        />
        <mesh
          name="Cube1033_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_2.geometry}
          material={materials.Screen}
        />
        <mesh
          name="Cube1033_3"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_3.geometry}
          material={materials.ChairFabric}
        />
      </group>
      <group name="nhutlm" position={[10.678, 0.899, -46.961]} scale={[2.2, 0.08, 1]}>
        <mesh
          name="Cube1033"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033.geometry}
          material={materials.Wood}
        />
        <mesh
          name="Cube1033_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_1.geometry}
          material={materials.DarkMetal}
        />
        <mesh
          name="Cube1033_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_2.geometry}
          material={materials.Screen}
        />
        <mesh
          name="Cube1033_3"
          castShadow
          receiveShadow
          geometry={nodes.Cube1033_3.geometry}
          material={materials.ChairFabric}
        />
      </group>
      <mesh
        name="room1"
        castShadow
        receiveShadow
        geometry={nodes.room1.geometry}
        material={materials['ProGlass.001']}
        position={[1.701, 3.163, -19.942]}
        rotation={[-0.119, 1.568, -1.448]}
        scale={[3.266, 4.968, 2.085]}
      >
        <meshPhysicalMaterial
          transmission={1}
          thickness={2}
          roughness={0.05}
          metalness={0.1}
          ior={1.5}
          color="#a5f3fc"
        />
      </mesh>
      <mesh
        name="floor"
        castShadow
        receiveShadow
        geometry={nodes.floor.geometry}
        position={[0, -0.947, -32.712]}
        scale={[13.744, 1, 19.954]}
      >
        <meshPhysicalMaterial
          color="#0f172a"
          roughness={0.6}
          metalness={0.1}
          reflectivity={0.5}
          clearcoat={0.1}
        />
      </mesh>
      <mesh
        name="wall_behind"
        castShadow
        receiveShadow
        geometry={nodes.wall_behind.geometry}
        position={[0, 2.414, -48.598]}
        scale={[31.028, 4.243, 1]}
      >
        <meshStandardMaterial color="#0f172a" roughness={1} metalness={0} />
      </mesh>
      <mesh
        name="wall_left"
        castShadow
        receiveShadow
        geometry={nodes.wall_left.geometry}
        position={[24.825, 2.414, -31.915]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[17.57, 4.243, 1]}
      >
        <meshStandardMaterial color="#0f172a" roughness={1} metalness={0} />
      </mesh>
      <mesh
        name="Main_Door_Frame"
        castShadow
        receiveShadow
        geometry={nodes.Main_Door_Frame.geometry}
        material={materials.DoorFrameMeta}
        position={[-7.084, 7.749, -14.68]}
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
      <mesh
        name="room2"
        castShadow
        receiveShadow
        geometry={nodes.room2.geometry}
        material={materials.ProGlass}
        position={[0.246, 3.163, -42.569]}
        rotation={[-2.954, 1.569, 1.388]}
        scale={[3.266, 4.969, 4.498]}
      >
        <meshPhysicalMaterial
          transmission={1}
          thickness={2}
          roughness={0.05}
          metalness={0.1}
          ior={1.5}
          color="#a5f3fc"
        />
      </mesh>
      <mesh
        name="room1001"
        castShadow
        receiveShadow
        geometry={nodes.room1001.geometry}
        position={[10.755, 3.163, -14.663]}
        rotation={[3.023, -1.568, -1.694]}
        scale={[-3.265, -0.247, -13.836]}
      >
        <meshPhysicalMaterial
          transmission={1}
          thickness={2}
          roughness={0.05}
          metalness={0.1}
          ior={1.5}
          color="#a5f3fc"
        />
      </mesh>
      <mesh
        name="room1002"
        castShadow
        receiveShadow
        geometry={nodes.room1002.geometry}
        position={[-21.906, 3.163, -14.663]}
        rotation={[3.023, -1.568, -1.694]}
        scale={[-3.265, -0.247, -10.677]}
      >
        <meshPhysicalMaterial
          transmission={1}
          thickness={2}
          roughness={0.05}
          metalness={0.1}
          ior={1.5}
          color="#a5f3fc"
        />
      </mesh>
    </group>
  )
}
useGLTF.preload(path);

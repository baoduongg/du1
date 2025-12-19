import { useThree, useFrame } from '@react-three/fiber';

const CameraFixed = ({ enable = false, cameraPosDebug, lookAtDebug }) => {
  const { camera } = useThree();

  useFrame(() => {
    if (!enable) return; // Chỉ chạy khi camera được enable

    if (cameraPosDebug && lookAtDebug) {
      camera.position.set(...cameraPosDebug[0]);
      camera.lookAt(...lookAtDebug[0]);
    }
  });

  return null;
};

export default CameraFixed;

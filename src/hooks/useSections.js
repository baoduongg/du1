import { useMemo } from 'react';

export const useSections = () => {
  const sections = useMemo(
    () => [
      {
        id: 0,
        title: 'Lối vào chính',
        description: 'Chào mừng bạn đến với văn phòng',
        position: [-7, 4, 0],
        lookAt: [-6.5, 3, -200] ,
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
        position: [19, 7, -34],
        lookAt: [-75, -105, -156],
        // Lộ trình curve
        path: [
          { position: [-7, 4, -15], lookAt: [80, 1, -50] },
          { position: [-7, 4, -30], lookAt: [58, -11, -65] },
          { position: [19, 7, -34], lookAt: [-75, -105, -156] },
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

  return sections;
};

import React from 'react';
import { useVideoUrl } from '../../../hooks/useVideoUrl';

const VideoBackground: React.FC = () => {
  const { url, loading, error } = useVideoUrl('media/fallingleaves.mp4');

  if (loading || error || !url) {
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-900 to-gray-900" />
    );
  }

  return (
    <div className="fixed inset-0 -z-10">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute min-w-full min-h-full object-cover"
      >
        <source src={url} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
};

export default VideoBackground;
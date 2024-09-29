import React, { useEffect, useRef } from 'react';
import Hls, { Events } from 'hls.js';

const VideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      const video = videoRef.current;

      if (video) {
        hls.on(Events.MEDIA_ATTACHED, () => {
          console.log('video and hls.js are now bound together!');
        });

        hls.on(Events.MANIFEST_PARSED, (_, data) => {
          console.log(`manifest loaded, found ${data.levels.length} quality levels`);
        });

        hls.loadSource('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
        hls.attachMedia(video);
      }

      return () => {
        hls.destroy();
      };
    }
  }, []);

  return (
    <video ref={videoRef} controls style={{ width: '100%', height: 'auto' }}>
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;

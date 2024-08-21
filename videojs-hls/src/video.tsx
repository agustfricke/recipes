import { FC, useEffect, useRef, useState } from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";

interface VideoPlayerProps {
  posterSrc: string;
  hlsSrc: string;
  options?: Player["options"];
}

export const Video: FC<VideoPlayerProps> = ({
  hlsSrc,
  posterSrc,
  options,
  ...props
}) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      playerRef.current = videojs(videoElement, {
        controls: true,
        fluid: true,
        sources: [{ src: hlsSrc, type: "application/x-mpegURL" }],
        poster: posterSrc,
        ...options
      });
      // Listener para actualizar el tiempo
      playerRef.current.on("timeupdate", () => {
        setTime(playerRef.current?.currentTime() ?? 0);
      });
    }
  }, [hlsSrc, options, posterSrc]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  function pause() {
    if (playerRef.current) {
      playerRef.current.pause();
    }
  }

  function play() {
    if (playerRef.current) {
      playerRef.current.play();
    }
  }

  return (
    <div data-vjs-player {...props}>
      <button onClick={pause}>Pause</button>
      <button onClick={play}>play</button>
      <p>{time}</p>
      <div ref={videoRef} />
    </div>
  );
};

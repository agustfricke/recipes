import { Video } from "./video";
import VideoPlayer from "./video-hls";

export default function App() {
  return (
    <>
    <VideoPlayer />
    <Video
      hlsSrc="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
      posterSrc="https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg"
    />
    </>
  );
}

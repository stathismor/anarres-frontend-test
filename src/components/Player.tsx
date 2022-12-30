import { useEffect, useState, useMemo } from "react";
import { PauseIcon, PlayIcon } from "@heroicons/react/20/solid";

function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [nowPlaying, setNowPlaying] = useState({
    duration: 0,
    elapsed: 0,
    song: { artist: "" },
  });
  const audioElement = useMemo(() => new Audio(), []);

  const fetchData = async () => {
    const data = await fetch("https://demo.azuracast.com/api/nowplaying");
    const json = await data.json();
    return json[0];
  };

  useEffect(() => {
    fetchData().then((res) => {
      audioElement.src = res.station.listen_url;
    });
  }, [audioElement]);

  useEffect(() => {
    const timer = setInterval(() => {
      fetchData().then((res) => {
        setNowPlaying(res.now_playing);
      });
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  function togglePlay() {
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsPlaying(!isPlaying);
  }

  return (
    <div className="bg-gray-800">
      <button
        type="button"
        onClick={() => togglePlay()}
        className="p-1 items-center"
      >
        {isPlaying ? (
          <PauseIcon className="h-20 w-20 text-red-600" />
        ) : (
          <PlayIcon className="h-20 w-20 text-red-600" />
        )}

        <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
      </button>
      {nowPlaying.song.artist}: {nowPlaying.elapsed} / {nowPlaying.duration}
    </div>
  );
}

export default Player;

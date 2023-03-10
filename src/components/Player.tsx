import { useEffect, useState, useMemo } from "react";
import { PauseIcon, PlayIcon } from "@heroicons/react/20/solid";

function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [nowPlaying, setNowPlaying] = useState({
    duration: 0,
    elapsed: 0,
    song: { artist: "", title: "", art: "" },
  });
  const audioElement = useMemo(() => new Audio(), []);

  const fetchData = async () => {
    const data = await fetch("https://admin.anarres.fm/api/nowplaying/1");
    const json = await data.json();
    return json;
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
    <div className="w-full bg-gray-700 shadow-md overflow-hidden mx-auto p-2">
      <div className="flex">
        <div className="flex">
          <button type="button" onClick={() => togglePlay()} className="">
            {isPlaying ? (
              <PauseIcon className="h-20 w-20 text-red-500" />
            ) : (
              <PlayIcon className="h-20 w-20 text-red-500" />
            )}

            <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
          </button>
          <img
            className="w-20 h-20 object-cover border-1"
            alt="User avatar"
            src={nowPlaying.song.art}
          />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex flex-col grow h-10">
            <span className="text-sm text-red-500 capitalize font-semibold pt-1">
              I think I need a sunrise, I'm tired of the sunset
            </span>
            <span className="text-xs text-gray-100 uppercase font-medium ">
              -"Boston," Augustana
            </span>
          </div>
          <div className="flex justify-end mx-2">
            <span className="text-xs text-gray-100 uppercase font-medium pl-2">
              02:00/04:00
            </span>
          </div>
          <div className="flex bg-gray-100 rounded-full h-2.5 m-2">
            <div className="bg-red-500 rounded-full" style={{ width: "25%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;

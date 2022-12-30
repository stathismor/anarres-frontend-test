// import React, { useState, useEffect, useRef } from "react";

type Props = {
  isPlaying: string;
  listenUrl: string;
};

export function AudioPlayer(props: Props) {
  const audioElement = new Audio();

  const { isPlaying, listenUrl } = props;

  console.log(isPlaying, listenUrl);

  return audioElement;
}

export default AudioPlayer;

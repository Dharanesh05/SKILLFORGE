'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, RotateCw } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl?: string;
  title: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  /**
   * INTENTIONAL BUG 3: Play button does not trigger player playback state
   * Expected: `setIsPlaying(!isPlaying)`
   * Actual: Always sets `setIsPlaying(false)`, failing to activate playback.
   */
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => setIsPlaying(false));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const cur = videoRef.current.currentTime;
      const dur = videoRef.current.duration || 1;
      setCurrentTime(cur);
      setDuration(dur);
      setProgress((cur / dur) * 100);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPercentage = parseFloat(e.target.value);
    if (videoRef.current && duration) {
      const newTime = (newPercentage / 100) * duration;
      videoRef.current.currentTime = newTime;
      setProgress(newPercentage);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="relative group bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* Video Canvas / Element */}
      <div className="relative aspect-video bg-slate-950 flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          src={videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
          className="w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeUpdate}
        />

        {/* Overlay Title */}
        <div className="absolute top-4 left-4 right-4 bg-gradient-to-b from-slate-950/80 to-transparent p-3 rounded-xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-sm font-semibold text-white truncate block">{title}</span>
        </div>

        {/* Play Pause Center Overlay */}
        <button
          onClick={handlePlayPause}
          className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-violet-600/80 hover:bg-violet-600 text-white flex items-center justify-center shadow-xl shadow-violet-600/30 backdrop-blur transform hover:scale-110 transition-all opacity-90 hover:opacity-100"
          aria-label={isPlaying ? 'Pause Lesson Video' : 'Play Lesson Video'}
        >
          {isPlaying ? <Pause className="w-8 h-8 fill-white" /> : <Play className="w-8 h-8 fill-white ml-1" />}
        </button>
      </div>

      {/* Control Bar */}
      <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-3">
        {/* Progress Bar Slider */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400 min-w-[36px]">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progress}
            onChange={handleSeek}
            className="flex-1 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
          />
          <span className="text-xs font-mono text-slate-400 min-w-[36px]">{formatTime(duration)}</span>
        </div>

        {/* Playback Actions & Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePlayPause}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition"
              aria-label="Play or Pause"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={() => skipTime(-10)}
              className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 transition"
              title="Rewind 10s"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => skipTime(10)}
              className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 transition"
              title="Forward 10s"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
              <button
                onClick={toggleMute}
                className="p-1.5 text-slate-400 hover:text-white transition"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-violet-500"
              />
            </div>
          </div>

          <div>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              title="Fullscreen"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

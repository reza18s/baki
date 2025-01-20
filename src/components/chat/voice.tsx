import React, { useEffect, useRef, useState } from 'react';
import { IonIcon, IonSpinner } from '@ionic/react';
import { pauseOutline, playOutline } from 'ionicons/icons';
import WaveSurfer from 'wavesurfer.js';
import Button from '../base/Button/Button';
import { cn } from '@/lib/utils';

const VoicePlayer = ({ url, me }: { url: string; me: boolean }) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const wavesurfer = useRef<WaveSurfer | null>(null);

  // Format time in mm:ss format
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Play or Pause Audio
  const togglePlayPause = () => {
    if (!wavesurfer.current) {
      return;
    }
    if (isPlaying) {
      wavesurfer.current.pause();
    } else {
      wavesurfer.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle Wavesurfer Audio Ready
  const handleAudioReady = () => {
    if (wavesurfer.current) {
      setDuration(wavesurfer.current.getDuration());
      setIsLoading(false); // Stop the loader once the audio is ready
    }
  };

  // Update Current Time
  const handleTimeUpdate = () => {
    if (wavesurfer.current) {
      setCurrentTime(wavesurfer.current.getCurrentTime());
    }
  };

  // Restart Audio when it ends
  const handleAudioEnd = () => {
    if (wavesurfer.current) {
      setCurrentTime(0);

      wavesurfer.current.seekTo(0); // Seek to the start
      setIsPlaying(false); // Stop playing state
    }
  };

  // Initialize Wavesurfer
  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        height: 39,
        width: 180,
        normalize: true,
        waveColor: me ? '#FEF3C7' : '#FEF3C7',
        progressColor: me ? '#FFF' : '#FFCC4E',
        cursorColor: '#ddd5e900',
        cursorWidth: 2,
        barWidth: 2.5,
        barHeight: 1,
        minPxPerSec: 1,
        fillParent: true,
        autoplay: false,
        interact: true,
        dragToSeek: false,
        hideScrollbar: false,
        audioRate: 1,
        autoScroll: true,
        autoCenter: true,
        sampleRate: 8000,
      });

      // Load the audio URL into WaveSurfer
      wavesurfer.current.load(url);

      // Add event listeners
      wavesurfer.current.on('ready', handleAudioReady);
      wavesurfer.current.on('audioprocess', handleTimeUpdate);
      wavesurfer.current.on('seeking', handleTimeUpdate);
      wavesurfer.current.on('finish', handleAudioEnd); // Listen for the end of the audio

      return () => {
        wavesurfer.current?.destroy(); // Clean up when the component is unmounted
      };
    }
  }, [url]); // Ensure the useEffect runs when the URL changes

  // Ensure that the audio is ready before starting playback
  useEffect(() => {
    if (wavesurfer.current) {
      wavesurfer.current.on('loading', () => setIsLoading(true));
      wavesurfer.current.on('ready', () => setIsLoading(false));
    }
  }, []);

  return (
    <div className="mx-auto flex max-w-[400px] items-center gap-2 p-2">
      <div>
        <div
          ref={waveformRef}
          style={{ height: '40px', position: 'relative' }}
          className={`w-full ${isLoading ? 'opacity-50' : ''}`} // Show loading effect
        />
        <div className="flex w-full justify-end text-[10px]">
          {formatTime(duration)} / {formatTime(currentTime)}
        </div>
      </div>
      <Button
        onClick={togglePlayPause}
        className={cn(
          'mr-2 flex size-12 min-h-12 min-w-12 items-center justify-center rounded-full bg-brand-yellow p-0',
          me && 'bg-white',
        )}
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? (
          <IonSpinner name="dots" className="text-xl text-blue-500" />
        ) : (
          <IonIcon
            icon={isPlaying ? pauseOutline : playOutline}
            className="text-xl"
          />
        )}
      </Button>
    </div>
  );
};

export default VoicePlayer;

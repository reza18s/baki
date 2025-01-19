import React, { useEffect, useRef, useState } from 'react';
import { IonButton, IonIcon, IonSpinner } from '@ionic/react';
import { pauseOutline, playOutline } from 'ionicons/icons';
import WaveSurfer from 'wavesurfer.js';

const VoicePlayer: React.FC = () => {
  const audioUrl =
    'https://c223026.parspack.net/c223026/users/cm5e8eihm000212wsjw85pgk9/audio/xYT36KG0-audio_2025-01-18_22-30-35.ogg'; // Replace with your audio file URL
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

  // Initialize Wavesurfer
  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        height: 49,
        width: 180,
        normalize: true,
        waveColor: '#FEF3C7',
        progressColor: '#FFCC4E',
        cursorColor: '#ddd5e900',
        cursorWidth: 2,
        barWidth: 2,
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
      wavesurfer.current.load(audioUrl);

      // Add event listeners
      wavesurfer.current.on('ready', handleAudioReady);
      wavesurfer.current.on('audioprocess', handleTimeUpdate);
      wavesurfer.current.on('seek', handleTimeUpdate);

      return () => {
        wavesurfer.current?.destroy(); // Clean up when the component is unmounted
      };
    }
  }, [audioUrl]); // Ensure the useEffect runs when the URL changes

  // Ensure that the audio is ready before starting playback
  useEffect(() => {
    if (wavesurfer.current) {
      wavesurfer.current.on('loading', () => setIsLoading(true));
      wavesurfer.current.on('ready', () => setIsLoading(false));
    }
  }, []);

  return (
    <div className="mx-auto flex max-w-[400px] items-center gap-4">
      <div
        ref={waveformRef}
        style={{ height: '50px', position: 'relative' }}
        className={`w-full ${isLoading ? 'opacity-50' : ''}`} // Show loading effect
      />
      <IonButton
        onClick={togglePlayPause}
        fill="clear"
        className="mr-2"
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
      </IonButton>
    </div>
  );
};

export default VoicePlayer;

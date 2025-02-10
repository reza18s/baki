import Button from '@/components/base/Button/Button';
import { customToast } from '@/components/base/toast';
import { IcPlay } from '@/components/icons/IcPlay';
import { IcRecord } from '@/components/icons/IcRecord';
import { IcStop } from '@/components/icons/IcStop';
import { IcUndo } from '@/components/icons/IcUndo';
import AppBar from '@/components/layout/Header/AppBar';
import { Page } from '@/components/layout/Page';
import { client, refreshAccessToken } from '@/graphql/apollo/client';
import { useUpdateUserMutation } from '@/graphql/generated/graphql.codegen';
import { useLocalStore } from '@/store/useLocalStore';
import { VoiceRecorder } from 'capacitor-voice-recorder';
import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

export const Record = () => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const [recording, setRecording] = useState(false);
  const [record, setRecord] = useState<string | null>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [updateUser] = useUpdateUserMutation();
  const userInfo = useLocalStore((s) => s.userInfo);
  const updateUserInfo = useLocalStore((s) => s.updateUserInfo);

  const wavesurfer = useRef<WaveSurfer | null>(null);

  const [time, setTime] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null,
  );
  useEffect(() => {
    setRecord(userInfo.record);
  }, [userInfo]);
  useEffect(() => {
    if (time >= 30) {
      onStopRecording();
    }
  }, [time]);
  const onStartRecording = async () => {
    if (!(await VoiceRecorder.canDeviceVoiceRecord()).value) {
      customToast(`دستگاه شما نمیتواند ریکورد کند`, 'error');
      return;
    }
    if (!(await VoiceRecorder.hasAudioRecordingPermission()).value) {
      VoiceRecorder.requestAudioRecordingPermission()
        .then((result) => {
          if (!result.value) {
            customToast(
              'لطفا درخواست استفاده از میکروفون را قبول کنید',
              'error',
            );
          }
        })
        .catch((err) => {
          customToast(err.message, 'error');
        });
    }

    if ((await VoiceRecorder.getCurrentStatus()).status === 'NONE') {
      await VoiceRecorder.startRecording();
      setRecording(true);

      const intervalId = setInterval(() => {
        setTime((prevTime) => +(prevTime + 0.1).toFixed(2));
      }, 100); // Update every second

      setTimerInterval(intervalId);
    }
  };
  const onStopRecording = async () => {
    if ((await VoiceRecorder.getCurrentStatus()).status === 'RECORDING') {
      const value = await VoiceRecorder.stopRecording();
      setRecording(false);
      setTime(0);
      if (timerInterval) {
        clearInterval(timerInterval); // Stop the timer
        setTimerInterval(null);
      }
      let voiceUrl: string | undefined = undefined;
      const formdata = new FormData();
      const base64Data = value.value.recordDataBase64;
      const audioBlob = await fetch(`data:audio/mp3;base64,${base64Data}`).then(
        (res) => res.blob(),
      );
      const file = new File([audioBlob], 'audio.mp3', {
        type: 'audio/mp3',
      });
      formdata.append('voice', file);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_BASE}/upload/upload-voice`,
          {
            method: 'POST',
            body: formdata,
            redirect: 'follow',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        );
        const responseJson = await response.json();
        if (response.ok && responseJson?.file?.url) {
          voiceUrl = responseJson?.file?.url;
        } else if (responseJson.code === 'INVALID_TOKEN') {
          refreshAccessToken(client);
        }
        if (!voiceUrl) {
          customToast('مشکلی در اپلود ویس پیش آمد', 'error');
        } else {
          setRecord(voiceUrl);
          updateUserInfo({ record: voiceUrl });
          updateUser({ variables: { record: voiceUrl } });
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (ignored) {
        customToast('مشکلی در اپلود ', 'error');
      }
    }
  };
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
  const handleAudioReady = () => {
    if (wavesurfer.current) {
      setDuration(wavesurfer.current.getDuration());
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
  useEffect(() => {
    if (waveformRef.current && record) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        height: 39,
        width: 180,
        normalize: true,
        waveColor: '#535353',
        progressColor: '#000',
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
      wavesurfer.current.load(record);

      // Add event listeners
      wavesurfer.current.on('ready', handleAudioReady);
      wavesurfer.current.on('audioprocess', handleTimeUpdate);
      wavesurfer.current.on('seeking', handleTimeUpdate);
      wavesurfer.current.on('finish', handleAudioEnd); // Listen for the end of the audio

      return () => {
        wavesurfer.current?.destroy(); // Clean up when the component is unmounted
      };
    }
  }, [record]); // Ensure the useEffect runs when the URL changes

  // Ensure that the audio is ready before starting playback
  useEffect(() => {
    if (wavesurfer.current) {
      wavesurfer.current.on('loading', () => setIsLoading(true));
      wavesurfer.current.on('ready', () => setIsLoading(false));
    }
  }, []);
  return (
    <Page header={<AppBar title="ضبط صدا"></AppBar>} contentClassName="p-6">
      <div className="flex flex-col items-center gap-4 pt-10">
        <h1 className="w-full text-[32px] font-bold text-brand-black">
          پیام خوشامد گویی
        </h1>
        <p className="w-full text-sm font-medium leading-tight text-gray-500">
          با صدای خود یک شعر، متن و یا پیام خوشامد گویی ضبط کنید.
        </p>
        <div className="flex w-full flex-col items-center gap-8 rounded-2xl bg-warning-50 p-4">
          <span>0:30 / 0:{time < 10 ? `0${time}` : time}</span>
          <div
            ref={waveformRef}
            style={{ height: '40px', position: 'relative' }}
            className={`w-full ${isLoading ? 'opacity-50' : ''}`} // Show loading effect
          />
        </div>
        <div className="flex size-16 items-center justify-center rounded-full bg-brand-yellow">
          {record ? (
            isPlaying ? (
              <IcStop onClick={togglePlayPause}></IcStop>
            ) : (
              <IcPlay onClick={togglePlayPause}></IcPlay>
            )
          ) : recording ? (
            <IcStop onClick={onStopRecording}></IcStop>
          ) : (
            <IcRecord onClick={onStartRecording}></IcRecord>
          )}
        </div>
        {record && (
          <Button
            variant="outline"
            className="flex items-center border-gray-300 px-4 py-2 text-sm font-medium"
            onClick={() => setRecord(undefined)}
          >
            <IcUndo className="scale-x-[-1]"></IcUndo>
            ضبط مجدد پیام
          </Button>
        )}
      </div>
    </Page>
  );
};

import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

interface CountdownCircleProps {
  startDate: Date; // The start date to calculate the remaining time
  size?: number; // Diameter of the circle
  strokeWidth?: number; // Thickness of the circle stroke
  strokeColor?: string; // Color of the progress stroke
  trailColor?: string; // Background color of the circle
  className?: string;
}

const CountdownCircle: React.FC<CountdownCircleProps> = ({
  startDate,
  size = 74, // Default size of the circle
  strokeWidth = 5, // Default stroke thickness
  strokeColor = '#FFCC4E', // Default progress stroke color
  trailColor = '#e5e7eb', // Default background stroke color
  className,
}) => {
  const maxDuration = 24 * 60 * 60; // 24 hours in seconds
  const [remainingTime, setRemainingTime] = useState<number>(
    Math.max(
      maxDuration -
        Math.floor((Date.now() - new Date(startDate).getTime()) / 1000),
      0,
    ),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const currentRemainingTime =
        maxDuration -
        Math.floor((Date.now() - new Date(startDate).getTime()) / 1000);
      setRemainingTime(Math.max(currentRemainingTime, 0));
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on unmount
  }, [startDate]);

  const radius = (size - strokeWidth) / 2; // Adjust radius based on size and stroke
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const progress = (remainingTime / maxDuration) * circumference; // Progress calculation

  return (
    <div className={cn(`relative flex h-full items-center`, className)}>
      <svg
        className={cn('-rotate-90')}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trailColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.3s linear' }} // Smooth transition
        />
      </svg>
      <div
        className={cn(
          'absolute -bottom-1 mx-auto flex items-center justify-center rounded-xl border border-white bg-brand-yellow px-1 pt-[3px] text-center text-[9px]',
          remainingTime <= 0 && 'bg-gray-300',
        )}
        style={{ left: `calc(50%)`, transform: 'translateX(-50%)' }}
      >
        {remainingTime <= 0
          ? 'منقضی'
          : remainingTime > 3600
            ? `${Math.floor(remainingTime / 3600)}h`
            : remainingTime > 60
              ? `${Math.floor(remainingTime / 60)}m`
              : `${remainingTime}s`}
      </div>
    </div>
  );
};

export default CountdownCircle;

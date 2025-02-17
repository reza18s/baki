import clsx from 'clsx';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import styles from './slotMachine.module.scss';
import { cn } from '@/lib/utils';
import Button from '../base/Button/Button';
import {
  useGetMeQuery,
  useRollMutation,
} from '@/graphql/generated/graphql.codegen';

// Constants
const ICON_WIDTH = 66; // Width of each icon
const ICON_HEIGHT = 65; // Height of each icon
const NUM_ICONS = 9; // Number of icons in the reel
const TIME_PER_ICON = 100; // Time (in ms) for each icon to animate
const ICON_MAP = [
  'bag',
  'tent',
  'bed',
  'axe',
  'bullet',
  'light',
  'carpet',
  'can',
  'roll',
]; // Icon names

// Roll a single reel
const roll = (
  reel: HTMLDivElement,
  offset: number,
  index: number,
): Promise<number> => {
  // Calculate the number of icons to move
  const delta = (offset + 2) * NUM_ICONS + index;

  return new Promise((resolve) => {
    const style = getComputedStyle(reel);
    const backgroundPositionY = parseFloat(style.backgroundPositionY); // Current position
    const targetBackgroundPositionY = backgroundPositionY + delta * ICON_HEIGHT; // Target position
    const normTargetBackgroundPositionY =
      targetBackgroundPositionY % (NUM_ICONS * ICON_HEIGHT); // Normalized position

    // Start animation after a delay
    setTimeout(() => {
      reel.style.transition = `background-position-y ${
        (8 + 1 * delta) * TIME_PER_ICON
      }ms cubic-bezier(.41,-0.01,.63,1.15)`;
      reel.style.backgroundPositionY = `${targetBackgroundPositionY}px`;
    }, offset * 150);

    // After animation completes
    setTimeout(
      () => {
        reel.style.transition = 'none';
        reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
        resolve(delta % NUM_ICONS); // Resolve with the final index
      },
      (8 + 1 * delta) * TIME_PER_ICON + offset * 150,
    );
  });
};

// Reset a single reel to its initial position
const reset = (reel: HTMLDivElement) => {
  reel.style.transition = 'none';
  reel.style.backgroundPositionY = '0px';
};

// Reel component
const Reel = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className={cn(styles.reel, 'rounded-3xl')}>
      <div
        className={clsx(
          styles.reel_frame,
          'relative overflow-hidden rounded-2xl border-[1.5px] border-gray-400',
        )}
      ></div>
    </div>
  );
});
function getRandomNumbers() {
  const numbers: number[] = [];
  while (numbers.length < 3) {
    const num = Math.floor(Math.random() * 9) + 1;
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }
  return numbers;
}
const getRandom = (range: number) => {
  return +(Math.random() * range + 1).toFixed(0);
};

// SlotMachine component
export const SlotMachine = () => {
  const [isRolling, setIsRolling] = useState(false); // Track if the reels are rolling
  const [indexes, setIndexes] = useState([0, 0, 0]); // Track the final indexes of the reels

  const reelsRef = useRef<(HTMLDivElement | null)[]>([]); // Refs for the reels
  const { data, refetch } = useGetMeQuery();
  const [Roll] = useRollMutation();
  const lastRoll = new Date(data?.getMe.planUse?.lastRoll || Date.now());
  const initialTimeLeft =
    12 * 60 * 60 - Math.floor((Date.now() - lastRoll.getTime()) / 1000);

  const [timeLeft, setTimeLeft] = useState<number>(
    initialTimeLeft > 0 ? initialTimeLeft : 0,
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  // Handle roll button click
  const handleRoll = async () => {
    if (isRolling) {
      return;
    } // Prevent rolling if already in progress
    setIsRolling(true);
    const { data } = await Roll({
      onCompleted: () => {
        refetch();
      },
    });

    const [a, b, c] = getRandomNumbers();
    const num = getRandom(NUM_ICONS);
    handleReset();
    // Roll all reels and wait for them to finish
    const results = await Promise.all([
      roll(reelsRef.current[0]!, getRandom(4), data?.Roll ? num : a),
      roll(reelsRef.current[1]!, getRandom(4), data?.Roll ? num : b),
      roll(reelsRef.current[2]!, getRandom(4), data?.Roll ? num : c),
    ]);

    // Update the indexes state with the final positions
    setIndexes(results);
    setIsRolling(false);
  };

  // Handle reset button click
  const handleReset = () => {
    if (isRolling) {
      return;
    } // Prevent reset if rolling
    reelsRef.current.forEach((reel) => {
      if (reel) {
        reset(reel); // Reset each reel to its initial position
      }
    });
    setIndexes([0, 0, 0]); // Reset the indexes state
  };
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 rounded-xl border border-gray-300 bg-white p-4">
      <h1 className="text-center text-sm font-bold">
        هر 12 ساعت می‌توانید 1 بار از چرخونک شانس استفاده کنید.
      </h1>
      <div className={styles.slots_container}>
        <div className={clsx(styles.slots)}>
          {indexes.map((_, i) => (
            <Reel
              key={i}
              ref={(el) => {
                if (el) {
                  reelsRef.current[i] = el; // Assign the ref properly
                }
              }}
            />
          ))}
        </div>
      </div>
      <div className="w-full">
        <Button
          disabled={data?.getMe.planUse?.lastRoll && timeLeft > 0}
          className="w-full"
          onClick={handleRoll}
        >
          {data?.getMe.planUse?.lastRoll
            ? timeLeft <= 0
              ? 'شانس مجدد'
              : `${formatTime(timeLeft)}`
            : ' شانس مجدد'}
        </Button>
      </div>
    </div>
  );
};

export default SlotMachine;

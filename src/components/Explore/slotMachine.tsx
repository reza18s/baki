import clsx from 'clsx';
import React, { forwardRef, useRef, useState } from 'react';
import styles from './slotMachine.module.scss';
import { set } from 'react-hook-form';
import { cn } from '@/lib/utils';

const icon_width = 79;
const icon_height = 65;
const num_icons = 9;
const time_per_icon = 100;
const iconMap = [
  'bag',
  'tent',
  'bed',
  'axe',
  'bullet',
  'light',
  'carpet',
  'can',
  'roll',
];

const roll = (reel: HTMLDivElement, offset = 0, index: number) => {
  // Minimum of 2 + the reel offset rounds
  const delta = (offset + 2) * num_icons + index;

  // Return promise so we can wait for all reels to finish
  return new Promise((resolve) => {
    const style = getComputedStyle(reel),
      // Current background position
      backgroundPositionY = parseFloat(style.backgroundPositionY),
      // Target background position
      targetBackgroundPositionY = backgroundPositionY + delta * icon_height,
      // Normalized background position, for reset
      normTargetBackgroundPositionY =
        targetBackgroundPositionY % (num_icons * icon_height);

    // Delay animation with timeout, for some reason a delay in the animation property causes stutter
    setTimeout(() => {
      // Set transition properties ==> https://cubic-bezier.com/#.41,-0.01,.63,1.09
      reel.style.transition = `background-position-y ${(8 + 1 * delta) * time_per_icon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
      // Set background position
      reel.style.backgroundPositionY = `${backgroundPositionY + delta * icon_height}px`;
    }, offset * 150);

    // After animation
    setTimeout(
      () => {
        // Reset position, so that it doesn't get higher without limit
        reel.style.transition = 'none';
        reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
        // Resolve this promise
        resolve(delta % num_icons);
      },
      (8 + 1 * delta) * time_per_icon + offset * 150,
    );
  });
};

const reset = (reel: HTMLDivElement) => {
  reel.style.transition = 'none';
  reel.style.backgroundPositionY = '0px';
};

const Reel = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className={cn(styles.reel, 'rounded-3xl')}>
      <div
        className={clsx(
          styles.reel_frame,
          'relative z-20 overflow-hidden rounded-2xl border-2 border-gray-400',
        )}
      ></div>
    </div>
  );
});

export const SlotMachine = () => {
  const [isRolling, setIsRolling] = useState(false);
  const [indexes, setIndexes] = useState([0, 0, 0]);
  const reelsRef = useRef<(HTMLDivElement | null)[]>([]);
  return (
    <div className="">
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
      <div className="mt-10 flex gap-5">
        <button
          onClick={async () => {
            if (isRolling) {
              return;
            }
            // Reset background position instantly
            reelsRef.current.forEach((reel) => {
              if (reel) {
                reset(reel);
              }
            });

            // Reset indexes
            setIndexes([0, 0, 0]);
          }}
        >
          reset
        </button>
        <button
          onClick={async () => {
            if (isRolling) {
              return;
            }
            reelsRef.current.forEach((reel) => {
              if (reel) {
                reset(reel);
              }
            });
            setIsRolling(true);
            await Promise.all([
              roll(reelsRef.current[0]!, 0, 1),
              roll(reelsRef.current[1]!, 1, 1),
              roll(reelsRef.current[2]!, 2, 1),
            ]);
            setIsRolling(false);
          }}
        >
          roll
        </button>
      </div>
    </div>
  );
};

export default SlotMachine;

import { Share } from '@capacitor/share';

export const share = async () => {
  await Share.share({
    text: 'اشتراک‌ گذاری ',
    dialogTitle: 'اشتراک‌ گذاری ',
  });
};

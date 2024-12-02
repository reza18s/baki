import { Share } from '@capacitor/share';

export const shareRecipe = async () => {
  await Share.share({
    text: 'اشتراک‌ گذاری ',
    dialogTitle: 'اشتراک‌ گذاری ',
  });
};

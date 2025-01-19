import React, { useState } from 'react';
import { IcPaperclip } from '../icons/IcPaperclip';

const FileInput = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result); // ذخیره URL تصویر در state
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-1 flex h-full items-center justify-center">
      {/* آیکون به عنوان دکمه */}
      <label className="cursor-pointer text-white" title="Upload Image">
        <IcPaperclip className="h-6 w-6" />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>

      {/* پیش‌نمایش تصویر */}
      {/* {selectedImage && (
        <div className="mt-6 text-center">
          <h3 className="mb-4 text-lg font-semibold">Preview:</h3>
          <img
            src={selectedImage}
            alt="Selected"
            className="max-h-64 max-w-sm rounded-lg border border-gray-200 shadow-lg"
          />
        </div>
      )} */}
    </div>
  );
};

export default FileInput;

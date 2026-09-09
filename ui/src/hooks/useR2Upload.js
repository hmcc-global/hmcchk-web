import axios from 'axios';
import { useCallback, useState } from 'react';
import { customAxios } from 'utils/customAxios';

export const useR2Upload = ({ folder = 'uploads' } = {}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const upload = useCallback(
    async (file) => {
      setIsUploading(true);
      setProgress(0);
      setError(null);

      try {
        const { data } = await customAxios.post('/api/r2/presign-upload', {
          fileName: file.name,
          contentType: file.type,
          folder,
        });

        await axios.put(data.uploadUrl, file, {
          headers: { 'Content-Type': file.type },
          onUploadProgress: (event) => {
            if (event.total) {
              setProgress(Math.round((100 * event.loaded) / event.total));
            }
          },
        });

        return { key: data.key, publicUrl: data.publicUrl };
      } catch (err) {
        console.log(err);
        setError(err);
        return null;
      } finally {
        setIsUploading(false);
        setProgress(0);
      }
    },
    [folder]
  );

  return { upload, isUploading, progress, error };
};

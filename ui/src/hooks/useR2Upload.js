import axios from 'axios';
import { useCallback, useState } from 'react';
import { customAxios } from 'utils/customAxios';

const toMessage = (err) => {
  const data = err?.response?.data;
  if (typeof data === 'string' && data) {
    return data;
  }
  if (data?.maxBytes) {
    return `File is too large (max ${Math.round(
      data.maxBytes / 1024 / 1024
    )} MB)`;
  }
  return 'Upload failed';
};

export const useR2Upload = ({ folder }) => {
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
          fileSize: file.size,
          folder,
        });

        await axios.put(data.uploadUrl, file, {
          headers: {
            'Content-Type': file.type,
            'Cache-Control': data.cacheControl,
          },
          onUploadProgress: (event) => {
            if (event.total) {
              setProgress(Math.round((100 * event.loaded) / event.total));
            }
          },
        });

        return { key: data.key, publicUrl: data.publicUrl };
      } catch (err) {
        console.log(err);
        setError(toMessage(err));
        return null;
      } finally {
        setIsUploading(false);
        setProgress(0);
      }
    },
    [folder]
  );

  const clearError = useCallback(() => setError(null), []);

  return { upload, isUploading, progress, error, clearError };
};

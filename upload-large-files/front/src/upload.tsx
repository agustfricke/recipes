import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const CHUNK_SIZE = 1024 * 1024; // 1MB chunks

interface UploadChunkParams {
  file: File;
  chunkNumber: number;
  totalChunks: number;
}

const uploadChunk = async ({ file, chunkNumber, totalChunks }: UploadChunkParams) => {
  const start = chunkNumber * CHUNK_SIZE;
  const end = Math.min(start + CHUNK_SIZE, file.size);
  const chunk = file.slice(start, end);

  const formData = new FormData();
  formData.append('file', chunk, file.name);
  formData.append('chunkNumber', chunkNumber.toString());
  formData.append('totalChunks', totalChunks.toString());

  await axios.post('http://localhost:8080/api/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const useChunkedUpload = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
      
      for (let chunkNumber = 0; chunkNumber < totalChunks; chunkNumber++) {
        await uploadChunk({ file, chunkNumber, totalChunks });
      }
    },
  });
};

// Usage in a component
const UploadComponent = () => {
  const uploadMutation = useChunkedUpload();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadMutation.mutate(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {uploadMutation.isPending && <p>Uploading...</p>}
      {uploadMutation.isError && <p>Error: {uploadMutation.error.message}</p>}
      {uploadMutation.isSuccess && <p>Upload complete!</p>}
    </div>
  );
};
export default UploadComponent;

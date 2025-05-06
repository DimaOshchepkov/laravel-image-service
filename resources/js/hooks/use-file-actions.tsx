import { useCallback } from 'react';
import { router, usePage } from '@inertiajs/react';
import axios from 'axios';
import toast from 'react-hot-toast';

type FileItem = {
  id: number;
  name: string;
  uploadedAt: string;
  temporaryLinks: string[];
  usedLinks: string[];
};

type PageProps = {
  files: FileItem[];
};

export function useFileActions() {
  const { files } = usePage<PageProps>().props;

  const reloadFiles = useCallback(() => {
    router.reload({ only: ['files'] });
  }, []);

  const createLink = useCallback(async (id: number) => {
    try {
      const response = await axios.post(route('media.create-link', id), {});
      const link = response.data.link;

      if (!link) {
        toast.error('Link not received');
        return;
      }

      reloadFiles();

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(link);
        toast.success('Link copied to clipboard!');
      } else {
        console.log('Link:', link);
        toast.success('Link created (see console)');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error creating link');
    }
  }, [reloadFiles]);

  const deleteFile = useCallback(async (id: number) => {
    try {
      router.delete(route('media.destroy', id), {
        onSuccess: () => {
          toast.success('File deleted');
          reloadFiles();
        },
        onError: () => {
          toast.error('Error deleting');
        },
      });
    } catch (error) {
      console.error(error);
      toast.error('Unexpected error');
    }
  }, [reloadFiles]);

  const uploadFiles = useCallback(async (uploaded: File[]) => {
    const formData = new FormData();
    uploaded.forEach((file) => formData.append('files[]', file));

    router.post(route('upload'), formData, {
      preserveScroll: true,
      onSuccess: () => {
        reloadFiles();
        toast.success('Files uploaded successfully');
      },
      onError: () => {
        toast.error('Error loading files');
      },
    });
  }, [reloadFiles]);

  return {
    files,
    createLink,
    deleteFile,
    uploadFiles,
  };
};


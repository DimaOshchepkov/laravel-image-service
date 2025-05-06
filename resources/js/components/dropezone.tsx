import { cn } from '@/lib/utils'; // утилита объединения классов, если есть
import { Section } from '@radix-ui/themes';
import { UploadCloud } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

type DropzoneProps = {
  onUpload: (files: File[]) => void;
  className?: string;
};

export default function Dropzone({ onUpload, className }: DropzoneProps) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onUpload,
        multiple: true,
    });

    return (
        <Section
            {...getRootProps()}
            className={cn(
                'border-muted flex cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-dashed px-4 py-6 transition-colors',
                isDragActive ? 'bg-accent' : 'hover:bg-muted',
                className
            )}
        >
            <input {...getInputProps()} />
            <UploadCloud className="text-muted-foreground h-5 w-5" />
            <span className="text-muted-foreground text-sm">Drag files here or click to upload</span>
        </Section>
    );
}

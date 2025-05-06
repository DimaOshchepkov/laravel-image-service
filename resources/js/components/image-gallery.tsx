//import { usePage } from '@inertiajs/react';
import { ScrollArea } from '@radix-ui/themes';
import { FileTable } from './file-table';
/*
interface ImagePostForm {
    title: string;
    images: File[];
}*/

export default function ImageGallery() {
    //const { title, images } = usePage<Required<ImagePostForm>>().props;
    return (
      <div className="h-[calc(100vh-6rem)] w-full">
        <ScrollArea className='p-[10px]' type="always" scrollbars="vertical">
          <FileTable/>
        </ScrollArea>
      </div>
    );
}

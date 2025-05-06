import { Button } from '@/components/ui/button';
import { Table } from '@radix-ui/themes';
import { FileText, Link, Trash } from 'lucide-react';
import { format } from 'date-fns';

type Props = {
  file: {
    id: number;
    name: string;
    uploadedAt: string;
  };
  onCreateLink: (id: number) => void;
  onDeleteFile: (id: number) => void;
};

export default function FileRow({ file, onCreateLink, onDeleteFile }: Props) {
  return (
    <Table.Row className="hover:bg-muted cursor-pointer">
      <Table.Cell>
        <div className="flex items-center gap-2">
          <FileText className="text-muted-foreground h-4 w-4" />
          <span className="font-medium">{file.name}</span>
        </div>
      </Table.Cell>

      <Table.Cell>
        {format(new Date(file.uploadedAt), 'd MMMM yyyy, HH:mm')}
      </Table.Cell>

      <Table.Cell>
        <div className="inline-block" onClick={(e) => e.stopPropagation()}>
          <Button
            onClick={() => onCreateLink(file.id)}
            size="sm"
            variant="outline"
          >
            <Link className="mr-1 h-4 w-4" />
            Create a link
          </Button>
        </div>
      </Table.Cell>

      <Table.Cell className="text-right">
        <div className="inline-block" onClick={(e) => e.stopPropagation()}>
          <Button
            onClick={() => onDeleteFile(file.id)}
            size="sm"
            variant="destructive"
          >
            <Trash className="mr-1 h-4 w-4" />
            Delete
          </Button>
        </div>
      </Table.Cell>
    </Table.Row>
  );
}

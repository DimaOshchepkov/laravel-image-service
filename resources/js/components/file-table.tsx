import { Button } from '@/components/ui/button';
import { Popover, Table } from '@radix-ui/themes';
import { FileText, Link, Trash } from 'lucide-react';
import Dropzone from './dropezone';
import { format } from 'date-fns'
import { useFileActions } from '@/hooks/use-file-actions';
import FileLinksList from './file-links-list';



export function FileTable() {
    const {files, createLink, deleteFile, uploadFiles } = useFileActions();

    return (
        <div className="h-full w-full">
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>File</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Upload date</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Create a link</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="text-right">Delete</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {files.map((file) => (
                        <Popover.Root key={file.id}>
                            <Popover.Trigger>
                                <Table.Row className="hover:bg-muted cursor-pointer">
                                    <Table.Cell>
                                        <div className="flex items-center gap-2">
                                            <FileText className="text-muted-foreground h-4 w-4" />
                                            <span className="font-medium">{file.name}</span>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell>{format(new Date(file.uploadedAt), 'd MMMM yyyy, HH:mm')}</Table.Cell>
                                    <Table.Cell>
                                        <div className="inline-block" onClick={(e) => e.stopPropagation()}>
                                            <Button
                                                onClick={async () => {
                                                    await createLink(file.id);
                                                }}
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
                                                onClick={async () => {
                                                    await deleteFile(file.id);
                                                }}
                                                size="sm"
                                                variant="destructive"
                                            >
                                                <Trash className="mr-1 h-4 w-4" />
                                                Delete
                                            </Button>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            </Popover.Trigger>


                            <Popover.Content className="w-64">
                                <FileLinksList temporaryLinks={file.temporaryLinks} usedLinks={file.usedLinks} />
                            </Popover.Content>
                        </Popover.Root>
                    ))}
                </Table.Body>
            </Table.Root>
            <Dropzone className="min-h-[200px] w-full" onUpload={uploadFiles} />
        </div>
    );
}

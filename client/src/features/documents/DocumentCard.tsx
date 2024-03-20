import { Card } from '@mui/material';
import DocumentList from './DocumentList';

const documents = [{ fileName: 'file1' }, { fileName: 'file2' }, { fileName: 'file3' }];

export default function DocumentCard() {
  return (
    <Card>
      <DocumentList documents={documents} />
    </Card>
  );
}

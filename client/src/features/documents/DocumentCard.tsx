import { Card } from '@mui/material';
import DocumentList from './DocumentList';
import { useDocuments } from './useDocuments';

export default function DocumentCard() {
  const { documents } = useDocuments();
  return (
    <Card>
      <DocumentList documents={documents} />
    </Card>
  );
}

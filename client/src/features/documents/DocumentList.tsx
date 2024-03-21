import { Divider, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { ChatOutlined } from '@mui/icons-material';
import DocumentHeader from './DocumentHeader';
import { useNavigate } from 'react-router-dom';

type TDocumentListProps = { documents: { name: string; id: string; updated: string; created: string }[] };

const DocumentList = ({ documents }: TDocumentListProps) => {
  const navigate = useNavigate();

  return (
    <List subheader={<DocumentHeader />}>
      {documents?.map((doc, index) => (
        <>
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="chat" onClick={() => navigate(`/documents/${doc.id}`)}>
                {/* <DeleteOutline /> */}
                <ChatOutlined />
              </IconButton>
            }
            sx={{ py: 2 }}
          >
            <ListItemText primary={doc.name} secondary={doc.created} />
          </ListItem>
          {index !== documents.length - 1 && <Divider />}
        </>
      ))}
    </List>
  );
};

export default DocumentList;

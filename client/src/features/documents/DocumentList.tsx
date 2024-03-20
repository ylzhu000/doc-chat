import { Divider, IconButton, List, ListItem } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';

type TDocumentListProps = { documents: { fileName: string }[] };

const DocumentList = ({ documents }: TDocumentListProps) => {
  return (
    <List>
      {documents.map((doc, index) => (
        <>
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <DeleteOutline />
              </IconButton>
            }
          >
            {doc.fileName}
          </ListItem>
          {index !== documents.length - 1 && <Divider />}
        </>
      ))}
    </List>
  );
};

export default DocumentList;

import { useState } from 'react';
import { ListSubheader, Box, Typography, Button } from '@mui/material';

import DocumentUploadDialog from './DocumentUploadDialog';

export default function DocumentHeader() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <ListSubheader sx={{ py: 2 }}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5">Documents</Typography>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Upload file
        </Button>
        <DocumentUploadDialog open={open} setOpen={setOpen} />
      </Box>
    </ListSubheader>
  );
}

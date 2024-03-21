import { ListSubheader, Box, Typography, Button } from '@mui/material';
export default function DocumentHeader() {
  return (
    <ListSubheader sx={{ py: 2 }}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5">Documents</Typography>
        <Button variant="contained">Upload file</Button>
      </Box>
    </ListSubheader>
  );
}

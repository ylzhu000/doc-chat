import { Paper, Grid, TextField, Box, InputAdornment, IconButton, useTheme } from '@mui/material';
import { ArrowCircleUpOutlined } from '@mui/icons-material';
import ChatMessages from './ChatMessages';
import { useConversation } from './useConversations';
import { useEffect, useMemo, useState } from 'react';
import ChatHeader from './ChatHeader';

export default function Chat() {
  const { conversations = [] } = useConversation();
  const [selectedConversation, setSelectedConversation] = useState<string>('');
  const theme = useTheme();

  const cOptions = conversations?.map((item) => ({ label: item.id, value: item.id }));
  const messages = useMemo(() => {
    const matched = conversations?.find((item) => item.id === selectedConversation);
    return matched?.message || [];
  }, [selectedConversation]);

  useEffect(() => {
    const latestConversation = conversations.length && conversations[0]['id'];
    setSelectedConversation(latestConversation);
  }, [conversations]);

  return (
    <Paper sx={{ minHeight: 'calc(100vh - 112px)', overflow: 'scroll' }}>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        sx={{ minHeight: 'inherit', p: '2.4rem 2.4rem' }}
      >
        <Grid item container>
          <ChatHeader options={cOptions} defaultValue={selectedConversation} />
        </Grid>
        <Grid item sx={{ flexGrow: 1, maxHeight: '70vh', overflow: 'scroll' }}>
          <ChatMessages messages={messages} />
        </Grid>
        <Grid container item>
          <Box name="messageInput" component="form" sx={{ width: '100%' }}>
            <TextField
              hiddenLabel={true}
              fullWidth
              maxRows={8}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <ArrowCircleUpOutlined fontSize="large" sx={{ color: theme.palette.primary.dark }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

import { useEffect, useState } from 'react';
import { Paper, Grid } from '@mui/material';

import { useConversation } from './useConversations';
import { useScrollBottom } from '../../hooks/useScrollBottom';

import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';

import { TMessage, Role } from '../../types';
import { useAiMessage } from './useAiMessage';

export default function Chat() {
  const { conversations = [] } = useConversation();
  const [selectedConversation, setSelectedConversation] = useState<string>('');
  const [currentMessages, setCurrentMessages] = useState<Array<TMessage>>([]);
  const scrollRef = useScrollBottom(currentMessages);
  const { fetchAiMessage, isFetchingAiMessage } = useAiMessage();

  const cOptions = conversations?.map((item) => ({ label: item.id, value: item.id }));

  useEffect(() => {
    // Update current conversation
    const latestConversation = conversations.length && conversations[0]['id'];
    setSelectedConversation(latestConversation);

    // Update current messages
    const matched = conversations?.find((item) => item.id === selectedConversation);
    setCurrentMessages(matched?.message || []);
  }, [conversations, selectedConversation]);

  const handleInputChange = (e: string) => {
    setCurrentMessages([
      ...currentMessages,
      {
        role: Role.Human,
        content: e,
      },
    ]);

    fetchAiMessage(
      { conversation_id: selectedConversation, message: e },
      {
        onSuccess: (data) => {
          setCurrentMessages((previous) => [
            ...previous,
            {
              role: Role.AI,
              content: data.content,
            },
          ]);
        },
      },
    );
  };

  return (
    <Paper sx={{ minHeight: 'calc(100vh - 112px)', overflowY: 'scroll' }}>
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
          <ChatMessages messages={currentMessages} isLoading={isFetchingAiMessage} />
          <div ref={scrollRef}></div>
        </Grid>
        <Grid container item>
          <ChatInput onChange={handleInputChange} isLoading={isFetchingAiMessage} />
        </Grid>
      </Grid>
    </Paper>
  );
}

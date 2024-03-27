import { List, ListItem, ListItemAvatar, Avatar, ListItemText, CircularProgress } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { TMessage, Role } from '../../types';

type TChatMessageProps = {
  messages: TMessage[];
  isLoading: boolean;
};

export default function ChatMessages({ messages, isLoading }: TChatMessageProps) {
  return (
    <List>
      {messages.map((message) => (
        <ListItem key={message.id} alignItems="flex-start">
          <ListItemAvatar>
            {message.role === Role.AI ? (
              <Avatar alt="logo" src="../../assets/images/logo.png" />
            ) : (
              <Avatar alt="user" sx={{ background: deepOrange[500] }}>
                Y
              </Avatar>
            )}
          </ListItemAvatar>
          <ListItemText primary={message.role === Role.AI ? 'DocChat' : 'You'} secondary={message.content} />
        </ListItem>
      ))}
      {isLoading && (
        <ListItem key="loading">
          <ListItemAvatar>
            <Avatar alt="logo" src="../../assets/images/logo.png" />
          </ListItemAvatar>
          <ListItemText primary="DocChat" secondary={<CircularProgress size={24} />} />
        </ListItem>
      )}
    </List>
  );
}

import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

type TChatMessageProps = {
  messages: any[];
};

export default function ChatMessages({ messages }: TChatMessageProps) {
  return (
    <List>
      {messages.map((message) => (
        <ListItem key={message.id} alignItems="flex-start">
          <ListItemAvatar>
            {message.role === 'ai' ? (
              <Avatar alt="logo" src="../../assets/images/logo.png" />
            ) : (
              <Avatar alt="user" sx={{ background: deepOrange[500] }}>
                Y
              </Avatar>
            )}
          </ListItemAvatar>
          <ListItemText primary={message.role === 'ai' ? 'DocChat' : 'You'} secondary={message.content} />
        </ListItem>
      ))}
    </List>
  );
}

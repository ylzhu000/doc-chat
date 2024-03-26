import { Select, Button, MenuItem, Grid, FormControl, InputLabel } from '@mui/material';
import { useEffect, useState } from 'react';

type TChatHeaderProps = {
  options: { label: string; value: string }[];
  defaultValue: string;
};

export default function ChatHeader({ options, defaultValue }: TChatHeaderProps) {
  const [selected, setSelected] = useState<string>('');

  useEffect(() => {
    setSelected(defaultValue);
  }, [defaultValue]);

  return (
    <Grid container display="flex" justifyContent="space-between">
      <FormControl>
        <InputLabel id="conversation-select">Current conversation</InputLabel>
        <Select labelId="conversation-select" label="Current Conversation" value={selected} size="small">
          {options.map((option) => (
            <MenuItem value={option.value}>{option.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="outlined" size="small">
        New Chat
      </Button>
    </Grid>
  );
}

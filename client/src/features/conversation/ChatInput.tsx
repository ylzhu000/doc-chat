import { Box, TextField, InputAdornment, IconButton, useTheme } from '@mui/material';
import { ArrowCircleUpOutlined } from '@mui/icons-material';
import { ChangeEvent, useRef } from 'react';

type TChatInputProps = {
  onChange: (e: string) => void;
  isLoading: boolean;
};

export default function ChatInput({ onChange, isLoading }: TChatInputProps) {
  const theme = useTheme();
  const ref = useRef<HTMLInputElement>(null);

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ref.current) {
      onChange(ref.current.value);
      ref.current.value = '';
    }
  };

  return (
    <Box name="messageInput" component="form" sx={{ width: '100%' }} onSubmit={onSubmit}>
      <TextField
        hiddenLabel={true}
        fullWidth
        maxRows={8}
        inputRef={ref}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" disabled={isLoading} color="primary">
                <ArrowCircleUpOutlined fontSize="large" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

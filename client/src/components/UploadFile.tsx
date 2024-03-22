import { Input, Box } from '@mui/material';
import { ChangeEvent } from 'react';

type TUploadFileProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function UploadFile({ onChange }: TUploadFileProps) {
  return (
    <Box display="flex" flexDirection="column" rowGap={2}>
      <Input name="uploadFile" type="file" onChange={onChange} inputProps={{ accept: 'application/pdf' }} />
    </Box>
  );
}

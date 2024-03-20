import { Box } from '@mui/material';

type TLogoProps = { width?: number | string };

export default function Logo({ width = 120 }: TLogoProps) {
  return (
    <Box sx={{ mr: 2 }}>
      <img src="logo.svg" alt="docchat logo" width={width} />
    </Box>
  );
}

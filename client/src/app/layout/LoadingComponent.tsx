import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

interface Props {
  message: string;
}

export default function LoadingComponent({ message }: Props) {
  return (
    <Backdrop open={true} invisible={true}>
      <Box
        display="flex"
        alignItems="center"
        justifyItems="center"
        flexDirection="column"
      >
        <CircularProgress color="secondary" size={100} />
        <Typography variant="h4" sx={{ mt: 5 }}>
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
}

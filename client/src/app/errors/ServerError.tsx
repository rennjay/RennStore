import { Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function ServerError() {
  const { state } = useLocation();
  console.log(state);
  return (
    <Container component={Paper}>
      {state.error ? (
        <>
          <Typography variant="h3" color="secondary" gutterBottom>
            {state.error.title}
          </Typography>
          <Divider />
          <Typography variant="body1" sx={{ mt: 2 }}>
            {state.error.detail}
          </Typography>
        </>
      ) : (
        <Typography variant="h5">Server Error</Typography>
      )}
    </Container>
  );
}

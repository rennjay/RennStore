import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFoundError() {
  return (
    <Container component={Paper} sx={{ height: 600 }}>
      <Typography variant="h3" gutterBottom>
        Oops! We can't find page you're looking for.
      </Typography>
      <Divider />
      <Button fullWidth component={Link} to="/catalog">
        Go back to shop
      </Button>
    </Container>
  );
}

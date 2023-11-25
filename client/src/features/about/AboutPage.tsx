import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import agent from "../../app/api/agent";

export default function AboutPage() {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Errors for testing purposes
      </Typography>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        fullWidth
      >
        <Button onClick={() => agent.TestErrors.get400Error()}>
          Get 400 Error
        </Button>
        <Button onClick={() => agent.TestErrors.get401Error()}>
          Get 401 Error
        </Button>
        <Button
          onClick={() =>
            agent.TestErrors.get404Error().catch((reason) =>
              console.log(reason)
            )
          }
        >
          Get 404 Error
        </Button>
        <Button onClick={() => agent.TestErrors.get500Error()}>
          Get 500 Error
        </Button>
        <Button onClick={() => agent.TestErrors.getvalidationError()}>
          Get Validation Error
        </Button>
      </ButtonGroup>
    </Container>
  );
}

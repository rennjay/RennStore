import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import agent from "../../app/api/agent";
import { useState } from "react";

export default function AboutPage() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const getValidationErrors = () => {
    agent.TestErrors.getvalidationError()
      .then(() => "You should not be seeing this!!")
      .catch((error) => setValidationErrors(error));
  };
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
        <Button
          onClick={() =>
            agent.TestErrors.get400Error().catch((reason) =>
              console.log(reason)
            )
          }
        >
          Get 400 Error
        </Button>
        <Button
          onClick={() =>
            agent.TestErrors.get401Error().catch((reason) =>
              console.log(reason)
            )
          }
        >
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
        <Button
          onClick={() =>
            agent.TestErrors.get500Error().catch((reason) =>
              console.log(reason)
            )
          }
        >
          Get 500 Error
        </Button>
        <Button onClick={getValidationErrors}>Get Validation Error</Button>
      </ButtonGroup>
      {validationErrors && (
        <Alert severity="error">
          <AlertTitle>Validation Error</AlertTitle>
          <List>
            {validationErrors.map((error: string, index: number) => (
              <ListItem>
                <ListItemText key={index}>{error}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  );
}

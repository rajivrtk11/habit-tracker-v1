import React from "react";
import { Typography, Container, Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const SomethingWentWrong = () => {
  return (
    <Container maxWidth="sm">
      <Box textAlign="center" py={10}>
        <Typography variant="h4" gutterBottom>
          Oops! Something went wrong.
        </Typography>
        <Typography variant="body1">
          We apologize for the inconvenience. Please try again later.
        </Typography>
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 3 }}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default SomethingWentWrong;

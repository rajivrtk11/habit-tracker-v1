import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDataContext } from "../../context/DataContext";
import Goal from "../Goal";
const NotFound = ({ image, heading }) => {
  const { setOpenGoalModal, openGoalModal } = useDataContext();
  const handleAddGoal = () => {
    setOpenGoalModal(true)
  }
  return (
    <Container>
      <Goal/>
      <Button
        style={{ marginBottom: "20px", marginTop: "20px" }}
        variant="outlined"
        onClick={() => handleAddGoal()}
      >
        Create Goal
      </Button>
      {heading && (
        <Typography variant="h4" gutterBottom component="h2">
          {heading}
        </Typography>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItem: "center",
        }}
      >
        <Box
          component="img"
          style={{
            height: "450px",
            width: "500px",
            marginTop: "20px",
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="Not Found."
          src={`/images/${image}`}
        />
      </div>
    </Container>
  );
};

export default NotFound;

import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDataContext } from "../../context/DataContext";
import Goal from "../Goal";

const suggestedGoals = [
  { id: 1, goalName: "Weight Loss" },
  { id: 2, goalName: "Complate a book" },
  { id: 3, goalName: "Learn Swimming" },
  { id: 4, goalName: "Learn Boxing" },
  { id: 5, goalName: "Prepare for Interviews" },
];

const GoalSuggestion = () => {
  const { setOpenGoalModal, openGoalModal, setCurrentGoalForSuggestion, setIsGoalEdit, setCurrentTaskGoalId } = useDataContext();
  const theme = useTheme();

  const handleGoalClick = (goal) => {
    setOpenGoalModal(true);
    setCurrentGoalForSuggestion(goal);
    setIsGoalEdit(true);
    setCurrentTaskGoalId(null);
  };

  return (
    <>
      {openGoalModal && <Goal />}
      <Typography
        paddingTop={"20px"}
        paddingLeft={"20px"}
        variant="h4"
        gutterBottom
        color={"primary"}
        component="h2"
      >
        Add Suggested Goal
      </Typography>
      <List>
        {suggestedGoals.map((goal) => (
          <ListItem
            key={goal.id}
            sx={{
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                cursor: "pointer",
                "& svg": {
                  color: theme.palette.primary.contrastText,
                },
              },
            }}
            onClick={() => handleGoalClick(goal)}
          >
            <AddCircleOutlineIcon color="primary" />
            <ListItemText primary={<Box sx={{ ml: 1 }}>{goal.goalName}</Box>} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GoalSuggestion;

import React, { useEffect, useState } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Stack, Tooltip } from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import { Pagination } from '@mui/material';
import { useDataContext } from '../../context/DataContext';
import { GoalService } from '../../services/goal.services';
import { displayError } from '../../utils';
import { useCookies } from 'react-cookie';
import Task from '../Task';

const GoalListing = ({ addTask, onGoalClick, onTaskClick, onAddGoal, onUpdateGoal, onDeleteGoal, onUpdateTask, onDeleteTask }) => {
  const { goals, setCurrentTaskId, setOpenGoalModal, setOpenTaskModal, openTaskModal, setIsTaskEdit, setIsGoalEdit, setGoals, setCurrentTaskGoalId } = useDataContext()
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [cookies] = useCookies(['token'])

  const handleGoalClick = (goalId) => {
    if (onGoalClick) {
      onGoalClick(goalId);
    }
  };

  

  const handleTaskClick = (goalId, taskId) => {
    if (onTaskClick) {
      onTaskClick(goalId, taskId);
    }
  };

  const handleAddGoal = () => {
    setIsGoalEdit(false);
    if (onAddGoal) {
      onAddGoal();
    }
  };

  const handleUpdateGoal = (goalId) => {
    setCurrentTaskGoalId(goalId);
    setIsGoalEdit(true)
    setOpenGoalModal(true)
  };

  const handleDeleteGoal = (goalId) => {
    if (onDeleteGoal) {
      onDeleteGoal(goalId);
    }
  };

  const handleUpdateTask = (goalId, taskId) => {
    setOpenTaskModal(true);
    setCurrentTaskId(taskId);
    setCurrentTaskGoalId(goalId);
    setIsTaskEdit(true);
  };

  const handleDeleteTask = (taskId) => {
    if (onDeleteTask) {
      onDeleteTask(taskId);
    }
  };

  const handleAddTask = (goalId) => {
    setCurrentTaskGoalId(goalId);
    if (addTask) {
      addTask(goalId);
    }
  }
  let pageCount;
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const { data: { data: { goals, totalPages } } } = await GoalService.getGoals(cookies.token, page);
        setTotalPages(totalPages)
        setGoals(goals);
        console.log("rendered", goals, totalPages)
      } catch (error) {
        console.error(error);
        displayError(error)
      }
    };

    fetchGoals();
  }, [page])

  return (
    <>
      {openTaskModal && <Task />}
      <Paper elevation={3} style={{ padding: 20 }}>
      <Stack
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        marginBottom={"20px"}
      >
        <Typography variant="h3"> My Goals</Typography>
        <Tooltip title="Add Goal">
          <IconButton onClick={handleAddGoal} aria-label="add-goal">
            <Add />
          </IconButton>
        </Tooltip>
      </Stack>
      {goals?.map((goal, index) => (
        <div key={index} style={{ marginBottom: 20 }}>
          <Stack
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography
              onClick={() => handleGoalClick(goal._id)}
              variant="h5"
              color="primary"
            >
              {goal.goalName}
            </Typography>
            <Stack display="flex" flexDirection="row">
              <Tooltip title="Add Task">
                <IconButton
                  onClick={() => handleAddTask(goal._id)}
                  aria-label="add-task"
                >
                  <Add />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit Goal">
                <IconButton
                  onClick={() => handleUpdateGoal(goal._id)}
                  aria-label="edit-goal"
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Goal">
                <IconButton
                  onClick={() => handleDeleteGoal(goal._id)}
                  aria-label="delete-goal"
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
          <List>
            {goal.tasks.map((task, taskIndex) => (
              <ListItem
                key={taskIndex}
                onClick={() => handleTaskClick(goal._id, task._id)}
              >
                <ListItem
                  button
                  sx={{
                    "&:hover": {
                      backgroundColor: "#fafafa", // Change to desired hover color
                      cursor: "pointer",
                    },
                  }}
                >
                  <ListItemText primary={task.taskName} />
                </ListItem>
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => handleUpdateTask(goal._id, task._id)}
                    edge="end"
                    aria-label="edit-task"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteTask(task._id)}
                    edge="end"
                    aria-label="delete-task"
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>
      ))}
      {goals.length > 0 && (
        <Pagination
          count={pageCount}
          page={page}
          onChange={(e, value) => setPage(value)}
          variant="outlined"
          shape="rounded"
        />
      )}
      </Paper>
    </>
  );
};

export default GoalListing;

import React from 'react';
import { Grid, Paper, Box } from '@mui/material';
import StatsComponent from '../Stats';
import GoalListing from '../GoalListing'
import { GoalService } from '../../services/goal.services';
import { useDataContext } from '../../context/DataContext';
import { displayError } from '../../utils';
import { useCookies } from 'react-cookie';
import { TaskService } from '../../services/task.services';
import Goal from '../Goal';
import Task from '../Task';
import { toast } from 'react-toastify';
import Login from '../Login';
import NotFound from './../NotFound/index';
import GoalSuggestion from '../GoalSuggestion';

export default function Home() {
  const { task, goals,setGoal,setGoals, setTask, openGoalModal, setOpenGoalModal,openTaskModal, setOpenTaskModal } = useDataContext()
  const [cookies] = useCookies(['token'])

  const handleGoalClick = async (goalId) => {
    try {
      const { data } = await GoalService.getGoalById(goalId, cookies.token);
      setGoal(data)
    } catch (error) {
      displayError(error);
    }
  }

  const handleTaskClick = async (goalId, taskId) => {
    try {
      console.log(goals)
      const data = goals.filter((goal)=>goal._id === goalId)[0].tasks.filter((task)=>task._id===taskId)[0]
      setTask(data)
    } catch (error) {
      displayError(error);
    }
  };

  const handleAddGoal = () => {
    setOpenGoalModal(true)
  };

  const addTask = ( goalId ) => {
    console.log("Task modal")
    setOpenTaskModal(true)
  }

  const handleUpdateGoal = (goalId) => {
    console.log('Update Goal clicked:', goalId);
  };

  const handleDeleteGoal = async (goalId) => {
    try {
      await GoalService.deleteGoal(cookies.token, goalId);

      const { data : { data : { goals }} } = await GoalService.getGoals(cookies.token);
      setGoals(goals);

      toast.success('Goal Deleted Successfully')
    } catch (error) {
      displayError(error);
    }
  };

  const handleUpdateTask = (taskId) => {
    console.log('Update Task clicked:', taskId);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await TaskService.deleteTask(cookies.token, taskId);

      const { data : { data : { goals }} } = await GoalService.getGoals(cookies.token);
      setGoals(goals);

      toast.success('Task Deleted Successfully')
    } catch (error) {
      displayError(error);
    }
  };
  return (
    <>
      {openTaskModal && <Task />}
      {openGoalModal && <Goal />}
      {cookies.token ? (
        <Box px="10%" py="5%">
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <Paper style={{ height: "100%" }}>
                {goals.length > 0 ? (
                  <GoalListing
                    addTask={addTask}
                    onGoalClick={handleGoalClick}
                    onTaskClick={handleTaskClick}
                    onAddGoal={handleAddGoal}
                    onUpdateGoal={handleUpdateGoal}
                    onDeleteGoal={handleDeleteGoal}
                    onUpdateTask={handleUpdateTask}
                    onDeleteTask={handleDeleteTask}
                  />
                ) : (
                  <NotFound image="empty.jpg" heading="No Goals Found" />
                )}
              </Paper>
            </Grid>
            <Grid item xs={5}>
              <Paper style={{ height: "100%" }}>
                {task?.keys?.length > 0 ?  <StatsComponent /> : <GoalSuggestion />}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Login />
      )}
    </>
  );
}

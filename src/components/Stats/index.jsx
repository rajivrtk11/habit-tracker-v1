import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import { useDataContext } from '../../context/DataContext';

const Stats = () => {
  const { task } = useDataContext()
  return (
    <Paper elevation={3} style={{ padding: 20 }}>
      <Grid justifyContent="center" container spacing={2} >
        <Grid  item xs={8}  style={{ border: '1px solid #e0e0e0', marginTop: '5%', padding: "5%" }}>
          <Typography variant="h6" color="primary">Task Description</Typography>
          <Typography variant="h4">{task.taskName}</Typography>
        </Grid>
        <Grid  item xs={8} style={{ border: '1px solid #e0e0e0', marginTop: '5%', padding: "5%" }}>
          <Typography variant="h6" color="primary">Frequency</Typography>
          <Typography variant="h4">{task.frequency}</Typography>
        </Grid>
        <Grid  item xs={8} style={{ border: '1px solid #e0e0e0', marginTop: '5%', padding: "5%" }}>
          <Typography variant="h6" color="primary">Quantity</Typography>
          <Typography variant="h5">{task.quantity}</Typography>
        </Grid>
        <Grid  item xs={8} style={{ border: '1px solid #e0e0e0', marginTop: '5%', padding: "5%" }}>
          <Typography variant="h6" color="primary">Reminder Time</Typography>
          <Typography variant="h5">{new Date(task.reminderTime).toLocaleString()}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Stats;

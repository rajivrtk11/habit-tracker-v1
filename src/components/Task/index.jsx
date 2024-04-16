import {useState} from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { toast } from 'react-toastify';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TaskService } from '../../services/task.services';
import { displayError, validateSchema } from '../../utils';
import taskSchema from '../../validationSchemas/taskSchema';
import { GoalService } from '../../services/goal.services';
import { useDataContext } from '../../context/DataContext';
import { useCookies } from 'react-cookie';
import dayjs from 'dayjs';


export default function Task() {
  const { user, goals, setGoals, currentTaskGoalId, currentTaskId, setCurrentTaskGoalId, openTaskModal, setOpenTaskModal, isTaskEdit, setIsTaskEdit } = useDataContext()
  const currentTask = goals.filter(goal => goal._id === currentTaskGoalId)?.[0]?.tasks.filter( task => task._id === currentTaskId)?.[0];
  console.log('the val is', currentTask)
  const [taskName, setTaskName] = useState(isTaskEdit ? currentTask.taskName : '');
  const [quantity, setQuantity] = useState( isTaskEdit ? currentTask.quantity : 1);
  const [frequency, setFrequency] = useState( isTaskEdit ? currentTask.frequency : '');
  const [reminderActive, setReminderActive] = useState(isTaskEdit ? currentTask.reminder : false);
  const [reminderTime, setReminderTime] = useState( isTaskEdit ? dayjs(currentTask.reminderTime ): null);
  const [reminderDate, setReminderDate] = useState(isTaskEdit ? dayjs(currentTask.reminderTime) : null);
  const [ cookies ] = useCookies(['token'])


  const handleAddTask = async (event) => {
    event.preventDefault();

    const isDataValid = validateSchema(taskSchema, { 
      taskName, 
      quantity,
      frequency,
      reminder: reminderActive,
      reminderTime: reminderTime ? new Date(reminderTime?.$d) : reminderTime,
    });

    if(!isDataValid){
      return;
    }

    const payload = { 
      taskName, 
      quantity,
      frequency,
      reminder: reminderActive,
      reminderTime: reminderTime ? new Date(reminderTime?.$d) : reminderTime,
    }

    try {
      if(!isTaskEdit)
        await TaskService.createTask(cookies.token, payload, currentTaskGoalId);
      else
        await TaskService.updateTask(currentTaskId, cookies.token, payload);

      toast.success('Task Created successfully.')
      const { data : { data : { goals }} } = await GoalService.getGoals(cookies.token, payload)
      setGoals(goals)
      setCurrentTaskGoalId(null)
      setIsTaskEdit(false);
    } catch (error) {
      displayError(error);
    }
    setOpenTaskModal(false);
  };

  return (
    <>
      <Modal open={openTaskModal} onClose={() => setOpenTaskModal(false)}>
        <ModalDialog>
          <DialogTitle>Create Task</DialogTitle>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpenTaskModal(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Task Name</FormLabel>
                <Input 
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    autoFocus 
                    required 
                />
              </FormControl>
              <FormControl>
                <FormLabel>Quantity</FormLabel>
                <Input 
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    autoFocus 
                    required 
                />
              </FormControl>
              <FormControl>
                <FormLabel>Frequency</FormLabel>
                <Input 
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  autoFocus 
                  required 
                />
              </FormControl>
              <FormControlLabel
                  label="Set Reminder"
                  control={<Checkbox checked={reminderActive} onChange={(event)=>setReminderActive(event.target.checked)} />}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']}>
                    <DateTimePicker 
                      value={reminderTime}
                      onChange={(newValue) => setReminderTime(newValue)}
                      label="Reminder Time"
                    />
                </DemoContainer>
              </LocalizationProvider>
              <Button onClick={handleAddTask}>Add</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}

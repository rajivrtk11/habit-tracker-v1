import {useEffect, useState} from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDataContext } from '../../context/DataContext';
import { displayError, validateSchema } from '../../utils';
import goalSchema from '../../validationSchemas/goalSchema';
import { GoalService } from '../../services/goal.services';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import dayjs from 'dayjs';


export default function Goal() {
  const navigate = useNavigate()
  const { goals, setGoals, isGoalEdit,currentTaskGoalId, openGoalModal, setOpenGoalModal, currenGoalForSuggestion } = useDataContext()
  const currentGoal = goals.filter((goal)=>goal._id === currentTaskGoalId)?.[0] || currenGoalForSuggestion;

  const [goalName, setGoalName] = useState(isGoalEdit ? currentGoal?.goalName : '');
  const [minTimeline, setMinTimeline] = useState( isGoalEdit ? dayjs(currentGoal?.minTimeline) : null);
  const [maxTimeline, setMaxTimeline] = useState(isGoalEdit ? dayjs(currentGoal?.maxTimeline) : null);
  const [ cookies ] = useCookies(['token'])

  const handleAddGoal = async (event) => {
    event.preventDefault();

    const isDataValid = validateSchema(goalSchema, { 
      goalName, 
      minTimeline: minTimeline ? new Date(minTimeline?.$d) : minTimeline, 
      maxTimeline: maxTimeline ? new Date(maxTimeline?.$d) : maxTimeline
    });

    if(!isDataValid){
      return;
    }

    const payload = { 
      goalName,
      minTimeline : new Date(minTimeline.$d),
      maxTimeline : new Date(maxTimeline.$d)
    }

    try {
      if(!isGoalEdit || currenGoalForSuggestion)
        await GoalService.createGoal(cookies.token, payload)
      else 
        await GoalService.updateGoal(currentTaskGoalId, cookies.token, payload)
       toast.success('Goal Created successfully.')

       const { data : { data : { goals }} } = await GoalService.getGoals(cookies.token, payload)
       setGoals(goals)

    } catch (error) {
      displayError(error);
    }
    setOpenGoalModal(false);
  };
  // 661aa699654913a1c5a8dae0

  return (
    <>
      <Modal open={openGoalModal} onClose={() => setOpenGoalModal(false)}>
        <ModalDialog>
          <DialogTitle>Create New Goal</DialogTitle>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpenGoalModal(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Goal Description</FormLabel>
                <Input 
                 value={goalName}
                 onChange={(e) => setGoalName(e.target.value)}
                autoFocus required />
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker
                label="Min Timeline"
                value={minTimeline}
                defaultValue={dayjs(minTimeline)}
                onChange={(date) => setMinTimeline(date)}
            />
            <DatePicker
                label="Max Timeline"
                value={maxTimeline}
                defaultValue={dayjs(maxTimeline)}
                onChange={(date) => setMaxTimeline(date)}
            />
             </DemoContainer>
             </LocalizationProvider>
              <Button onClick={handleAddGoal}>Add</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}

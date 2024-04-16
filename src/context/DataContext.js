import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const useDataContext = () => {
  return useContext(DataContext);
};

const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [goals, setGoals] = useState([]);
  const [task, setTask] = useState({});
  const [goal, setGoal] = useState({})
  const [openGoalModal,setOpenGoalModal] = useState(false)
  const [openTaskModal, setOpenTaskModal] = useState(false)
  const [currentTaskGoalId, setCurrentTaskGoalId] = useState(null);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [isTaskEdit, setIsTaskEdit] = useState(null);
  const [isGoalEdit, setIsGoalEdit] = useState(null);
  const [currenGoalForSuggestion, setCurrentGoalForSuggestion] = useState(null);

  return (
    <DataContext.Provider
      value={{
        currentTaskId, 
        setCurrentTaskId,
        isTaskEdit, 
        setIsTaskEdit,
        isGoalEdit, 
        setIsGoalEdit,
        user,
        setUser,
        goals, 
        setGoals,
        goal, 
        setGoal,
        task,
        setTask,
        openGoalModal,
        openTaskModal,
        currentTaskGoalId,
        setCurrentTaskGoalId,
        setOpenGoalModal,
        setOpenTaskModal,
        currenGoalForSuggestion, 
        setCurrentGoalForSuggestion,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;

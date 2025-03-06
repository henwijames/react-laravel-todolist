import React, { createContext, useContext, useEffect } from "react";
import apiService from "../services/apiService";

const TaskContext = createContext(undefined);

export const TaskProvider = ({ children }) => {
    const [taskList, setTaskList] = React.useState([]);
    const fetchTaskList = () => {
        apiService
            .get("get-task-list")
            .then((response) => {
                console.log(response);
                setTaskList(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchTaskList();
    }, []);

    const updateContextData = () => {
        fetchTaskList();
    };

    return (
        <TaskContext.Provider value={{ taskList, updateContextData }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTaskContext must be used within a TaskProvider");
    }

    return context;
};

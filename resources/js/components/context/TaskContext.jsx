import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import apiService from "../services/apiService";

const TaskContext = createContext(undefined);

export const TaskProvider = ({ children }) => {
    const [taskList, setTaskList] = React.useState([]);
    const [loading, setLoading] = useState(false);
    const fetchTaskList = useCallback(() => {
        apiService
            .get("get-task-list")
            .then((response) => {
                console.log(response);
                setTaskList(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        fetchTaskList();
    }, [fetchTaskList]);

    const updateContextData = useCallback(() => {
        fetchTaskList();
    }, [fetchTaskList]);

    return (
        <TaskContext.Provider
            value={{ taskList, updateContextData, setLoading, loading }}
        >
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

import React from "react";
import apiService from "../../services/apiService";
import { useTaskContext } from "../../context/TaskContext";

const TaskForm = () => {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [errors, setErrors] = React.useState({});
    const { updateContextData } = useTaskContext();

    // React.useEffect(() => {
    //     console.log("@@@", title, description);
    // }, [title, description]);

    const handleSubmit = () => {
        apiService
            .post("save-task", { title, description })
            .then((response) => {
                console.log(response);
                setTitle("");
                setDescription("");
                setErrors({});
                updateContextData();
            })
            .catch((error) => {
                console.log(error);
                if (error.response && error.response.status === 422) {
                    setErrors(error.response.data.error);
                }
            });
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="flex flex-col gap-2 ">
            <input
                type="text"
                value={title}
                onChange={(event) => {
                    setTitle(event.target.value);
                }}
                placeholder="Title"
                onKeyDown={handleKeyDown}
                className="input w-full bg-white"
            />
            {errors.title && (
                <p className="text-red-500 text-sm">{errors.title[0]}</p>
            )}
            <textarea
                value={description}
                onChange={(event) => {
                    setDescription(event.target.value);
                }}
                className="textarea w-full min-h-52 bg-white z-10"
                placeholder="Description"
                onKeyDown={handleKeyDown}
            ></textarea>
            {errors.description && (
                <p className="text-red-500 text-sm">{errors.description[0]}</p>
            )}
            <button
                className="btn btn-primary z-10 hover:bg-accent"
                onClick={handleSubmit}
            >
                Save Task
            </button>
        </div>
    );
};

export default TaskForm;

import React, { useState } from "react";
import apiService from "../../services/apiService";
import { useTaskContext } from "../../context/TaskContext";

const TaskForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});
    const { updateContextData, setLoading, loading } = useTaskContext();

    // React.useEffect(() => {
    //     console.log("@@@", title, description);
    // }, [title, description]);

    const handleSubmit = () => {
        setLoading(true);
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
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
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
                className={`btn z-10 flex justify-center items-center ${
                    loading
                        ? "bg-black cursor-not-allowed"
                        : "btn-primary hover:bg-accent"
                }`}
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? (
                    <div className="flex gap-2 items-center">
                        Save Task
                        <span className="loading loading-spinner loading-xs"></span>
                    </div>
                ) : (
                    "Save Task"
                )}
            </button>
        </div>
    );
};

export default TaskForm;

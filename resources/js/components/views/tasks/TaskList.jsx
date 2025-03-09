import React, { useState, useEffect } from "react";
import { useTaskContext } from "../../context/TaskContext";
import { truncateText } from "../../utils/string";
import apiService from "../../services/apiService";
import { Button } from "@/components/ui/button";
import { logout } from "@/components/services/authService";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
    const { taskList, updateContextData, loading, setLoading } =
        useTaskContext();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                await Promise.all([
                    updateContextData(),
                    new Promise((resolve) => setTimeout(resolve, 1000)),
                ]);
            } catch (error) {
                console.error("Error updating task", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [setLoading, updateContextData]);

    const renderList = (task) => {
        const { id, title, description } = task;
        return (
            <div className="rounded-xl bg-gray-100 text-black p-6" key={id}>
                <div className="flex justify-between items-center">
                    {/* Tasks */}
                    <div>
                        <div className="text-xl">{title}</div>
                        <div className="text-sm">
                            {truncateText(description)}
                        </div>
                    </div>
                    <div>
                        <ul className="menu menu-horizontal bg-neutral rounded-box">
                            <li>
                                <div
                                    className="tooltip"
                                    data-tip="Mark As Done"
                                    onClick={() => handleMarkAsDone(id)}
                                >
                                    <svg
                                        width={15}
                                        height={15}
                                        className="stroke-white"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                        <path d="M22 4 12 14.01l-3-3" />
                                    </svg>
                                </div>
                            </li>
                            <li>
                                <div
                                    className="tooltip"
                                    data-tip="Delete"
                                    onClick={() => handleDeleteTask(id)}
                                >
                                    <svg
                                        width={15}
                                        height={15}
                                        fill="none"
                                        className="stroke-white"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M3 6h18" />
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                    </svg>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

    const handleMarkAsDone = (id) => {
        setLoading(true);
        apiService
            .put(`update-task-list/${id}`)
            .then(() => {
                updateContextData();
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            });
    };

    const handleDeleteTask = (id) => {
        setLoading(true);
        apiService
            .delete(`delete-task-list/${id}`)
            .then(() => {
                updateContextData();
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            });
    };

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div className="card bg-primary text-primary-content w-full sm:px-0 lg:px-5">
            <div className="card-body">
                <div className="flex justify-between items-center w-full">
                    <h2 className="card-title">Your Task</h2>
                    <button
                        onClick={handleLogout}
                        className="bg-white cursor-pointer text-black border border-gray-300 px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>

                <p className="text-sm">
                    Stay on top of your to-dos and boost productivity with ease
                </p>
                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3 mt-5 max-h-[25rem] overflow-y-auto overflow-x-hidden custom-scrollbar">
                        {/* {taskList.map(renderList)} */}

                        {taskList.length > 0 ? (
                            taskList.map(renderList)
                        ) : (
                            <div className="flex items-center justify-center h-full gap-2 text-xl font-semibold">
                                <h3 className="header">All task completed</h3>
                                <svg
                                    width={15}
                                    height={15}
                                    className="stroke-current"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <path d="M22 4 12 14.01l-3-3" />
                                </svg>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskList;

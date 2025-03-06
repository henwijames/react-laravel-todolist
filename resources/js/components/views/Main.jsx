import React from "react";
import TaskForm from "./forms/TaskForm";
import TaskList from "./tasks/TaskList";

const Main = () => {
    return (
        <section className="min-h-screen px-5 py-20 sm:py-12 flex items-center justify-center bg-stone-50 z-50">
            <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row gap-10">
                <div className="sm:w-6/12 w-full">
                    <div className="mb-4 text-center">
                        <div className="flex justify-center items-center gap-3 mb-2">
                            <img
                                src="/assets/images/react.png"
                                alt="React"
                                className="max-w-[40px] max-h-[40px]"
                            />
                            +
                            <img
                                src="/assets/images/laravel.png"
                                alt="Laravel"
                                className="max-w-[40px] max-h-[40px]"
                            />
                            TODO List
                        </div>
                        <div className="text-sm tracking-wider leading-5 font-light">
                            Welcome to the workspace!
                        </div>
                    </div>
                    <TaskForm />
                </div>
                <div className="sm:w-6/12 w-full ">
                    <TaskList />
                </div>
            </div>
        </section>
    );
};

export default Main;

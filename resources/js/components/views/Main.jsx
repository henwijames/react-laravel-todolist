import React from "react";
import TaskForm from "./forms/TaskForm";
import TaskList from "./tasks/TaskList";
import reactLogo from "@/assets/images/react.png";
import laravelLogo from "@/assets/images/laravel.png";

const Main = () => {
    return (
        <section className="min-h-screen px-5 py-20 sm:py-12 flex items-center justify-center bg-stone-50">
            <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row gap-10">
                <div className="sm:w-6/12 w-full">
                    <div className="mb-4 text-center">
                        <div className="flex justify-center items-center gap-3 mb-2 min-h-[40px]">
                            <img
                                src={reactLogo}
                                alt="React"
                                className="max-w-[40px] max-h-[40px]"
                                loading="lazy"
                            />
                            +
                            <img
                                src={laravelLogo}
                                alt="Laravel"
                                className="max-w-[40px] max-h-[40px]"
                                loading="lazy"
                            />
                            TODO List
                        </div>
                        <div className="text-sm tracking-wider leading-5 font-light">
                            Welcome to the workspace!
                        </div>
                    </div>
                    <TaskForm />
                </div>
                <div className="sm:w-6/12 w-full flex-11/12">
                    <TaskList />
                </div>
            </div>
        </section>
    );
};

export default Main;

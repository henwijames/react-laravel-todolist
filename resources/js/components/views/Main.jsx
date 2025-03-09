import React, { useEffect, useState } from "react";
import TaskForm from "./forms/TaskForm";
import TaskList from "./tasks/TaskList";
import reactLogo from "@public/assets/images/react.png";
import laravelLogo from "@public/assets/images/laravel.png";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/authService";
import Logo from "./Logo";

const Main = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        getUser(token)
            .then((response) => {
                console.log(response);
                setUser(response);
                setLoading(false);
            })
            .catch(() => {
                localStorage.removeItem("token");
                navigate("/login");
            });
    }, [token, navigate]);

    return (
        <section className="min-h-screen px-5 py-20 sm:py-12 flex items-center justify-center">
            <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row gap-10">
                <div className="sm:w-6/12 w-full">
                    <div className="mb-4 text-center">
                        <Logo />
                        <div className="text-sm tracking-wider leading-5 font-light">
                            {loading ? (
                                "Loading..."
                            ) : (
                                <p>
                                    Welcome back{" "}
                                    <span className=" font-semibold">
                                        {user?.name}
                                    </span>{" "}
                                    to the workspace!
                                </p>
                            )}
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

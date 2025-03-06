import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import { TaskProvider } from "./context/TaskContext";
import ParticlesBackground from "./ui/ParticlesBackground";

const App = () => {
    return (
        <>
            <ParticlesBackground id="particles" />
            <BrowserRouter>
                <TaskProvider>
                    <Routes />
                </TaskProvider>
            </BrowserRouter>
        </>
    );
};

export default App;

import React from "react";
import { Routes as Router, Route } from "react-router-dom";
import Main from "../views/Main";
import Test from "../views/Test";
import Login from "../views/Login";
import Signup from "../views/Signup";

const Routes = () => {
    return (
        <Router>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route path="/" element={<Main />} />
            <Route path="/test" element={<Test />} />
        </Router>
    );
};

export default Routes;

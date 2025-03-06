import React from "react";
import { Routes as Router, Route } from "react-router-dom";
import Main from "../views/Main";
import Test from "../views/Test";

const Routes = () => {
    return (
        <Router>
            <Route path="/" element={<Main />} />
            <Route path="/test" element={<Test />} />
        </Router>
    );
};

export default Routes;

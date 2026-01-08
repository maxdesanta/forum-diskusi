import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}) {
    const isAuth = localStorage.getItem("token");

    if (!isAuth) {
        alert("Silahkan login terlebih dahulu !");
        return <Navigate to={'/'} replace />
    } 

    return children;
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
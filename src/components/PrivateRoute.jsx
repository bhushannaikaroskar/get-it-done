import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/user-context/UserProvider";

export default function PrivateRoute() {
	const { user } = useUser();

	return user.isVerified ? <Outlet /> : <Navigate to="/" replace />;
}

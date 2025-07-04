import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    checkAuth,
    resetSignupForm,
    setSignupForm,
} from "../stores/authReducer";

export const SignupForm = () => {
    const signupForm = useSelector((state) => state.auth.signupForm);
    const loadingCheckAuth = useSelector((state) => state.auth.loadingCheckAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const updateSignupForm = (e) => {
        const { name, value } = e.target;
        dispatch(
            setSignupForm({
                ...signupForm,
                [name]: value,
            })
        );
    };
    
    const handleSignup = async (e) => {
        e.preventDefault();
        
        if (signupForm.password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        
        try {
            console.log("Attempting signup...", signupForm);
            
            // Try with explicit field mapping
            const signupData = {
                email: signupForm.email,
                password: signupForm.password,
                // Add any other fields your backend expects
                // username: signupForm.email, // if backend expects username
                // name: signupForm.name, // if backend expects name
            };
            
            console.log("Sending data:", signupData);
            const res = await axios.post("/api/auth/signup", signupData);
            console.log("Signup successful:", res);
            
            console.log("Checking auth status...");
            await dispatch(checkAuth());
            console.log("Auth check completed");
            
            console.log("Resetting form...");
            dispatch(resetSignupForm());
            
            console.log("Navigating to createform page...");
            navigate("/CreateForm");
            console.log("Navigation to createform completed");
            
            await dispatch(checkAuth());
            dispatch(resetSignupForm());
            navigate("/");
            
        } catch (error) {
            console.error("=== SIGNUP ERROR DETAILS ===");
            console.error("Full error:", error);
            console.error("Error response:", error.response);
            console.error("Error response data:", error.response?.data);
            console.error("Error status:", error.response?.status);
            console.error("Error message:", error.message);
            console.error("==============================");
            
            if (error.response) {
                const errorMsg = error.response.data?.message || 
                               error.response.data?.error || 
                               error.response.data || 
                               `Server error (${error.response.status})`;
                alert(`Signup failed: ${errorMsg}`);
            } else if (error.request) {
                alert("Network error: Unable to connect to server. Check if your backend is running.");
            } else {
                alert(`Error: ${error.message}`);
            }
        }
    };
    
    return (
        <form
            onSubmit={handleSignup}
            className="w-full max-w-md px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
        >
            <div className="mb-4">
                <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                >
                    Email
                </label>
                <input
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    onChange={updateSignupForm}
                    value={signupForm?.email || ""}
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    disabled={loadingCheckAuth}
                />
            </div>
            <div className="mb-4">
                <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="password"
                >
                    Password
                </label>
                <input
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    onChange={updateSignupForm}
                    value={signupForm?.password || ""}
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    disabled={loadingCheckAuth}
                />
            </div>
            <div className="mb-6">
                <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="confirmPassword"
                >
                    Confirm Password
                </label>
                <input
                    className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    required
                    disabled={loadingCheckAuth}
                />
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    disabled={loadingCheckAuth}
                >
                    Sign up
                </button>
            </div>
        </form>
    );
};

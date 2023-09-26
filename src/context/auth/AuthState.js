import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
    const host = "http://127.0.0.1:5000"
    const [user, setUser] = useState({
        name: "",
        email: "",
    });


    //Get all notes
    const getUser = async () => {
        //Api Call
        const url = `${host}/api/auth/getuser`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setUser({
            name: json.name,
            email: json.email
        });
    }

    return (
        <AuthContext.Provider value={{ user, getUser }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
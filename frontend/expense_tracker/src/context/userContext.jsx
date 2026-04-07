import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem("theme");

        if (storedTheme === "light" || storedTheme === "dark") {
            return storedTheme;
        }

        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    });

    //Function to update user data
    const updateUser = (userData) => {
        setUser(userData);
    }

    //Function to clear user data (e.g. on logout)
    const clearUser = () => {
        setUser(null);
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    };

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <UserContext.Provider
            value={{
                user,
                updateUser,
                clearUser,
                theme,
                toggleTheme,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;

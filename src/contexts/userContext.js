import React, { createContext, useState, useContext, useCallback } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    const updateUser = useCallback((newUser)=>{
        setCurrentUser({...currentUser, ...newUser});
    }, [currentUser]);

    return (
        <UserContext.Provider value={{ logged: !!currentUser, currentUser, setCurrentUser, updateUser }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) throw new Error("error: no user context")
    const { logged, currentUser, setCurrentUser, updateUser } = context;
    return { currentUser, setCurrentUser, updateUser, logged };
}
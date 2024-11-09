import React, { createContext, useReducer, useEffect } from "react";

const AuthContext = createContext();

const initialState = {
    session: JSON.parse(localStorage.getItem("sports-session")) || null,
    users: JSON.parse(localStorage.getItem("sports-users")) || [],
};

const actionTypes = {
    SET_SESSION: 'SET_SESSION',
    REMOVE_SESSION: 'REMOVE_SESSION',
    UPDATE_USERS: 'UPDATE_USERS',
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_SESSION:
            localStorage.setItem("sports-session", JSON.stringify(action.payload));
            return { ...state, session: action.payload };
        case actionTypes.REMOVE_SESSION:
            localStorage.removeItem("sports-session");
            return { ...state, session: null };
        case actionTypes.UPDATE_USERS:
            localStorage.setItem("sports-users", JSON.stringify(action.payload));
            return { ...state, users: action.payload };
        default:
            return state;
    }
};

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const savedSession = JSON.parse(localStorage.getItem("sports-session"));
        if (savedSession) {
            dispatch({ type: actionTypes.SET_SESSION, payload: savedSession });
        }
    }, []);

    const register = (email, password) => {
        const existingUser = state.users.find(u => u.email === email);
        if (!existingUser) {
            const newUser = { email, password };
            const updatedUsers = [...state.users, newUser];
            dispatch({ type: actionTypes.UPDATE_USERS, payload: updatedUsers });
            return true;
        }
        return false;
    };

    const login = (email, password) => {
        const foundUser = state.users.find(u => u.email === email && u.password === password);
        if (foundUser) {
            const token = Math.random().toString(36).substring(2);
            const sessionData = {
                name: foundUser.name,
                email: foundUser.email,
                token,
            };
            dispatch({ type: actionTypes.SET_SESSION, payload: sessionData });
            return true;
        }
        return false;
    };

    const logout = () => {
        dispatch({ type: actionTypes.REMOVE_SESSION });
    };

    return (
        <AuthContext.Provider
            value={{
                session: state.session,
                signed: !!state.session,
                login,
                register,
                logout,
                users: state.users,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };

import { createContext, useContext, useState } from "react";
import { basicAuthExecution } from "../api/TaskHiveApiService";
import { apiClient } from "../api/ApiClient";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState(null);
    const [token, setToken] = useState(null);

    async function login(username, password) {
        const basicAuthToken = 'Basic ' + window.btoa(username + ':' + password);

        try {
            const response = await basicAuthExecution(basicAuthToken)

            if (response.status === 200) {
                setLoggedIn(true);
                setUsername(username);
                setToken(basicAuthToken);
                apiClient.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization = basicAuthToken;
                        return config;
                    }
                )
                return true;
            } else {
                logout();
                return false;
        }
        } catch(error) {
            logout();
            return false;
        }
    }

    function logout() {
        setLoggedIn(false);
        setToken(null);
        setUsername(null);
    }

    return (
        <AuthContext.Provider value={ {isLoggedIn, login, logout, username, token} }>
            { children }
        </AuthContext.Provider>
    );
}
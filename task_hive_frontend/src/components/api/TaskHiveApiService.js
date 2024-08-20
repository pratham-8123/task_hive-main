import { apiClient } from "./ApiClient";

export const getTasksByUsernameApi
    = (username) => apiClient.get(`/users/${username}/tasks`);

export const deleteTaskByIdApi
    = (username, id) => apiClient.delete(`/users/${username}/tasks/${id}`);

export const getTaskByIdApi
    = (username, id) => apiClient.get(`/users/${username}/tasks/${id}`);

export const updateTaskByIdApi
    = (username, id, task) => apiClient.put(`/users/${username}/tasks/${id}`, task);

export const createTaskApi
    = (username, task) => apiClient.post(`/users/${username}/tasks`, task);

export const basicAuthExecution
    = (token) => apiClient.get(`/basicAuth`, {
        headers: {
            Authorization: token
        }
    }); 
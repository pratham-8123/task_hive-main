import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getTasksByUsernameApi, deleteTaskByIdApi } from "./api/TaskHiveApiService";
import { useAuth } from "./security/AuthContext";

export default function ShowTasksComponent() {
    const authContext = useAuth();
    const [tasks, setTasks] = useState([]);
    const [deleteMessage, setDeleteMessage] = useState();
    const navigate = useNavigate();

    function refreshTasks() {
        getTasksByUsernameApi(authContext.username)
            .then(response => setTasks(response.data))
            .catch(error => console.log(error));
    }

    useEffect (
        () => {
            refreshTasks()
        },
    );

    function deleteTaskById(id, description) {
        deleteTaskByIdApi(authContext.username, id)
            .then(
                () => {
                    setDeleteMessage(`Task Deleted - ${description}`);
                    refreshTasks();
                }
                
            )
            .catch(error => console.log(error));
    }

    function updateTaskById(id) {
        navigate(`/task/${id}`);
    }

    function createTask() {
        navigate(`/task/-1`);
    }

    return (
        <div className="container">
            <h1>Your Tasks</h1>
            { deleteMessage && <div className="alert alert-warning">{ deleteMessage }</div>}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Target Date</th>
                            <th>Completed</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks.map(
                                task => (
                                    <tr key={task.id}>
                                        <td>{task.description}</td>
                                        <td>{task.targetDate.toString()}</td>
                                        <td>{task.completed.toString()}</td>
                                        <td><button className="btn btn-warning"
                                                    onClick={() => deleteTaskById(task.id, task.description)}>Delete</button></td>
                                        <td><button className="btn btn-success"
                                                    onClick={() => updateTaskById(task.id)}>Update</button></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
                <div className="btn btn-success m-5" onClick={createTask}>Create New Task</div>
            </div>
        </div>
    );
}
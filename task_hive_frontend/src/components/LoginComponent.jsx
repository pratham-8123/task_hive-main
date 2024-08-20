import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from './security/AuthContext';

export default function LoginComponent() {
    const authContext = useAuth();
    const [username, setUsername] = useState(authContext.username);
    const [password, setPassword] = useState('');
    const [showFailedMessage, setShowFailedMessage] = useState(false);
    const navigate = useNavigate();

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    async function handleLogin() {
        if (await authContext.login(username, password)) {
            navigate(`/welcome/${username}`);
            setShowFailedMessage(false);
        } else {
            setShowFailedMessage(true);
        }
    }

    return (
        <div className="login">
            <div className="loginForm">
                <h1>Login</h1>
                {showFailedMessage && <div className="failedMessage">Authentication Failed</div>}
                <div>
                    <label> Username: </label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label> Password: </label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange} />
                </div>
                <div>
                    <button type="button" name="login" onClick={handleLogin}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}
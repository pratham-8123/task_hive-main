import LogoutComponent from './LogoutComponent.jsx';
import HeaderComponent from './HeaderComponent.jsx';
import ShowTasksComponent from './ShowTasksComponent.jsx';
import ErrorComponent from './ErrorComponent.jsx';
import WelcomeComponent from './WelcomeComponent.jsx';
import LoginComponent from './LoginComponent.jsx';
import TaskComponent from './TaskComponent.jsx';
import AuthProvider, { useAuth } from './security/AuthContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './TaskHiveApp.css';

function LoggedInRoute({ children }) {
    const authContext = useAuth();

    if (authContext.isLoggedIn) {
        return children;
    } else {
        return <Navigate to="/" />;
    }
}

export default function TaskHiveApp() {
    return (
        <div className="TaskHive">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path='/' element={ <LoginComponent /> } />
                        <Route path='/login' element={ <LoginComponent />} />
                        <Route path='/welcome/:username' element={ <LoggedInRoute><WelcomeComponent /></LoggedInRoute> } />
                        <Route path='/tasks' element={ <LoggedInRoute><ShowTasksComponent /></LoggedInRoute> } />
                        <Route path='/task/:id' element={ <LoggedInRoute><TaskComponent /></LoggedInRoute> } />
                        <Route path='/logout' element={ <LoggedInRoute><LogoutComponent /></LoggedInRoute> } />
                        <Route path='*' element={ <ErrorComponent />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}
import { useParams, Link } from 'react-router-dom';

export default function WelcomeComponent() {
    const { username } = useParams();

    return (
        <div className="welcome">
            <h1>Welcome, { username }</h1>
            <div>
                <Link to="/tasks"> Your Tasks </Link>
            </div>
        </div>
    );
}
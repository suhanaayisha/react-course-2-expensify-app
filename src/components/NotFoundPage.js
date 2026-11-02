import React from 'react';
import { Link} from 'react-router-dom';
const NotFoundPage = () => (
    <div className="content-container">
        <div className="message-box">
            <h2>404 — Page not found</h2>
            <p>The page you're looking for doesn't exist.</p>
            <Link className="button" to='/'>Go to dashboard</Link>
        </div>
    </div>
);
export default NotFoundPage;

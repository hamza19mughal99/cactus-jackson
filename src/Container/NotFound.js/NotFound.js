import React from 'react';
import './NotFound.css';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className='not_found'>
            <h1>Page Not Found</h1>
            <button onClick={() => navigate(-1)}>Return</button>
        </div>
    )
}

export default NotFound

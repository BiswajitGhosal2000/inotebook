import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Notes from './Notes';
import AddNotes from './AddNotes';


export const Home = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem('token');
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate])

    return (
        <>
            {user ? (
                <div className='container border bg-light d-flex'>
                    <Notes />
                    <AddNotes />
                </div>
            ) : (
                navigate('/login')
            )}
        </>

    )
}
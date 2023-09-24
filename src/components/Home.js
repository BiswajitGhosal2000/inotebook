import React from 'react';
// import { Link } from 'react-router-dom';
import Notes from './Notes';
import AddNotes from './AddNotes';


export const Home = () => {
    return (
        <div className='container border bg-light'>
            <AddNotes />
            <hr />
            <Notes />
        </div>
    )
}
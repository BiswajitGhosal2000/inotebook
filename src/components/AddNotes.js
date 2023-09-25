import React from 'react'
import { useState, useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

export default function AddNotes() {
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const { addNote } = useContext(NoteContext);
    const onChange = (e) => {
        setNote(
            { ...note, [e.target.name]: e.target.value }
        );
    }
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }

    return (
        <div className='container my-3'>
            <h2 className='text-center bg-info text-light' >Add a Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label" >Note Title <sup className='text-danger'>*</sup></label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" minLength={5} required onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label" >Note Description <sup className='text-danger'>*</sup></label>
                    <textarea className="form-control" id="description" rows="3" name="description" minLength={5} required onChange={onChange}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label" >Note Tag </label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

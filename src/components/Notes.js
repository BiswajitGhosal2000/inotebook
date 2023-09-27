import React from 'react';
import { useEffect, useContext, useState, useRef } from 'react';

import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';

export default function Notes() {
    const { notes, getNotes, editNote } = useContext(NoteContext);
    const [enote, setENote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    const ref = useRef(null);
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, [])
    const onChange = (e) => {
        setENote({
            ...enote,
            [e.target.name]: e.target.value
        })
    }
    const updateNote = (currentNote) => {

        ref.current.click();
        setENote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag
        })
    }
    const handleClick = (e) => {
        e.preventDefault();
        editNote(enote.id, enote.etitle, enote.edescription, enote.etag);
        setENote(
            { etitle: "", edescription: "", etag: "" }
        );
        ref.current.click();
    }

    return (
        <div className="container w-75 mx-2 bg-info" id="notes">
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref} hidden={true}>
                edit
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label" >Note Title <sup className='text-danger'>*</sup></label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" minLength={5} required onChange={onChange} value={enote.etitle} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label" >Note Description <sup className='text-danger'>*</sup></label>
                                    <textarea className="form-control" id="edescription" rows="10" name="edescription" minLength={5} required onChange={onChange} value={enote.edescription}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label" >Note Tag </label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={enote.etag} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" disabled={enote.etitle.length < 5 || enote.edescription.length < 5} onClick={handleClick}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <h3 className='text-center bg-primary text-light'>Your Notes</h3>
                {notes.length === 0 && 'No Notes to Display'}
                {
                    notes.map((note) => {
                        return <NoteItem note={note} updateNote={updateNote} key={note._id} />
                    })
                }
            </div >
        </div>
    )
}

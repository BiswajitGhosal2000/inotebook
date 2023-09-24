import React from 'react';
import { useEffect, useContext, useState, useRef } from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';

export default function Notes() {
    const { notes, getNotes } = useContext(NoteContext);
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, [])
    const [enote, setENote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    const { editNote } = useContext(NoteContext);
    const ref = useRef(null);
    const updateNote = (currentNote) => {
        ref.current.click();
        setENote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag
        })
    }
    const onChange = (e) => {
        setENote(
            { ...enote, [e.target.name]: e.target.value }
        );
    }
    const handleClick = (e) => {
        e.preventDefault();
        editNote(enote.etitle, enote.edescription, enote.etag);
    }

    return (
        <div className="row">

            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>

            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label" >Note Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label" >Note Description</label>
                                    <textarea className="form-control" id="edescription" rows="3" name="edescription" onChange={onChange}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label" >Note Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={handleClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <h3 className='text-center bg-primary text-light'>Your Notes</h3>
            {
                notes.map((note) => {
                    return <NoteItem note={note} updateNote={updateNote} key={note._id} />
                })
            }
        </div >
    )
}

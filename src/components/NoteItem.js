import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

function NoteItem(props) {
    const { deleteNote } = useContext(NoteContext);
    const { note, updateNote } = props;
    return (
        <div className="col-md-4">
            <div className="card my-3" key={note.id}>
                <div className="card-header d-flex justify-content-between">
                    <h6>{note.title.substring(0, 10)}...</h6>
                    <p className='text-muted ' style={{ fontSize: ".5rem" }}>Date: <i>{note.date.split("T")[0]}</i></p>

                </div>
                <div className="card-body" id='noteitembody'>

                    <p className="card-text">{note.description}</p>

                </div>
                <div className="card-footer d-flex justify-content-around">
                    <p >Tag:<span className='text-muted'>{note.tag}</span></p>
                    <div className='d-flex'>
                        <p className='mx-4' style={{ cursor: "pointer" }} onClick={() => updateNote(note)}><i className="fa-solid fa-file-pen"></i></p>
                        <p className='mx-4' style={{ cursor: "pointer" }} onClick={() => { if (window.confirm("Are You Sure?")) { deleteNote(note._id) } }}><i className="fa-solid fa-trash-can"></i></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoteItem
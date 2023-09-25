import React from 'react';
import { useState, useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';


export default function EditNote(props) {
    const [enote, setENote] = useState({ etitle: "", edescription: "", etag: "" });
    const { editNote } = useContext(NoteContext);
    const { show, currentNote } = props;
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
        <div hidden={show}><form>
            <div className="mb-3">
                <label htmlFor="etitle" className="form-label" >Note Title</label>
                <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="textHelp" onChange={onChange} value={currentNote.etitle} />
            </div>
            <div className="mb-3">
                <label htmlFor="edescription" className="form-label" >Note Description</label>
                <textarea className="form-control" id="edescription" rows="3" name="edescription" onChange={onChange} value={currentNote.edescription}></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="etag" className="form-label" >Note Tag</label>
                <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={currentNote.etag} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleClick}>Update Note</button>
        </form></div>
    )
}

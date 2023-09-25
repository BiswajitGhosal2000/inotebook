import React from 'react';
import { useEffect, useContext } from 'react';

import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';

export default function Notes() {
    const { notes, getNotes } = useContext(NoteContext);
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, [])
    // const [enote, setENote] = useState({ etitle: "", edescription: "", etag: "" });
    // const { editNote } = useContext(NoteContext);
    const updateNote = (currentNote) => {
        console.log(currentNote)
        // setENote({
        //     id: currentNote._id,
        //     etitle: currentNote.title,
        //     edescription: currentNote.description,
        //     etag: currentNote.tag
        // })
    }


    return (
        <div className="row">
            <h3 className='text-center bg-primary text-light'>Your Notes</h3>
            {notes.length === 0 && 'No Notes to Display'}
            {
                notes.map((note) => {
                    return <NoteItem note={note} updateNote={updateNote} key={note._id} />
                })
            }
        </div >
    )
}

import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://127.0.0.1:5000"
    // const [notes, setNotes] = useState();
    const [notes, setNotes] = useState([]);


    //Get all notes
    const getNotes = async () => {
        //Api Call
        const url = `${host}/api/note/fetchallnotes`;
        // console.log(url)
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjUwYmZhY2U1M2ZiYTllN2QyNGRhNGM4IiwiaWF0IjoxNjk1MjgzOTU5fQ._8qmaAdtir1Dgw29tAXlJ9OrSMwrz1TcypS-15YM93M"
                //localStorage.getItem('token')
            },

        });
        const json = await response.json();
        setNotes(json.notes);
    }

    //Add a note
    const addNote = async (title, description, tag) => {
        console.log("Adding a new note");
        //API call
        const url = `${host}/api/note/addnote`;
        // console.log(url)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjUwYmZhY2U1M2ZiYTllN2QyNGRhNGM4IiwiaWF0IjoxNjk1MjgzOTU5fQ._8qmaAdtir1Dgw29tAXlJ9OrSMwrz1TcypS-15YM93M"
                //localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        //Logic to add in client
        const json = await response.json();
        // console.log("response", json)
        setNotes(notes.concat(json.note));
        return json;
    }
    //Delete a note
    const deleteNote = (id) => {
        //API call
        const url = `${host}/api/note/deletenote/${id}`;
        const response = fetch(url, {
            method: 'DELETE',
            headers: {
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjUwYmZhY2U1M2ZiYTllN2QyNGRhNGM4IiwiaWF0IjoxNjk1MjgzOTU5fQ._8qmaAdtir1Dgw29tAXlJ9OrSMwrz1TcypS-15YM93M"
                //localStorage.getItem('token')
            },
        });

        //Logic to delete in client
        setNotes(notes.filter((note) => { return note._id !== id }));
        console.log("Deleting a note" + id);
        return response;
    }
    //Edit a note
    const editNote = async (id, title, description, tag) => {
        //API call
        const url = `${host}/api/note/updatenote/${id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjUwYmZhY2U1M2ZiYTllN2QyNGRhNGM4IiwiaWF0IjoxNjk1MjgzOTU5fQ._8qmaAdtir1Dgw29tAXlJ9OrSMwrz1TcypS-15YM93M"
                //localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        //Logic to edit in client
        return response.json();
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
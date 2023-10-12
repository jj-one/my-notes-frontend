import React, { useEffect, useState } from 'react'
import NoteItem from '../components/NoteItem';
import AddButton from '../components/AddButton';

export default function NotesListPage() {
  
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const getNotes = async () => {
      try {
        const resp = await fetch("/api/notes/");
        if (resp.status === 200) {
          const data = await resp.json();
          // console.log("SUCCESSFUL");
          // console.log(data);
          setNotes(data);
        }
        else {
          throw Error("The url u called seems to be wrong");
        }
      }
      catch(err) {
        console.log(`Failed to get Notes: ${err.message}`);
      }
    };
    getNotes();
  }, []);

  return (
    <div className='notes'>
      <div className='notes-header'>
        <h2 className='notes-title'>&#9782; Notes</h2>
        <p className='notes-count'>{notes.length}</p>
      </div>
      <div className='notes-list'>
        {notes.map((note, index) => <NoteItem note={note} key={index} />)}
      </div>
      <AddButton />
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { ReactComponent as BackArrow } from '../assets/arrow-left.svg'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function NotePage(props) {

  const { id } = useParams();
  const [ note, setNote ] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const getNote = async () => {
      try {
        const resp = await fetch(`/api/notes/${id}/`);
        if(resp.status === 200) {
          const data = await resp.json();
          console.log("Fetched Note successfully.")
          setNote(data);
        }
        else {
          throw Error("It appears the url u gave is wrong: "+ resp.status);
        }
      }
      catch(err) {
        console.log(`Error fetching Note: ${err.message}`);
      }
    };
    
    if(id !== "new") {
      getNote();
    }
    else {
      setNote({created: new Date(), updated: new Date(), body: ""});
    }
  }, [id]);

  const handleNoteChange = (e) => {
    // console.log(`Note: ${e.target.value}`);
    setNote(oldSate => setNote({...oldSate, body: e.target.value}));
  };

  const updateNote = async () => {
    if(note.body.trim() !== "" && id !== "new"){
      try {
        const resp = await fetch(`/api/notes/${id}/update/`, {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(note)
        });
        const data = await resp.json();
        if(resp.status === 200){
          console.log(data.message);
        }
        else{
          throw Error(data.error);
        }
      }
      catch(err) {
        console.log(err.message);
      }
    }
    else if(id !== "new") {
      deleteNote();
    }
    else if(id === "new") {
      createNote();
    }
  }

  const deleteNote = async () => {
    if(id !== "new"){
      try {
        const resp = await fetch(`/api/notes/${id}/delete/`, {
          method: "DELETE"
        });
        const data = await resp.json();
        if(resp.status === 200){
          console.log(data.message);
          history.push("/");
        }
        else{
          throw Error(data.error);
        }
      }
      catch(err) {
        console.log(err.message);
      }
    }
  }

  const createNote = async () => {
    if(id === "new") {
      if(note.body.trim() !== "") {
        try {
          const resp = await fetch("/api/notes/create/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(note)
          });
          const data = await resp.json();
          if(resp.status === 201) {
            console.log(data.message);
            // history.push(`/note/${data.id}`);
            history.push("/");
          }
          else {
            throw Error(data.error);
          }
        }
        catch(err) {
          console.log(err.message);
        }
      }
      else {
        alert("You can't save empty note!");
      }
    }
  };

  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          <Link to="/">
            <BackArrow onClick={updateNote} />
          </Link>
        </h3>
        {id !== "new" ?
          <button onClick={deleteNote}>Delete</button>
        :
          <button onClick={createNote}>Done</button>
        }
      </div>
      {note ? 
        <textarea onChange={handleNoteChange} defaultValue={note.body} rows="6"></textarea>
      :
        <p>Note not found</p>
      }
    </div>
  )
}

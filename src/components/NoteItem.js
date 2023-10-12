import React from 'react';
import { Link } from 'react-router-dom';

export default function NoteItem(props) {

  const getTitle = () => {
    const title = props.note.body.split("\n")[0];
    if(title.length > 40) {
      return title.slice(0, 40);
    }
    return title;
  };

  const getContent = () => {
    const title = getTitle();
    const content = props.note.body.replaceAll("\n", "").replace(title, "").replaceAll("- ", ", ").replace(/^(,\s)+/, "");
    if(content.length > 40) {
      return content.slice(0, 40)+" ...";
    }
    return content;
  };

  return (
    <Link to={`/note/${props.note.id}`}>
      <div className='notes-list-item'>
        <h3>{getTitle()}</h3>
        <p><span>{new Date(props.note.updated).toLocaleDateString()}</span> {getContent()}</p>
      </div>
    </Link>
  )
}

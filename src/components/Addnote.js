import React, { useState, useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const Addnote = (props) => {

  const context = useContext(noteContext);
  const {addNote} = context;

  const [note, setNote] = useState({title: "", description: "", tag: ""});

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: ""});
    props.showAlert("Note Added Successfully", "success");
  }

  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value});
  }


  return (
    <>
    
      <h2 style={{marginBottom: "20px"}}>Add a Note</h2>

      <form>
        <div className="mb-3">
          <input type="text" className="form-control" id="title" name='title' value={note.title} placeholder="Title" onChange={onChange} required/>
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" id="description" name='description' value={note.description} placeholder="Description" onChange={onChange} required/>
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" id="tag" name='tag' value={note.tag} placeholder="Tag" onChange={onChange}/>
        </div>

        <button disabled={note.title.length === 0 || note.description.length === 0} type='submit' className="btn btn-primary my-2 " onClick={handleClick}>Add Note</button>
      </form>
    
    </>
  )
}

export default Addnote


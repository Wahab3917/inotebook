import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from "./Addnote"
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {

  const context = useContext(noteContext);
  const {notes, getNotes, editNote } = context;
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""});

  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  
  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
  }

  const handleClick = (e) => {
    refClose.current.click();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.showAlert("Note Updated Successfully", "success");
  }

  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <>

        <Addnote showAlert={props.showAlert}/>

        <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Update Note
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} placeholder="Title" onChange={onChange} required/>
                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} placeholder="Description" onChange={onChange} required/>
                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} placeholder="Tag" onChange={onChange}/>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button disabled={note.etitle.length === 0 || note.edescription.length === 0} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
              </div>
            </div>
          </div>
        </div>


        <h2 style={{marginTop: "50px"}}>Your Notes</h2>
        
        <p style={{margin: notes.length === 0 ? '20px' : '0px'}} >{notes.length === 0 && 'No notes to display'}</p>

        <div className="row">
          {notes.map((note, index) => {
            const key = `${index}-${note._id}`;
            return <Noteitem key={key} updateNote={updateNote} showAlert={props.showAlert} note={note}/>
          })}
        </div>

    </>
  )
}

export default Notes


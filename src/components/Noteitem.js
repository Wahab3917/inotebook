import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {

  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <>

      <div className="col-md-4">
        <div className="card my-3">
          <div className="card-body">
            <h4 className="card-title">{note.title}</h4>
            <p className="card-subtitle">{note.tag}</p>
            <p className="card-text card-desc">{note.description}</p>
            <p className="text-muted card-date">{new Date(note.date).toLocaleDateString('en-US')}</p>
            <div className="card-update-btns">
              <i className="fas fa-trash mx-2" onClick={() => {deleteNote(note._id); props.showAlert("Note Deleted Successfully", "success")}}></i>
              <i className="fas fa-edit mx-2" onClick={() => {updateNote(note)}}></i>
            </div>
          </div>
        </div>
      </div>
    
    </>
  )
}

export default Noteitem


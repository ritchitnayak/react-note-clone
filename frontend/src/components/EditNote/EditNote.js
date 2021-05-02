import moment from 'moment';
import './EditNote.css'

const EditNote = ({ activeNote, updateNote }) => {
    return (
        <div className='edit-note-container'> 
            <div className="edit-note-header">
                {Object.entries(activeNote).length !== 0 && moment(activeNote.timeModified).format('MMM DD, YYYY  hh:mm:ss ')}
            </div>
        
            {Object.entries(activeNote).length !== 0 && 
                <textarea 
                    className='edit-note-textarea' 
                    value={activeNote.content ? activeNote.content : ''} 
                    onChange={(e) => updateNote(e.target.value)} />
            }
        </div> 
    )
}

export default EditNote

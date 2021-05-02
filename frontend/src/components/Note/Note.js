import moment from 'moment'
import './Note.css'

const Note = ({ isActive, note, onToggle }) => {
    return (
        <div className={isActive ? 'note-container active' : 'note-container'} onClick={() => onToggle(note)}  >
            <div className="note" >
                <h4 className="note-title">{note.content.split('\n')[0] || "New Note"}</h4>
                {note.content.split('\n').length >= 2 && <div className='note-preview'> {note.content.split('\n')[1]}</div> }
                <div className="note-date" >{moment(note.timeCreated).format('DD MMM YYYY')}</div>
            </div>
        </div>
    )
}

export default Note

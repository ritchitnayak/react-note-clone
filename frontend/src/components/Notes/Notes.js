import { FiEdit, FiChevronsLeft, FiChevronsRight, FiTrash2 } from 'react-icons/fi'
import './Notes.css'
import Note from '../Note/Note'
import SearchBox from '../SearchBox/SearchBox'

const Notes = ({ activeFolder, activeNote, onToggleActiveNote, onCreateNewNote, onDelete, onUpdateFilter, filter, sidebarStatus, onSidebarToggle }) => {
    return (
        <div className='notes-panel'>
            <div className='notes-panel-header'> 
                <div className='collapse-sidebar' onClick={() => onSidebarToggle(!sidebarStatus)}>
                    {sidebarStatus 
                        ? <FiChevronsLeft fontSize='1.6em' /> 
                        : <FiChevronsRight fontSize='1.6em' /> 
                    }
                </div>
                {activeFolder && <h4 className='title'>{activeFolder.name}</h4>}
                {Object.entries(activeNote).length !== 0 &&
                    <div className='new-note' onClick={() => onDelete(activeNote.id)}>
                        <FiTrash2 fontSize='1.6em' />
                    </div>
                }
                {Object.entries(activeFolder).length !== 0 &&
                    <div className='new-note' onClick={() => onCreateNewNote()}>
                        <FiEdit fontSize='1.6em' />
                    </div>
                }
            </div>
            {Object.entries(activeFolder).length !== 0 &&
                <SearchBox filter={filter} onUpdateFilter={onUpdateFilter} /> 
            }
            {Object.entries(activeFolder).length !== 0 && activeFolder.notes && 
                activeFolder.notes
                    .sort((a, b) => new Date(b.timeModified).getTime() - new Date(a.timeModified).getTime())
                    .map((note) => (
                        <Note 
                            isActive={activeNote.id === note.id} 
                            key={note.id} note={note} 
                            onToggle={onToggleActiveNote} />
                    )
            )}
        </div>
    )
}

export default Notes

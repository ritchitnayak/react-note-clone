import { useState, useEffect } from 'react'
import './App.css';
import Sidebar from '../Sidebar/Sidebar'
import Notes from '../Notes/Notes'
import EditNote from '../EditNote/EditNote';
import { getAllFolders, addFolder, deleteFolder } from '../../services/FolderService'
import { addNote, updateNote, deleteNote } from '../../services/NoteService'

function App() {
  const [isSidebarVisible, toggleSidebar] = useState(true)
  const [filter, setFilter] = useState('')
  const [defaultFolder, setDefaultFolder] = useState({})
  const [activeFolder, setActiveFolder] = useState({})
  const [activeNote, setActiveNote] = useState({})
  const [folders, setFolders] = useState([])

  useEffect(() => {
    getAllFolders()
      .then(folders => {
        setFolders(folders);
      });
  }, [])

  // Updte filter
  const updateFilter = (text) => {
    if(text.toLowerCase().trim().length > 0) {
      const filteredNotes = defaultFolder.notes.filter((note) => note.content.toLowerCase().includes(text.toLowerCase()))
      setActiveFolder({...activeFolder, notes: filteredNotes})
    } else {
      setActiveFolder({...defaultFolder, notes: [...defaultFolder.notes]})
    }
    setActiveNote({})
    setFilter(text)
  }

  // Create new folder
  const createFolder = (folderName) => {
    addFolder(folderName)
      .then(folders => {
        setFolders(folders);
      });
  }

  //Set Active folder
  const toggleActiveFolder = (folder) => {
      setDefaultFolder(folder)
      setActiveFolder(folder)
      setActiveNote({})
  }

  // Set Active note
  const toggleActiveNote = (note) => {
    setActiveNote(note)
  }

  // Update Active Note
  const updateActiveNote = (text) => {
    setActiveNote({...activeNote, content: text})
    updateNote(activeFolder.id, activeNote.id, text)
      .then(updatedNote => {
        const newActiveFolder = {
          ...activeFolder, 
          notes: activeFolder.notes.map( (note) => note.id === updatedNote.id ? updatedNote : note )
        }
        setActiveFolder(newActiveFolder)
        setDefaultFolder(newActiveFolder)
        const newFolders = folders.map( (folder) => folder.id === newActiveFolder.id ? newActiveFolder : folder)
        setFolders([...newFolders])
      })
  }

  // Create new note
  const createNewNode = () => {
    addNote(activeFolder.id, 'This is a sample note')
      .then(note => {
        setActiveNote(note);
        const newActiveFolder = {
          ...activeFolder, 
          notes: [...activeFolder.notes]
        }
        newActiveFolder.notes.push(note)
        setActiveFolder(newActiveFolder)
        setDefaultFolder(newActiveFolder)
        const newFolders = folders.map( (folder) => folder.id === newActiveFolder.id ? newActiveFolder : folder)
        setFolders([...newFolders])
      })
  }

  // Remove note
  const removeNote = (noteID) => {
    deleteNote(activeFolder.id, noteID)
      .then((actFolder) => {
        setActiveFolder(actFolder)
        setDefaultFolder(actFolder)
        const newFolders = folders.map( (folder) => folder.id === actFolder.id ? actFolder : folder)
        setFolders([...newFolders])
        setActiveNote({})
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }

  // Remove folder
  const removeFolder = (folderID) => {
    deleteFolder(folderID)
      .then((data) => {
        setFolders(data);
        setActiveFolder({});
        setDefaultFolder({})
        setActiveNote({});
      })
      .catch((error) => {
        console.log('Error', error);
      })
  }

  return (
    <div className="container">
      <Sidebar 
        folders={folders} 
        activeFolder={activeFolder} 
        onFolderClick={toggleActiveFolder} 
        onNewFolder={createFolder}
        onDeleteFolder={removeFolder}
        sidebarStatus={isSidebarVisible} />
      <Notes 
        activeFolder={activeFolder} 
        activeNote={activeNote} 
        onToggleActiveNote={toggleActiveNote} 
        onCreateNewNote={createNewNode} 
        onDelete={removeNote}
        onUpdateFilter={updateFilter}
        filter={filter}
        sidebarStatus={isSidebarVisible}
        onSidebarToggle={toggleSidebar} />
      {activeNote && <EditNote activeNote={activeNote} updateNote={updateActiveNote} />}
    </div>
  );
}

export default App;

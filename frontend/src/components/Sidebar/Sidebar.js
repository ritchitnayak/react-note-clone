import { useState } from 'react'
import { FiFolderPlus, FiTrash2 } from 'react-icons/fi'
import "./Sidebar.css"
import Folders from '../Folders/Folders'
import AddFolder from '../AddFolder/AddFolder'

const Sidebar = ({ folders, activeFolder, onFolderClick, onNewFolder, onDeleteFolder, sidebarStatus }) => {
    const [showAddFolder, setShowAddFolder] = useState(false)

    // Add new folder
    const addFolder = (folderName) => {
        onNewFolder(folderName)
        setShowAddFolder(!showAddFolder)
    }

    return (
        <aside className={sidebarStatus ? 'sidebar' : 'sidebar collapsed'} >
            <div className='sidebar-header'>
                <h4 className='title'>Folders</h4>
                {Object.entries(activeFolder).length !== 0 &&
                    <div  onClick={() => onDeleteFolder(activeFolder.id)}>
                        <FiTrash2 className='new-folder' fontSize='1.6em' />
                    </div>
                }
                <div className='new-folder' onClick={() => setShowAddFolder(!showAddFolder)}>
                    <FiFolderPlus fontSize='1.6em' />
                </div>
            </div>
            {showAddFolder && <AddFolder onAdd={addFolder}/>}
            <Folders 
                activeFolder={activeFolder} 
                onToggle={onFolderClick} 
                folders={folders} />
        </aside>
    )
}

export default Sidebar

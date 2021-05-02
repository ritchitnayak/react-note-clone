import Folder from '../Folder/Folder'

const Folders = ({folders, activeFolder, onToggle }) => {
    return (
        <div>
            {folders.sort((a, b) => a.name.localeCompare(b.name)).map((folder) => (
                <Folder 
                    key={folder.id}
                    isActive={folder.id === activeFolder.id}
                    folder={folder} 
                    onClick={onToggle} />
            ))}
        </div>
    )
}

export default Folders

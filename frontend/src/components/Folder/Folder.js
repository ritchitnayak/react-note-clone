import './Folder.css'

const Folder = ({ isActive, folder, onClick }) => {
    return (
        <div className={isActive ? 'folder-container active' : 'folder-container'} onClick={() => onClick(folder)} >
            <div className='folder'>{folder.name}</div>
        </div>
    )
}

export default Folder

import { useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import './AddFolder.css'

const AddFolder = ({ onAdd }) => {
    const [fname, setFolderName] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if (!fname) {
            alert('Please add a task')
            return
        }
    
        onAdd(fname)

        setFolderName('')
    }

    return (
        <form onSubmit={onSubmit}>
            <div className='form-control'>
                <input
                    type='text'
                    placeholder='Name'
                    value={fname}
                    onChange={(e) => setFolderName(e.target.value)} />
                <button type='submit' value='Save' className='btn' ><FaCheck /></button>
            </div>
        </form>
    )
}

export default AddFolder

import './SearchBox.css'

const SearchBox = ({filter, onUpdateFilter}) => {
    return (
        <div className='input-wrapper'>
            <input
                className='search-input'
                onChange={(e) => onUpdateFilter(e.target.value)}
                placeholder='Search...'
                value={filter}
                spellCheck={false}
            />
            <span className='input-highlight'>
                { filter.replace(/ /g, "\u00a0") }
            </span>
        </div>
    )
}

export default SearchBox

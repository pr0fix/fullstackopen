const Filter = ({setSearch}) => {
    return(
        <>
        <div>filter shown with <input type='text' onChange={(e) => setSearch(e.target.value)}/></div>
        </>
    )
}

export default Filter
const List = ({ persons, handleRemove }) => {
    return (
        <ul>
            {persons.map((person) => (
                <li key={person.name}>
                    {person.name} {person.number}
                    <button onClick={handleRemove(person)}>delete</button>
                </li>
            ))}
        </ul>
    )
}

export default List

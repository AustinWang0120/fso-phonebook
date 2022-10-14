import { useState } from "react"

const Filter = ({ keyword, handleKeywordChange }) => {
    return (
        <div>
            filter shown with
            <input value={keyword} onChange={handleKeywordChange} />
        </div>
    )
}

const Form = ({
    handleSubmit,
    newName,
    handleNewNameChange,
    newNumber,
    handleNewNumberChange,
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input value={newName} onChange={handleNewNameChange} />
            </div>
            <div>
                number:
                <input value={newNumber} onChange={handleNewNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const List = ({ persons }) => {
    return (
        <ul>
            {persons.map((person) => (
                <li key={person.name}>
                    {person.name} {person.number}
                </li>
            ))}
        </ul>
    )
}

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456", id: 1 },
        { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
        { name: "Dan Abramov", number: "12-43-234345", id: 3 },
        { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    ])
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [keyword, setKeyword] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        if (persons.map((person) => person.name).includes(newName)) {
            window.alert(`${newName} is already added to phonebook`)
        } else {
            const newPerson = {
                name: newName,
                number: newNumber,
            }
            setPersons(persons.concat(newPerson))
            setNewName("")
            setNewNumber("")
        }
    }

    const handleNewNameChange = (event) => setNewName(event.target.value)

    const handleNewNumberChange = (event) => setNewNumber(event.target.value)

    const handleKeywordChange = (event) => setKeyword(event.target.value)

    const personsToShow = persons.filter((person) =>
        person.name.toLowerCase().includes(keyword.toLowerCase())
    )

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter
                keyword={keyword}
                handleKeywordChange={handleKeywordChange}
            />
            <h2>Add a new</h2>
            <Form
                handleSubmit={handleSubmit}
                newName={newName}
                handleNewNameChange={handleNewNameChange}
                newNumber={newNumber}
                handleNewNumberChange={handleNewNumberChange}
            />
            <h2>Numbers</h2>
            <List persons={personsToShow} />
        </div>
    )
}

export default App

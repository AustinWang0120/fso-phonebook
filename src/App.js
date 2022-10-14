import { useState, useEffect } from "react"
import axios from "axios"
import Filter from "./components/Filter"
import Form from "./components/Form"
import List from "./components/List"

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        axios
            .get("http://localhost:3001/persons")
            .then((response) => response.data)
            .then((persons) => setPersons(persons))
    }, [])

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

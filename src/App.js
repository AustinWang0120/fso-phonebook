import { useState, useEffect } from "react"
import personService from "./services/persons"
import Filter from "./components/Filter"
import Form from "./components/Form"
import List from "./components/List"

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        personService
            .getAll()
            .then((initalPersons) => setPersons(initalPersons))
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        if (persons.map((person) => person.name).includes(newName)) {
            if (window.confirm("Replace the old number?")) {
                const oldPerson = persons.find(
                    (person) => person.name.toLowerCase() === newName
                )
                const newPerson = {
                    ...oldPerson,
                    number: newNumber,
                }
                personService
                    .update(newPerson.id, newPerson)
                    .then((returnedPerson) => {
                        setPersons(
                            persons.map((person) =>
                                person.id === returnedPerson.id
                                    ? returnedPerson
                                    : person
                            )
                        )
                        setNewName("")
                        setNewNumber("")
                    })
            }
        } else {
            const newPerson = {
                name: newName,
                number: newNumber,
            }
            personService.create(newPerson).then((returnedPerson) => {
                setPersons(persons.concat(returnedPerson))
                setNewName("")
                setNewNumber("")
            })
        }
    }

    const handleRemove = (person) => () => {
        const { id } = person
        if (window.confirm(`Delete ${person.name}?`)) {
            personService.remove(id).then(() => {
                setPersons(persons.filter((person) => person.id !== id))
            })
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
            <List persons={personsToShow} handleRemove={handleRemove} />
        </div>
    )
}

export default App

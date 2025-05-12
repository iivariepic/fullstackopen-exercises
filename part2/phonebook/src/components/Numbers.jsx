import personService from '../services/persons'

const deletePerson = ({ person, setPersons, setNotification }) => {
  if (window.confirm(`Delete ${person.name}?`)) {
    personService
      .deleteName(person.id)
      .then(() => {
        setPersons(prev => prev.filter(p => p.id !== person.id))
        setNotification({
          message: `Deleted ${person.name}`,
          isError: false
        })
      })
      .catch(() => {
        setNotification({
          message: `Information of ${person.name} has already been removed from server`,
          isError: true
        })
        setPersons(prev => prev.filter(p => p.id !== person.id))
      })
  }
}

const DeleteButton = ({ person, setPersons, setNotification }) => (
  <button onClick={() => deletePerson({ person, setPersons, setNotification})}>
    delete
  </button>
)

const Person = ({ person, setPersons, setNotification }) => (
  <li>
    {person.name} {person.number}
    <DeleteButton
    person={person}
    setPersons={setPersons}
    setNotification = {setNotification}
  />
  </li>
)

const Numbers = ({ persons, setPersons, searchQuery, setNotification }) => {
  const filteredPersons = persons.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <h2>Numbers</h2>
      {filteredPersons.length === 0
        ? <li>No persons found.</li>
        : <>
          {filteredPersons.map(person => (
            <Person
              key={person.id}
              person={person}
              setPersons={setPersons}
              setNotification={setNotification}
            />
          ))}
        </>
      }
    </div>
  )
}

export default Numbers

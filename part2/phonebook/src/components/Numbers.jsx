import personService from '../services/persons'

const deletePerson = ({ person, setPersons }) => {
  if (window.confirm(`Delete ${person.name} ?`)) {
    personService
      .deleteName(person.id)
      .then(() => {
        setPersons(...persons => persons.filter(p => p.id !== person.id))
      })
      .catch(() => {
        alert(`${person.name} was already deleted from server`)
        setPersons(prev => prev.filter(p => p.id !== person.id))
      })
  }
}

const DeleteButton = ({ person, setPersons }) => (
  <button onClick={() => deletePerson({ person, setPersons })}>
    delete
  </button>
)

const Person = ({ person, setPersons }) => (
  <li>
    {person.name} {person.number} <DeleteButton person={person} setPersons={setPersons} />
  </li>
)

const Numbers = ({ persons, setPersons, searchQuery }) => {
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
            <Person key={person.id} person={person} setPersons={setPersons} />
          ))}
        </>
      }
    </div>
  )
}

export default Numbers

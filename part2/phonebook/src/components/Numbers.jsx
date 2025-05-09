const Person = ({ person }) => <li>{person.name} {person.number}</li>

const Numbers = ({ persons }) => {
  return persons.length === 0 ? (
    <div>
      <h2>Numbers</h2>
      <li>No persons found.</li>
    </div>
  ) : (
    <div>
      <h2>Numbers</h2>
      {persons.map((person) => <Person key={person.name} person={person}/>)}
    </div>
  )
}

export default Numbers
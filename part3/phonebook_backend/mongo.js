const mongoose = require('mongoose')

const ARGUMENT_AMOUNT_FIND = 3
const ARGUMENT_AMOUNT_ADD = 5
const validAmounts = [ARGUMENT_AMOUNT_FIND, ARGUMENT_AMOUNT_ADD]
if (!validAmounts.includes(process.argv.length)) {
  console.log(`Wrong number of arguments, ${ARGUMENT_AMOUNT_FIND} or ${ARGUMENT_AMOUNT_ADD} needed)`)
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://ippu:${password}@fullstackopen.c40lsk9.mongodb.net/phoneBookApp?retryWrites=true&w=majority&appName=FullstackOpen`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === ARGUMENT_AMOUNT_ADD) {
  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}

if (process.argv.length === ARGUMENT_AMOUNT_FIND) {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}


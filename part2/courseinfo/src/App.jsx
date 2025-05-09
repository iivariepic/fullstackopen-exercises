const Header = ({ text }) => <h1>{text}</h1>

const CourseHeader = ({ text }) => <h2>{text}</h2>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map((part, index) => (
        <Part key={index} part={part}/>
      ))
      }
      <Total course={course}/>
    </>
  )
}

const Total = ({ course }) => {
  const total = course.parts.reduce((total, {exercises}) => total + exercises, 0);
  return (
    <p>
      Number of exercises {total}
    </p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <CourseHeader text={course.name}/>
      <Content course={course}/>
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Header text={"Web development curriculum"}/>
      {courses.map(course =>
        <Course course={course} key={course.id}/>
      )}
    </div>
  )
}

export default App
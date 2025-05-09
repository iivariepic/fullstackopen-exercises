const CourseHeader = ({ text }) => <h2>{text}</h2>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Total = ({ course }) => {
  const total = course.parts.reduce((total, {exercises}) => total + exercises, 0);
  return (
    <p>
      Number of exercises {total}
    </p>
  )
}

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

const Course = ({ course }) => {
  return (
    <div>
      <CourseHeader text={course.name}/>
      <Content course={course}/>
    </div>
  )
}

export default Course
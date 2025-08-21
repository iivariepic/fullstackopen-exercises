import type { CoursePart } from "../App.tsx"

interface Props {
  coursePart: CoursePart
}

const Part = ({ coursePart }: Props) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  }

  const renderDetails = () => {
    switch (coursePart.kind) {
      case "basic":
      case "background":
        return <div>{coursePart.description}</div>
      case "group":
        return <div>project exercises {coursePart.groupProjectCount}</div>
      case "special":
        return <>
          <div>{coursePart.description}</div>
          <div>required skills {coursePart.requirements.join(", ")}</div>
        </>
      default:
        return assertNever(coursePart)
    }
  }

  return (
    <div style={{ marginBottom: 10 }}>
      <b>{coursePart.name} {coursePart.exerciseCount}</b>
      {renderDetails()}
    </div>
  )
}


export default Part

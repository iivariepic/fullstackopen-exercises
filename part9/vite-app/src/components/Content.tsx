interface CoursePart {
  name: string
  exerciseCount: number
}

interface Props {
  parts: CoursePart[]
}

const Content = ({ parts }: Props) => {
  return (
    parts.map((coursePart, index) =>
      <p key={index}>{coursePart.name} {coursePart.exerciseCount}</p>
    )
  )
}

export default Content
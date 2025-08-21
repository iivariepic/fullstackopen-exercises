import type { CoursePart } from "../App.tsx"
import Part from "./Part.tsx"

interface Props {
  parts: CoursePart[]
}

const Content = ({ parts }: Props) => {
  return (
    parts.map((coursePart, index) => <Part coursePart={coursePart} key={index} />
    )
  )
}

export default Content
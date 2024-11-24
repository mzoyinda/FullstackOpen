

const Total = (props) => {
    const {course} = props
    const sum = course.parts.reduce((sum, item) => sum + item.exercises, 0)
  return (
    <div>Total {sum}</div>
  )
}

export default Total
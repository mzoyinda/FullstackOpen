import Content from "./Content"
import Header from "./Header"


const Course = (props) => {
  const {course} = props
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
    </div>
  )
}

export default Course
import Content from "./Content"
import Header from "./Header"


const Course = (props) => {
  const {courses} = props
  return (
    <div>
    {courses.map((course) => (
      <>
      <Header course={course} />
      <Content course={course} />
      </>
    ))}
    </div>
  )
}

export default Course
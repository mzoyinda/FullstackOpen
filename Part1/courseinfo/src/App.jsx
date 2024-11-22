const Header = (props) => {
  return <h1>The name of the course is {props.title}</h1>;
};

const Content = (props) => {
  const { parts, exercises } = props.course;
  return (
    <div>
      <p>
        {parts[1]} {exercises[1]}
      </p>
      <p>
        {parts[2]} {exercises[2]}
      </p>
      <p>
        {parts[3]} {exercises[3]}
      </p>
    </div>
  );
};

const Total = (props) => {
  const { exercises } = props;
  return (
    <p>Number of exercises {exercises[1] + exercises[2] + exercises[3]}</p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: {
      1: "Fundamentals of React",
      2: "Using props to pass data",
      3: "State of a component",
    },
    exercises: {
      1: 10,
      2: 7,
      3: 14,
    },
  };

  return (
    <div>
      <Header title={course.name} />
      <Content course={course} />
      <Total exercises={course.exercises} />
    </div>
  );
};

export default App;

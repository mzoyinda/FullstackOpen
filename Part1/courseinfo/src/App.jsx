const Header = (props) => {
  return <h1>The name of the course is {props.title}</h1>;
};

const Content = (props) => {
  const {parts} = props;
  return (
    <div>
      <p>
        {parts[0].name} {parts[0].exercises}
      </p>
      <p>
      {parts[1].name} {parts[1].exercises}
      </p>
      <p>
      {parts[2].name} {parts[2].exercises}
      </p>
    </div>
  );
};

const Total = (props) => {
  const { parts } = props;
  return (
    <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
  );
};

const App = () => {
  
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header title={course.name} />

      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;

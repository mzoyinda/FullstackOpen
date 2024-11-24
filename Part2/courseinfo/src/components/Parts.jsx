

const Parts = (props) => {
    const {course} = props
  return (
      <p>
        {course.name} {course.exercises}
      </p>
  );
};

export default Parts;

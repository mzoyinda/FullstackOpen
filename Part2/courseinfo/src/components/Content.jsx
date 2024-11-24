import Parts from "./Parts";
import Total from "./Total";

const Content = (props) => {
  const { course } = props;
  return (
    <div>
      {course.parts.map((item) => (
        <div key={item.id}>
          <Parts course={item} />
        </div>
      ))}
      <Total course={course}/>
    </div>
  );
};

export default Content;

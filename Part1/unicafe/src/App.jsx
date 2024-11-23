import { useState } from "react";

const StatisticLine = (props) => {
  const { text, value } = props;
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  const { stats } = props;

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          {stats.good || stats.bad || stats.neutral ? (
            <>
              <StatisticLine text="good" value={stats.good} />
              <StatisticLine text="neutral" value={stats.neutral} />
              <StatisticLine text="bad" value={stats.bad} />
              <StatisticLine text="average" value={stats.average} />
              <StatisticLine text="positive" value={stats.positive} />
            </>
          ) : (
            <tr>
              <td colSpan="2">No feedback given</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const average = (good + bad * -1) / total || 0;
  const positive = (good / total) * 100 || 0;

  const stats = {
    good,
    bad,
    neutral,
    average,
    positive,
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics stats={stats} />
    </div>
  );
};

export default App;

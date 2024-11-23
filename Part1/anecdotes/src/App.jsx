import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [mostVoted, setMostVoted] = useState({ anecdote: '', voteCount: 0 });

  const handleClick = () => {
    const randomNo = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNo);
  };

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);

    // Update the most voted anecdote if the vote leads to a new max
    const maxVotes = Math.max(...newVotes);
    const maxIndex = newVotes.indexOf(maxVotes);
    setMostVoted({
      anecdote: anecdotes[maxIndex],
      voteCount: maxVotes,
    });
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]} Votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleClick}>next anecdote</button>

      <h2>Anecdote with most votes</h2>
      {mostVoted.voteCount > 0 ? (
        <>
          <p>{mostVoted.anecdote}</p>
          <p>Has {mostVoted.voteCount} Votes</p>
        </>
      ) : (
        <p>No votes yet.</p>
      )}
    </div>
  );
};

export default App;

import React, { useState, useEffect, useMemo } from "react";

function App() {
  const numbers = [...namesArray];
  const [isReverse, setIsReverse] = useState(false);
  const [count, setCount] = useState(0);

  function tempFn(isReverse, numbers) {
    let tempVar = [...numbers];
    if (isReverse) {
      tempVar = tempVar.reverse();
    }
    return tempVar;
  }

  // const t1 = performance.now();
  // const reverseNumbers = tempFn(isReverse, numbers);
  // const t2 = performance.now();
  // console.log(`time: ${t1} - ${t2} ms`);
  // using memo
  const t1 = performance.now();
  const reverseNumbers = useMemo(
    () => tempFn(isReverse, numbers),
    [isReverse, numbers]
  );
  const t2 = performance.now();
  console.log(`time: ${t1} - ${t2} ms`);
  return (
    <>
      <button
        onClick={() => {
          setIsReverse((isRerverse) => !isRerverse);
        }}
      >
        Reverse
      </button>
      <button
        onClick={() => {
          setCount((count) => count + 1);
        }}
      >
        add 1 to count
      </button>
      <ul>
        {reverseNumbers &&
          reverseNumbers.map((num, id) => {
            return <li key={id}>{num}</li>;
          })}
      </ul>
      <h1>{count}</h1>
    </>
  );
}

export default App;

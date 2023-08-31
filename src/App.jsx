import React, { useState, useEffect } from "react";
function Section({ myChildren }) {
  return <section>{myChildren}</section>;
}
function H1({ name }) {
  return (
    <>
      <h1>Hello , {name}</h1>
    </>
  );
}
function App() {
  return (
    <>
      <Section>
        <H1 name="Dale"></H1>
        <H1 name="Jia"></H1>
        <H1 name="Max"></H1>
      </Section>
    </>
  );
}

export default App;

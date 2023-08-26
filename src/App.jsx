import { useState } from "react";

export default function Form() {
  const [name, setName] = useState({ firstName: "", lastName: "" });
  const isNameSet = name.firstName || name.lastName ? true : false;
  function handleFirstNameChange(e) {
    const { name, value } = e.target;
    setName((oldVal) => {
      return { ...oldVal, [name]: value };
    });
  }

  function handleLastNameChange(e) {
    const { name, value } = e.target;
    setName((oldVal) => {
      return { ...oldVal, [name]: value };
    });
  }

  function handleReset() {
    firstName = "";
    lastName = "";
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        placeholder="First name"
        value={name.firstName}
        onChange={handleFirstNameChange}
        name="firstName"
      />
      <input
        placeholder="Last name"
        value={name.lastName}
        onChange={handleLastNameChange}
        name="lastName"
      />
      <h1>Hi, {isNameSet ? `${name.firstName} ${name.lastName}` : "guest"}</h1>
      <button onClick={handleReset}>Reset</button>
    </form>
  );
}

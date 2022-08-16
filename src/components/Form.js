import { useState } from "react";

import axios from "axios";

const Form = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [alias, setAlias] = useState("");
  const [gender, setGender] = useState("");

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hobbies, setHobbies] = useState([]);

  const onFirstNameChange = (event) => {
    setFirstName(event.currentTarget.value);
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setAlias("");
    setGender("");
    setHobbies([]);
  };

  const onLastNameChange = (event) => {
    setLastName(event.currentTarget.value);
  };

  const onAliasChange = (event) => {
    setAlias(event.currentTarget.value);
  };

  const onGenderChange = (event) => {
    setGender(event.currentTarget.value);
  };

  const onHobbiesChange = (event) => {
    const isChecked = event.currentTarget.checked;
    const checkboxValue = event.currentTarget.value;

    if (isChecked) {
      setHobbies([...hobbies, checkboxValue]);
    } else {
      const newHobbies = hobbies.filter((hobby) => {
        return hobby !== checkboxValue;
      });

      setHobbies(newHobbies);
    }
  };

  const isFormValid = () => {
    const isAliasValid = alias.length === 6;

    if (!isAliasValid) {
      setErrorMessage("Alias must be 6 characters long");
    }

    return isAliasValid;
  };

  const submitForm = async (event) => {
    event.preventDefault();

    setErrorMessage("");

    if (!isFormValid()) {
      return;
    }

    const dataToSend = {
      firstName: firstName,
      lastName: lastName,
      alias : alias,
      gender : gender,
      hobbies: hobbies,
    };

    setMessage("Loading...");

    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        dataToSend
      );
      console.log(res);

      setMessage(`Your form has been submitted with ID ${res.data.id}`);
      clearForm();
    } catch (error) {
      setMessage(`Error submitting form- ${error.message}`);
    }
  };

  return (
    <form onSubmit={submitForm}>
      <fieldset>
        <legend>User Info</legend>

        <label htmlFor="first_name">First Name:</label>
        <input
          required
          id="first_name"
          value={firstName}
          onChange={onFirstNameChange}
        />

        <br />

        <label htmlFor="last_name">Last Name:</label>
        <input
          required
          id="last_name"
          value={lastName}
          onChange={onLastNameChange}
        />

        <br />

        <label htmlFor="alias">Alias:</label>
        <input required id="alias" value={alias} onChange={onAliasChange} />

        <br />

        <p>Gender:</p>

        <input
          id="male"
          type="radio"
          name="gender"
          value="male"
          checked={gender === "male"}
          onChange={onGenderChange}
        />
        <label htmlFor="male">Male</label>

        <input
          id="female"
          type="radio"
          name="gender"
          value="female"
          checked={gender === "female"}
          onChange={onGenderChange}
        />
        <label htmlFor="female">Female</label>

        <input
          id="other"
          type="radio"
          name="gender"
          value="other"
          checked={gender === "other"}
          onChange={onGenderChange}
        />
        <label htmlFor="other">Other</label>

        <br />

        <p>Hobbies</p>

        <input
          id="reading"
          type="checkbox"
          name="hobbies"
          value="reading"
          onChange={onHobbiesChange}
          checked ={hobbies.includes("reading")}
        />
        <label htmlFor="reading">Reading</label>

        <input
          id="writing"
          type="checkbox"
          name="hobbies"
          value="writing"
          onChange={onHobbiesChange}
          checked ={hobbies.includes("writing")}
        />
        <label htmlFor="writing">Writing</label>

        <input
          id="playing"
          type="checkbox"
          name="hobbies"
          value="playing"
          onChange={onHobbiesChange}
          checked ={hobbies.includes("playing")}
        />
        <label htmlFor="playing">Playing</label>

        <input
          id="sleeping"
          type="checkbox"
          name="hobbies"
          value="sleeping"
          onChange={onHobbiesChange}
          checked ={hobbies.includes("sleeping")}
        />
        <label htmlFor="sleeping">Sleeping</label>

        <br />

        <button>Submit</button>
      </fieldset>

      <div>{message}</div>

      <div className="error">{errorMessage}</div>
    </form>
  );
};

export default Form;

import React, { useState } from "react";
import Button from "react-bootstrap/Button";

function Contact() {
  const [fullName, setFullName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [formSubmitted, setFormSubmitted] = useState(false);

  function onFormSubmit(event) {
    event.preventDefault();
    const body = {
      fullName,
      subject,
      email,
      message,
    };
    setFormSubmitted(true);

    console.log(body);
  }

  function onTextInputChange(event) {
    const value = event.target.value;
    if (event.target.name === "full-name") {
      setFullName(value);
    }
    if (event.target.name === "subject") {
      setSubject(value);
    }
    if (event.target.name === "message") {
      setMessage(value);
    }
    if (event.target.name === "email") {
      setEmail(value);
    }
  }

  if (formSubmitted) {
    return <div>Form submitted successfully</div>;
  }

  return (
    <div>
      <form
        onSubmit={onFormSubmit}
        className="d-flex flex-column align-items-center mt-2"
      >
        <label htmlFor="full-name">Full name</label>
        <input
          name="full-name"
          className="mb-2"
          required
          type="text"
          minLength={3}
          value={fullName}
          placeholder="Full name"
          onChange={onTextInputChange}
        />
        <label htmlFor="subject">Subject</label>
        <input
          name="subject"
          className="mb-2"
          required
          type="text"
          minLength={3}
          value={subject}
          placeholder="Subject"
          onChange={onTextInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          name="email"
          className="mb-2"
          required
          type="email"
          value={email}
          placeholder="Email address"
          onChange={onTextInputChange}
        />
        <label htmlFor="message">Message</label>
        <textarea
          name="message"
          className="mb-2"
          required
          type="textarea"
          minLength={3}
          value={message}
          placeholder="Message"
          onChange={onTextInputChange}
        />
        <Button type="submit">SUBMIT</Button>
      </form>
    </div>
  );
}

export default Contact;

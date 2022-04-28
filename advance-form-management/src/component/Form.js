import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
  first_name: yup.string().required("first name is required"),
  last_name: yup.string().required("last name is required"),
  email: yup.string().required("email is required"),
  password: yup.string().required("password is required"),
  agree: yup.boolean().oneOf([true], "you understand the terms of service"),
});

export default function Form() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    agree: false,
  });

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    agree: "",
  });

  const [disabled, setDisabled] = useState(true);

  const setFormErrors = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: "" }))
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
  };

  const change = (event) => {
    const { checked, value, name, type } = event.target;
    const valueToUse = type === "checkbox" ? checked : value;
    setFormErrors(name, valueToUse);
    setForm({ ...form, [name]: valueToUse });
  };

  const submit = (event) => {
    event.preventDefault();
    const newPerson = {
      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
      agree: form.agree,
    };
    axios
      .post("https://reqres.in/api/users", newPerson)
      .then((res) => {
        setForm({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          agree: false,
        });
      })
      .catch((err) => {
        debugger;
      });
  };

  useEffect(() => {
    schema.isValid(form).then((valid) => setDisabled(!valid));
  }, [form]);

  return (
    <div className="Form">
      <div style={{ color: "red" }}>
        <div>{errors.first_name}</div>
        <div>{errors.last_name}</div>
        <div>{errors.email}</div>
        <div>{errors.password}</div>
        <div>{errors.agree}</div>
      </div>
      <form onSubmit={submit}>
        <label>
          First Name
          <input
            onChange={change}
            value={form.first_name}
            name="first_name"
            type="text"
          />
        </label>

        <label>
          Last Name
          <input
            onChange={change}
            value={form.last_name}
            name="last_name"
            type="text"
          />
        </label>

        <label>
          Email
          <input
            onChange={change}
            value={form.email}
            name="email"
            type="text"
          />
        </label>

        <label>
          Password
          <input
            onChange={change}
            value={form.password}
            name="password"
            type="password"
          />
        </label>

        <label>
          Terms of Service
          <input
            onChange={change}
            checked={form.agree}
            name="agree"
            type="checkbox"
          />
        </label>

        <button disabled={disabled} className="sumbit">
          Submit
        </button>
      </form>
    </div>
  );
}

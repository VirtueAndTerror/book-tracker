import React, { Component } from "react";
import SignUpService from "../../services/signUp.service";
import { AlteredTextField } from "./AlteredTextField/AlteredTextField";

class SignUpPage extends Component {
  state = {
    data: { name: "", email: "", password: "", confirmPassword: "" },
    errors: {},
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => {
      return {
        data: {
          ...prevState.data,
          [name]: value,
        },
      };
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = this.state.data;

    if (password !== confirmPassword) {
      /* alert("Password doesn't match")*/
      this.setState({
        errors: {
          confirmPassword: "Password doesn't match",
        },
      });
    } else {
      const response = await SignUpService.request(JSON.stringify({ name, email, password }));
      if (response.error) {
        this.setState((prevState) => ({
          errors: { ...response.body.details },
        }));
      }
    }

    if (password !== confirmPassword) return alert("Password dont' match");

    try {
      await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      window.location = "/";
    } catch (error) {
      console.error(error);
      if (error && error.respose.status === 400) {
        const errors = { ...this.state.errors };
        errors.name = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form-container">
        <h2>Sign Up</h2>
        <input onChange={this.handleChange} type="text" name="name" id="name" placeholder="Name" />
        <input onChange={this.handleChange} type="email" name="email" id="email" placeholder="Email" />
        <input onChange={this.handleChange} type="password" name="password" id="password" placeholder="Password" />
        <input
          onChange={this.handleChange}
          type="password"
          name="confirmPassword"
          id="password"
          placeholder="Password"
        />
        <button>Register</button>
      </form>
    );
  }
}

export default SignUpPage;

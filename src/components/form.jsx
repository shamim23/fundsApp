import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", manager: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Form submitting logic, prevent default page refresh
  handleSubmit(event) {
    debugger;
    const { name, manager } = this.state;
    event.preventDefault();
    alert(`
      ____Your Details____\n
      Name : ${name}
      Manager : ${manager}
     
    `);
  }

  // Method causes to store all the values of the
  // input field in react state single method handle
  // input changes of all the input field using ES6
  // javascript feature computed property names
  handleChange(event) {
    this.setState({
      // Computed property names
      // keys of the objects are computed dynamically
      [event.target.name]: event.target.value
    });
  }

  // Return a controlled form i.e. values of the
  // input field not stored in DOM values are exist
  // in react component itself as state
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="Manager">Manager</label>
          <input
            name="manager"
            placeholder="Manager"
            value={this.state.manager}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <button>Create Account</button>
        </div>
      </form>
    );
  }
}

export default Form;

import React, { Component } from "react";
import axios from "axios";
import Form from "./form";
import { Fragment } from "react";

class Funds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "http://132.145.210.248:8080/captain/funds",
      funds: [],
      name: "",
      manager: "",
      managers: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentWillMount() {
    const { data: funds } = await axios.get(
      "http://132.145.210.248:8080/captain/funds"
    );

    this.setState({ funds });

    const { data: managers } = await axios.get(
      "http://132.145.210.248:8080/captain/fund_managers"
    );
    this.setState({ managers });
    debugger;
  }
  // axios
  //   .post("http://132.145.210.248:8080/captain/funds", addFund, optionAxios)
  //   .then(response => this.setState({ funds: response.funds }));
  // console.log(this.state.funds);

  handleAdd = async () => {
    const addFund = {
      fund_name: "Fund ABCx",
      fund_manager: { fund_manager_id: "mjones@thefundone.com" }
    };
    var optionAxios = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    const { data: fund } = await axios.post(
      "http://132.145.210.248:8080/captain/funds",
      addFund,
      optionAxios
    );

    const funds = [fund, ...this.state.funds];
    this.setState({ funds });
    //console.log(this.state.funds);
  };

  handleSubmit(event) {
    debugger;
    event.preventDefault();
    debugger;
    const { name, manager } = this.state;

    const addFund = {
      fund_name: name,
      fund_manager: { fund_manager_id: manager }
    };
    var optionAxios = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    axios.post(
      "http://132.145.210.248:8080/captain/funds",
      addFund,
      optionAxios
    );
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
  handleDelete = fund => {
    var optionAxios = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*"
      }
    };
    const Url = "http://132.145.210.248:8080/captain/funds/" + fund.fund_id;
    // axios.delete(
    //   "http://132.145.210.248:8080/captain/funds/" + fund.fund_id,
    //   optionAxios,
    //   optionAxios
    // );
    // axios.delete(Url, {
    //   headers: { "Access-Control-Allow-Origin": "*" }
    // });
    fetch(Url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "API-Key": "secret"
      }
    });
  };

  handleShow = fund => {
    const funds = this.state.funds.filter(f => f.fund_id == fund.fund_id);
    this.setState({ funds });
  };

  getFundList = () => {
    const funds = this.state.funds;
    console.log(funds);

    return (
      <Fragment>
        {funds.map(fund => (
          <tr key={fund.fund_id}>
            <td>
              <button
                type="button"
                onClick={() => this.handleShow(fund)}
                class="btn btn-light btn-sm"
              >
                {fund.fund_id}
              </button>
            </td>
            <td>{fund.fund_name}</td>
            <td>{fund.fund_inception_date}</td>
            <td>{fund.fund_manager.fund_manager_id}</td>
            <td>{fund.fund_manager.fund_manager_name}</td>
            <td>{fund.fund_manager.fund_manager_phone}</td>
            <td>{fund.fund_manager.fund_manager_mail_address}</td>
            <td>{fund.fund_manager.fund_manager_birth_date}</td>
            <td>
              <button
                type="button"
                onClick={() => this.handleDelete(fund)}
                class="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </Fragment>
    );
  };

  render() {
    const { funds } = this.state;

    // console.log(funds);

    return (
      //onSubmit={this.handleSubmit}
      <Fragment>
        <form className="form-control" onSubmit={this.handleSubmit}>
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
            <button>Create Fund</button>
          </div>
        </form>
        <table className="table table-dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Inception Date</th>
              <th>Manager ID</th>
              <th>Manager Name</th>
              <th>Manager Phone</th>
              <th>Manager Mail</th>
              <th>Manager DOB</th>
            </tr>
          </thead>
          <tbody>{this.getFundList()}</tbody>
        </table>
      </Fragment>
    );
  }
}

export default Funds;

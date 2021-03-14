import React, { Component } from "react";
import "./App.css";
import ListItems from "../ListItem/ListItem";

window.id = 0;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      current_data: {
        content: "",
        status: "Not Completed",
        btn_color: "red",
        bg_color: "lightblue",
        key: window.id,
      },
      current_bulk_data: {
        content: "",
        status: "Not Completed",
        btn_color: "red",
        bg_color: "lightblue",
        key: window.id,
      },
    };

    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItems = this.deleteItems.bind(this);
    this.completeItems = this.completeItems.bind(this);
    this.addBulkItem = this.addBulkItem.bind(this);
    this.handleBulkInput = this.handleBulkInput.bind(this);
  }

  handleInput(event) {
    this.setState({
      current_data: {
        content: event.target.value,
        status: "Not Completed",
        btn_color: "red",
        bg_color: "lightblue",
        txt_deco: "none",
        key: window.id++,
      },
    });
  }

  addItem(event) {
    event.preventDefault();
    const new_data = this.state.current_data;

    if (new_data.content !== "") {
      const items = [...this.state.data, new_data];
      this.setState({ data: items, current_data: { content: "", key: "" } });
    }
  }

  deleteItems(key) {
    const filteredItems = this.state.data.filter((item) => item.key !== key);

    this.setState({ data: filteredItems });
  }

  completeItems(key) {
    this.state.data.forEach((item) => {
      if (item.key === key) {
        item.btn_color = "lightgreen";
        item.bg_color = "#e3405b";
        item.txt_deco = "line-through";
        item.status = "Completed";
      }
    });

    this.setState({ data: this.state.data });
  }

  handleBulkInput(event) {
    this.setState({
      current_bulk_data: {
        content: event.target.value,
        status: "Not Completed",
        btn_color: "red",
        bg_color: "lightblue",
        txt_deco: "none",
        key: window.id++,
      },
    });
  }

  addBulkItem(event) {
    event.preventDefault();
    const new_data = this.state.current_bulk_data.content.split(",");
    if (new_data !== "") {
      new_data.forEach((item) => {
        const obj = {
          content: item,
          status: "Not Completed",
          btn_color: "red",
          bg_color: "lightblue",
          txt_deco: "none",
          key: window.id++,
        };

        if (obj.content !== "") {
          this.setState((prevState) => {
            return { data: prevState.data.concat(obj) };
          });
        }
      });
      this.setState({
        current_bulk_data: {
          content: "",
        },
      });
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Noter App</h1>
        <form id="single" onSubmit={this.addItem}>
          <input
            value={this.state.current_data.content}
            onChange={this.handleInput}
            placeholder="Enter single item"
          />
          <button type="submit">
            <strong>Add</strong>
          </button>
        </form>
        <br />
        <br />
        <form id="multi" onSubmit={this.addBulkItem}>
          <textarea
            value={this.state.current_bulk_data.content}
            rows="6"
            cols="100"
            onChange={this.handleBulkInput}
            placeholder="Enter multiple items seperated by , (comma)"
          />
          <br />
          <br />
          <button type="submit">
            <strong>Bulk Add</strong>
          </button>
        </form>
        <br />
        <br />
        <ListItems
          items={this.state.data}
          deleteItems={this.deleteItems}
          completeItems={this.completeItems}
        />
      </div>
    );
  }
}

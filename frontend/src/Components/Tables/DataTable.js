import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import ModalForm from "../Modals/Modal";
import axios from "axios";

class DataTable extends Component {
  deleteItem = async id => {
    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete) {
      try {
        let res = await axios.delete("http://localhost:4000/crud", {
          data: { id: id }
        });
        this.props.deleteItemFromState(res.data[0].id);
      } catch (err) {
        console.log(err);
      }
    }
  };

  render() {
    const items = this.props.items.map(item => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.first}</td>
          <td>{item.last}</td>
          <td>{item.email}</td>
          <td>{item.phone}</td>
          <td>{item.location}</td>
          <td>{item.hobby}</td>
          <td>
            <div style={{ width: "110px" }}>
              <ModalForm
                buttonLabel="Edit"
                item={item}
                updateState={this.props.updateState}
                addItemToState={this.props.addItemToState}
              />{" "}
              <Button color="danger" onClick={() => this.deleteItem(item.id)}>
                Del
              </Button>
            </div>
          </td>
        </tr>
      );
    });

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First</th>
            <th>Last</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Hobby</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </Table>
    );
  }
}

export default DataTable;

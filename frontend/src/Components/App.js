import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import { CSVLink } from "react-csv";
import DataTable from "../Components/Tables/DataTable";

class App extends Component {
  state = { items: [] };

  async getItems() {
    try {
      const items = await axios.get("http://localhost:4000/crud");
      this.setState({ items: items.data });
    } catch (err) {
      console.log(err);
    }
  }

  addItemToState = item => {
    let prevState = this.state;
    this.setState({ item: [...prevState.items, item] });
  };

  updateState = item => {
    const itemIndex = this.state.items.findIndex(data => data.id === item.id);

    const newItemList = [
      ...this.state.items.slice(0, itemIndex),
      item,
      ...this.state.items.slice(itemIndex + 1)
    ];

    this.setState({ items: newItemList });
  };

  deleteItemFromState = id => {
    const newItemList = this.state.items.filter(data => data.id !== id);

    this.setState({ items: newItemList });
  };

  componentDidMount() {
    this.getItems();
  }

  render() {
    return (
      <Container className="App">
        <Row>
          <Col>
            <h1 style={{ margin: "20px 0" }}>CRUD DATABASE</h1>
          </Col>
          <Row>
            <Col>
              <DataTable
                items={this.state.items}
                updateState={this.updateState}
                deleteItem={this.deleteItemFromState}
              />
              <CSVLink
                filename={"db.csv"}
                color="primary"
                style={{ float: "left", margin: "10px" }}
                className="btn btn-primary"
                data={this.state.items}
              >
                Download CSV
              </CSVLink>
            </Col>
          </Row>
        </Row>
      </Container>
    );
  }
}

export default App;

import React, { Component } from "react";

export default class Results extends Component {
  render() {
    let results = this.props.results;
    results = results.map((r, i) => {
      return (
        <tr key={i}>
          <td>{r.name}</td>
          <td style={{ textAlign: "right" }}>{r.id}</td>
          <td>{r.nametype}</td>
          <td>{r.recclass}</td>
          <td style={{ textAlign: "right" }}>
            {r.mass
              ? r.mass.includes(".")
                ? r.mass.split(".")[0] + r.mass.split(".")[1].slice(0, 2)
                : r.mass
              : ""}
          </td>
          <td>{r.fall}</td>
          <td style={{ textAlign: "right" }}>
            {r.year ? r.year.slice(0, 4) : ""}
          </td>
          <td>{r.geolocation ? r.geolocation.latitude : ""}</td>
          <td>{r.geolocation ? r.geolocation.longitude : ""}</td>
        </tr>
      );
    });
    if (results.length === 0)
      return <div style={{ textAlign: "center" }}>No Results Found!</div>;
    else
      return (
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th style={{ width: "18%" }}>Name</th>
                <th style={{ textAlign: "right", width: "3%" }}>Id</th>
                <th style={{ width: "12%" }}>Name Type</th>
                <th style={{ width: "17%" }}>Rec Class</th>
                <th style={{ textAlign: "right", width: "10%" }}>Mass (g)</th>
                <th style={{ width: "2%" }}>Fall</th>
                <th style={{ width: "5%" }}>Year</th>
                <th style={{ width: "7%" }}>Latitude</th>
                <th style={{ width: "7%" }}>Longitude</th>
              </tr>
            </thead>
            <tbody>{results}</tbody>
          </table>
        </div>
      );
  }
}

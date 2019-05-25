import React from "react";
import "./App.css";
import Results from "./Results";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchQuery: "",
      perPage: 100,
      page: 0, // Total of 45,716 results
      results: [],
      loading: true
    };
  }

  async componentDidMount() {
    let results = await fetch(
      `https://data.nasa.gov/resource/gh4g-9sfh.json?$limit=100&$offset=0`
    );
    results = await results.json();
    this.setState({ results, loading: false });
  }

  onChangeSearch = e => {
    e.preventDefault();
    this.setState({
      searchQuery: e.target.value
    });
  };

  onChangePerPage = e => {
    e.preventDefault();
    this.setState({ perPage: e.target.value, page: 0 });
  };
  onChangePage = e => {
    e.preventDefault();
    this.setState({ page: e.target.value - 1 });
  };
  search = async e => {
    if (this.state.loading) return;
    e.preventDefault();
    await this.setState({ loading: true }, () => {
      this.forceUpdate();
      fetch(
        `https://data.nasa.gov/resource/gh4g-9sfh.json?$limit=${
          this.state.perPage
        }&$offset=${this.state.page *
          this.state.perPage}&$where=lower(name)%20like%20lower(%22%25${
          this.state.searchQuery
        }%25%22)`
      )
        .then(r => r.json())
        .then(results => this.setState({ results, loading: false }));
    });
  };
  render() {
    return (
      <div className="App">
        <div className="header">Meteorite Explorer</div>
        <form className="searchBar" onSubmit={this.search}>
          <div className="searchDiv">
            Name{" "}
            <input
              value={this.state.searchQuery}
              type="text"
              name="search"
              className="searchInput"
              placeholder="Search by Name"
              onChange={this.onChangeSearch}
            />{" "}
            Page{" "}
            <input
              type="number"
              name="perPage"
              className="pageInput"
              value={this.state.page + 1}
              onChange={this.onChangePage}
              min={1}
            />{" "}
          </div>

          <button className="searchButton"> Search</button>
        </form>

        <div className="perPageContainer">
          Results Per Page:{" "}
          <input
            type="number"
            name="perPage"
            className="perPageInput"
            value={this.state.perPage}
            onChange={this.onChangePerPage}
            max={5000}
          />
        </div>
        {this.state.loading ? (
          <div className="loading">
            <div className="loadingSpinner" />
          </div>
        ) : (
          <Results results={this.state.results} />
        )}
      </div>
    );
  }
}

export default App;

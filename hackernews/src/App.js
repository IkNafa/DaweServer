import React, {Component} from 'react';
import './App.css';
import Table from "./components/Table.js";
import Search from "./components/Search.js";
import Button from "./components/Button.js";
require('moment/locale/es.js')
const DEFAULT_QUERY = 'react';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      result : null,
      searchTerm: DEFAULT_QUERY,
    };

    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);

  }

  onSearchSubmit(event){
    const {searchTerm} = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();

  }
  setSearchTopStories(result){
    this.setState({result});
  }

  fetchSearchTopStories(searchTerm, page= 0){
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
        .then(response => response.json())
        .then(result => this.setSearchTopStories(result))
        .catch(error => error);
  }

  componentDidMount() {
    const {searchTerm} = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  onSearchChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  onDismiss(id) {
    console.log(id);

    function isNotId(item) {
      return item.objectID !== id;
    }

    const updatedList = this.state.result.hits.filter(isNotId);
    this.setState({
      result : { ...this.state.result, hits: updatedList }
    })

  }

  render() {

    const {result, searchTerm} = this.state;
    const page = (result && result.page) || 0;
    return (
        <div className="page">
          <div className="interactions">
            <Search value={searchTerm}
                    onChange={this.onSearchChange}
                    onSubmit={this.onSearchSubmit}
            >

              Search
            </Search>
          </div>
          { result &&
          <Table list={result.hits}
                 onDismiss={this.onDismiss}/>
          }
          <div className={"interactions"}>
            <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
              More
            </Button>
          </div>
        </div>
    )
  }
}

export default App;
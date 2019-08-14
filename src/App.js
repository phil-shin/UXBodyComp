import React, { Component } from 'react';
const axios = require('axios');



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      feet: null,
      inches: null,
      heightEntered: false,
      leanExpanded: null,
      athleticExpanded: null,
      bulkyExpanded: null
    }
  }
  // continually fetch data while Component is running
  componentDidMount() {
    this.interval = setInterval(() => this.getDataFromDB(), 1000)
  };

  // stop data fetching when Component unmounts
  componentWillUnmount() {
    clearInterval(this.interval);
  };

  // Fetch all  database data event handler
  getDataFromDB = () => {
    axios.get('http://localhost:3001/api/getData', {
      params: {
        feet: this.state.feet,
        inches: this.state.inches
      }
    })
    .then((res) => this.setState({ data: res.data }))
    .catch((error) => console.log(error));
  };

  render() {
    let height = parseInt(this.state.feet+'.'+this.state.inches);
    return (
      <div>
        {!heightEntered ? (
          <div>
            <h1>Please Enter a Height:</h1><br></br>
            <input type="text" 
            onChange={(e) => {this.setState({feet: e.target.value})}} 
            placeholder = "Feet"></input>
            <input type="text" 
            onChange={(e) => {this.setState({inches: e.target.value})}} 
            placeholder = "Inches"></input>
            <button type="submit" 
            onClick = {(e) => {this.setState({heightEntered: !this.state.heightEntered})}} 
            value="Submit">Submit</button>
          </div>
        ) : (
          <div>
            <h1>{this.state.feet}'{this.state.inches}"</h1>
            <Block type="lean" 
            expanded={this.state.leanExpanded} 
            weight = {this.state.data.type.lean.weight} 
            athleteName = {this.state.type.lean.athelete.name} 
            athletePosition = {this.state.type.lean.athlete.position}
            ></Block>
            <Block type="athletic" 
            expanded={this.state.athleticExpanded} 
            weight = {this.state.data.type.athletic.weight}
            athleteName = {this.state.data.type.athletic.athlete.name}
            athletePosition = {this.state.data.type.athetlic.athlete.position}
            ></Block>
            <Block type="bulky" 
            expanded={this.state.bulkyExpanded}
            weight = {this.state.data.type.bulky.weight}
            athleteName = {this.state.data.type.bulky.athlete.name}
            athletePosition = {this.state.data.type.bulky.athlete.position}
            ></Block>
          </div>
          )}
      </div>
    )
  }
}

class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render () {
    return (
      <div>
        <h2>{this.props.type}</h2>
        <h3>{this.props.weight}</h3>
        {this.props.expanded ? (
          <div>
            <h4>Example</h4><br></br>
            <h5>{this.props.athleteName}</h5><br></br>
            <h6>{this.props.athletePosition}</h6>
          </div>
        ) : '' }
      </div>
    )
  }
}

export default App;

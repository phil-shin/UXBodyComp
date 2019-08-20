import React, { Component } from 'react';
const axios = require('axios');



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      feet: null,
      inches: null,
      heightEntered: false,
      leanExpanded: false,
      athleticExpanded: false,
      bulkyExpanded: false
    };
    this.handleLeanExpandedChange = this.handleLeanExpandedChange.bind(this);
    this.handleAthleticExpandedChange = this.handleAthleticExpandedChange.bind(this);
    this.handleBulkyExpandedChange = this.handleBulkyExpandedChange.bind(this);

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
    console.log('feet:'+this.state.feet);
    console.log('inches:'+this.state.inches);
    let height = parseInt(this.state.feet+this.state.inches);
    console.log('height:'+height);
    console.log('height type:'+typeof(height));

    axios.get('http://localhost:3001/api/getData', {
      params: {
        height: height
      }
    })
    //.then((data)=>data.json())
    .then((res) => {
      console.log('res.data:');
      console.log(res.data);
      console.log('res.data.data:');
      console.log(res.data.data);
      console.log('leanAthleteName:'+res.data.data._id);
      this.setState({ data: res.data.data })
    })
    .catch((error) => console.log(error));
  };

  // Parent level Lean Box Component expanding event handler
  handleLeanExpandedChange = () => {
    this.setState({
      leanExpanded: !this.state.leanExpanded
    });
  };

  // Parent level Athletic Box Component expanding event handler
  handleAthleticExpandedChange = () => {
    this.setState({
      athleticExpanded: !this.state.athleticExpanded
    });
  };

  // Parent level Bulky Box Component expanding event handler
  handleBulkyExpandedChange = () => {
    this.setState({
      bulkyExpanded: !this.state.bulkyExpanded
    });
  };

  render() {
    let height = parseInt(this.state.feet+'.'+this.state.inches);
    //let data = JSON.stringify(this.state.data);
    return (
      <div>
        {!this.state.heightEntered ? (
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
            handleExpandedChange = {this.handleLeanExpandedChange}
            expanded={this.state.leanExpanded} 
            weight = {this.state.data.leanWeight}//this.state.data.type.lean.weight} 
            athleteName = {this.state.data.leanAthleteName}//type.lean.athelete.name} 
            athletePosition = {this.state.data.leanAthletePosition}//type.lean.athlete.position}
            ></Block>
            <Block type="athletic"
            handleExpandedChange = {this.handleAthleticExpandedChange} 
            expanded={this.state.athleticExpanded} 
            weight = {this.state.data.athleticWeight}//type.athletic.weight}
            athleteName = {this.state.data.athleticAthleteName}//type.athletic.athlete.name}
            athletePosition = {this.state.data.athleticAthletePosition}//type.athetlic.athlete.position}
            ></Block>
            <Block type="bulky"
            handleExpandedChange = {this.handleBulkyExpandedChange} 
            expanded={this.state.bulkyExpanded}
            weight = {this.state.data.bulkyWeight}//type.bulky.weight}
            athleteName = {this.state.data.bulkyAthleteName}//type.bulky.athlete.name}
            athletePosition = {this.state.data.bulkyAthletePosition}//type.bulky.athlete.position}
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
    };
    this.handleExpandedClick = this.handleExpandedClick.bind(this);
  }

  handleExpandedClick = () => {
    this.props.handleExpandedChange();
  }

  render () {
    return (
      <div>
        <h2>{this.props.type}</h2>
        <h3>{this.props.weight}lbs</h3>
        <button onClick = {() => this.handleExpandedClick()} value="Example">Example</button>
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

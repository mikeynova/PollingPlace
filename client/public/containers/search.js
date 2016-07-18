import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchGames, clearPossibleLocations } from '../actions/index';
import $ from 'jquery';

class Search extends Component { 

  constructor(props) {
    super(props)

    this.state = {
      dropDownSport: "",
      locationInput: ""
    }
  }

  componentDidUpdate() {
    if(this.props.possibleLocations.length > 1) {
      $('.modal').show();
    }
  }

  listOfPossibleLocations() {
    console.log('inside listOfPossibleLocations')
    return this.props.possibleLocations.map((location) =>{
       return(
        <div className="listOfPossibleLocations center-align" onClick={ this.onLocationSubmit.bind(this, location.formatted_address) }>{ location.formatted_address }</div>
      )
    })
  }

  sportsSelect(event) {
    this.setState({
      dropDownSport: event.target.value
    })
  } 

  onLocationSubmit(args) {  
  let fixedLocation;
    if(typeof arguments[0] === 'string') {
      fixedLocation = arguments[0];
      arguments[1].preventDefault();
    } else {
      arguments[0].preventDefault()
      fixedLocation = this.state.locationInput;
      this.setState({
        locationInput: ''
      })
    }
    this.props.searchGames( { sport: this.state.dropDownSport, location: fixedLocation } );
    this.props.clearPossibleLocations();
  }

  onLocationEnter(event) {
    this.setState({
      locationInput: event.target.value
    })
  }

render() {
    return (
      <div className="valign-center">
        <div className="valign center-block">

          <div id="modal1" className="modal">
            <div className="modal-content">
              <h4 className="center-align">Confirm Location</h4>
              <div>{ this.listOfPossibleLocations() }</div>
            </div>
          </div>

          <div>
            <form className="inputBox" onSubmit={this.onLocationSubmit.bind(this)}>
              <input value={this.state.locationInput} onChange={this.onLocationEnter.bind(this)} type='text' placeholder='Enter a Location'/>
            </form>   
          </div>

          <div>
            <h5 className="center-align"><strong>Welcome to PickUp! Enter your location to find a game near you!</strong></h5>
          </div>
          
        </div>           
      </div>
    )
  }  
}

function mapStateToProps(state) {
  return {
    possibleLocations: state.possibleLocations
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ searchGames, clearPossibleLocations }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)


import React from 'react';
import {
  AppRegistry,
  View,
} from 'react-vr';
import Canvas from './components/Canvas';

import axios from 'axios'
import Pointers from './components/Pointers'







export default class GDVR_REACTVR_SITEPOINT_GALLERY extends React.Component {

  constructor() {
    super();

    this.state = {
      panoImage: {uri:''},
      restaurantId: '',
      pointer_location: null
     
    };
  }

  render() {

  
    return (
      <View>
        <Canvas panoImage={this.state.panoImage} />
       
        
        {/* {this.state.pointer_location &&  <Pointers pointerData={this.state.pointer_location} restaurantId={this.state.restaurantId}/>} */}
        <Pointers pointerData={this.state.pointer_location} restaurantId={this.state.restaurantId}/>

      </View>
    );
  }
  
  componentDidMount(){

    axios.get('https://projectdatabase360.herokuapp.com/api/communication')
    .then(response => {
      
      this.setState({ restaurantId: response.data.id.patched_id })

    }).then(() =>{
      this.setUrlToState()
    })

  
  }

 
  
setUrlToState=()=>{
 
      axios.get(`https://projectdatabase360.herokuapp.com/api/restaurants/${this.state.restaurantId}`)
    .then(restaurantData => {

      this.setState(
        {
          panoImage: {uri:`${'https://cors-anywhere.herokuapp.com/'}${restaurantData.data.restaurant.link_to_360}`},
          pointer_location: restaurantData.data.restaurant.pointer_location
        })
    })
    }
};

AppRegistry.registerComponent('GDVR_REACTVR_SITEPOINT_GALLERY', () => GDVR_REACTVR_SITEPOINT_GALLERY);
import React from 'react';
import {
  AppRegistry,
  View,
} from 'react-vr';
import Canvas from './components/Canvas';
// import UI from './components/UI';
import axios from 'axios'
import Pointer1 from './components/Pointer1'

// import console = require('console');

// const Config = [
//   {
//     key: 0,
//     imageSrc: '',
//     buttonImageSrc: 'pointer.png',
//   },
//   {
//     key: 1,
//     imageSrc: '',
//     buttonImageSrc: 'pointer.png',
//   },
//   {
//     key: 2,
//     imageSrc: '',
//     buttonImageSrc: 'pointer.png',
//   },
//   {
//     key: 3,
//     imageSrc: '',
//     buttonImageSrc: 'pointer.png',
//   }
// ];

export default class GDVR_REACTVR_SITEPOINT_GALLERY extends React.Component {

  constructor() {
    super();

    this.state = {
      panoImage: {uri:''},
      restaurantId: '',
      tables: [{coords: [-7, -1, -2]}, {coords: [-3, -1, -4]}, {coords: [-5, 3, 4]}]
    };
  }

  render() {

    console.log(this.state.restaurantId)
    return (
      <View>
        <Canvas panoImage={this.state.panoImage} />
        {/* <UI
          buttonConfig={Config}
          onClick={(key)=>{
            this.setState({panoImage: Config[key].imageSrc});
          }}
        /> */}
        
        <Pointer1 tables={this.state.tables}/>

      </View>
    );
  }
  
  componentDidMount(){

    axios.get(`${'https://cors-anywhere.herokuapp.com/'}${'https://projectdatabase360.herokuapp.com/api/communication'}`)
    .then(response => {
      
      this.setState({ restaurantId: response.data.id.patched_id })

    }).then(() =>{
      this.setUrlToState()
    })
  
  }
  
setUrlToState=()=>{
  // componentDidUpdate(prevState){
  //   if( prevState.restaurantId !== this.state.restaurantId){
      axios.get(`${'https://cors-anywhere.herokuapp.com/'}${'https://projectdatabase360.herokuapp.com/api/restaurants/'}${this.state.restaurantId}`)
    .then(restaurantData => {
      console.log(restaurantData.data.restaurant.link_to_360)
      this.setState({panoImage: {uri:`${'https://cors-anywhere.herokuapp.com/'}${restaurantData.data.restaurant.link_to_360}`}})
      
    })
    }
  
  
};

AppRegistry.registerComponent('GDVR_REACTVR_SITEPOINT_GALLERY', () => GDVR_REACTVR_SITEPOINT_GALLERY);
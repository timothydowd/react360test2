import React from 'react';
import {
  AppRegistry,
  View,
  Image,
  asset
} from 'react-vr';
import Canvas from './components/Canvas';

import axios from 'axios'
import Pointers from './components/Pointers'



export default class IndexVR extends React.Component {

  constructor() {
    super();

    this.state = {
      panoImage: {uri:''},
      restaurantId: '',
      pointer_location: null,
      table_booking: null,
      panoLoading: false,
      bookedTableId: []
     
    };
  }

  render() {

    if(this.state.panoLoading){
      return (
              <View style={{transform: [
                {translate: [-0.35, 0.35, -4]}
                ]}} >

                <Image
                    style={{
                      width: 0.7,
                      height: 0.7,
                      
                      
                    }}
                    source={asset('buffer-gif-8.gif')}  
                />
              </View>  
       ); 
    }

    else{
      return (
        <View>
          <Canvas panoImage={this.state.panoImage} />
            {this.state.pointer_location &&  <Pointers bookedTableId={this.state.bookedTableId} pointerData={this.state.pointer_location} restaurantId={this.state.restaurantId}/>}
            {/* <Pointers pointerData={this.state.pointer_location} restaurantId={this.state.restaurantId}/> */}
  
        </View>
      );

    }

    
  }
  
  componentDidMount(){

    axios.get('https://projectdatabase360.herokuapp.com/api/communication')
    .then(response => {
      
      this.setState({ restaurantId: response.data.id.patched_id })

    }).then(() =>{
      this.setRestaurantDetailsToState()
    })

  
  }

  getBookedTableId() {
    
    const bookingIdArray = this.state.justBooked.filter(booking => {
      if(booking.booked) {
        return booking.id
      }
     })
     
     return bookingIdArray
    
  }

 
  setRestaurantDetailsToState=()=>{
    this.setState({panoLoading: true})
 
      axios.get(`https://projectdatabase360.herokuapp.com/api/restaurants/${this.state.restaurantId}`)
    .then(restaurantData => {
      
      
      Promise.resolve(
        this.setState(
          {
            panoImage: {uri:`${'https://cors-anywhere.herokuapp.com/'}${restaurantData.data.restaurant.link_to_360}`},
            pointer_location: restaurantData.data.restaurant.pointer_location,
            table_booking: restaurantData.data.restaurant.table_booking,
            panoLoading: false,
            justBooked: restaurantData.data.restaurant.table_booking['2019-04-27']
  
          }
        )
      )
      .then(() => {
        this.setState({bookedTableId: this.getBookedTableId()})
        
      })
      
        
    })

  }

    
};

AppRegistry.registerComponent('IndexVR', () => IndexVR);
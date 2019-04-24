import React from 'react';
import {
  Animated,
  asset,
  Image,
  View,
  VrButton,
} from 'react-vr';
import { Easing } from 'react-native'
import Pointer from './Pointer'



class Pointers extends React.Component {

  constructor(props) {
    super();

    this.state = {
     
      animationValue: new Animated.Value(1.5),
      pointerEntered: false
      
    };
  }

  componentDidMount(){
   

  }



  render () {

    const hardCodedTables = {
      tables: [
        { id: 1, coordinates: [1.5, -1, -1.5] },
        { id: 2, coordinates: [0.5, -0.5, -5] },
        { id: 3, coordinates: [-1, 0.25, -6] },
        { id: 4, coordinates: [-2.25, 1, -7.25] },
        { id: 5, coordinates: [-4, 1.75, -9] },
        { id: 6, coordinates: [-2.5, 2.2, -2.5] },
        { id: 7, coordinates: [-8.75, 2.7, -3] },
        { id: 8, coordinates: [-4.5, 3.5, -0.5] },
        { id: 9, coordinates: [-6, 4.25, 4] },
        { id: 10, coordinates: [4, 5.2, 1] },
        { id: 11, coordinates: [-1, 5.5, 1] }
      ]
    }
    

    
      return (

        
        <View>
           
           { this.props.pointerData.tables.map(table => {
             
             return(
               <Pointer bookedTableId={this.props.bookedTableId} restaurantId={this.props.restaurantId} key={table.id} tableId={table.id} coords={table.coordinates}/>
               
             )
           })}
   
           {/* { hardCodedTables.tables.map(table => {
             console.log(table)
             return(
               <Pointer restaurantId={this.props.restaurantId} key={table.id} tableId={table.id} coords={table.coordinates}/>
             )
           })} */}
           
         </View>
       );

    
    
    
  }

};

export default Pointers;
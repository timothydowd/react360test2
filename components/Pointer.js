import React from 'react';
import {
  Animated,
  asset,
  Image,
  View,
  VrButton,
} from 'react-vr';
import { Easing } from 'react-native'
import axios from 'axios'




class Pointer extends React.Component {

  constructor(props) {
    super();

    this.state = {
      // animatedTranslation: new Animated.Value(0),
      animationValue: new Animated.Value(1.5),
      pointerEntered: false,
      pointerImg: 'pointer.png',
      bookingTextOpacity: 0
      
    };
  }

  componentDidMount(){
    this.animation();

  }

  animation(){

    if(!this.state.pointerEntered){

      Animated.sequence([
        Animated.timing(
          this.state.animationValue,
          {
            toValue: 1.5,
            duration: 600
          }
        ),
        Animated.timing(
          this.state.animationValue,
          {
            toValue: 1.58,
            duration: 600,
            easing: Easing.elastic(0)
          }
        )
      ]).start(()=> {
        this.animation();
      });
    } 

  }

  onPointerClick = () => {
    const tableId = this.props.tableId
    
    
    
    axios.patch('https://projectdatabase360.herokuapp.com/api/communication', 
    { patched_table_id: tableId }
    )
    .then((res) => console.log(res))
    
  }

  onPointerEnter = () => {
    this.setState({pointerEntered: true, pointerImg: 'reserve_table2.png', bookingTextOpacity: 100})

  }

  onPointerExit = () => {
    Promise.resolve(this.setState({pointerEntered: false, pointerImg: 'pointer.png', bookingTextOpacity: 0}))
    .then(() => {
      this.animation()
    })
  }

  render () {

    console.log('bookedTableIds', this.props.bookedTableId)

    if(this.props.bookedTableId.some(table => {
      return table.id === this.props.tableId
      })
      ) {
      return (
        <View>
          <Animated.View 
            billboarding={'on'}
            style={{
              transform: [
                
                {translateY: this.state.animationValue},
                {translate: this.props.coords},  
              ],
              
              width: 0.7,
            }}
          >
            <VrButton 
              onClick={ () => {this.onPointerClick()} }
              onEnter={this.onPointerEnter}
              onExit={this.onPointerExit}
            >
              <Image
                style={{
                  width: 0.7,
                  height: 0.7,
                }}
                source={asset('reserved_face.png')} 
              >
              </Image>
            </VrButton>
          </Animated.View>
        </View>
      );

    }
    
    
    if(this.props.tableId === this.props.bookedTableId){
      return (
        <View>
          <Animated.View 
            billboarding={'on'}
            style={{
              transform: [
                
                {translateY: this.state.animationValue},
                {translate: this.props.coords},  
              ],
              
              width: 0.7,
            }}
          >
            <VrButton 
              onClick={ () => {this.onPointerClick()} }
              onEnter={this.onPointerEnter}
              onExit={this.onPointerExit}
            >
              <Image
                style={{
                  width: 0.7,
                  height: 0.7,
                }}
                source={asset('reserved_face.png')} 
              >
              </Image>
            </VrButton>
          </Animated.View>
        </View>
      );
    }
    else{
      return (
        <View>
          <Animated.View 
            billboarding={'on'}
            style={{
              transform: [
                
                {translateY: this.state.animationValue},
                {translate: this.props.coords},  
              ],
              
              width: 0.7,
            }}
          >
            <VrButton 
              onClick={ () => {this.onPointerClick()} }
              onEnter={this.onPointerEnter}
              onExit={this.onPointerExit}
            >
              <Image
                style={{
                  width: 0.7,
                  height: 0.7,
                }}
                source={asset(this.state.pointerImg)} 
              >
              </Image>
            </VrButton>
          </Animated.View>
        </View>
      )

    }
    ;
  }
};

export default Pointer;
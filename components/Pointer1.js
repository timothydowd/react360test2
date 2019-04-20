import React from 'react';
import {
  Animated,
  asset,
  Image,
  View,
  VrButton,
} from 'react-vr';
import { Easing } from 'react-native'


class Pointer1 extends React.Component {

  constructor(props) {
    super();

    this.state = {
      // animatedTranslation: new Animated.Value(0),
      animationValue: new Animated.Value(1.5),
      
    };
  }

  componentDidMount(){
    this.animation();

  }

  animation(){

    Animated.sequence([
      Animated.timing(
        this.state.animationValue,
        {
          toValue: 0,
          duration: 400
        }
      ),
      Animated.timing(
        this.state.animationValue,
        {
          toValue: 0.2,
          duration: 400,
          easing: Easing.elastic(3)
        }
      )
    ]).start(()=> {
      this.animation();
    });



    // Animated.timing(
    //   this.state.animationValue,
    //   {
    //     toValue: 0,
    //     duration: 1000,
    //     delay: 1000,
    //     easing: Easing.bounce
    //   }
    // ).start(() => {
      
    // })
  }

  

  onButtonClick = () => {
    this.props.onClick();
  }

 
  render () {
    return (
      <View>
        
        {this.props.tables.map(table => {
          
          
          return(
            <View key={table.tableId} >
              <Animated.View
            billboarding={'on'}
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              margin: 0.0125,
              transform: [
                {translateY: this.state.animationValue},
                {rotateX: 5},
                {translate: table.coords},
              ],
            
              width: 0.7,
            }}
          >
            <VrButton
              onClick={this.onButtonClick}
              onEnter={this.animateIn}
              onExit={this.animateOut}
            >
            <Image
              style={{
                width: 0.7,
                height: 0.7,
              }}
              source={asset('pointer.png')}
            >
            </Image>
            </VrButton>
          </Animated.View>
        </View>
          )
          
        })}
        
        
        
      </View>
      
      
    );
  }
};

export default Pointer1;
import React from 'react';
import {
  Animated,
  asset,
  Image,
  View,
  VrButton,
} from 'react-vr';


const Easing = require('Easing');

class Pointer1 extends React.Component {

  constructor(props) {
    super();

    this.state = {
      animatedTranslation: new Animated.Value(0),
    };
  }

  animateIn = () => {
    Animated.timing(
      this.state.animatedTranslation,
      {
        toValue: 0.125,
        duration: 100,
        easing: Easing.in,
      }
    ).start();
  }

  animateOut = () => {
    Animated.timing(
      this.state.animatedTranslation,
      {
        toValue: 0,
        duration: 100,
        easing: Easing.in,
      }
    ).start();
  }

  onButtonClick = () => {
    this.props.onClick();
  }

  // render () {
  //   return (
  //     <Animated.View
  //       billboarding={'on'}
  //       style={{
  //         alignItems: 'center',
  //         flexDirection: 'row',
  //         margin: 0.0125,
  //         transform: [
  //           {translateY: this.state.animatedTranslation},
  //           {rotateX: 5},
  //           {translate: [-7, -1, -2]},
  //         ],
          
  //         width: 0.7,
  //       }}
  //     >
  //       <VrButton
  //         onClick={this.onButtonClick}
  //         onEnter={this.animateIn}
  //         onExit={this.animateOut}
  //       >
  //         <Image
  //           style={{
  //             width: 0.7,
  //             height: 0.7,
  //           }}
  //           source={asset('pointer.png')}
  //         >
  //         </Image>
  //       </VrButton>
  //     </Animated.View>
  //   );
  // }


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
                {translateY: this.state.animatedTranslation},
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
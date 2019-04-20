import React from 'react';
import {
  Animated,
  asset,
  Image,
  View,
  VrButton,
} from 'react-vr';
import { Easing } from 'react-native'


class Pointers extends React.Component {

  constructor(props) {
    super();

    this.state = {
      // animatedTranslation: new Animated.Value(0),
      animationValue: new Animated.Value(1.5),
      pointerEntered: false
      
    };
  }

  componentDidMount(){
    this.animation();

  }

  animation(){

    if(!this.state.pointerEntered)

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
          toValue: 0.15,
          duration: 400,
          easing: Easing.elastic(0)
        }
      )
    ]).start(()=> {
      this.animation();
    });

  }

  

  onPointerClick = () => {
    console.log('clicky');
  }

  onPointerEnter = () => {
    console.log('enter')
    this.setState({pointerEntered: true})
  }

  onPointerExit = () => {
    console.log('on exit')
    Promise.resolve(this.setState({pointerEntered: false}))
    .then(() => {
      this.animation()
    })
    
  }

  onExit

 
  render () {
    return (
      <View>
        
        {this.props.tables.map(table => {
          
          return(
            <View key={table.tableId} >
              <Animated.View
                billboarding={'on'}
                style={{
                  // alignItems: 'center',
                  // flexDirection: 'row',
                  // margin: 0.0125,
                  transform: [
                    {translateY: this.state.animationValue},
                    // {rotateX: 5},
                    {translate: table.coords},
                  ],
                
                  width: 0.7,
                }}
              >
                <VrButton
                  onClick={this.onPointerClick}
                  onEnter={this.onPointerEnter}
                  onExit={this.onPointerExit}
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

export default Pointers;
import React from 'react';
import {
  Animated,
  asset,
  Image,
  View,
  VrButton,
} from 'react-vr';
import { Easing } from 'react-native'


class Pointer extends React.Component {

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

  

  onPointerClick = (key) => {
    console.log('clicky', key);
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

  
  render () {
    return (
            <View key={this.props.tableId} >
              <Animated.View key={this.props.tableId}
                billboarding={'on'}
                style={{
                  transform: [
                    {translateY: this.state.animationValue},
                    {translate: this.props.coords},
                  ],
                
                  width: 0.7,
                }}
              >
                <VrButton key={this.props.tableId}
                  onClick={ () => {this.onPointerClick(this.props.tableId)} }
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
         
       
        
      
    );
  }
};

export default Pointer;
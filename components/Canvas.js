import React from 'react';
import {
  asset,
  Pano,
} from 'react-vr';

class Canvas extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      panoImage: this.props.panoImage,
    }
  }

  render() {
    return (
      <Pano source={this.state.panoImage}/>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({panoImage: nextProps.panoImage});
  }
};

export default Canvas;
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import InputMask from '../index';

export default class react_native_test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      blur: '',
      change: ''
    };
  }
  change(isMatch, value) {
    this.setState({
      change: [isMatch, value].join(', ')
    });
  }
  blur(isMatch, value) {
    this.setState({
      blur: [isMatch, value].join(', ')
    });
  }
  render() {
    const Container = {
      flex: 1,
      flexDirection: 'row',
      paddingTop: 100
    };
    const Left = {
      flex: 0.5,
      justifyContent: 'center',
      flexDirection: 'row'
    };
    const Right = {
      flex: 0.5,
      flexDirection: 'column',
      alignItems: 'center'
    };
    const InputStyle = {
	  backgroundColor: '#b8b8b8',
	  width: 120,
	  height: 42,
	  textAlign: 'center',
	  paddingLeft: 5,
	  paddingRight: 5,
	};
    return (
      <View style={Container}>
        <View style={Left}>
          <InputMask
            regex={['L', 'LL', 'LLL']}
            keyboardType="default"
            placeholderTextColor='rgba(0, 0, 0, 0.56)'
            placeholder="placeholder"
            blur={(isMatch, value) => this.blur(isMatch, value)}
            change={(isMatch, value) => this.change(isMatch, value)}
            value={this.state.input}
            style={InputStyle}
          />
        </View>
        <View style={Right}>
          <Text>onBlur: {this.state.blur}</Text>
          <Text>onChange: {this.state.change}</Text>
        </View>
      </View>
    );
  }
}

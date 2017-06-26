import React from 'react';
import { StackNavigator } from 'react-navigation';

import MapsScreen from './MapsScreen';

const AppNavigator = StackNavigator({
  Home: {
    screen: MapsScreen,
    path: '/',
    navigationOptions: {
      title: 'Navigate to Customer Address',
      headerTitleStyle :{textAlign: 'center', alignSelf:'center', fontWeight:'normal'},
    },
  }
});

class App extends React.Component {
  render() {
    return (
      <AppNavigator screenProps={this.state}/>
    );
  }
}

module.exports = App;

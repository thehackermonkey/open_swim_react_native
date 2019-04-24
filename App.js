/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import BleContextProvider from './context/BleContext';
import { Platform, StyleSheet, Text, View, Button, ImageBackground, TouchableHighlight  } from 'react-native';
import styled from 'styled-components/native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import DeviceManager from './screens/DeviceManager';
import Training from './screens/Training';
import Trainings from './screens/Trainings';
import TrainingDetail from './screens/TrainingDetail';
import { Title, Container, Subtitle, Card, CardContainer } from './components/baseComponents';


class BackgroundImage extends Component {
  render() {
      return (
          <ImageBackground style={styles.backgroundImage} source={this.props.image}>      
            {this.props.children}
          </ImageBackground>
      )
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
    header: null
  };

  contextGreeting = () => {
    const day  = new Date();
    const hour = day.getHours();
    if( hour < 12 ){
      return 'Good Morning'
    } else if( hour >= 12 < 19  ){
      return 'Good Afternoon'
    } else {
      return 'Good Night'
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <BleContextProvider>
      <Container fullHeight={true}>
        <Title>{this.contextGreeting()} Hans!</Title>
        <Subtitle>Guadalajara, Jal.</Subtitle>

        <TouchableHighlight underlayColor="white" onPress={() => navigate('Training')}>
          <Card>
            <BackgroundImage image={require('./img/wave.png')}>
              <Title>Start Training</Title>
            </BackgroundImage>
          </Card>
        </TouchableHighlight>


        <TouchableHighlight underlayColor="white" onPress={() => navigate('Trainings')}>
          <Card>
            <BackgroundImage image={require('./img/chart.png')}>
                <Title>My Workouts</Title>
            </BackgroundImage>
          </Card>
         </TouchableHighlight>
        

        <TouchableHighlight underlayColor="white" onPress={() => navigate('Devices', {name: 'Jane'})}>
          <Card>
          <BackgroundImage image={require('./img/device.png')}>
            <Title >Device</Title>
          </BackgroundImage>
          </Card>
        </TouchableHighlight>

      </Container>
      </BleContextProvider>
    );
  }
}


const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Training: {screen: Training},
  Trainings: {screen: Trainings},
  Devices: {screen: DeviceManager},
  // TrainingDetail: {screen: TrainingDetail},
});


const App = createAppContainer(MainNavigator);


export default () => (
  <BleContextProvider>
    <App />
  </BleContextProvider>
);


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

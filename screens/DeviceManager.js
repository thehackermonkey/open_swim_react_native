import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image} from 'react-native';
import { Title, Container, MegaText, Card, Subtitle, DeviceCard } from '../components/baseComponents'; 
import {TouchableHighlight} from 'react-native';
import { BleContextConsumer } from '../context/BleContext'; 

export default class DeviceManager extends Component {

  render() {
    return (
      <BleContextConsumer>
        { context => (
          <Container>
            <Title>Discover and connect to devices: </Title>
            
            {context.state.devices.map(device => (
              <TouchableHighlight key={device.name} underlayColor="white" onPress={context.connect}>
                <DeviceCard>
                  <View style={{width: 80, height: 80, flex: 1, flexDirection: 'row', padding: 20}} >
                    <Image style={{width: 30, height: 30}} source={context.state.connected ? require('../img/connected.png')  : require('../img/disconected.png') }></Image>
                    <Subtitle style={{marginLeft: 20}}>OpenSwim ({device.name})</Subtitle>
                  </View>
                </DeviceCard>
              </TouchableHighlight>
            ))}
          </Container>
        )}
      </BleContextConsumer>
      
    )
  }
}

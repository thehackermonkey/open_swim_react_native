import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Title, Container, MegaText, Card, Subtitle, TrainingCard } from '../components/baseComponents'; 
import {Button, Text} from 'react-native';

export default class Trainings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: [],
      trainings: [],

    }
  }

  componentWillMount(){
    this.getAllKeys()
    // this.removeFew()
  }

  getAllKeys = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
      this.setState({
        keys
      })
      this.getMultiple(keys)
    } catch(e) {
      this.setState({
        e
      })
    }
  }

  removeFew = async () => {
    const keys = await AsyncStorage.getAllKeys()
    try {
      await AsyncStorage.multiRemove(keys)
      this.setState({
        keys: []
      })
    } catch(e) {
      // remove error
    }
  
    console.log('Done')
  }

  getMultiple = async (keys) => {

    let values
    const trainings = []
    try {
      
      values = await AsyncStorage.multiGet(keys)


      values.map(val => {
        trainings.push(JSON.parse(val[1]))
      })
  
      this.setState({
        trainings,
      })
    } catch(e) {
      this.setState({
        e
      })
    }
    console.log(values)

  }

  render() {
    return (
      <Container>
        <Title>Last trainings</Title>
        {/* <Button onPress={this.removeFew} title="remove"></Button> */}
        {this.state.trainings.map((training, index) => (
          <TrainingCard backgroundColor='#C9F7F8'>
            <Title>23/4/2019</Title>
            <Subtitle>{training.poolLength}</Subtitle>
            <Subtitle key={training.index}>Laps : {training.laps}</Subtitle>
            <Subtitle>Training Duration: {training.trainingLength}</Subtitle>
            <Subtitle>Lap Avg. Duration: {training.avg}</Subtitle>
            
          </TrainingCard>
        ))}
      </Container>
    )
  }
}

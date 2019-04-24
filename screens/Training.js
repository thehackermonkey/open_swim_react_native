import React, { Component } from 'react'
import { Image,StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Title, Container, MegaText, Card, Subtitle, TimerText } from '../components/baseComponents'; 
import {Slider, TouchableHighlight} from 'react-native';
import { BleContextConsumer } from '../context/BleContext';
import shortid from 'shortid';

export default class Training extends Component {
  constructor(props){
    super(props);
    this.state={
      distance: 0,
      started: false,
    }
  }

  handleValueChange = (e) => {
    this.setState({
      distance: e,
    })
  }

  toggleStart = () => {
    this.setState({
      started: true
    })
  }

  render() {
    const {started, distance} = this.state;

    return (
      <BleContextConsumer>
      {context => (
        <Container center={true}>
        {started ? <LapsCounter poolLength={distance} lapValue={context.state.lapCounterValue} /> : 
          <React.Fragment>
          <Title> Pool Length:</Title>
          <MegaText>
            {this.state.distance} mts
          </MegaText>

          <Slider
            onValueChange={this.handleValueChange}
            step={5} maximumValue={75}
            minimumTrackTintColor='#1AB1BE'
            maximumTrackTintColor='#135359'
            thumbTintColor='#30B5C1' />

          <TouchableHighlight underlayColor="white" onPress={this.toggleStart}>
            <Card backgroundColor={'papayawhip'}>
              <Title>Start Training</Title>
            </Card>
          </TouchableHighlight>
        </React.Fragment>
        }
      </Container>
      )}
      </BleContextConsumer>
    )
  }
}

class LapsCounter extends React.Component{
  constructor(props){
    super(props);
    this.state = {
       laps: 0,
       seconds: 0,
       fullSeconds: 0,
       minutes: 0,
       centSeconds: 0,
       stopWatchIsRunning: true,
       leadChar: '',
       charState: [],
       lapRegister: [],
    }
  }

  componentDidMount(){
    const stopWatch = setInterval(() => {
      this.setState({
        seconds: this.state.seconds += 1,
        fullSeconds: this.state.fullSeconds +=1,
      })

      if(this.state.seconds === 59){
        this.setState({
          minutes: this.state.minutes += 1,
          seconds: 0,
        })
      } 
      // else if(this.state.centSeconds === 90){
      //   this.setState({
      //     seconds: this.state.seconds += 1,
      //     fullSeconds: this.state.fullSeconds +=1,
      //     centSeconds: 0,
      //   })
      // }
    }, 1000);

    this.setState({
      stopWatch,
    })
  }

  componentDidUpdate(prevProps){
    if(prevProps.lapValue !== this.props.lapValue && this.state.stopWatchIsRunning){
      // this.setState({
      //   laps: this.state.laps += 1,
      // })

      this.sampleValue(this.props.lapValue)
    }
  }

  sampleValue = (value) => {
    // HizMvwQABAA
    const leadChar = value.split('')[2];
    const currentChars = [... this.state.charState];

    this.setState({
      leadChar
    })

    if(currentChars.length < 4 && !currentChars.includes(leadChar)){
      currentChars.push(leadChar)
      this.setState({
        charState: currentChars
      })
    } else if(currentChars.length === 4 && !currentChars.includes(leadChar)){
      const lapRegisterCopy = [... this.state.lapRegister];
      
      let duration =  0

      if(this.state.lapRegister.length === 0){
        duration = this.state.fullSeconds;
      } else {
        duration = this.state.fullSeconds - this.state.lapRegister[this.state.lapRegister.length -1];
      }

      lapRegisterCopy.push(duration);

      this.setState({
        laps: this.state.laps += 1,
        lapRegister: lapRegisterCopy,
        charState: [leadChar],
      })
    }
    
  }


  stopTimer = () => {
    clearInterval(this.state.stopWatch);
    this.setState({
      stopWatchIsRunning: false,
    })
  }

  playTimer = () => {
    const stopWatch = setInterval(() => {
      this.setState({
        seconds: this.state.seconds += 1,
      })

      if(this.state.seconds === 59){
        this.setState({
          minutes: this.state.minutes += 1,
          seconds: 0,
        })
      }
    }, 1000);

    this.setState({
      stopWatch,
      stopWatchIsRunning: true,
    })
  }

  storeData = async () => {
    try {

      let sum = await this.state.lapRegister.reduce((previous, current) => current += previous);
      let avg = sum / this.state.lapRegister.length;
      const obj = {
        seconds: this.state.seconds,
        trainingLength: this.state.fullSeconds,
        minutes: this.state.minutes,
        centSeconds: this.state.centSeconds,
        laps: this.state.laps,
        poolLength: this.props.poolLength,
        avg,
      }
      
      await AsyncStorage.setItem(shortid.generate(), JSON.stringify(obj))
      alert('Successfully saved data')
    } catch (e) {
      this.setState({
        e
      })
    }
  }


  render(){
    return (
      <React.Fragment>
        <Title>Timer:</Title>
        <TimerText>  {this.state.minutes} : {this.state.seconds}  </TimerText>
        <Title>Laps:</Title>
        <MegaText>{this.state.laps}</MegaText>
        <Title>Distance:</Title>
        <MegaText>{this.state.laps * (this.props.poolLength * 2 )}</MegaText>

        <TouchableHighlight underlayColor="white" onPress={this.state.stopWatchIsRunning ? this.stopTimer : this.playTimer}>
          <Card>
            <Image
              source={this.state.stopWatchIsRunning ? require('../img/pause.png'): require('../img/play.png')}
            />
          </Card>
        </TouchableHighlight>

        {!this.state.stopWatchIsRunning && 
        <React.Fragment>
          <TouchableHighlight underlayColor="white" onPress={this.storeData}>
          <Card>
            <Image
              source={require('../img/upload.png')}
            />
          </Card>
        </TouchableHighlight>
        </React.Fragment>
        }
      </React.Fragment>
    );
  }
 
}



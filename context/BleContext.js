import React, { Component } from 'react'
import { Alert } from 'react-native';
import  { BleManager } from 'react-native-ble-plx';
var converter = require('hex2dec');


const BleContext = React.createContext();

export default class BleContextProvider extends Component {
  constructor() {
    super();
    
    this.manager = new BleManager();
    this.state = {
      mainDevice: {},
      devices: [],
      info: '',
      connected: false,
    }
  }

  componentWillMount() {
    const subscription = this.manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        this.scan();
        subscription.remove();
      }
    }, true);
  }

  componentDidMount(){
    this.scan
  }

  scan = () => {
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        return
      }

      if (device.name === 'NXP_BLE_OPENSWIM' ) {
        let devicesCopy = [... this.state.devices]
        devicesCopy.push(device)

        this.setState({
          mainDevice: device,
          devices: devicesCopy,
        })

        
        this.manager.stopDeviceScan();
      }
    });
  }


  connect = () => {
    const deviceToConnect = this.state.devices[0];
      this.manager.connectToDevice(deviceToConnect.id).then(connectedDevice => {
          return connectedDevice.discoverAllServicesAndCharacteristics()
      }).then(connectedDevice2 => {
          return connectedDevice2.services()
      }).then(services => {
          var servicesUUIDS = services.map(x=>x.uuid);
          var servicesCharacteristics = [];
          services.map(s => {
            s.characteristics()
            .then(characteristics => {
              servicesCharacteristics.push(characteristics)
            })
            .catch(err => this.setState({err}))
          })
           this.setState({
            services,
            servicesUUIDS,
            servicesCharacteristics,
          })

          
          Alert.alert(
            'You are connected',
            '¿Subscribe to services?',
            [
              {text: 'Subscribe', onPress: () => this.subscribe()},
              {
                text: 'Cancel',
                style: 'cancel',
              }
            ],
            {cancelable: false},
          );

      })

  }

  subscribe = () => {
    let counter = 0
    this.state.servicesCharacteristics[0].map(characteristic => {

      counter += 1
      this.setState({
        info: `looking for notifiable ${counter}`,
      })
      
      if(characteristic.isNotifiable){
        this.setState({
          info: 'found notifiable',
        })
        characteristic.monitor((err, char) => {
          const decValue = converter.hexToDec(char.value)
          this.setState({
            info: decValue,
            lapCounterValue: char.value,
            connected: true,
          })
        })
      }
    })
    Alert.alert(
      'You are Subscribed!',
      'Awesome, now you can start trainings ',
    );
  }



  render() {
    return (
    
      <BleContext.Provider 
        value = {{
          state: this.state,
          subscribe: this.subscribe,
          connect: this.connect,
        }}
      >
        {this.props.children}
      </BleContext.Provider>
    )
  }
}


export const BleContextConsumer = BleContext.Consumer;

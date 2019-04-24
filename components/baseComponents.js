import React from 'react';
import styled from 'styled-components';
import {Platform, StyleSheet, Text, View, Button, ImageBackground} from 'react-native';

export const Title = styled.Text`
  font-size: 30px;
  font-family: "AirbnbCerealApp-Bold";
  color: ${props => props.color || 'black'}
`;

export const Subtitle = styled.Text`
  font-family: "AirbnbCerealApp-Light";
  font-size: 20px;
  color: ${props => props.color || 'black'}
`;

export const Container = styled.View`
  margin-top: ${props => props.fullHeight ? 70 : 0};
  flex: 1;
  padding: 20px;
  justifyContent: ${props => props.center ? 'center' : 'flex-start'};
`;

export const Card = styled.View`
  margin-top: 20px;
  flexDirection: column;
  alignItems: center;
  justifyContent: center;
  borderTopLeftRadius: 20px;
  borderTopRightRadius: 20px;
  borderBottomLeftRadius: 20px;
  borderBottomRightRadius: 20px;
  overflow: hidden;
  height: 150px;
  background-color: ${props => props.backgroundColor || 'white'};
`;

export const TrainingCard = styled.View`
  margin-top: 20px;
  flexDirection: column;
  /* alignItems: center; */
  justifyContent: center;
  borderTopLeftRadius: 20px;
  borderTopRightRadius: 20px;
  borderBottomLeftRadius: 20px;
  borderBottomRightRadius: 20px;
  overflow: hidden;
  height: 150px;
  background-color: ${props => props.backgroundColor || 'white'};
`;

export const MegaText = styled.Text`
 font-size: 100;
  font-family: "AirbnbCerealApp-ExtraBold";
  text-align: center;
  color: ${props => props.color || 'black'}
`;

export const TimerText = styled.Text`
 font-size: 70;
  font-family: "AirbnbCerealApp-ExtraBold";
  text-align: center;
  color: ${props => props.color || 'black'}
`;


export const CardContainer = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

export const DeviceCard = styled.View`
  flex:1;
  flex-direction: row;
`;

export const DeviceStatusImg = styled.View`
  width: 50;
  height: 50;
`;
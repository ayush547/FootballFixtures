import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ImageBackground } from 'react-native';

export default class FootballField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home: props.home,
      away: props.away,
    };
  }

  render() {
    return (

      <View style={styles.container}>
        <ImageBackground
          source={require('../../images/footballfield.png')}
          style={{
            width: null,
            height: null,
            flex: 1,
          }}>
        <View style={{ backgroundColor: 'rgba(52, 52, 52, 0.45)', flex: 1}}>
            <Text style={styles.head}>STARTING XI</Text>
          <View style={{flex: 1,flexDirection:'row-reverse' }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(204, 70, 43, 0)',
                right:20,
              }}>
              <View style={{padding:5}}>
                  <Text style={styles.text}>{this.state.home.name}</Text>
              </View>

              {this.state.home.team.map((data, i) => (
                <View key={'h' + i}>
                  {data.map((d, j) => (
                    <View key={'he' + j} style={{flexDirection:'row'}}>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        {this.state.home.home_team_events.map(
                          (el, z) =>
                            d.name == el.player &&
                            el.type_of_event == 'yellow card' && (
                              <Image
                                key={'hy' + z}
                                source={require('../../images/card-yellow.png')}
                                style={{
                                    width: 12,
                                    height: 15,
                                    position: 'absolute',
                                    left: -12,
                                }}
                              />
                            )
                        )}
                        {this.state.home.home_team_events.map(
                          (el, z) =>
                            d.name == el.player &&
                            el.type_of_event == 'red card' && (
                              <Image
                                key={'hr' + z}
                                source={require('../../images/card-red.png')}
                                style={{
                                  width: 12,
                                  height: 15,
                                  position: 'absolute',
                                  left: -12,
                                }}
                              />
                            )
                        )}
                        <View style={styles.playHome}>
                          <Text style={styles.number}>{d.number}</Text>
                        </View>
                        {this.state.home.home_team_events.map(
                          (el, z) =>
                            d.name == el.player &&
                            el.type_of_event == 'substitution' && (
                              <Image
                                key={'hs' + z}
                                source={require('../../images/refresh.png')}
                                style={{
                                  width: 12,
                                  height: 12,
                                  position: 'absolute',
                                  right: -14,
                                }}
                              />
                            )
                        )}
                      </View>
                      <Text style={styles.text_name}>{d.name}</Text>
                    </View>
                  ))}
                </View>
              ))}
            <View style={{flexDirection:'row',marginTop:5,justifyContent:'flex-start'}}>
              <Text style={styles.text}>COACH: </Text>
              <Text style={{alignContent:'center',color:'#fff'}}>{this.state.home.coach}</Text>
            </View>
            </View>

            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(43, 99, 204, 0)',
                marginLeft:20,
              }}>
            <View style={{padding:5}}>
                  <Text style={styles.text}>{this.state.away.name}</Text>
              </View>
            
              {this.state.away.team.reverse().map((data, i) => (
                <View key={'a' + i}>
                  {data.map((d, j) => (
                    <View key={'ae' + j} style={{flexDirection:'row'}}>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        {this.state.away.away_team_events.map(
                          (el, z) =>
                            d.name == el.player &&
                            el.type_of_event == 'yellow card' && (
                              <Image
                                key={'ay' + z}
                                source={require('../../images/card-yellow.png')}
                                style={{
                                  width: 12,
                                  height: 15,
                                  position: 'absolute',
                                  left: -12,
                                }}
                              />
                            )
                        )}
                        {this.state.away.away_team_events.map(
                          (el, z) =>
                            d.name == el.player &&
                            el.type_of_event == 'red card' && (
                              <Image
                                key={'ar' + z}
                                source={require('../../images/card-red.png')}
                                style={{
                                  width: 12,
                                  height: 15,
                                  position: 'absolute',
                                  left: -12,
                                }}
                              />
                            )
                        )}
                        <View style={styles.playAway}>
                          <Text style={styles.number}>{d.number}</Text>
                        </View>
                        {this.state.away.away_team_events.map(
                          (el, z) =>
                            d.name == el.player &&
                            el.type_of_event == 'substitution' && (
                              <Image
                                key={'as' + z}
                                source={require('../../images/refresh.png')}
                                style={{
                                  width: 12,
                                  height: 12,
                                  position: 'absolute',
                                  right: -14,
                                }}
                              />
                            )
                        )}
                      </View>
                      <Text style={styles.text_name}>{d.name}</Text>
                    </View>
                  ))}
                </View>
              ))}
            <View style={{flexDirection:'row',marginTop:5,justifyContent:'flex-start'}}>
              <Text style={styles.text}>COACH: </Text>
              <Text style={{alignContent:'center',color:'#fff'}}>{this.state.away.coach}</Text>
            </View>
            </View>
          </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    height:'100%'

  },

  head:{
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
    fontSize: 20,
    alignSelf:'center',
  },

 
  rowHome: {
    flex: 1,
  },
  rowAway: {
    flex: 1,
  },
  el: {
    flexGrow: 1,
  },
  playHome: {
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'rgb(3, 169, 244)',
    backgroundColor: 'rgba(3, 169, 244,0.5)',
    marginBottom:2,
  },
  playAway: {
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
   
    borderColor: 'rgb(244, 67, 54)',
    backgroundColor: 'rgba(244, 67, 54,0.5)',
    marginBottom:2,
  },
  text: {
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    fontSize: 15,
    alignContent:'center',
  },
  number: {
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    fontSize: 14,
    alignSelf:'center'
  },
  text_name: {
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    fontSize: 12,
    padding: 5,

  }
});

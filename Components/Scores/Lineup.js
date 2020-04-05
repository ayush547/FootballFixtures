import React from 'react'
import {View,Text,TouchableNativeFeedback,StyleSheet,ScrollView, Dimensions, ImageBackground} from 'react-native'
import {Button,Card,Overlay,Icon} from 'react-native-elements'
import Field from './Field.js'
import { useState } from 'react';


export default function(props) {
    const [overlay,setOverlay] = useState(false)

    const game = props.lineup

    var home_system = game.home_system
    var away_system = game.away_system
    var home_players = game.home_players
    var away_players = game.away_players
    var home_card = game.home_card
    var away_card = game.away_card
    var home_sub = game.home_sub
    var away_sub = game.away_sub
    var home_name = game.home_name
    var away_name = game.away_name
    var home_coach = game.home_coach
    var away_coach = game.away_coach


    var home = {
        name: home_name,
        module: home_system.replace(/ /g,""),
        team: home_players,
        home_team_events: home_card,
        coach: home_coach,
      };
    var away = {
        name: away_name,
        module: away_system.replace(/ /g,""),
        team: away_players,
        away_team_events: away_card,
        coach: away_coach,
      };

    if(game.active==1)
    return(
      <View style={styles.container}>
      <Field home={home} away={away} />
      </View>

    )
    else {
      return(
        <View style={{flex:1}}>
          <Card containerStyle={{backgroundColor:"#353547",elevation:10,justifyContent:'center',flexDirection:'row'}}>
          <Text style={{fontSize:15,fontWeight:'bold',color:"#fff",alignSelf:'center'}}>The line-ups are not yet finalized for this event</Text>
          </Card>
        </View>
      )

    }
    
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    alignSelf:'center',
    width:"100%",
    height:"100%",
    borderColor: '#fff',
    backgroundColor: '#000',
  },
  });
import React from 'react'
import { View,Text, ActivityIndicator,StyleSheet, SafeAreaView,ScrollView,TouchableNativeFeedback} from 'react-native'
import { Avatar,Card, Overlay,Button} from 'react-native-elements';

import { useState } from 'react';
import { useEffect } from 'react'

import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import Lineup from './Lineup.js';

const Tab = createMaterialTopTabNavigator();


function Info() {
    return(
        <View style={{alignItems:'center'}}>
            <Text>Info</Text>
        </View>
    )
}
function Stats() {
    return(
        <View style={{alignItems:'center'}}>
            <Text>Stats</Text>
        </View>
    )
}
function Lineups(props) {
    const[overlay,setOverlay] = useState(true)

    const MyLineup = () =>{
        return <Lineup lineup={props.lineup} />
    }

    return(
        <View>
             {/* <Overlay
                isVisible={overlay}
                windowBackgroundColor="rgba(255, 255, 255, .5)"
                overlayBackgroundColor="#353547"
                onBackdropPress={()=>{setOverlay(false)}}
                width="80%"
                height="80%"
                style={{alignSelf:'center'}}
                >
                <Lineup lineup={props.lineup} />
            </Overlay> */}
        <ScrollView>
            <MyLineup />
        </ScrollView>
        </View>
    )
}
function Head() {
    return(
        <View style={{alignItems:'center'}}>
            <Text>Head 2 Head</Text>
        </View>
    )
}
function Tabs({lineup,overlay}) {
    const LineupComp = ()=>{
       return <Lineups lineup = {lineup} overlay={overlay}/>
    }

    return (
    
      <Tab.Navigator initialRouteName={Info} backBehavior='history'
      tabBarOptions={{
          activeTintColor:'orange',
          inactiveTintColor:'#fff',
          showIcon: true,
          labelStyle: { fontSize: 12 },
          style: { backgroundColor: '#353547'},
          pressColor:'orange',
          indicatorStyle: {
              backgroundColor: 'orange',
          },
        }}>
        <Tab.Screen name="Info" component={Info}  />
        <Tab.Screen name="Line-ups" component={LineupComp} />
        <Tab.Screen name="Stats" component={Stats} />
        <Tab.Screen name="H2H" component={Head} />

      </Tab.Navigator>
   
    );
  }


export default function Statistics () {
    const [result,setResult] = useState({data: {}})
    const [loading,setLoading] = useState(true)
    const [date,setDate] = useState(null)
    const [homegoals,setHomegoals] = useState([])
    const [awaygoals,setAwaygoals] = useState([])
    const [lineup,setLineup] = useState({data: {} })
    const [overlay,setOverlay] = useState(false)

    var team_content=<Text>No line-up info</Text>

   const  lineup_add = (new_lineup) => {
        team_content=new_lineup
        console.log("pressed overlay")
        setOverlay(!overlay)
    }

    useEffect(()=>{
        fetch('https://apiv2.apifootball.com/?action=get_events&from=2019-04-01&to=2019-04-03&match_id=169789&APIkey=9f5e8ea59eb2693002ba52078aafa94badc7abac64b25e8d1756b476e35cce7c', {
            method: 'GET'
         })
         .then((response) => response.json())
         .then((responseJson) => {
            setResult({data: responseJson[0]})
            var game = responseJson[0]
            var date = game.match_date
            var goals = game.goalscorer
            var home=[]
            var away=[]

            setDate(date.replace(/-/g,"/"))

            goals.map( (g,i) => {
                if(g.home_scorer=="")
                away.push({time: g.time,player: g.away_scorer})
                else
                home.push({time: g.time,player: g.home_scorer})
                setHomegoals(home)
                setAwaygoals(away)
            }
            )
            var away_card=[]
            var home_card=[]
            var games = game.cards
            games.map((g,i)=>{
                if(g.away_fault=="")
                home_card.push({id: g.time,type_of_event: g.card,time:"'".concat(g.time),player: g.home_fault})
                else
                away_card.push({id: g.time,type_of_event: g.card,time:"'".concat(g.time),player: g.away_fault})
            });
            
            setLineup({
                data: {
                home_name:  game.match_hometeam_name,
                away_name: game.match_awayteam_name,
                home_coach: (game.lineup.home.coach)[0].lineup_player,
                away_coach: (game.lineup.away.coach)[0].lineup_player,
                home_system: game.match_hometeam_system,
                away_system: game.match_awayteam_system,
                home_players: (game.lineup.home.starting_lineups).map( (g,i)=>{
                    return ([{name: g.lineup_player,number: g.lineup_number}])
                }),
                away_players: (game.lineup.away.starting_lineups).map( (g,i)=>{
                    return ([{name: g.lineup_player,number: g.lineup_number}])
                }),
                home_card: home_card,
                away_card: away_card,
                }
            }
            )
            setLoading(false)

         })
         .catch((error) => {
            console.error(error);
            setResult({response: error})
         });
    },[])


      if(loading==false) {
    return (

        <View style={{height: '100%'}}>
          
         <View style={{marginBottom: 5,flexDirection:'column'}}>
            <Card containerStyle={styles.container}>
                <Avatar rounded size="small" source={{uri: result.data.league_logo}}  containerStyle={{alignSelf:'center'}}   renderPlaceholderContent={ <ActivityIndicator /> }/>
                <Text style={styles.league_title}>{result.data.league_name}</Text>
                <Text style={styles.muted_title}>{date} - {result.data.match_time} (FT)</Text>

                <View style={styles.match}>
                    
                    <View style={{flexDirection:'column',alignItems:'center'}}>

                        <Avatar rounded size="medium" source={{uri:result.data.team_away_badge }} title={result.data.match_awayteam_name} renderPlaceholderContent={<ActivityIndicator /> }  />
                        <Text style={{color:'#fff',fontWeight:'700',fontSize:12,alignSelf:'center'}}>{result.data.match_awayteam_name}</Text>
                        <View>
                            {
                                awaygoals.map((g, i) => {
                                return (
                                    <View key={i} style={{padding:5}}>
                                    <Text style={{alignSelf:'center',color:'#d4d3d7',fontSize:12}}>{g.player} '{g.time}</Text>
                                    </View>
                                );
                                })
                            }
                        </View>
                    </View>

                    <View style={{flexDirection:'column',alignItems:'center'}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.score}>{result.data.match_awayteam_score}</Text>

                            <Text style={{padding: 10,color:'#d4d3d7',fontWeight:'700',fontSize:18,alignSelf:'center'}}>:</Text>

                            <Text style={styles.score}>{result.data.match_hometeam_score}</Text>
                        </View>
                        <Text style={{color:'#d4d3d7',fontWeight:'800',fontSize:10,alignSelf:'center'}}>{result.data.match_round}</Text>
                    </View>

                    <View style={{flexDirection:'column',alignItems:'center'}}>
                    <Avatar rounded size="medium" source={{uri:result.data.team_home_badge }} title={result.data.match_hometeam_name} renderPlaceholderContent={<ActivityIndicator /> }  />
                    <Text style={{color:'#fff',fontWeight:'700',fontSize:12,alignSelf:'center'}}>{result.data.match_hometeam_name}</Text>
                    <View>
                        {
                            homegoals.map((g, i) => {
                            return (
                                <View key={i} style={{padding:5}}>
                                <Text style={{alignSelf:'center',color:'#d4d3d7',fontSize:10}}>{g.player} '{g.time}</Text>
                                </View>
                            );
                            })
                        }
                    </View>
                    </View>
                </View>
            </Card>
        </View>
    
        <Tabs lineup={lineup.data} overlay={lineup_add} />  

        </View>

    )
      }
      else {
          return (
              <View>
                 <ActivityIndicator title="Loading"/>
              </View>

          )
      }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#353547',
        margin: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderColor:'#353547',
    },
    league_title: {
        alignSelf:'center',
        color:'#fff',
        fontSize:15,

    },
    muted_title: {
        alignSelf:'center',
        color:'#d4d3d7',
        fontSize:12,
    },
    match: {
    justifyContent:'space-between',
    flexDirection:'row',
    paddingTop:5
    },
    score: {
        color:'#fff',
        fontWeight:'800',
        fontSize:25,
        alignSelf:'center'

    },

    logo: {

    },
    goals: {

    },

})


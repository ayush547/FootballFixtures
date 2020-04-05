import React from 'react'
import { View,Text, ActivityIndicator,StyleSheet, SafeAreaView,ScrollView,BackHandler,Alert} from 'react-native'
import { Avatar,Card, Overlay,Button,Icon} from 'react-native-elements';

import { useState } from 'react';
import { useEffect } from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import { Header } from 'react-native/Libraries/NewAppScreen';
import MatchInfo from './MatchInfo.js';
import MatchStats from './MatchStats.js';
import Lineup from './Lineup.js';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

const Tab = createMaterialTopTabNavigator();


function Info(props) {

    return(
        <View style={{height:"100%"}}>
            <MatchInfo info = {props.info} />
        </View>
    )
}
function Stats(props) {
    return(
        <View style={{height:"100%"}}>
            <MatchStats stats = {props.stats} />
        </View>
    )
}
function Lineups(props) {
    const[overlay,setOverlay] = useState(false)

    const MyLineup = () =>{
        return <Lineup lineup={props.lineup} />
    }

    return(
        <View>
             <Overlay
                isVisible={overlay}
                windowBackgroundColor="rgba(255, 255, 255, .5)"
                overlayBackgroundColor="#353547"
                onBackdropPress={()=>{setOverlay(false)}}
                width="90%"
                height="90%"
                style={{alignItems:'center'}}
                >
                <Lineup lineup={props.lineup} />
            </Overlay>
        <TouchableNativeFeedback>
        <ScrollView>
            <MyLineup />
        </ScrollView>
        </TouchableNativeFeedback>
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
export function Tabs(props) {
    const LineupComp = ()=>{
       return <Lineups lineup = {props.lineup}  />
    }
    const InfoComp = ()=>{
        return <Info info = {props.info} />
     }
    const StatsComp = ()=>{
        return <Stats stats = {props.stats} />
     }


    return (
    <NavigationContainer independent={true}>
      <Tab.Navigator initialRouteName={Info}  backBehavior='history'
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
        <Tab.Screen name="Info" component={InfoComp}   />
        <Tab.Screen name="Line-ups" component={LineupComp}  />
        <Tab.Screen name="Stats" component={StatsComp} />
        <Tab.Screen name="H2H" component={Head} />

      </Tab.Navigator>
    </NavigationContainer>

    );
  }


export default function Statistics ({navigation,route}) {
    const [match_id,setMatch_id] = useState(route.params.match_id)
    const [result,setResult] = useState({data: null})
    const [loading,setLoading] = useState(true)
    const [status,setStatus] = useState(null)
    const [date,setDate] = useState(null)
    const [homegoals,setHomegoals] = useState([])
    const [awaygoals,setAwaygoals] = useState([])


    const [lineup,setLineup] = useState({data: null })
    const [info,setInfo] = useState({data: null })
    const [match_stats,setMatch_Stats] = useState({data: null})
    const[color,setColor] = useState("white")

    const month = {
        "01":"Jan","02":"Feb","03":"Mar","04":"Apr","05":"May","06":"Jun","07":"Jul","08":"Aug","09":"Sep","10":"Oct","11":"Nov","12":"Dec",
    }


    useEffect(() => {
        const backAction = () => {
            navigation.goBack();
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      });



    useEffect(()=>{
        fetch('https://apiv2.apifootball.com/?action=get_events&from=2000-01-01&to=2020-12-12&match_id=' + match_id +'&APIkey=9f5e8ea59eb2693002ba52078aafa94badc7abac64b25e8d1756b476e35cce7c', {
            method: 'GET'
         })
         .then((response) => response.json())
         .then((responseJson) => {
            var game = responseJson[0]
          
            setResult({data: game})

            var date = game.match_date
            setDate(date.replace(/-/g,"/"))


            if(game.match_status==="Finished") {

            var goals = game.goalscorer
            var home_goal=[]
            var away_goal=[]
            var home_events=[]
            var away_events=[]

           

            goals.map((g,i) => {
                if(g.home_scorer=="") {
                away_goal.push({time: g.time,player: g.away_scorer})
                away_events.push({type:'goal',time:g.time,player:g.away_scorer})
                }
                else{
                home_goal.push({time: g.time,player: g.home_scorer})
                home_events.push({type:'goal',time:g.time,player:g.home_scorer})
                }
            }
            )
            setHomegoals(home_goal)
            setAwaygoals(away_goal)

            var away_card=[]
            var home_card=[]
            var games = game.cards
            games.map((g,i)=>{
                if(g.away_fault=="") {
                home_card.push({id: g.time,type_of_event: g.card,time:"'".concat(g.time),player: g.home_fault})
                home_events.push({type: (g.card).split(" ")[0],time:g.time,player: g.home_fault})
                }
                else{
                away_card.push({id: g.time,type_of_event: g.card,time:"'".concat(g.time),player: g.away_fault})
                away_events.push({type: (g.card).split(" ")[0],time:g.time,player: g.away_fault})
                }
            });
            
            var home_sub = game.substitutions.home
            var away_sub = game.substitutions.away
            home_sub.map((g,i)=>{
                home_events.push({type:'sub',time: g.time,player: (g.substitution).split("|")[1] + " (In)" + "\n" + (g.substitution).split("|")[0] + " (Out)" })
            })
            away_sub.map((g,i)=>{
                away_events.push({type:'sub',time: g.time,player: (g.substitution).split("|")[1] + " (In)" + "\n" + (g.substitution).split("|")[0] + " (Out)" })
            })

            setInfo({
                data:{
                    home_event: home_events,
                    away_event: away_events,
                    match_id: match_id,
                    active:1,
                    home_name: game.match_hometeam_name,
                    away_name: game.match_awayteam_name,
                    home_logo: game.team_home_badge,
                    away_logo: game.team_away_badge,
                }
            })

            setLineup({
                data: {
                    home_name:  game.match_hometeam_name,
                    away_name: game.match_awayteam_name,
                    home_coach: (game.lineup.home.coach)[0].lineup_player,
                    away_coach: (game.lineup.away.coach)[0].lineup_player,
                    home_system: game.match_hometeam_system,
                    away_system: game.match_awayteam_system,
                    home_players: ((game.lineup.home.starting_lineups).map( (g,i)=>{
                        return ([{name: g.lineup_player,number: g.lineup_number}])
                    })).sort(function(a,b){return a[0].name.localeCompare(b[0].name)}),

                    away_players: ((game.lineup.away.starting_lineups).map( (g,i)=>{
                        return ([{name: g.lineup_player,number: g.lineup_number}])
                    })).sort(function(a,b){return a[0].name.localeCompare(b[0].name)}),
                    active:1,
                    home_card: home_card,
                    away_card: away_card,
                    }
            }
            )
            setMatch_Stats({data: {
                stats: game.statistics,
                active:1,
                home_name: game.match_hometeam_name,
                away_name: game.match_awayteam_name,
                home_logo: game.team_home_badge,
                away_logo: game.team_away_badge,
            }})
            setStatus("Finished")
        }
        else  {


             var game_status;   
                 if(game.match_status=="")
                 game_status = "Upcoming"
                 else
                 game_status = game.match_status
     
                 setStatus(game_status)
                 setInfo({
                     data:{
                         home_event: [],
                         away_event: [],
                         match_id: match_id,
                         match_status: game_status,
                         match_date : date,
                         match_time: game.match_time,
                         active:0,
                         home_name: game.match_hometeam_name,
                         away_name: game.match_awayteam_name,
                         home_logo: game.team_home_badge,
                         away_logo: game.team_away_badge,
                     }
                 })
                 setLineup({
                     data: {
                         home_name:  game.match_hometeam_name,
                         away_name: game.match_awayteam_name,
                         home_coach: '',
                         away_coach:  '',
                         home_system: '',
                         away_system: '',
                         home_players: [[]],
                         active:0,
                         away_players: [[]],
                         home_card: [],
                         away_card: [],
                         }
                 }
                 )

                 setMatch_Stats({data: {
                    stats: game.statistics,
                    active:0,
                    home_name: game.match_hometeam_name,
                    away_name: game.match_awayteam_name,
                    home_logo: game.team_home_badge,
                    away_logo: game.team_away_badge,
                }})


        }
            setLoading(false)

         })
         .catch((error) => {
            console.error(error);
            setResult({response: error})

         });

    },[])




 if(loading==false) {

     if(status=="Finished") {
    return (

    <View style={{height: '100%'}}>
          
    <View style={styles.navTitleView}>
    <View style={{flexDirection:'row',marginVertical:5, justifyContent:'space-between'}}>
    <View style={{flexDirection:'row'}}>
    <Avatar rounded size={25} source={{uri: result.data.league_logo}}  containerStyle={{marginLeft:10,marginVertical:5}}   renderPlaceholderContent={ <ActivityIndicator /> }/>
    <Text style={{color:"#fff",fontSize:15,fontWeight:'bold',paddingLeft:10,alignSelf:'center'}}>{(result.data.league_name).toUpperCase()}</Text>
    </View>
    <Text style={{color:"#d4d3d7",fontSize:12,marginRight:10,alignSelf:'center'}}>{date.split("/")[2]} {month[date.split("/")[1]]} - {result.data.match_time}</Text>


    </View>

         <View style={{padding:-20}}>

      <View style={{flexDirection:'row',justifyContent:'space-between'}}>

      <View style={{flexDirection:'row',marginLeft:10}}>

      <Text style={{alignSelf:'center',fontWeight:'bold',color:'#fff'}}>FT</Text>

      <View style={{marginLeft:10,alignSelf:'center'}}>

      <View style={{flexDirection:'row'}}>
      
      <View style={{flexDirection:'row'}}>
      <Avatar rounded size="small"  title="Away" source={{uri:result.data.team_away_badge }} renderPlaceholderContent={<ActivityIndicator /> }  />
      <Text style={{color:'#fff',fontWeight:'700',fontSize:12,alignSelf:'center',paddingLeft:5}}>{result.data.match_awayteam_name}</Text>
      </View>

      </View>

      <View style={{flexDirection:'row'}}>

      <View style={{flexDirection:'row',paddingTop:5}}>
      <Avatar rounded size="small"  title="Home" source={{uri:result.data.team_home_badge }} renderPlaceholderContent={<ActivityIndicator /> }  />
      <Text style={{color:'#fff',fontWeight:'700',fontSize:12,alignSelf:'center',paddingLeft:5}}>{result.data.match_hometeam_name}</Text>
      </View>

      </View>

      </View>
      <View>


      </View>

      </View>

      <View style={{flexDirection:'row'}}>
    <View style={{marginRight:20,alignSelf:'center',textAlign:'center'}}>
      <Text style={{alignSelf:'center',fontWeight:'bold',color:'#fff',fontSize:15,paddingBottom:5}}>{result.data.match_awayteam_score}</Text>
      <Text style={{fontWeight:'bold',color:'#fff',alignSelf:'center',paddingTop:10,fontSize:15}}>{result.data.match_hometeam_score}</Text>
      </View>
      <View style={{alignSelf:'center',marginRight:10}}>
      {/* <Icon  name='ios-star' type='ionicon' size={30} color={color} onPress={()=>{
          setColor((color=='white'? 'orange' : 'white'))
      }} /> */}
      </View>
      </View>
      </View>

      </View>
        </View>
    
        <Tabs lineup={lineup.data} info={info.data} stats={match_stats.data} />  

        </View>

    )
  }
  else {
    return (
<View style={{height:'100%',backgroundColor:'#353547'}} >

    <View>

    <Card containerStyle={styles.container}>

         <Avatar rounded size="small" source={{uri: result.data.league_logo}}  containerStyle={{alignSelf:'center'}}   renderPlaceholderContent={ <ActivityIndicator /> }/>
            <Text style={styles.league_title}>{result.data.league_name}</Text>

        <View style={styles.match}>
                    
                <View style={{flexDirection:'column',alignItems:'center'}}>

                    <Avatar rounded size="medium" source={{uri:result.data.team_away_badge }} title={result.data.match_awayteam_name} renderPlaceholderContent={<ActivityIndicator /> }  />
                    <Text style={{color:'#fff',fontWeight:'700',fontSize:12,alignSelf:'center'}}>{result.data.match_awayteam_name}</Text>
                </View>

                <View style={{flexDirection:'column',alignItems:'center'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={styles.score}>0</Text>

                        <Text style={{padding: 10,color:'#d4d3d7',fontWeight:'700',fontSize:18,alignSelf:'center'}}>:</Text>

                        <Text style={styles.score}>0</Text>
                    </View>
                    <Text style={{color:'#d4d3d7',fontWeight:'800',fontSize:10,alignSelf:'center'}}>{result.data.match_round}</Text>
                    <Text style={{color:'#fff',fontWeight:'bold',fontSize:15,alignSelf:'center'}}>{status}</Text>
                </View>

                <View style={{flexDirection:'column',alignItems:'center'}}>
                <Avatar rounded size="medium" source={{uri:result.data.team_home_badge }} title={result.data.match_hometeam_name} renderPlaceholderContent={<ActivityIndicator /> }  />
                <Text style={{color:'#fff',fontWeight:'700',fontSize:12,alignSelf:'center'}}>{result.data.match_hometeam_name}</Text>
                </View>
            </View>
        </Card>
      </View>
      <Tabs lineup={lineup.data} info={info.data} stats={match_stats.data}    />  
      
      </View>
    );

  }
 }
      else {
          return (
              <View style={{alignItems:'center'}}>
                 <ActivityIndicator title="Loading" size={50}/>
              </View>

          )
      }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#353547',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 15,
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
    navTitleView: {
        height: Header.HEIGHT,
        backgroundColor:'#353547',
        opacity: 1,
      }

})


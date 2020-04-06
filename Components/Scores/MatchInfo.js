import React, { Component,useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
  Dimensions
} from 'react-native';

import Timeline from 'react-native-timeline-flatlist'
import {Avatar,Icon,Card} from 'react-native-elements'
import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { BarChart, Grid } from 'react-native-chart-kit'



export default function MatchInfo(props) {


  const [info,setInfo] = useState(props.info)
  const [predict,setPredict] = useState({data: null})
  const [loading,setLoading] = useState(true)
  const [bar,SetBar] = useState({data: null})

  





  useEffect(()=>{

    fetch('https://apiv2.apifootball.com/?action=get_predictions&from=2000-01-01&to=2020-12-12&match_id=' + props.info.match_id +'&APIkey=9f5e8ea59eb2693002ba52078aafa94badc7abac64b25e8d1756b476e35cce7c', {
        method: 'GET'
     })
     .then((response) => response.json())
     .then((responseJson) => {

       
         var pred = responseJson[0]
         setPredict({data:{
                 aw: pred.prob_AW,
                 hw: pred.prob_HW,
                 draw: pred.prob_D,
         }})

         SetBar({
          labels: [info.home_name,"DRAW",info.away_name],
          datasets: [
            {
              data: [pred.prob_HW,pred.prob_D,pred.prob_AW]
            }
          ]
        })

         setLoading(false)

     })
     .catch((error)=>{
        console.error(error);
     })
    },[predict])


  const home_event = info.home_event
  const away_event = info.away_event
  var data1,data2;
 

  const chartConfig = {
    backgroundGradientFrom: "orange",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "orange",
    fillShadowGradient:"blue",
    fillShadowGradientOpacity:1,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(31, 58, 147, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 4, 
    barPercentage: 1,
    barRadius:0,
  };

  if(info.active==0) {    
  }
  else {

  data1 = home_event.map((g,i)=>{
    if(g.type=='yellow')
    return ({
      time: g.time+"'",
      title: 'Yellow Card',
      description: g.player,
      position: "right",
      icon: require('../../images/card-yellow.png'),
    })
    else if(g.type=='red')
    return ({
      time: g.time+"'",
      title: 'Red Card',
      description: g.player,
      position: "right",
      icon: require('../../images/card-red.png'),
    })
    else if(g.type=='sub')
    return ({
      time: g.time+"'",
      title: 'Substitution',
      description: g.player,
      position: "right",
      icon: require('../../images/refresh.png'),
    })
    else
    return ({
      time: g.time+"'",
      title: 'GOAL',
      description: g.player,
      position: "right",
      icon: require('../../images/soccer.png'),
    })

  })

  data2 = away_event.map((g,i)=>{
    if(g.type=='yellow')
    return ({
      time: g.time+"'",
      title: 'Yellow Card',
      description: g.player,
      position: "left",
      icon: require('../../images/card-yellow.png'),
    })
    else if(g.type=='red')
    return ({
      time: g.time+"'",
      title: 'Red Card',
      description: g.player,
      position: "left",
      icon: require('../../images/card-red.png'),
    })
    else if(g.type=='sub')
    return ({
      time: g.time+"'",
      title: 'Substitution',
      description: g.player,
      position: "left",
      icon: require('../../images/refresh.png'),
    })
    else
    return ({
      time: g.time+"'",
      title: 'GOAL',
      description: g.player,
      position: "left",
      icon: require('../../images/soccer.png'),
    })


  })
  data1 = data1.concat(data2)
  data1 = data1.concat([{time: "0\'", title: 'START', icon: <Icon name='ios-clock' type='ionicon' size={30} />,}])
  data1 = [{time: "90\'", title: 'FULL-TIME', icon: <Icon name='ios-clock' type='ionicon' size={30} />,}].concat(data1)
  data1.push({time: "45\'", title: 'HALF-TIME', icon: <Icon name='ios-clock' type='ionicon' size={30} />,})



  data1.sort(function(a,b){return b.time.localeCompare(a.time)})
}

if(loading==false) {

if(info.active==0) {

    return(
      <View style={styles.container}>

  <View
          style={{
            width: "100%",
            height: "100%",
            alignContent:'center',
            backgroundColor:"#353547",
            flex: 1,
          }}> 
      

  <ScrollView style={styles.list}>

  <Card containerStyle={{backgroundColor:'#353547',elevation:10,shadowColor:"#fff",borderRadius:10,borderColor:"#353547"}}>
    <Text style={styles.title}>MATCH POLLS</Text>
  </Card>
  <BarChart
        style={{
          borderRadius: 20,
          alignSelf:'center',
          elevation:10,
          marginTop:5,
          marginBottom:5,
        }}
        data={bar}
        width={250}
        height={250}
        yAxisLabel="%"
        fromZero={true}
        withInnerLines={false}
        chartConfig={chartConfig}
        verticalLabelRotation={0}
        showBarTops={true}
        />

  </ScrollView>
  </View>

    </View>

    );
  }
  else{

    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../../images/footballfield.png')}
          style={{
            width: null,
            height: null,
            alignContent:'center',
            flex: 1,
          }}>

  <View style={styles.match}>  
      <View style={{flexDirection:'column',alignItems:'center'}}>
        <Avatar rounded size={45} source={{uri: info.away_logo }} renderPlaceholderContent={<ActivityIndicator /> }  />   
        <Text style={{color:'#fff',fontWeight:'700',fontSize:12,alignSelf:'center'}}>{info.away_name}</Text>
      </View>

      <View style={{flexDirection:'column',alignItems:'center'}}>
        <Avatar rounded size={45} source={{uri: info.home_logo }}  renderPlaceholderContent={<ActivityIndicator /> }  />
        <Text style={{color:'#fff',fontWeight:'700',fontSize:12,alignSelf:'center'}}>{info.home_name}</Text>
      </View>   
  </View>

        <Timeline 
          style={styles.list}
          data={data1}
          circleSize={25}
          lineColor="#E8E7E6"
          circleColor='rgba(0,0,0,0)'
          timeContainerStyle={{ marginTop: 0}}
          timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
          descriptionStyle={{color:'#d4d3d7'}}
          options={{
            style:{paddingTop:10}
          }}
          titleStyle={{color: "#fff"}}
          innerCircle={'icon'}
          separator={false}
          detailContainerStyle={{marginBottom: 20, paddingLeft: 10 , backgroundColor: "#353547", color:"#fff", borderRadius: 10, elevation:8, shadowColor:"#353547",
          shadowOffset:{width:2,height: null},}}
          columnFormat='two-column'
        />
        </ImageBackground>
       
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
    height:"100%",
    width:'100%',
    paddingTop:0,
    flex: 1,
    fontFamily: "-apple-system, BlinkMacSystemFont Segoe UI",
    
  },
  list: {
    height:"100%",
    padding:20,
    paddingTop:2,
    backgroundColor:'transparent',
  },
  title:{
    fontSize:20,
    fontWeight: 'bold',
    color:"#fff",
    alignSelf:'center',
  },
  descriptionContainer:{
    flexDirection: 'row',
    paddingRight: 50
  },
  image:{
    width: 50,
    height: 50,
    borderRadius: 25
  },
  textDescription: {
    marginLeft: 10,
    color: 'gray'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    height: '100%',
    width: '100%'
  },

  containercard: {
    backgroundColor:'#353547',
    margin: 0,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },  
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom:1,
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
info_title: {
  color:'#fff',
  fontSize:15,
  fontWeight:'bold',
},
info_sub: {

  color:'#d4d3d7',
  fontSize:15,
},
  match: {
    justifyContent:'space-evenly',
    flexDirection:'row',
    borderColor:'#353547',
    elevation:8,
    shadowColor:"#353547",
    padding: 10,
    marginHorizontal:10,
    borderRadius:10,
},
  score: {
    color:'#fff',
    fontWeight:'bold',
    fontSize:30,
    alignSelf:'center',
},

});
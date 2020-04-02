import React from 'react';
import {View,StyleSheet,Text,Image,FlatList} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';


const StandingsList=(props)=>{
   
     let  keyExtractor = (item, index) => index.toString()
      let renderItem = ({ item }) => {
        let GD=item.overall_league_GF-item.overall_league_GA;
    
        return(
            <ListItem
            title={item.team_name}
            leftAvatar={{
              overlayContainerStyle:styles.box,
                rounded:true,
                size:"small",
              title: item.overall_league_position,
              titleStyle:styles.textnum
            }}
            bottomDivider
            rightElement={
  <View style={{justifyContent:'space-evenly',flexDirection:"row"}}>
  <View style={styles.viewstyle1}><Text>{item.overall_league_payed}</Text></View>
  <View style={styles.viewstyle2}><Text>{item.overall_league_W}</Text></View> 
  <View style={styles.viewstyle1}><Text>{item.overall_league_D}</Text></View>
  <View style={styles.viewstyle2}><Text>{item.overall_league_L}</Text></View>
  <View style={styles.viewstyle1}><Text>{GD}</Text></View>
  <View style={styles.viewstyle2}><Text>{item.overall_league_PTS}</Text></View>
  </View>}
          />);
        }
        
      
        return (
          <FlatList
            keyExtractor={keyExtractor}
            data={props.standingsData}
            renderItem={renderItem}
          />
        );
      
        }
export default StandingsList;
const styles=StyleSheet.create({
    con:{
        backgroundColor:'coral'
    },
    textnum:{
color:'white',

    },
    viewstyle1:{
width:30,
backgroundColor:'#eee',
alignItems:'center',
    },
    
    viewstyle2:{
        width:30,
        backgroundColor:'#fff',
        alignItems:'center'
            },
            box:{
              backgroundColor:'#353547'
          } 
});
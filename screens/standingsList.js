import React from 'react';
import {View,StyleSheet,Text,Image,FlatList} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';


const StandingsList=(props)=>{
   
     let  keyExtractor = (item, index) => index.toString()
      let renderItem = ({ item }) => {
        let GD=item.overall_league_GF-item.overall_league_GA;
    
        return(
            <ListItem
            containerStyle={{backgroundColor:'#48485e'}}
            title={item.team_name}
            titleStyle={{color:'#d4d3d7'}}
            leftAvatar={{
              overlayContainerStyle:styles.box,
                rounded:true,
                size:"small",
              title: item.overall_league_position,
              titleStyle:styles.textetnum
            }}
            bottomDivider
            rightElement={
  <View style={{justifyContent:'space-evenly',flexDirection:"row"}}>
  <View style={styles.viewstyle1}><Text style={styles.textnum}>{item.overall_league_payed}</Text></View>
  <View style={styles.viewstyle2}><Text style={styles.textnum}>{item.overall_league_W}</Text></View> 
  <View style={styles.viewstyle1}><Text style={styles.textnum}>{item.overall_league_D}</Text></View>
  <View style={styles.viewstyle2}><Text style={styles.textnum}>{item.overall_league_L}</Text></View>
  <View style={styles.viewstyle1}><Text style={styles.textnum}>{GD}</Text></View>
  <View style={styles.viewstyle2}><Text style={styles.textnum}>{item.overall_league_PTS}</Text></View>
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
    textnum:{
color:'white',
    },
    textpink:{
      color:'#FF0266'
    },
    viewstyle1:{
width:30,
backgroundColor:'#FF0266',
alignItems:'center',
    },
    
    viewstyle2:{
        width:30,
      
        alignItems:'center'
            },
            box:{
              backgroundColor:'#353547'
          } 
});
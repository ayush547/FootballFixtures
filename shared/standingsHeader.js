import React from 'react';
import {View,StyleSheet,Text,Image,FlatList} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'


const standingsHeader=(props)=>{
  return(
    <ListItem
    containerStyle={styles.cont_style}
      title={props.league_name}
      
      titleStyle={styles.textHead}
     // leftElement={<Text>#</Text>}
     leftAvatar={
         {
            rounded:false,
            size:"small",
          source: props.league_Logo && { uri: props.league_Logo },
          title: props.league_name
         }
     } 
     bottomDivider
      rightElement={
        <View style={{justifyContent:'space-evenly',flexDirection:"row"}}>
        <View style={styles.viewstyle1}><Text style={styles.viewstyle2}>M</Text></View>
        <View style={styles.viewstyle1}><Text style={styles.viewstyle2}>W</Text></View> 
        <View style={styles.viewstyle1}><Text style={styles.viewstyle2}>D</Text></View>
        <View style={styles.viewstyle1}><Text style={styles.viewstyle2}>L</Text></View>
        <View style={styles.viewstyle1}><Text style={styles.viewstyle2}>GD</Text></View>
        <View style={styles.viewstyle1}><Text style={styles.viewstyle2}>PTS</Text></View>
        </View>}
    />);
   }


        const styles=StyleSheet.create({
            textHead:{
                color:'white',
                fontWeight:'bold',
                
                
            },
            cont_style:{
                backgroundColor:'#393952'
            },
            viewstyle1:{
                width:30,
               
                alignItems:'center',
                    },
                    
                    viewstyle2:{
                        width:30,
                        fontSize:15,
                            color:'#d4d3d7',    
                        alignItems:'center'
                            },

        
                          
        });
export default standingsHeader;

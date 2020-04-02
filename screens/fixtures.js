import React,{useState} from 'react';
import { StyleSheet, Text, View,Button,TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DateC from '../screens/dateClassifier';
import AnimatedLoader from 'react-native-animated-loader';
import FixtureList from '../screens/fixtureList';
import {  Icon } from 'react-native-elements'
const fixtures=({route})=>{
    const navigation=useNavigation();
    const {league_id}=route.params;
    const {league_logo}=route.params;
    React.useEffect(() => 
        loadFixtureData(),[]);
       
      const[isplan,setIsPlan]=useState(null);
    const[isloaded,setIsLoaded]=useState(true);
   const[FTdata,setFTData]=useState(null);
   const[errors,setError]=useState(null);
    let checkDatefrom=DateC('Today',0).CheckDate;
    let checkdateto=DateC('add',7).CheckDate;
   
  const APIkey="b7d8284d8678b42387a1f9efad388afb5d9683aa2204c433d9b8638841a91f8a";
  const baseURL="https://apiv2.apifootball.com/?action=get_events&APIkey="+APIkey;
  let url=baseURL+"&from="+checkDatefrom+"&to="+checkdateto+"&league_id="+league_id;
  
 function loadFixtureData (){
     setIsLoaded(false);
let req=new Request(
    url,{
        method:'GET'
    });

 fetch(req)
.then(response=>response.json())
.then(showData)
.catch(handleError)
}
const showData=(data)=>{
    setIsLoaded(true);
    setError(null);
    console.log(data);
    if(data.error==404){setIsPlan(data.message);}
    else{
        setIsPlan(null);
       
        setFTData(data);
    }
    }

const handleError=(err)=>{
    setIsLoaded(true);
setError(err.message);
console.log(errors);
}
return(
    <View>
    {!isloaded&&(
         <AnimatedLoader  
         visible={!isloaded}     
              overlayColor="rgba(255,255,255,0.75)"   
                     animationStyle={styles.lottie}     
                          speed={1}
                          source={require("../Components/lf30_editor_ROJ9dc.json")} />   
    )}
    {errors&&(<Text>{errors}</Text>)}
    {isplan&&(<Text>{isplan}</Text>)}
    {FTdata&&FTdata.length>0&&(
   <View>
   <View >
 <FixtureList matches={FTdata}/>
</View>
<TouchableOpacity style={styles.fab}>
   <Icon
   name='layers'
   type='feather'
   onPress={()=>navigation.navigate('Standings',{leagueID:league_id,league_Logo:league_logo})}
   color='#fff'/>
</TouchableOpacity>
   </View>
   )}
    </View>);
    }
    
export default fixtures;
const styles=StyleSheet.create({
    fab:{
        position:'absolute',
        width:50,
        height:50,
        backgroundColor:'#353547',
        borderRadius:30,
        bottom:10,
        right:10,
        alignItems:'center',
        justifyContent:'center',
    },
    content:{
     color:'white',
     fontSize:25
    },
    lottie: {    width: 100,    height: 100,  }
});
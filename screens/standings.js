import React,{useState} from 'react';
import { StyleSheet, Text, View,Button,TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DateC from '../screens/dateClassifier';
import AnimatedLoader from 'react-native-animated-loader';
import StandingsList from './standingsList';
import StandingsHeader from '../shared/standingsHeader';
const Standings=({route})=>{
    const {leagueID}=route.params;
    const {league_Logo}=route.params;
    
    React.useEffect(() => 
        loadStandingsData(),[]);
       
      const[isplan,setIsPlan]=useState(null);
    const[isloaded,setIsLoaded]=useState(true);
   const[FTdata,setFTData]=useState(null);
   const[errors,setError]=useState(null);
    let checkDatefrom=DateC('Today',0).CheckDate;
    let checkdateto=DateC('add',7).CheckDate;
   
  const APIkey="b7d8284d8678b42387a1f9efad388afb5d9683aa2204c433d9b8638841a91f8a";
  const baseURL="https://apiv2.apifootball.com/?action=get_standings&APIkey="+APIkey;
  let url=baseURL+"&league_id="+leagueID;
  
 function loadStandingsData (){
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
    <View style={{backgroundColor:'#202028',flex:1}}>
    {!isloaded&&(
          <AnimatedLoader  
          visible={!isloaded}     
               overlayColor="rgba(255,255,255,0.75)"   
                      animationStyle={styles.lottie}     
                           speed={1}
                           source={require("../Components/lf30_editor_ROJ9dc.json")} />   
    )}
    {errors&&(<View style={{marginTop:40,alignItems:'center'}}><Text style={{color:'white'}}>{errors}</Text></View>)}
    {isplan&&(<View style={{marginTop:40,alignItems:'center'}}><Text style={{color:'white'}}>{isplan}</Text></View>)}
    {FTdata&&FTdata.length>0&&(
        <View style={{marginHorizontal:6,marginTop:10}}>
<StandingsHeader league_name={FTdata[0].league_name} league_Logo={league_Logo}/>
<View>
<StandingsList standingsData={FTdata}/>
</View>


 </View>
   )}
    </View>);
    }
    
export default Standings;
const styles=StyleSheet.create({
    
    content:{
     color:'white',
     fontSize:25
    },
    lottie: {    width: 100,    height: 100,  } 
});
import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MatchList from '../shared/matchlist';
import AnimatedLoader from 'react-native-animated-loader';

const Live=({param,islive})=>{
    const navigation=useNavigation();
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', e => {
        console.log('Pressed Again!');  
        loadFTData();
        });
        return unsubscribe;
      });
      const[isplan,setIsPlan]=useState(null);
    const[isloaded,setIsLoaded]=useState(true);
   const[FTdata,setFTData]=useState(null);
   const[errors,setError]=useState(null);
    let checkDate=param;
   let liveStatus=islive;
  
  const APIkey="b7d8284d8678b42387a1f9efad388afb5d9683aa2204c433d9b8638841a91f8a";
  const baseURL="https://apiv2.apifootball.com/?action=get_events&APIkey="+APIkey;
  let url='';
  if(liveStatus=='0')
  {url=baseURL+"&from="+checkDate+"&to="+checkDate;}
  else{
      url=baseURL+"&from="+checkDate+"&to="+checkDate+"&match_live=1";
  }
 async function loadFTData (){
     setIsLoaded(false);
let req=new Request(
    url,{
        method:'GET'
    });

await fetch(req)
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
        data.sort(GetSortOrder("league_name"));
        setFTData(data);
    }
    }

    const GetSortOrder=(prop)=> {  
        return function(a, b) {  
            if (a[prop] > b[prop]) {  
                return 1;  
            } else if (a[prop] < b[prop]) {  
                return -1;  
            }  
            return 0;  
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
    {!isplan&&!errors&&FTdata&&FTdata.length>0&&(<View style={{marginHorizontal:6,marginTop:15}}><MatchList Matches={FTdata}/></View>)}
    </View>);
    }
    
export default Live;
const styles=StyleSheet.create({
    lottie: {    width: 100,    height: 100,  }
});
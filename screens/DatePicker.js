import React,{useState} from 'react';
import { StyleSheet, Text,Button, View } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import DateC from '../screens/dateClassifier';
import MatchList from '../shared/matchlist';
const DatePicker = ({navigation}) => {
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', e => {
        console.log('Pressed Again!');  
        showDatePicker();
    
        });
    
        return unsubscribe;
      }, [navigation]);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
   

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = date => {
      console.log("A date has been picked: ", date);
      let d=moment(date).format('YYYY-MM-DD');
     checkDate=d;
  console.log(checkDate);
     hideDatePicker();
     loadFTData();
    };
      
     const[isplan,setIsPlan]=useState(null);
     const[isloaded,setIsLoaded]=useState(true);
    const[FTdata,setFTData]=useState(null);
    const[errors,setError]=useState(null);
     let checkDate=DateC('Today',0).CheckDate;
    let liveStatus='0';
   
   const APIkey="b7d8284d8678b42387a1f9efad388afb5d9683aa2204c433d9b8638841a91f8a";
   const baseURL="https://apiv2.apifootball.com/?action=get_events&APIkey="+APIkey;
   let url='';
   const seturl=()=>{
   
    if(liveStatus=='0')
    {url=baseURL+"&from="+checkDate+"&to="+checkDate;}
    else{
        url=baseURL+"&from="+checkDate+"&to="+checkDate+"&match_live=1";
    }
   }
   
  async function loadFTData (){
      setIsLoaded(false);
 seturl();
      let req=new Request(
     url,{
         method:'GET'
     });
 console.log(url);
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

     
    return (
      <View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
     <View>
     {!isloaded&&(<AnimatedLoader  
     visible={!isloaded}     
          overlayColor="rgba(255,255,255,0.75)"   
                 animationStyle={styles.lottie}     
                      speed={1}
                      source={require("../Components/lf30_editor_ROJ9dc.json")} />  )}
     {errors&&(<Text style={{marginTop:40,alignItems:'center'}}>{errors}</Text>)}
     {isplan&&(<Text style={{marginTop:40,alignItems:'center'}}>{isplan}</Text>)}
     {FTdata&&FTdata.length>0&&(<MatchList Matches={FTdata}/>)}
     </View>
      </View>
    );
  };
  
  export default DatePicker;
  const styles=StyleSheet.create({
    lottie: {    width: 100,    height: 100,  }
});
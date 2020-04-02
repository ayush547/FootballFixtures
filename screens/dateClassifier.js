import React from'react';
import moment from 'moment';
import {View,Text}from 'react-native';

const dateClassifier=(fn,numDays)=>{
    const num=numDays;
    const fnName=fn;
    const currentDate=new Date();
    const today = currentDate;
    let date='';
    let day='';
    let checkDate='';
    if(fnName=='add')
    {
  day = moment(today).add(num,'days').format("ddd").toUpperCase();
   date = moment(today).add(num,'d').format("D MMM").toUpperCase();
   checkDate=moment(today).add(num,'d').format('YYYY-MM-DD');
    
}
    else if(fnName=='sub'){
         day = moment(today).subtract(num,'days').format("ddd").toUpperCase();
         date = moment(today).subtract(num,'d').format("D MMM").toUpperCase();
         checkDate=moment(today).subtract(num,'d').format('YYYY-MM-DD');
    }
    else{
        day='TODAY';
        date=moment(today).format("D MMM").toUpperCase();
        checkDate=moment(today).format('YYYY-MM-DD');
    }
  return(
  {'Cday':day,'Cdate':date,'CheckDate':checkDate}
);
}
export default dateClassifier;
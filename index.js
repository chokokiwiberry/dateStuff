if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 4001 ;
const dateS = require('./models/dateS');


const app = express();

//connection to mongoDB
const URIMongo = process.env.URIMongo


mongoose.connect(URIMongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(port, () => {
    console.log(`Connection made to DB and now listening to port: ${port}`)
  }))
  .catch((error) => console.log(error));

//middleware
app.use(express.static(__dirname + '/public'));

//to parse data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



/**
 * DATE FORMAT saved on db: '2022-05-26 10:54:40'
 */
app.post('/provadata',  async (req, res) => {

    console.log('sono prova data post', req.body)

    const dateS_ = new dateS({
        dateEnd: req.body.dateEnd
      })
    
      try {
        dateS_.save();
      } catch (error) {
        return res.status(500).json({ message: 'error', result: error })
      }
      res.status(200).json({ message: 'ok', result: dateS_ })
    
    })
app.get('/getdates', async (req, res)=>{
    let allDates = []
    let currentday = getDateTime();
    try {
        allDates = await dateS.find();
    }catch (error) {
    return res.status(500).json({ message: 'error', result: error })
    }
    if (allDates){
        for (let i=0; i<allDates.length; i++){
            if (Math.round(calcDiff(allDates[i].dateEnd, currentday) <= 0)){
                //scaduto aggiornare
            } else{
                // tutto ok
            }
       
        }
    }

})

//function that calculates the difference between two dates and it returns the differnce in hours
function calcDiff(date1, date2){
    date1 = new Date(new Date(date1));
    date2 = new Date(new Date(date2));

    var diff = Math.abs(date1.getTime() - date2.getTime()) / 3600000;
    return diff
}

//return the current date with this format: DATE FORMAT saved on db: '2022-05-26 10:54:40'
function getDateTime() {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
         month = '0'+month;
    }
    if(day.toString().length == 1) {
         day = '0'+day;
    }   
    if(hour.toString().length == 1) {
         hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
         minute = '0'+minute;
    }
    if(second.toString().length == 1) {
         second = '0'+second;
    }   
    var dateTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;   
     return dateTime;
}

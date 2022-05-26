function currentDay(){
    var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

  today = yyyy  + '-' + mm + '-' + dd; //ISO Date	"2015-03-25" (The International Standard)
return today
  }

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


function nextDay(myStringDate){
    let next =  new Date(new Date(myStringDate).getTime() + 60 * 60 * 24 * 1000);
    var year    = next.getFullYear();
    var month   = next.getMonth()+1; 
    var day     = next.getDate();
    var hour    = next.getHours();
    var minute  = next.getMinutes();
    var second  = next.getSeconds(); 
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

function datesDiff(date1, date2){
    date1 = new Date(new Date(date1));
    date2 = new Date(new Date(date2));

    var diff = (date1.getTime() - date2.getTime()) / 3600000;
    return diff
}

  var obj;

  class objClass {
      constructor(){}

      //function to post dates on db
      postdates(){
        $.ajax({
            type: "POST",
            url: `/provadata`,
            data: JSON.stringify({ dateEnd: nextDay(getDateTime()) }),
            contentType: 'application/json; charset=utf-8',
            success: function success(answer) {
                console.log('tutto ok', answer)
                if (answer.message === 'ok'){
                    console.log('sono tutto ok', answer.result)
                }
            },
            error: function error() {
              console.log('nope, it didnt work')
            }
      
          });
      }


      currentdayF(){
        if ($('#currentday').innerHTML !== "") {
            $('#currentday').html("")
          }
      
          let tmp = getDateTime();
          $('#currentday').append(`${tmp}`)

      }

      nextDayF(){
        if ($('#nextday').innerHTML !== "") {
            $('#nextday').html("")
          }
          let tmp = getDateTime();
          let nexttmp = nextDay(tmp)
          $('#nextday').append(`${nexttmp}`)
      
      }

      calcDiff(){
        if ($('#diff').innerHTML !== "") {
            $('#diff').html("")
          }
          let tmp = getDateTime();
          let nexttmp = nextDay(tmp)
          let diff = datesDiff(tmp, nexttmp)
          $('#diff').append(`${diff}`)

      }
      calcDiff2(){
        if ($('#diff2').innerHTML !== "") {
            $('#diff2').html("")
          }
          let currentday = getDateTime();
          let expiredate = "2022-05-27 10:36:33"
          let diff = datesDiff(expiredate, currentday)
          console.log(Math.round(diff))
          if (Math.round(diff) <= 0  ){
              alert('scaduto')
          } else{
            $('#diff2').append(`${diff}`)

          }

      }
  }

  

  $(document).ready(function () {
      obj = new objClass();

  })
var cal = {
    months: ['January',
                'February',
                 'March',
                 'April',
                 'May',
                 'June',
                 'July',
                 'August',
                 'September',
                 'October',
                 'November', 
                 'December'],
    weekDays: ['Mon','Tue','Wed','Thurs','Fri','Sat','Sun'],
    totalDaysInMonths: [31,28,31,30,31,30,31,31,30,31,30,31],
    date: new Date(),
    forwardClickState:false,
    backwardClickState:false,
    noClickSate: true,
    today:null,
    presentMonth:null,
    yearValue:null,
    todayIndex:null,
    presentMonthName:null,

    changingMonthName: null,
    changingMonthIndex: null,
    changingYearvalue: null,
    changingMonthLastDay:null,

    firstDayIndex: null,
    lastDayIndex:null,

    firstOperation:null,
    secondoperation:null,
    thirdOperation:null,

    

    init: function(){
        var self=this;
        this.today = this.date.getDate();
        this.presentMonth = this.date.getMonth()
        this.yearValue =this.date.getFullYear();
        this.todayIndex = this.date.getDay();
        this.presentMonthName =this.months[this.presentMonth];

        //psuedo month//

        this.changingMonthIndex = this.presentMonth;
        this.changingYearvalue = this.yearValue;
        this.changingMonthLastDay = this.totalDaysInMonths[this.presentMonth];
        

        $('.all-months').append(this.presentMonthName);
        $('.all-years').append(this.yearValue);
        this.firstOperation = self.poolFirstMonthTable();
        self.getFirst_FirstIndexfromFirstTable();
        self.getFirst_LastIndexfromFirstTable();
        //self.putDataInColumn(11);
        
        $('.current-month').click(function(){
            var monthText = self.currentMonth.apply(self);
            
        });
 
        $('.next-month').click(function(){
         self.nextMonthOnClick.apply(self);
     });
     $('.previous-month').click(function(){
         self.prevMonthOnClick.apply(self);
     });

    },
    valueInArray: function(x,arr){
        return arr.indexOf(x) > -1;
    },

    emptyTableContents : function(){
        $('table tr td').each(function(){
            $(this).empty();
                   })
    },

    //generate First Table Date//

    firstDayOfTheFirstMonthIndex: function(){    //this is generated from todays value
        var presentDayVal = this.today;
        var presentDayValIndex = this.todayIndex;
        var firstDayIndex;
            while(presentDayVal >= 1){
                if(presentDayVal == 1){
                    firstDayIndex = presentDayValIndex;
                }

                else if(presentDayValIndex == 0){
                    firstDayIndex = 0;
                    presentDayValIndex = 6;     
                }
                else{
                    firstDayIndex =presentDayValIndex;
                    presentDayValIndex--;
                   
                }
                presentDayVal--;
            } 
     return firstDayIndex;       
},

generateDataFromfirstDay : function(column){ //autofill first table
    today = 1;
    var firstMonthTotalDays = this.totalDaysInMonths[this.date.getMonth()];
    var sixes = [16,26,36,46,56,66];
    while(today <= firstMonthTotalDays){
        
        if(this.valueInArray(column,sixes)){
            $("td[data-column='"+column+"']").text(today)//append("<span class="+"\"top-corner\""+">"+today+"</span>")//.text(today);
            column = column+4;
            today++; 
        }
        else{
            $("td[data-column='"+column+"']").text(today)//append("<span class="+"\"top-corner\""+">"+today+"</span>")//text(today);
            today++;
            column++;
        }
         
    }      
},

poolFirstMonthTable: function(){
    var i;
    var j;
    var dayIndex =  this.firstDayOfTheFirstMonthIndex();
    var columnNumber;
    var limiters = [6,12,18,24];
        i = 1;
        j = dayIndex;
        columnNumber = Number(String(i)+String(j));
        this.generateDataFromfirstDay(columnNumber);
        
        
},

getFirst_FirstIndexfromFirstTable: function(){
    var tdCount = 0;
    var self = this;
    $('table tr td').each(function(){
      if($(this).text()==1){
            self.firstDayIndex = tdCount;
         }
         if(tdCount == 6){
             tdCount = 0;
         }else{
             tdCount++;
         }
        }) 
        
},

getFirst_LastIndexfromFirstTable: function(){
    var firstMonthTotalDays = this.totalDaysInMonths[this.date.getMonth()];
    var tdCount = 0;
    var finalindex 
    var self = this;
    $('table tr td').each(function(){
      if($(this).text()==firstMonthTotalDays){
            self.lastDayIndex = tdCount
         }
         if(tdCount == 6){
             tdCount = 0;
         }else{
             tdCount++;
         }
        })
       
},

//body operations using first and last indexes//

getMonth_LastDayIndexFromTable: function(){
    var monthtotalDays = this.changingMonthLastDay;
    var tdCount = 0;
    var finalindex 
    var self = this;
    $('table tr td').each(function(){
      if($(this).text()==monthtotalDays){
            self.lastDayIndex = tdCount
         }
         if(tdCount == 6){
             tdCount = 0;
         }else{
             tdCount++;
         }
        })
},

newFirstDayIndexFromLastMonth: function(){
    var nextCalOneIndex;
    var lastIndex = this.lastDayIndex;
     if(lastIndex == 6){
         nextCalOneIndex = 0;
     }else{
         nextCalOneIndex = lastIndex + 1;
     }
     this.firstDayIndex = nextCalOneIndex;
},

getLastDayIndexfromLastMonth: function(){  //module one
    var prevVal;
    var firstIndex = this.firstDayIndex;
     if(firstIndex == 0){
         prevVal = 6;
     }else{
         prevVal = firstIndex - 1;
     }
     this.lastDayIndex = prevVal;
},

getFirstDayIndexFromLast: function(){   //only call this after module one
    var totalDays = this.changingMonthLastDay;
    var index = this.lastDayIndex;

    while(totalDays >1){
        if(index == 0){
            totalDays--;
            index = 6
        }else{
            totalDays--;
            index--;
        }
    }
    this.firstDayIndex=index;
   
},

nextCalMonthGenerator: function(firstDayIndexVal){
        this.emptyTableContents();

        var i;
        var j;
        var columnNumber;
        var limiters = [6,12,18,24];
            i = 1;
            j = firstDayIndexVal;
            columnNumber = Number(String(i)+String(j));
        today = 1;
        var sixes = [16,26,36,46,56,66];
        while(today <= this.changingMonthLastDay){
            if(this.valueInArray(columnNumber,sixes)){
                $("td[data-column='"+columnNumber+"']").text(today);
                columnNumber = columnNumber+4;
                today++; 
            }
            else{
                $("td[data-column='"+columnNumber+"']").text(today);
                today++;
                columnNumber++;
            }
             
        }
},


nextMonthOnClick: function(){
         this.newFirstDayIndexFromLastMonth();
         

         if(this.changingMonthIndex == 11){
             this.changingMonthName = this.months[0];
             
             this.changingMonthLastDay = this.totalDaysInMonths[0];
             this.changingMonthIndex = 0;
             this.changingYearvalue += 1

             $('.all-months').text(this.changingMonthName);
             $('.all-years').text(this.changingYearvalue);

             this.nextCalMonthGenerator(this.firstDayIndex);
             this.getMonth_LastDayIndexFromTable();
             }
            else{
                this.changingMonthIndex++;
                this.changingMonthName = this.months[this.changingMonthIndex]
               
                this.changingMonthLastDay= this.totalDaysInMonths[this.changingMonthIndex];
               $('.all-months').text(this.changingMonthName);
     
               this.nextCalMonthGenerator(this.firstDayIndex);
               this.getMonth_LastDayIndexFromTable();
             }
    },


    prevMonthOnClick: function(){
            this.getLastDayIndexfromLastMonth();


            if(this.changingMonthIndex == 0){
                this.changingMonthName = this.months[11];
                this.changingMonthIndex = 11;
                this.changingMonthLastDay= this.totalDaysInMonths[11];
                this.changingYearvalue -= 1;
                this.getFirstDayIndexFromLast();
              $('.all-months').text(this.changingMonthName);
              $('.all-years').text(this.changingYearvalue);
              this.prevCalendartable(this.firstDayIndex);
           }
           else{
            this.changingMonthIndex--;
            this.changingMonthName = this.months[this.changingMonthIndex]
            this.changingMonthLastDay= this.totalDaysInMonths[this.changingMonthIndex];
            this.getFirstDayIndexFromLast();
          $('.all-months').text(this.changingMonthName);
          this.prevCalendartable(this.firstDayIndex);

        } 
            

    },

    prevCalendartable: function(firstIndex){  
        this.emptyTableContents();
        var columnNumber;
        var limiters = [6,12,18,24];
        var i = 1;
        var j = firstIndex;
        columnNumber = Number(String(i)+String(j));
        today = 1;
        var sixes = [16,26,36,46,56,66];
        while(today <= this.changingMonthLastDay){
            if(this.valueInArray(columnNumber,sixes)){
                $("td[data-column='"+columnNumber+"']").text(today);
                    columnNumber = columnNumber+4;
                    today++; 
                }
                else{
                    $("td[data-column='"+columnNumber+"']").text(today);
                    today++;
                    columnNumber++;
                   }
                    
               }
          
           },

       
           storageFunction: function(){
            if(typeof(Storage) !== "undefined"){
                localStorage.setItem("dec11title","Meeting");
                localStorage.setItem("dec11description","Daily Standup Led By JaamLa");
                localStorage.setItem("dec11time","16:00");
                localStorage.setItem("dec11day","11");
                localStorage.setItem("dec11month","11");
                localStorage.setItem("dec11year","2017");
    
                //***********//
    
                localStorage.setItem("dec31title","Meeting");
                localStorage.setItem("dec31description","Daily Standup Led By JaamLa");
                localStorage.setItem("dec31time","16:00");
                localStorage.setItem("dec31day","31");
                localStorage.setItem("dec31month","11");
                localStorage.setItem("dec11year","2017");
    
                //******//
    
                localStorage.setItem("jan10title","Meeting");
                localStorage.setItem("jan10description","Daily Standup Led By JaamLa");
                localStorage.setItem("jan10time","16:00");
                localStorage.setItem("jan10day","13");
                localStorage.setItem("dec11year","2017");
             }else{
                 alert(" Sorry, your browser does not support Web Storage...")
            
             } 
    
        }
    
};


$(document).ready(function(){
    cal.init();
}); 



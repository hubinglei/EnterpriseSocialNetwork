 function loadDay(target,options){
	  return {data:[
						  [51, 90, 42, 89, 45, 87, 50,33,55,19]
						  ],xlabel:['Day1','Day2','Day3','Day4','Day5','Day6','Day7','Day8','Day9','Day10']}
  }
  function loadWeek(target,options){
	  return {data:[
	                	  [50, 90, 42, 89, 45, 87, 50, 25, 80, 40]
						  ],xlabel:['Week1','Week2','Week3','Week4','Week5','Week6','Week7','Week8','Week9','Week10']}
  }
  function loadMonth(target,options){
	  return {data:[  	  
	                  	  [50, 90, 42, 89, 45, 87, 50, 30, 75, 35]
						  ],xlabel:['Month1','Month2','Month3','Month4','Month5','Month6','Month7','Month8','Month9','Month10']}
  }
  
  function loadDay1(target,options){
	  return {data:[
						  [51, 90, 42, 89, 45, 87, 50,83, 43, 82],
						  [50, 82, 40, 83, 43, 82, 45, 30, 74, 32],
						  [38, 76, 27, 77, 30, 74, 32,50, 82, 40]
						  ],xlabel:['Day1','Day2','Day3','Day4','Day5','Day6','Day7','Day8','Day9','Day10']}
  }
  function loadWeek1(target,options){
	  return {data:[
	                	  [50, 90, 42, 89, 45, 87, 50,50, 90, 42],
	                      [49, 82, 38, 80, 25, 80, 40, 80, 25, 80],
						  [37, 75, 28, 77, 30, 74, 32,37, 75, 28],
						  ],xlabel:['Week1','Week2','Week3','Week4','Week5','Week6','Week7','Week8','Week9','Week10']}
  }
  function loadMonth1(target,options){
	  return {data:[  	  
	                  	  [50, 90, 42, 89, 45, 87, 50,42, 89, 45],   
						  [49, 82, 35, 87, 41, 80, 42,82, 35, 87],
						  [37, 78, 28, 77, 30, 75, 35, 28, 77, 30],
						  ],xlabel:['Month1','Month2','Month3','Month4','Month5','Month6','Month7','Month8','Month9','Month10']}
  }
  
  
  function loadDay2(target,options){
	  return {data:[
						  [51, 90, 42, 89, 45, 87, 50,83, 43, 82],
						  [50, 82, 40, 83, 43, 82, 45, 30, 74, 32]
						  ],xlabel:['Day1','Day2','Day3','Day4','Day5','Day6','Day7','Day8','Day9','Day10']}
  }
  function loadWeek2(target,options){
	  return {data:[
	                	  [50, 90, 42, 89, 45, 87, 50,50, 90, 42],
	                      [49, 82, 38, 80, 25, 80, 40, 80, 25, 80]
						  ],xlabel:['Week1','Week2','Week3','Week4','Week5','Week6','Week7','Week8','Week9','Week10']}
  }
  function loadMonth2(target,options){
	  return {data:[  	  
	                  	  [50, 90, 42, 89, 45, 87, 50,42, 89, 45],   
						  [49, 82, 35, 87, 41, 80, 42,82, 35, 87]
						  ],xlabel:['Month1','Month2','Month3','Month4','Month5','Month6','Month7','Month8','Month9','Month10']}
  }
  
  function loadDayMap(target,options){
	  return {data:[{name:'XJ',value:10},
	                {name:'XZ',value:20},
	                {name:'YN',value:30},
	                {name:'SC',value:50}
	               ],updateTime:'Day'}
}
function loadWeekMap(target,options){
	  return {data:[ {name:'GX',value:60},
	                {name:'GZ',value:70},
	                {name:'NMG',value:80},
	                {name:'HLJ',value:90}],updateTime:'Week'}
}
function loadMonthMap(target,options){
	  return {data:[{name:'XJ',value:10},
	                {name:'XZ',value:20},
	                {name:'YN',value:30},
	                {name:'NMG',value:80}],updateTime:'Month'};
}


 function loadDayPie(target,options){
	  return {data:[
						  ['Heavy Industry', 12],['Retail', 9], ['Light Industry', 14], 
    ['Out of home', 16],['Commuting', 7], ['Orientation', 9]
						  ]}
  }
  function loadWeekPie(target,options){
	  return {data:[
	                	  ['Heavy Industry', 12],['Retail', 9], ['Light Industry', 14], 
    ['Out of home', 16]
						  ]}
  }
  function loadMonthPie(target,options){
	  return {data:[  	  
	                  	  ['Light Industry', 14], 
    ['Out of home', 16],['Commuting', 7], ['Orientation', 9]
						  ]}
  }
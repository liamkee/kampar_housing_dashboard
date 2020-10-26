// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';
//4 and 3 switch
var yh = [18, 13, 8, 11, 3, 17, 2, 17, 15, 19, 7, 6, 7, 1];
var ya = [21, 25, 7, 26, 3, 24, 4, 24, 19, 24, 11, 6, 13, 12];
var yr = [65, 43, 41, 29, 18, 57, 6, 49, 45, 61, 26, 19, 63, 25];
var lbl = ['Water Heater','Car Park','Housekeeping','Air-Cond','Laundry','Washing Machine','Dryer Machine','Kitchen','Wardrobe','Fridge','Sofa','TV','WiFi','Shuttle Van']
// Bar Chart Example
var myRadarChart = {
    type: 'radar',
    data: {
			labels: lbl,
			datasets: [
				{
					label: 'Houses',
					data: yh,
					backgroundColor:['rgba(0, 123, 255, 0.5)'],
					borderColor: ['rgba(0, 123, 255, 0.8)'],
					hidden:false
				},
				{
					label: 'Apartments',
					data: ya,
					backgroundColor:['rgba(40,167,69, 0.5)'],
					borderColor: ['rgba(40,167,69, 0.8)'],
					hidden:false
				},
				{
					label: 'Rooms',
					data: yr,
					backgroundColor:['rgba(218, 17, 61,0.5)'],
					borderColor: ['rgba(218,17,61,0.8)'],
					hidden:false
				}
			]
			
		},
    options: {
		legend:{
			display:true,
			onHover: function(event, legendItem) {
			document.getElementById("myRadarChart").style.cursor = 'pointer';},
		},
		maintainAspectRatio:false,
		scale: {
			angleLines: {
				display: true
				},
			ticks: {
				suggestedMin: 0,
				suggestedMax: 0
				}
			},
		tooltips: {
                enabled: true,
                callbacks: {
                    label: function(tooltipItem, data) {
                        return data.datasets[tooltipItem.datasetIndex].label + ' : ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    }
                }
            }
		}
	};
var ctx = document.getElementById('myRadarChart').getContext('2d');
radarC = new Chart(ctx, myRadarChart);


function getData(dontHide){//0:House,1:Apartment,2:Room
	switch(dontHide){
		case 0:
			radarC.data.datasets[0].hidden=false;
			radarC.data.datasets[1].hidden=true;
			radarC.data.datasets[2].hidden=true;
			radarC.update();
			break;
		case 1:
			radarC.data.datasets[0].hidden=true;
			radarC.data.datasets[1].hidden=false;
			radarC.data.datasets[2].hidden=true;
			radarC.update();
			break;
		case 2:
			radarC.data.datasets[0].hidden=true;
			radarC.data.datasets[1].hidden=true;
			radarC.data.datasets[2].hidden=false;
			radarC.update();
			break;
		case 4:
			radarC.data.datasets[0].hidden=false;
			radarC.data.datasets[1].hidden=false;
			radarC.data.datasets[2].hidden=false;
			radarC.update();	
		}
}
	/*
	if(dontHide===0)
	{
		myRadarChart.data.datasets[0].hidden=false;
		myRadarChart.data.datasets[1].hidden=true;
		myRadarChart.data.datasets[2].hidden=true;
	}
	else if(dontHide===1)
	{
		myRadarChart.data.datasets[0].hidden=true;
		myRadarChart.data.datasets[1].hidden=false;
		myRadarChart.data.datasets[2].hidden=true;
	}
	else(dontHide===2)
	{
		myRadarChart.data.datasets[0].hidden=true;
		myRadarChart.data.datasets[1].hidden=true;
		myRadarChart.data.datasets[2].hidden=false;
	}
	*/
	/*switch(dontHide){
		case 0:
			myRadarChart.data.datasets[0].hidden=false;
			myRadarChart.data.datasets[1].hidden=true;
			myRadarChart.data.datasets[2].hidden=true;
			myRadarChart.update();
			break;
		case 1:
			myRadarChart.data.datasets[0].hidden=true;
			myRadarChart.data.datasets[1].hidden=false;
			myRadarChart.data.datasets[2].hidden=true;
			myRadarChart.update();
			break;
		case 2:
			myRadarChart.data.datasets[0].hidden=true;
			myRadarChart.data.datasets[1].hidden=true;
			myRadarChart.data.datasets[2].hidden=false;
			myRadarChart.update();
			break;
	}*/
	
	/*
	var i;
	for(i=0;i<3;i++){
		if(i===dontHide)
		{
			myRadarChart.data.datasets[i].hidden=false;
		}
		else
		{
			myRadarChart.data.datasets[i].hidden=true;
		}
	}*/

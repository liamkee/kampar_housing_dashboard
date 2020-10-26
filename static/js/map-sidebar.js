function buildLocationList(data) {
  data.features.forEach(function(item,i){
	item.properties.id=i;
	});
  data.features.forEach(function(item, i){
	/**
	 * Create a shortcut for `store.properties`,
	 * which will be used several times below.
	**/
	var prop = item.properties;
	/* Add a new listing section to the sidebar. */
	var listings = document.getElementById('listings');
	var listing = listings.appendChild(document.createElement('div'));
		/* Assign a unique `id` to the listing. */
		listing.id = "listing-" + prop.id;
		/* Assign the `item` class to each listing for styling. */
		listing.className = 'item';
		
	/* Add the link to the individual listing created above. */
	var link = listing.appendChild(document.createElement('a'));
		link.href = '#';
		link.className = 'title';
		link.id = "link-" + prop.id;
		link.innerHTML = prop.region;

	/* Add details to the individual listing. */
	var details = listing.appendChild(document.createElement('div'));
	details.innerHTML = prop.address;
	
	/*link.addEventListener('click', function(e)*/
	link.addEventListener('click', function(e){
		for (var i=0; i < data.features.length; i++) {
			if (this.id === "link-" + data.features[i].properties.id) {
				var clickedListing = data.features[i];
				flyNshow2(clickedListing,i);
				}
			}
		var activeItem = document.getElementsByClassName('active');
		if (activeItem[0]) {
			activeItem[0].classList.remove('active');
		}
		//window.alert(activeItem[0]===undefined);
		if(this.parentNode.classList.contains('active'))
		{
			this.parentNode.classList.remove('active');
		}
		else
		{
			this.parentNode.classList.add('active');
		}
	});
  });
} 
 
var globalFlag=100;
function flyNshow2(currentFeature,x){
	if(globalFlag === x){
		globalFlag=100;
		map.flyTo({
			center: [101.147125, 4.328481],
			//4.328481,101.147125
			zoom: 13.3
		});
		document.getElementById('pd').innerHTML = '<p>Select a region!</p>';
	}
	else{
		globalFlag=x;
		map.flyTo({
		center: currentFeature.geometry.center,
		zoom: 16
		  });
		  document.getElementById('pd').innerHTML = 
		  '<h4>' + 
		  currentFeature.properties.region + 
		  '</h4><p><em>RM ' + 
		  currentFeature.properties.avgHouse + 
		  '/per House</em></p><p><em>RM ' +
		  currentFeature.properties.avgRoom +
		  '/per Room</em></p>';
	}
}

function twickVisibility(a,b,c){
			var visibility = map.getLayoutProperty(a, 'visibility');
			 
			if (visibility === 'visible') {
				map.setLayoutProperty(a, 'visibility', 'none');
				map.setLayoutProperty(b, 'visibility', 'none');
				map.setLayoutProperty(c, 'visibility', 'none');
				this.className = '';
				}
			else {
				this.className = 'active';
				map.setLayoutProperty(a, 'visibility', 'visible');
				map.setLayoutProperty(b, 'visibility', 'visible');
				map.setLayoutProperty(c, 'visibility', 'visible');
				}
}
function twickSingleVisibility(a){
			var visibility = map.getLayoutProperty(a, 'visibility');
			if (visibility === 'visible') {
				map.setLayoutProperty(a, 'visibility', 'none');
				this.className = '';
				} 
			else {
				this.className = 'active';
				map.setLayoutProperty(a, 'visibility', 'visible');
				}
}
var flagForLegend='something';
function legendRange(layerID){
	if (layerID==='avgR'&& flagForLegend!==layerID){
		var layers = ['200-250','251-300','301-350','500+'];
		var colors = ['#FFEDA0', '#FED976', '#FEB24C','#FC4E2A'];
		flagForLegend=layerID;
		defineLegend(layers,colors);
	}
	else if (layerID==='avgH' && flagForLegend!==layerID){
		var layers = ['200-1000','1001-1500','1501-2000','2001-2500','2501-3000','3001-3500','3501+'];
		var colors = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026'];
		flagForLegend=layerID;
		defineLegend(layers,colors);
	}
	else if (layerID==='avgA' && flagForLegend!==layerID){
		var layers = ['0-500','501-1000','1001-1500','1500+'];
		var colors = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C'];
		flagForLegend=layerID;
		defineLegend(layers,colors);
	}
}
function defineLegend(layers,colors){
	//ori range and colorscale
	//var layers = ['0-10', '10-20', '20-50', '50-100', '100-200', '200-500', '500-1000', '1000+'];
	//var colors = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026'];
	document.getElementById('legend').innerHTML='';
	for (i = 0; i < layers.length; i++) {
	  var layer = layers[i];
	  var color = colors[i];
	  
	  var item = document.createElement('div');
	  var key = document.createElement('span');
	  key.className = 'legend-key';
	  key.style.backgroundColor = color;

	  var value = document.createElement('span');
	  value.innerHTML = layer;
	  item.appendChild(key);
	  item.appendChild(value);
	  legend.appendChild(item);
	  
	}
}
function fillPoly(N) {
	if(N==='avgH'){
		map.setPaintProperty('places', 'fill-color', ['get','color1']);	
	}
	if(N==='avgR'){
		map.setPaintProperty('places', 'fill-color', ['get','color2']);
	}
    if(N==='avgA'){
		map.setPaintProperty('places', 'fill-color', ['get','color3']);
	}
} 
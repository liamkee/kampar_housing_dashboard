// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';
var H1 = 'clusters-house';
var H2 = 'cluster-count-house';
var H3 = 'unclustered-point-house';
var A1 = 'clusters-apartment';
var A2 = 'cluster-count-apartment';
var A3 = 'unclustered-point-apartment';
var R1 = 'clusters-room';
var R2 = 'cluster-count-room';
var R3 = 'unclustered-point-room';
var G = 'places';
mapboxgl.accessToken = 'pk.eyJ1IjoibGlhbWtlZSIsImEiOiJjazI0MncxaXoyNWFqM2RxdGM4MXhvZWRzIn0.Pgcj8wp2h176YMtEcfexIw';
	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/outdoors-v11',
		center: [101.147125, 4.328481],
		//4.328481,101.147125
		zoom: 13.3
	});
	var hoveredStateId = null;
	map.on('load', function() {
		map.addSource('places', {
				'type':'geojson',
				'data':polygons
				});
		buildLocationList(polygons);
		map.addSource('housePlot',{
			'type': 'geojson',
			'data': houseData,
			cluster: true,
			clusterMaxZoom:14,
			clusterRadius:50
		});
		map.addSource('apartmentPlot',{
			'type': 'geojson',
			'data': apartmentData,
			cluster: true,
			clusterMaxZoom:14,
			clusterRadius:50
		});
		map.addSource('roomPlot',{
			'type': 'geojson',
			'data': roomData,
			cluster: true,
			clusterMaxZoom:14,
			clusterRadius:50
		});
		map.addLayer({
			'id': 'places',
			'type': 'fill',
			'source': 'places',
			'paint': {
			'fill-color': '#888888',
			'fill-opacity': [
				'case',
				['boolean', ['feature-state', 'clicked'], false],
				1,
				0.8
				]
			},
			'filter': ['==', '$type', 'Polygon']
		});
		 
		map.addLayer({
			'id': 'clusters-house',
			'type': 'circle',
			'source': 'housePlot',
			'filter': ['has', 'point_count'],
			'paint': {
				// Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
				// with three steps to implement three types of circles:
				//   * Blue, 20px circles when point count is less than 100
				//   * Yellow, 30px circles when point count is between 100 and 750
				//   * Pink, 40px circles when point count is greater than or equal to 750
				'circle-color': [
						'step',
						['get', 'point_count'],
						'#51bbd6',
						100,
						'#51bbd6',
						750,
						'#51bbd6'
					],
				'circle-radius': [
						'step',
						['get', 'point_count'],
						15,
						5,
						20,
						10,
						30
						/*20,
						100,
						30,
						750,
						40*/
					]
				}
		});
		map.addLayer({
			'id': 'clusters-apartment',
			'type': 'circle',
			'source': 'apartmentPlot',
			'filter': ['has', 'point_count'],
			'paint': {
				// Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
				// with three steps to implement three types of circles:
				//   * Blue, 20px circles when point count is less than 100
				//   * Yellow, 30px circles when point count is between 100 and 750
				//   * Pink, 40px circles when point count is greater than or equal to 750
				'circle-color': [
						'step',
						['get', 'point_count'],
						'#11da54',
						100,
						'#11da54',
						750,
						'#11da54'
					],
				'circle-radius': [
						'step',
						['get', 'point_count'],
						15,
						5,
						20,
						10,
						30
						/*20,
						100,
						30,
						750,
						40*/
					]
				}
		});
		map.addLayer({
			'id': 'clusters-room',
			'type': 'circle',
			'source': 'roomPlot',
			'filter': ['has', 'point_count'],
			'paint': {
				// Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
				// with three steps to implement three types of circles:
				//   * Blue, 20px circles when point count is less than 100
				//   * Yellow, 30px circles when point count is between 100 and 750
				//   * Pink, 40px circles when point count is greater than or equal to 750
				'circle-color': [
						'step',
						['get', 'point_count'],
						'#da113d',
						100,
						'#da113d',
						750,
						'#da113d'
					],
				'circle-radius': [
						'step',
						['get', 'point_count'],
						15,
						5,
						20,
						10,
						30
						/*20,
						100,
						30,
						750,
						40*/
					]
				}
		});
		map.addLayer({
			id: 'cluster-count-house',
			type: 'symbol',
			source: 'housePlot',
			filter: ['has', 'point_count'],
			layout: {
				'text-field': '{point_count_abbreviated}',
				'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
				'text-size': 12
				}
			});
		map.addLayer({
			id: 'cluster-count-apartment',
			type: 'symbol',
			source: 'apartmentPlot',
			filter: ['has', 'point_count'],
			layout: {
				'text-field': '{point_count_abbreviated}',
				'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
				'text-size': 12
				}
			});
		map.addLayer({
			id: 'cluster-count-room',
			type: 'symbol',
			source: 'roomPlot',
			filter: ['has', 'point_count'],
			layout: {
				'text-field': '{point_count_abbreviated}',
				'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
				'text-size': 12
				}
			});
		map.addLayer({
			id: 'unclustered-point-house',
			type: 'circle',
			source: 'housePlot',
			filter: ['!', ['has', 'point_count']],
			paint: {
				'circle-color': '#11b4da',
				'circle-radius': 5,
				'circle-stroke-width': 1,
				'circle-stroke-color': '#fff'
				}
			});
		map.addLayer({
			id: 'unclustered-point-apartment',
			type: 'circle',
			source: 'apartmentPlot',
			filter: ['!', ['has', 'point_count']],
			paint: {
				'circle-color': '#11da54',
				'circle-radius': 5,
				'circle-stroke-width': 1,
				'circle-stroke-color': '#fff'
				}
			});
		map.addLayer({
			id: 'unclustered-point-room',
			type: 'circle',
			source: 'roomPlot',
			filter: ['!', ['has', 'point_count']],
			paint: {
				'circle-color': '#da113d',
				'circle-radius': 5,
				'circle-stroke-width': 1,
				'circle-stroke-color': '#fff'
				}
			});
		/*Change to onclick listing, opacity=1
		map.on('mousemove', 'places', function(e) {
			window.alert(e);
			if (e.features.length > 0) {
				if (hoveredStateId) {
					map.setFeatureState(
					{ source: 'places', id: hoveredStateId },
					{ clicked: false });
				}
				hoveredStateId = e.features[0].id;
				map.setFeatureState(
					{ source: 'places', id: hoveredStateId },
					{ clicked: true });
			}
		});
			 
			// When the mouse leaves the state-fill layer, update the feature state of the
			// previously hovered feature.
		map.on('mouseleave', 'places', function() {
			if (hoveredStateId) {
				map.setFeatureState(
					{ source: 'places', id: hoveredStateId },
					{ clicked: false });
				}
			hoveredStateId = null;
		});
		*/
		map.on('click', 'clusters-house', function(e) {
			var features = map.queryRenderedFeatures(e.point, {
				layers: ['clusters-house']
				});
			var clusterId = features[0].properties.cluster_id;
			map.getSource('housePlot').getClusterExpansionZoom(
				clusterId,
				function(err, zoom) {
					if (err) return;
					 
					map.easeTo({
						center: features[0].geometry.coordinates,
						zoom: zoom
					});
				}
			);
		});
		map.on('click', 'clusters-apartment', function(e) {
			var features = map.queryRenderedFeatures(e.point, {
				layers: ['clusters-apartment']
				});
			var clusterId = features[0].properties.cluster_id;
			map.getSource('apartmentPlot').getClusterExpansionZoom(
				clusterId,
				function(err, zoom) {
					if (err) return;
					 
					map.easeTo({
						center: features[0].geometry.coordinates,
						zoom: zoom
					});
				}
			);
		});
		map.on('click', 'clusters-room', function(e) {
			var features = map.queryRenderedFeatures(e.point, {
				layers: ['clusters-room']
				});
			var clusterId = features[0].properties.cluster_id;
			map.getSource('roomPlot').getClusterExpansionZoom(
				clusterId,
				function(err, zoom) {
					if (err) return;
					 
					map.easeTo({
						center: features[0].geometry.coordinates,
						zoom: zoom
					});
				}
			);
		});
			
		map.on('mouseenter', 'clusters-house', function() {
			map.getCanvas().style.cursor = 'pointer';
		});
		map.on('mouseleave', 'clusters-house', function() {
			map.getCanvas().style.cursor = '';
		});
		map.on('mouseenter', 'clusters-apartment', function() {
			map.getCanvas().style.cursor = 'pointer';
		});
		map.on('mouseleave', 'clusters-apartment', function() {
			map.getCanvas().style.cursor = '';
		});
		map.on('mouseenter', 'clusters-room', function() {
			map.getCanvas().style.cursor = 'pointer';
		});
		map.on('mouseleave', 'clusters-room', function() {
			map.getCanvas().style.cursor = '';
		});
		
		/*
		var popup = new mapboxgl.Popup({
		closeButton: true,
		closeOnClick: true
		});*/
		/*
		map.on('click', 'places', function(e) {
			//var coordinates = e.features[0].geometry.coordinates.slice();
			//var description = e.features[0].properties.description;
			// Ensure that if the map is zoomed out such that multiple
			// copies of the feature are visible, the popup appears
			// over the copy being pointed to.
			//while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
			//coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
			//}
			
			new mapboxgl.Popup()
				.setLngLat(e.lngLat)
				.setHTML(e.features[0].properties.description)
				.addTo(map);
			});
		*/
		map.on('click', function(e) {
		  var place= map.queryRenderedFeatures(e.point, {
			layers: ['places']
		  });
		  if (place.length > 0) {
			document.getElementById('pd').innerHTML = 
			'<h4>' + 
			place[0].properties.region + 
			'</h4><p><em>RM ' + 
			place[0].properties.avgHouse + 
			'/per House</em></p><p><em>RM ' +
			place[0].properties.avgRoom +
			'/per Room</em></p>';
		  } else {
			document.getElementById('pd').innerHTML = '<p>Select a region!</p>';
		  }
		});
			 
		var genV = document.getElementById('genView');
		genV.style.cursor='pointer';
		genV.onclick = function(e) {
			e.preventDefault();
			e.stopPropagation();
			//twickSingleVisibility(G);
			var hideH = map.getLayoutProperty(H1, 'visibility');
			var hideA = map.getLayoutProperty(A1, 'visibility');
			var hideR = map.getLayoutProperty(R1, 'visibility');
			
			
			if (hideH === 'visible' || hideH===undefined) {
				map.setLayoutProperty(H1, 'visibility', 'none');
				map.setLayoutProperty(H2, 'visibility', 'none');
				map.setLayoutProperty(H3, 'visibility', 'none');
				this.className = '';
				} 
			if (hideA === 'visible' || hideA===undefined) {
				map.setLayoutProperty(A1, 'visibility', 'none');
				map.setLayoutProperty(A2, 'visibility', 'none');
				map.setLayoutProperty(A3, 'visibility', 'none');
				this.className = '';
				} 
			if (hideR === 'visible' || hideR===undefined) {
				map.setLayoutProperty(R1, 'visibility', 'none');
				map.setLayoutProperty(R2, 'visibility', 'none');
				map.setLayoutProperty(R3, 'visibility', 'none');
				this.className = '';
				}
			if (hideH === 'none' && hideA === 'none' && hideR === 'none'){
				twickVisibility(H1,H2,H3);
				twickVisibility(A1,A2,A3);
				twickVisibility(R1,R2,R3);
			}
			getData(4);
		};
		
		var genH = document.getElementById('houseAvg');
		genH.style.cursor='pointer';
		genH.onclick = function(e) {
			e.preventDefault();
			e.stopPropagation();
			legendRange('avgH');
			fillPoly('avgH');
			twickVisibility(H1,H2,H3);
			
			var hideA = map.getLayoutProperty(A1, 'visibility');
			var hideR = map.getLayoutProperty(R1, 'visibility');
			
			if (hideA === 'visible' || hideA===undefined) {
				map.setLayoutProperty(A1, 'visibility', 'none');
				map.setLayoutProperty(A2, 'visibility', 'none');
				map.setLayoutProperty(A3, 'visibility', 'none');
				this.className = '';
				} 
			if (hideR === 'visible' || hideR===undefined) {
				map.setLayoutProperty(R1, 'visibility', 'none');
				map.setLayoutProperty(R2, 'visibility', 'none');
				map.setLayoutProperty(R3, 'visibility', 'none');
				this.className = '';
				}
			getData(0);
		};
		
		var genA = document.getElementById('apartmentAvg');
		genA.style.cursor='pointer';
		genA.onclick = function(e) {
			e.preventDefault();
			e.stopPropagation();
			legendRange('avgA');
			fillPoly('avgA');
			twickVisibility(A1,A2,A3);
			var hideH = map.getLayoutProperty(H1, 'visibility');
			var hideR = map.getLayoutProperty(R1, 'visibility');
			
			if (hideH === 'visible' || hideH===undefined) {
				map.setLayoutProperty(H1, 'visibility', 'none');
				map.setLayoutProperty(H2, 'visibility', 'none');
				map.setLayoutProperty(H3, 'visibility', 'none');
				this.className = '';
				} 
			if (hideR === 'visible' || hideR===undefined) {
				map.setLayoutProperty(R1, 'visibility', 'none');
				map.setLayoutProperty(R2, 'visibility', 'none');
				map.setLayoutProperty(R3, 'visibility', 'none');
				this.className = '';
				}
			getData(1);				
		};
		
		var genR = document.getElementById('roomAvg');
		genR.style.cursor='pointer';
		genR.onclick = function(e){
			e.preventDefault();
			e.stopPropagation();
			legendRange('avgR');
			fillPoly('avgR');
			twickVisibility(R1,R2,R3);
			var hideH = map.getLayoutProperty(H1, 'visibility');
			var hideA = map.getLayoutProperty(A1, 'visibility');
			
			if (hideH === 'visible' || hideH===undefined) {
				map.setLayoutProperty(H1, 'visibility', 'none');
				map.setLayoutProperty(H2, 'visibility', 'none');
				map.setLayoutProperty(H3, 'visibility', 'none');
				this.className = '';
				} 
			if (hideA === 'visible' || hideA===undefined) {
				map.setLayoutProperty(A1, 'visibility', 'none');
				map.setLayoutProperty(A2, 'visibility', 'none');
				map.setLayoutProperty(A3, 'visibility', 'none');
				this.className = '';
				}
			getData(2);
		};
		
	});
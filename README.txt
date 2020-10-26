Due to the migration from Plotly to JS visualisation methods.
The final product of the dashbaord, is not using these files:
1. barmap.py
2. output.py
3. radarmap.py

And these directories
4. templates
5. Database

Instead, the dashboard is generate from:
static
 - index.html
 - css
	> styles.css
 - js
	> apartmentData.js
	> chart-area-demo.js
	> chart-bar-demo.js
	> houseData.js
	> map-sidebar.js
	> polygons.js
	> roomData.js

This file is to generate apartmentData.js , houseData.js , and roomData.js:
 - autoInsertion
	> GeoJSON Automate.ipynb

This files is to find the latitude and longitude given the property name:
 - cleanning
	> find_lat-log.ipynb  //generated in FYP1 for web scrapped data
	> surv_findLatLng.ipynb   //generated in FYP2 for survey data

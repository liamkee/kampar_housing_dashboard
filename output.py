import pandas as pd
import plotly.graph_objects as go
#import googlemaps
import json
import plotly


#####Actual Usage
def callMap():
    mapbox_access_token = 'pk.eyJ1IjoibGlhbWtlZSIsImEiOiJjazI0MncxaXoyNWFqM2RxdGM4MXhvZWRzIn0.Pgcj8wp2h176YMtEcfexIw'
    return getMap(mapbox_access_token)
#####/
    ###/ FIND LAT LNG 
    #Data = pd.read_csv("./scrapper/Data.csv")
    #gmaps_key = googlemaps.Client(key = 'AIzaSyDrMt8ozUAbp594j5BaZm_1tRnPMUR8Dhk')
    #Data['lat']=None
    #Data['lng']=None
    #for i in range(0,len(Data),1):
    #    geocode_result = gmaps_key.geocode(Data.iat[i,0])
    #    try:
    #        lat = geocode_result[0]["geometry"]["location"]["lat"]
    #        lng = geocode_result[0]["geometry"]["location"]["lng"]
    #        Data.iat[i,Data.columns.get_loc("lat")] = lat
    #        Data.iat[i,Data.columns.get_loc("lng")] = lng
    #    except:
    #        lat = None
    #        lng = None
    #Data.to_csv('./scrapper/Data.csv',index=False)/

###scatter plot on map using mapbox###
def getMap(token):
    df=pd.read_csv("./scrapper/Data_10022020.csv")
    Spot = pd.read_csv("./scrapper/Spot.csv")
    df_houses=df[df.Category.isin(['Houses'])]
    df_rooms=df[df.Category.isin(['Rooms'])]
    df_apartments=df[df.Category.isin(['Apartments'])]
    lat = df['lat']
    lon = df['lng']
    
    symbol_template = go.layout.Template()
    ####This is for Rooms####
    fig = go.FigureWidget()
    fig.add_trace(
        go.Scattermapbox(
        lat=df_rooms['lat'],
        lon=df_rooms['lng'],
        mode='markers',
        #symbol=Data['Category'],
        #marker=go.scattermapbox.Marker(symbol=1),
        marker=dict(
           size=[round(x) for x in df_rooms['Renting_price']/30],
           
           #showscale=True,
           #color=df_rooms['Renting_price'],
           #colorbar=dict(x=1.0,
           #              #location='bottom',
           #              title=dict(text="RP",font=dict(size=18))),
           #colorscale=[[0, 'pink'],[1, 'magenta']],
           #cmin=df_rooms['Renting_price'].min(),cmax=df_rooms['Renting_price'].max(),
        ),
        name="Rooms",
        #legendgroup=Data['Category'],
        text=df_rooms['Property_name']+['<br>RM']+df_rooms['Renting_price'].apply(str), 
        hoverinfo='text'
        ))
    ####This is for Aparment####
    fig.add_trace(
        go.Scattermapbox(
        lat=df_apartments['lat'],
        lon=df_apartments['lng'],
        mode='markers',
        #symbol=Data['Category'],
        marker=go.scattermapbox.Marker(
            size=[round(x) for x in df_apartments['Renting_price']/30]
       #     showscale=True,
       #     color=df_apartments['Renting_price'],
       #     colorbar=dict(x=1.1,
       #                   #location='bottom',
       #                   title=dict(text="AP",font=dict(size=18))),
       #     colorscale=[[0, 'lightcoral'],[1, 'darkred']],
       #     cmin=df_apartments['Renting_price'].min(),cmax=df_apartments['Renting_price'].max()
        ),
        name="Apartments",
        #legendgroup=Data['Category'],
        text=df_apartments['Property_name']+['<br>RM']+df_apartments['Renting_price'].apply(str), 
        hoverinfo='text'
        ))
    ####This is for Houses####
    fig.add_trace(
        go.Scattermapbox(
        lat=df_houses['lat'],
        lon=df_houses['lng'],
        mode='markers',
        #symbol=Data['Category'],
        marker=go.scattermapbox.Marker(
            size=[round(x) for x in df_houses['Renting_price']/30],
        #    showscale=True,
        #    color=df_houses['Renting_price'],
        #    colorbar=dict(x=1.2,
        #                  #location='bottom',
        #                  title=dict(text="HP",font=dict(size=18))),
        #    colorscale=[[0, 'lightsalmon'],[1, 'red']],
        #    cmin=df_houses['Renting_price'].min(),cmax=df_houses['Renting_price'].max()
        ),
        #remove this if possible to change symbols
        name="Houses",
        #legendgroup=Data['Category'],
        text=df_houses['Property_name']+['<br>RM']+df_houses['Renting_price'].apply(str),
        #add this after changing symbols
        hoverinfo='text'
    ))
    ####This is for Hot Spot####
    fig.add_trace(
        go.Scattermapbox(
        lat=Spot['lat'],
        lon=Spot['lon'],
        mode='markers',
        #marker=go.scattermapbox.Marker()
        marker=dict(size=9,color='red',symbol="fire-station"),
        name="Hot Spot",
        showlegend=False,
        text=Spot['SpotName']))
    fig.update_layout(
        title=dict(
            text="Kampar Housing Market in the year of 2020",
            font=dict(
                size=30
            )
        ),
        template=symbol_template,
        showlegend=True,
        legend=dict(x=0.04, y=0.01
                    ,itemclick= 'toggleothers'
                    ),
        autosize=True,
        hovermode='closest',
        width=680,
        height=648,
        margin=dict(
            l=0,
            r=0,
            b=0,
            t=0,
            pad=0
            ),
        mapbox=go.layout.Mapbox(
            accesstoken=token,
            bearing=0,
            center=go.layout.mapbox.Center(lat=4.326529,lon=101.139952),
            pitch=0,
            zoom=13.4
        ),
        #legend_orientation="h",
    )
    graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON,lat.tolist(),lon.tolist()
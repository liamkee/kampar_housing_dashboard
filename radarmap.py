import plotly.graph_objects as go
import pandas as pd
import numpy as np
import json
import plotly


    
def getradar():
    df = pd.read_csv('./scrapper/Data_10022020.csv')
    df = df.replace('None',np.nan)
    
    df_houses=df[df.Category.isin(['Houses'])]
    df_rooms=df[df.Category.isin(['Rooms'])]
    df_apartments=df[df.Category.isin(['Apartments'])]
    
    
    
    x_axis = df.columns.values.tolist()[10:26]
    categories = x_axis
    cnum = lambda y:sum(y)
    def findAmt(PType):
        NList=[]
        for i in x_axis:
            NList.append(cnum(PType[i]))
        return NList
    
    
    fig = go.Figure()
    
    fig.add_trace(go.Scatterpolar(
          r=findAmt(df_apartments),
          theta=categories,
          fill='toself',
          name='Apartments'
    ))
    
    fig.add_trace(go.Scatterpolar(
          r=findAmt(df_rooms),
          theta=categories,
          fill='toself',
          name='Rooms'
    ))
    
    fig.add_trace(go.Scatterpolar(
          r=findAmt(df_houses),
          theta=categories,
          fill='toself',
          name='Houses'
    ))
    fig.update_layout(
      width=530,
      height=324,
      margin=dict(
            l=50,
            r=0,
            b=30,
            t=30,
            pad=0
            ),
      polar=dict(
        radialaxis=dict(
          visible=True,
          range=[0,14]
        )),
      showlegend=True,
      legend=dict(x=-0.04,y=-0.2
          ,itemclick='toggleothers')
    )
    
    graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON
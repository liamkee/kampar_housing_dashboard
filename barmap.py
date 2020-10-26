import pandas as pd
import numpy as np
import json
import plotly
import plotly.graph_objects as go
df = pd.read_csv('./scrapper/Data_10022020.csv')
df = df.replace('None',np.nan)
df_houses=df[df.Category.isin(['Houses'])]
df_rooms=df[df.Category.isin(['Rooms'])]
df_apartments=df[df.Category.isin(['Apartments'])]

def bar_main():
    x_axis = df.columns.values.tolist()[10:26]
    cnum = lambda y:sum(y)
    
    #to find the amount of each attribute
    def findAmt(PType):
        NList=[]
        for i in x_axis:
            NList.append(cnum(PType[i]))
        return NList
    
    ##for overall view
    fig = go.Figure([go.Bar(x=x_axis, y=findAmt(df))])
    fig.update_layout(
      width=530,
      height=324,
      margin=dict(
            l=0,
            r=0,
            b=20,
            t=0,
            pad=0
            ),
    )
    graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON

def bar_houses():
    x_axis = df.columns.values.tolist()[10:26]
    cnum = lambda y:sum(y)
    
    #to find the amount of each attribute
    def findAmt(PType):
        NList=[]
        for i in x_axis:
            NList.append(cnum(PType[i]))
        return NList
    
    ##for overall view
    fig = go.Figure([go.Bar(x=x_axis, y=findAmt(df_houses))])

    graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON
def bar_rooms():
    x_axis = df.columns.values.tolist()[10:26]
    cnum = lambda y:sum(y)
    
    #to find the amount of each attribute
    def findAmt(PType):
        NList=[]
        for i in x_axis:
            NList.append(cnum(PType[i]))
        return NList
    
    ##for overall view
    fig = go.Figure([go.Bar(x=x_axis, y=findAmt(df_rooms))])

    graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON
def bar_apartments():
    x_axis = df.columns.values.tolist()[10:26]
    cnum = lambda y:sum(y)
    
    #to find the amount of each attribute
    def findAmt(PType):
        NList=[]
        for i in x_axis:
            NList.append(cnum(PType[i]))
        return NList
    
    ##for overall view
    fig = go.Figure([go.Bar(x=x_axis, y=findAmt(df_apartments))])
   
    graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON
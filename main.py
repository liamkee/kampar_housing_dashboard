# -*- coding: utf-8 -*-
from flask import Flask, render_template, g
#import sqlite3
#import output as opt
#import radarmap as rdm
#import barmap as bmp

app = Flask(__name__,static_url_path="/static",static_folder='C:/FYP/main/static')
token = 'pk.eyJ1IjoibGlhbWtlZSIsImEiOiJjazI0MncxaXoyNWFqM2RxdGM4MXhvZWRzIn0.Pgcj8wp2h176YMtEcfexIw'

@app.route("/")
def output():
    return app.send_static_file('index.html')
#def output():
    #app.config.from_mapping(
    #        c = get_db().cursor()
    #)
    #map1,lat,lon = opt.callMap()
    #map2 = rdm.getradar()
    #map3 = bmp.bar_main()
    
    #return render_template('index.html')
    #,map1=map1,map2=map2,map3=map3,lat=lat,lon=lon,token=token)

#creating a database for custom features
#DATABASE = './Database/database.db'


#def get_db():
#    db = getattr(g, '_database', None)
#    if db is None:
#        db = g._database = sqlite3.connect(DATABASE)
#        dataset = pd.read_csv("Data.csv")
#        dataset.to_sql(name = 'housDetail',con=db,if_exists='replace')
#    return db

#@app.teardown_appcontext
#def close_connection(exception):
#    db = getattr(g, '_database', None)
#    if db is not None:
#        db.close()

#creating a database
    
if __name__ == "__main__":
    app.run()

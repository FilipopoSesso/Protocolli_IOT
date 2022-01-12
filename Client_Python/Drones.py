import Package as pk

def getDrone():
    lat=round(45+pk.ran.randint(516400146, 630304598)/1000000000,4)
    lon=round(11+pk.ran.randint(224464416, 341194152)/1000000000,4)
    drone={
            "drone":"test",
            "speed":pk.ran.randint(0,100),
            "altitude":pk.ran.randint(0,1000), 
            "battery":pk.ran.randint(0,100),
            "position":{
                "lat":lat,
                "lon":lon
                }
        }
    
    return drone
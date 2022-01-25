
import Package as pk

#generazione dei dati del drone, vengono simulati e sensori
def getDrone():
    lat=round(45+pk.ran.randint(516400146, 630304598)/1000000000,4)
    lon=round(11+pk.ran.randint(224464416, 341194152)/1000000000,4)
    model=[
                "Potensic Drone T35",
                "Potensic Drone T25",
                "DJI Mavic 2 Pro",
                "DJI Mavic Air",
                "DJI Phantom 4 pro",
                "DJI Mavic Pro",
                "DJI Phantom 4",
                "Parrot ANAFI",
                "DJI Mavic Pro Platinum",
                "DJI SPARK COMBO"
            ]
    drone={
            "drone":"test",
            "model":model[pk.ran.randint(0,len(model)-1)],
            "speed":pk.ran.randint(0,100),
            "altitude":pk.ran.randint(0,1000), 
            "battery":pk.ran.randint(0,100),
            "position":{
                "lat":lat,
                "lon":lon
                }
        }
    
    return drone
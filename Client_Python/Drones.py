import Package as pk

def getDrone():
    drone={
            "drone":"test",
            "speed":pk.ran.randint(0,100),
            "altitude":pk.ran.randint(0,1000), 
            "battery":pk.ran.randint(0,100),
            "position":{
                "lat":pk.ran.randint(516400146, 630304598),
                "lon":pk.ran.randint(224464416, 341194152)
                }
        }
    
    return drone
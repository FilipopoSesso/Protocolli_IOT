import Package as pk

def Send(data):
    #base_url = f'"http://10.30.134.11:3000/v1/drones"'

    base_url = f'"http://127.0.0.1:5000/v1/drones"'

    req = pk.rq.post(base_url, data=data)

    if req.status_code == 200:
        print("Invio Dati....")
    elif req.status_code == 400:
        print("Errore Client....")
    elif req.status_code == 404:
        print("Errore Server...")


if __name__=="__main__":
    while True:
        data={
            "speed":pk.ran.randint(0,100),
            "altitude":pk.ran.randint(0,1000), 
            "battery":pk.ran.randint(0,100),
            "position":{
                "lat":pk.ran.randint(516400146, 630304598),
                "lon":pk.ran.randint(224464416, 341194152)
                }
            }
        Send(data)
from time import time
import Package as pk

LAST_DRONE_DATA=dict()
TIMER=180

def statusCode(code):
    if code == (200 or 201):
        print("Invio Dati....")
    elif code == 400:
        print("Errore Client....")
    elif code == 404:
        print("Errore Server...")

def doPost(url,data):
    req = pk.rq.post(url, data=pk.json.dumps(data), headers={'content-type':'application/json'})
    statusCode(req.status_code)
    print(req.json())

def doGet(url):
    req = pk.rq.get(url)
    statusCode(req.status_code)
    return pk.json.loads(req.content)

def createDrone():
    numDornes=pk.ran.randint(0,10)
    
    modelList=[
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
    
    count=1
    while numDornes>0:
        data={
                "id":f"drone{count}",
                "model":modelList[pk.ran.randint(0,9)]
            }
        doPost("http://10.30.134.11:3000/v1/drones/new",data)
        numDornes-=1
        count+=1
        
def sendSensors():
    data={
            "drone":1,
            "speed":pk.ran.randint(0,100),
            "altitude":pk.ran.randint(0,1000), 
            "battery":pk.ran.randint(0,100),
            "position":{
                "lat":pk.ran.randint(516400146, 630304598),
                "lon":pk.ran.randint(224464416, 341194152)
                }
        }
    LAST_DRONE_DATA=data
    doPost("http://10.30.134.11:3000/v1/drones/status",data)

def changeStatus():
    name='test'
    drone=doGet(f"http://10.30.134.11:3000/v1/drones/{name}/status")
    print(drone)
    drone['state']=not drone['state']
    print(drone)

def getDrones():
    print(doGet("http://10.30.134.11:3000/v1/drones"))

if __name__=="__main__":
    #createDrone()
    # sendSensors()
    #getDrones()
    #changeStatus()
    
    #frequenza di invio, mai uguale, invio la prima volta poi controllo i dati e se sono uguali mando con una frequanza più bassa.
    #polling
    
    
    pk.schedule.every(TIMER).seconds.do(sendSensors)
    while True:
        pk.schedule.run_pending()
        pk.time.sleep(1)
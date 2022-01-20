from http import client
import Package as pk
import Drones

#wildcard
#v1/drones/droneName/data → return dataByName
#v1/drones/droneName/data/sensor → return specificSensor
#v1/drones/all → return droneList

BROKER = 'test.mosquitto.org'
PORT = 1883
TOPIC,MSG=range(2)
TIMER=3

# topic = "v1/drones/droneName/data/sensor"
# generate client ID with pub prefix randomly
client_id = f'python-mqtt-{pk.ran.randint(0, 1000)}'

#connessione al broker
def connect_mqtt():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = pk.mqtt.Client(client_id)
    client.username_pw_set('username', 'password')
    client.on_connect = on_connect
    client.connect(BROKER, PORT, keepalive=60)
    client.will_set("v1/",payload='OFF', qos=2, retain=True)
    
    return client

#creazione del CLIENT con cui effettuare operazioni di lettura/scrittura
CLIENT=connect_mqtt()

def doPolling():
    #ricezione messaggi
    CLIENT.loop_start()
    
    #invio messaggi
    pk.schedule.every(TIMER).seconds.do(sendSensors)
    while True:
        pk.schedule.run_pending()
        pk.time.sleep(1)

#invio dei messaggi    
def publish(client):
    #while True:
    pk.time.sleep(1)
    msg = f"messages: {MSG}"
    result = client.publish(TOPIC, MSG)
    # result: [0, 1]
    status = result[0]
    if status == 0:
        print(f"Send {msg} to topic {TOPIC}")
    else:
        print(f"Failed to send message to topic {TOPIC}")

#subscription verso un topic
def subscribe(client: pk.mqtt):
    def on_message(client, userdata, m):
        print(f"Received `{m.payload.decode('utf-8')}` from `{m.topic}` topic")

    CLIENT.subscribe('v1/drones/+/currentposition', qos=0)
    client.on_message = on_message

#ottengo i messaggi che avvivano dai topic ai quali sono iscritto
def getMessage():
    subscribe(CLIENT)

#invio messaggi nei vari topic
def sendMessage(topic, msg):
    global TOPIC
    global MSG
    TOPIC=topic
    MSG=msg
    #client.loop_start()
    publish(CLIENT)


def sendSensors():
    drone=Drones.getDrone()
    name=drone["drone"]
    
    #Implemetare un sistema di coda attraverso un dizionario in locale(dentro il drone)
    #Quando la connessione con il broker viene meno inizio a salvare i messaggi in una lista
    #Ad ogni polling controllo la connessione e se ad una certo punto si stabilisce prima svuoto la coda e poi invio il nuovo messaggio
    
    #pk.os.system('clear')
    sendMessage(f'v1/drones/{name}/data/all', str(drone).replace("'",'"'))
    # sendMessage(f'v1/drones/{name}/data/speed', drone["speed"])
    # sendMessage(f'v1/drones/{name}/data/altitude', drone["altitude"])
    # sendMessage(f'v1/drones/{name}/data/battery', drone["battery"])
    # sendMessage(f'v1/drones/{name}/data/position', f'lat:{drone["position"]["lat"]}, lon:{drone["position"]["lon"]}')
    # sendMessage(f'v1/drones/{name}/data/position/lat', drone["position"]["lat"])
    # sendMessage(f'v1/drones/{name}/data/position/lon', drone["position"]["lon"])
    
    #riottengo la posizione del drone → visualizzazione nella mappa
    #getMessage()
    
        
        
    
    
    
    
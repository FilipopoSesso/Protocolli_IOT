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

#creazione di un client ID randomico
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

#polling invio messaggi
def doPolling():
    CLIENT.loop_start()
    pk.schedule.every(TIMER).seconds.do(sendSensors)
    while True:
        pk.schedule.run_pending()
        pk.time.sleep(1)

#invio dei messaggi    
def publish(client):
    pk.time.sleep(1)
    msg = f"messages: {MSG}"
    result = client.publish(TOPIC, MSG)
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
    publish(CLIENT)

def sendSensors():
    drone=Drones.getDrone()
    name=drone["drone"]
        
    sendMessage(f'v1/drones/{name}/data/all', str(drone).replace("'",'"'))
    # sendMessage(f'v1/drones/{name}/data/speed', drone["speed"])
    # sendMessage(f'v1/drones/{name}/data/altitude', drone["altitude"])
    # sendMessage(f'v1/drones/{name}/data/battery', drone["battery"])
    # sendMessage(f'v1/drones/{name}/data/position', f'lat:{drone["position"]["lat"]}, lon:{drone["position"]["lon"]}')
    # sendMessage(f'v1/drones/{name}/data/position/lat', drone["position"]["lat"])
    # sendMessage(f'v1/drones/{name}/data/position/lon', drone["position"]["lon"])
        
        
    
    
    
    
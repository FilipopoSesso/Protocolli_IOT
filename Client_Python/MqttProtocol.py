import Package as pk
import Drones

#wildcard
#v1/drones/droneName/data → return dataByName
#v1/drones/droneName/data/sensor → return specificSensor
#v1/drones/all → return droneList

BROKER = 'test.mosquitto.org'
PORT = 1883
TOPIC,MSG=range(2)
TIMER=10

def doPolling():
    pk.schedule.every(TIMER).seconds.do(sendSensors)
    while True:
        pk.schedule.run_pending()
        pk.time.sleep(1)
    


# topic = "v1/drones/droneName/data/sensor"
# generate client ID with pub prefix randomly
client_id = f'python-mqtt-{pk.ran.randint(0, 1000)}'

def connect_mqtt():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = pk.mqtt.Client(client_id)
    client.username_pw_set('username', 'password')
    client.on_connect = on_connect
    client.connect(BROKER, PORT)
    return client


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

# def subscribe(client: pk.mqtt):
#     def on_message(client, userdata, msg):
#         print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")

#     client.subscribe(topic)
#     client.on_message = on_message

def sendMessage(topic, msg):
    global TOPIC
    global MSG
    TOPIC=topic
    MSG=msg
    
    client = connect_mqtt()
    #client.loop_start()
    publish(client)

def sendSensors():
    drone=Drones.getDrone()
    name=drone["drone"]
    pk.os.system('clear')
    sendMessage(f'v1/drones/{name}/data/all', str(drone).replace("'",'"'))
    sendMessage(f'v1/drones/{name}/data/speed', drone["speed"])
    sendMessage(f'v1/drones/{name}/data/altitude', drone["altitude"])
    sendMessage(f'v1/drones/{name}/data/battery', drone["battery"])
    sendMessage(f'v1/drones/{name}/data/position', f'lat:{drone["position"]["lat"]}, lon:{drone["position"]["lon"]}')
    sendMessage(f'v1/drones/{name}/data/position/lat', drone["position"]["lat"])
    sendMessage(f'v1/drones/{name}/data/position/lon', drone["position"]["lon"])
    

#llibrerie
import Package as pk
import Drones

#variabili globali
CONNECTION, TOPIC, MSG=range(3)
TIMER=2

#connessione al broker(RabbitMQ)
def connect_amqp():
    global CONNECTION
    url = pk.os.environ.get('CLOUDAMQP_URL', 'amqps://uvoymuqw:FAehs0r_Uuz-bfDsM92DnFnGKKvZVRR8@roedeer.rmq.cloudamqp.com/uvoymuqw')
    params = pk.pika.URLParameters(url)
    params.socket_timeout = 5

    CONNECTION = pk.pika.BlockingConnection(params) # Connect to CloudAMQP
    channel = CONNECTION.channel() # start a channel
    
    return channel

#definisco il canale di connessione verso cui inviare/ricevere i messaggi
CHANNEL=connect_amqp()

#effettuo l' invio dei messagi ogni tot secondi
def doPolling():
    #invio messaggi
    pk.schedule.every(TIMER).seconds.do(sendSensors)
    #pk.schedule.every(TIMER*100).seconds.do(getMessage)
    while True:
        pk.schedule.run_pending()
        pk.time.sleep(1)

#funzione per l'invio dei messaggi
def sendMessage(r_key,exchange, ex_type,queue, msg):
    CHANNEL.exchange_declare(exchange=exchange, exchange_type=ex_type, durable=True)
    CHANNEL.queue_declare(queue=queue, durable=True)
    CHANNEL.basic_publish(exchange=exchange, routing_key=r_key, body=msg)

#funzione per ottenere i messaggi     
def getMessage():
    global CONNECTION
    def callback(ch, method, properties, body):
        print(f'\nReceive:{pk.json.loads(body)}')

    #subscribe alla coda e lettura dei messaggi
    CHANNEL.basic_consume('drones_queue',callback, auto_ack=True)
    CHANNEL.start_consuming() 
    CONNECTION.close()
    #CONNECTION=connect_amqp()

#corpo principale dove ottengo i dati dai sensori e li invio          
def sendSensors():
    drone=Drones.getDrone()
    sendMessage(r_key=f'v1/drones/*/data/all', exchange='exDrone', ex_type='topic', queue='drones_queue', msg=pk.json.dumps(drone))
    print(f'Send:{drone}')
    #CONNECTION.close()
    
    
    
        
        
    
    
    
    
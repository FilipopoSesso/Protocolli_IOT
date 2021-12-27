import Package as pk
import HttpProtocol
import MqttProtocol

#cuore del programma
if __name__=="__main__":
    # HttpProtocol.sendSensors()
    # HttpProtocol.getDroneByName("test")
    #HttpProtocol.doPolling()
    while True:
        speed=str(pk.ran.randint(0,100))
        MqttProtocol.sendMessage('v1/drones/drone1/data/speed', speed)
        pk.time.sleep(10)
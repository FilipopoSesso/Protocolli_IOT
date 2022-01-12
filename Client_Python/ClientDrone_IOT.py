import Package as pk
import Drones
import HttpProtocol
import MqttProtocol

#cuore del programma
if __name__=="__main__":
    MqttProtocol.doPolling()
    
    
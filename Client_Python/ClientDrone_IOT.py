from socket import timeout
import Package as pk
import Drones
import HttpProtocol
import MqttProtocol
import AmqpProtocol

CODA=list()

#cuore del programma
if __name__=="__main__":
    #MqttProtocol.doPolling()
    AmqpProtocol.doPolling()
    
        
    
    
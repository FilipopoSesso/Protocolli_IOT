using System;
using System.Collections.Generic;
using Client.Sensors;
using Client.Protocols;
using System.Threading;

using Newtonsoft.Json.Linq;

namespace Client
{

    class Program
    {
        static void Main(string[] args)
        {
            // init sensors
            /*List<SensorInterface> sensors = new List<SensorInterface>();
            sensors.Add(new VirtualSpeedSensor());
            sensors.Add(new VirtualAltitudeSensor());
            sensors.Add(new VirtualBatterySensor());
            sensors.Add(new VirtualPositionSensor());
            foreach (SensorInterface sensor in sensors)
            {
                Console.WriteLine(sensor.toJson());
            }*/

            // define protocol
            ProtocolInterface protocol = new Http("http://10.30.134.11:3000/v1/drones");

            // send data to server
            while (true)
            {

                dynamic drone = new JObject();
                drone.battery = new VirtualBatterySensor().GetBattery();
                drone.speed = new VirtualSpeedSensor().GetSpeed();
                drone.altitude = new VirtualAltitudeSensor().GetAltitude();
                drone.position = new JObject();
                drone.position.len=new VirtualPositionSensor().GetLatPosition();
                drone.position.lon=new VirtualPositionSensor().GetLonPosition();

                Console.WriteLine("Data sent: " + drone.ToString());
                
                protocol.Send(drone.ToString());
                
                Thread.Sleep(1000);

            }

        }

    }

}

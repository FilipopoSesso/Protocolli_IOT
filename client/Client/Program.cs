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
            List<SensorInterface> sensors = new List<SensorInterface>();
            sensors.Add(new VirtualSpeedSensor());
            sensors.Add(new VirtualAltitudeSensor());
            sensors.Add(new VirtualBatterySensor());
            sensors.Add(new VirtualPositionSensor());

            JObject drone = new JObject();

            foreach (SensorInterface sensor in sensors)
            {
                drone.Add(sensor.toJson());
            }

            // define protocol
            ProtocolInterface protocol = new Http("http://localhost:3000/v1/drones");

            Console.WriteLine("Data sent: " + drone.ToString());

            // send data to server
            protocol.Send(drone.ToString());

            Console.ReadKey();

            //Thread.Sleep(1000);

        }

    }

}

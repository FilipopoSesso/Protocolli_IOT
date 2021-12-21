using System;
using System.Collections.Generic;
using Client.Sensors;
using Client.Protocols;
using System.Threading.Tasks;
using System.Threading;
using Newtonsoft.Json.Linq;

namespace Client
{

    class Program
    {
        static void Main(string[] args)
        {
            /*Random r = new Random();
            int NDroni = r.Next(0, 10);

            string[] modelli = {
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
            };
             

            for (int i = 0; i < NDroni; i++)
            {
                //chiamata per creare un drone
                var myDrone = new JObject();

                myDrone.Add(new JProperty("name", $"drone{i}"));
                myDrone.Add(new JProperty("model", modelli[r.Next(0, 10)]));

                // define protocol
                ProtocolInterface drone = new Http("http://192.168.177.56:3000/v1/drones/new");

                Console.WriteLine("Data sent: " + myDrone.ToString());

                // send data to server
                drone.Send(myDrone.ToString());
            }*/

            ProtocolInterface drone = new Http("http://192.168.177.56:3000/v1/drones");

            Console.WriteLine(drone.Recive());

            Console.ReadLine();

            //polling
            int delay = 60000;
            var cancellationTokenSource = new CancellationTokenSource();
            var token = cancellationTokenSource.Token;
            var listener = Task.Factory.StartNew(() =>
            {
                while (true)
                {
                    // init sensors
                    List<SensorInterface> sensors = new List<SensorInterface>();
                    sensors.Add(new VirtualSpeedSensor());
                    sensors.Add(new VirtualAltitudeSensor());
                    sensors.Add(new VirtualBatterySensor());
                    sensors.Add(new VirtualPositionSensor());

                    JObject droneSensors = new JObject();

                    foreach (SensorInterface sensor in sensors)
                    {
                        droneSensors.Add(sensor.toJson());
                    }

                    // define protocol 10.30.134.11
                    ProtocolInterface protocol = new Http("http://192.168.177.56:3000/v1/drones/status");

                    Console.WriteLine("Data sent: " + droneSensors.ToString());

                    // send data to server
                    protocol.Send(droneSensors.ToString());


                    Thread.Sleep(delay);
                    if (token.IsCancellationRequested)
                        break;
                }

                // cleanup, e.g. close connection
            }, token, TaskCreationOptions.LongRunning, TaskScheduler.Default);

            Console.ReadKey();

        }

    }

}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Globalization;
using Newtonsoft.Json.Linq;

namespace Client.Sensors
{
    class VirtualSpeedSensor : SpeedSensorInterface, SensorInterface
    {
        public JProperty toJson()
        {
            return new JProperty("speed", GetSpeed());
        }

        public int GetSpeed()
        {
            var random = new Random();
            return random.Next(100);
        }
    }
}

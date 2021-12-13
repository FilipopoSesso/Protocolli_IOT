using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Globalization;

namespace Client.Sensors
{
    class VirtualBatterySensor : BatterySensorInterface, SensorInterface
    {
        public string toJson()
        {
            return "{\"battery\": " + GetBattery() + "}";
        }

        public int GetBattery()
        {
            var random = new Random();
            return random.Next(100);
        }
    }
}

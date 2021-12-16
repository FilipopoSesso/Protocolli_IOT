using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Globalization;
using Newtonsoft.Json.Linq;

namespace Client.Sensors
{
    class VirtualBatterySensor : BatterySensorInterface, SensorInterface
    {
        public JProperty toJson()
        {
            return new JProperty("battery", GetBattery());
        }

        public int GetBattery()
        {
            var random = new Random();
            return random.Next(100);
        }
    }
}

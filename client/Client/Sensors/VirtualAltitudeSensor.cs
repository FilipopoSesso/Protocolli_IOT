using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Globalization;
using Newtonsoft.Json.Linq;

namespace Client.Sensors
{
    class VirtualAltitudeSensor : AltitudeSensorInterface, SensorInterface
    {
        public JProperty toJson()
        {
            return new JProperty("altitude", GetAltitude());
        }

        public double GetAltitude()
        {
            var random = new Random();
            return Math.Round(random.NextDouble() * (100-1) + 1, 2);
        }
    }
}

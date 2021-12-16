using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Globalization;
using Newtonsoft.Json.Linq;

namespace Client.Sensors
{
    class VirtualPositionSensor : PositionSensorInterface, SensorInterface
    {
        public JProperty toJson()
        {
            //lat→Y lon→X
            double[] position = new double[2] { GetLatPosition(), GetLonPosition() };
            return new JProperty("position", position);
        }

        public double GetLatPosition()
        {
            var random = new Random();
            int tmp = random.Next(516400146, 630304598);
            double lat = Math.Round(45d + tmp / 1000000000d, 4);
            return lat;
        }

        public double GetLonPosition()
        {
            var random = new Random();
            int tmp = random.Next(224464416, 341194152);
            double lon = Math.Round(12d - tmp / 1000000000d, 4);
            return lon;
        }

    }
}

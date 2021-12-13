using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Globalization;

namespace Client.Sensors
{
    class VirtualPositionSensor : PositionSensorInterface, SensorInterface
    {
        public string toJson()
        {
            //lat→Y lon→X
            return "Position:{\"lat\": " + GetLatPosition() + ", \"lon\": " + GetLonPosition() + "}";
        }

        public int GetLatPosition()
        {
            var random = new Random();
            return random.Next(516400146, 630304598);
        }

        public int GetLonPosition()
        {
            var random = new Random();
            return random.Next(224464416, 341194152);
        }

    }
}

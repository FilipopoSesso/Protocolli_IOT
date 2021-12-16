using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Client.Sensors
{
    internal interface PositionSensorInterface
    {
        double GetLatPosition();
        double GetLonPosition();
    }
}

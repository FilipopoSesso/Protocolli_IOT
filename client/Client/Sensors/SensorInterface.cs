using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Client.Sensors
{
    interface SensorInterface
    {
        JProperty toJson();
    }
}

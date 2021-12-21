using System;
using System.Net;
using System.IO;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace Client.Protocols
{
    class Http : ProtocolInterface
    {
        private string endpoint;
        private HttpWebRequest httpWebRequest;

        public Http(string endpoint)
        {
            this.endpoint = endpoint;
        }

        public void Send(string data)
        {
            httpWebRequest = (HttpWebRequest)WebRequest.Create(endpoint);
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                streamWriter.Write(data);
            }

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();

            //Console.Out.WriteLine(httpResponse.StatusCode);
            Console.WriteLine(httpResponse.StatusCode);
            httpResponse.Close();
        }

        protected class Drones
        {
            public int id { get; set; }
            public string name { get; set; }
            public string model { get; set; }
        }

        public string Recive()
        {
            httpWebRequest = (HttpWebRequest)WebRequest.Create(endpoint);
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = "GET";

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
           
            //Console.Out.WriteLine(httpResponse.StatusCode);
            Console.WriteLine(httpResponse.StatusCode);
            
            Stream stream = httpResponse.GetResponseStream();
            StreamReader reader = new StreamReader(stream);

            string drones=reader.ReadToEnd();
            Drones[] x= JsonSerializer.Deserialize<Drones[]>(drones);


            httpResponse.Close();
            return drones;
        }
    }
}

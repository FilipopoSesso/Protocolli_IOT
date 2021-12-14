from sqlite3.dbapi2 import Error
import Package as pk


app = pk.fk.Flask(__name__)
app.config["DEBUG"] = True

drones=list()

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

# @app.route('/v1/drones/all', methods=['GET'])
# def getAllDrones():
#     return pk.fk.jsonify(drones)

def create_table(conn, table_name):
    sql=""
    if table_name=="drones": 
        sql_create = """ CREATE TABLE IF NOT EXISTS drones (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        battery INTEGER NOT NULL,
                        altitude INTEGER NOT NULL,
                        speed INTEGER NOT NULL,
                        lat INTEGER NOT NULL,
                        lon INTEGR NOT NULL
                    ); """
    try:
        c = conn.cursor()
        c.execute(sql)
    except Error as e:
        print(e)

def insert_drone(conn, drone):
    sql=f"INSERT INTO drones (id,battery,altitude,speed,lat,lon) VALUES({drone.id},{drone.battery},{drone.altitude},{drone.speed},{drone.lat},{drone.lon});"
    try:
        c = conn.cursor()
        c.execute(sql)
    except Error as e:
        print(e)

@app.route('/v1/drones', methods=['POST'])
def inisertDrone():
    drone={
    "speed":pk.ran.randint(0,100),
    "altitude":pk.ran.randint(0,1000), 
    "battery":pk.ran.randint(0,100),
    "position":{
        "lat":pk.ran.randint(516400146, 630304598),
        "lon":pk.ran.randint(224464416, 341194152)
        }
    }
    
    try:
        conn = pk.sqlite3.connect('IOT_Server.db')
        insert_drone(conn,drone)
    except Error as e:
        print(e)

@app.route('/', methods=['GET'])
def home():
    return "<h1>Distant Reading Archive</h1><p>This site is a prototype API for distant reading of science fiction novels.</p>"

@app.route('/v1/drones', methods=['GET'])
def getDroneById():
   
    if 'id' in pk.fk.request.args:
        id = int(pk.fk.request.args['id'])
    else:
        return "Error: No id field provided. Please specify an id."

    results = []
    getDronesFromDB()
    for drone in drones:
        if drone['id'] == id:
            results.append(drone)

    return pk.fk.jsonify(results)

@app.route('/v1/resources/drones', methods=['GET'])
def getFilteredDrones():
    query_parameters = pk.fk.request.args

    id = query_parameters.get('id')
    speed = query_parameters.get('speed')
    battery = query_parameters.get('battery')
    altitude = query_parameters.get('altitude')
    lat = query_parameters.get('lat')
    lon = query_parameters.get('lat')
    
    query = "SELECT * FROM books WHERE"
    to_filter = []

    if id:
        query += ' id=? AND'
        to_filter.append(id)
    if speed:
        query += ' speed=? AND'
        to_filter.append(speed)
    if battery:
        query += ' battery=? AND'
        to_filter.append(battery)
    if altitude:
        query += ' altitude=? AND'
        to_filter.append(altitude)
    if lat:
        query += ' lat=? AND'
        to_filter.append(lat)
    if lon:
        query += ' lon=? AND'
        to_filter.append(lon)
        
    if not (id or speed or battery or altitude or lat or lon):
        return page_not_found(404)

    query = query[:-4] + ';'

    conn = pk.sqlite3.connect('drones.db')
    conn.row_factory = dict_factory
    cur = conn.cursor()

    results = cur.execute(query, to_filter).fetchall()
    
    conn.close()
    
    return pk.fk.jsonify(results)

@app.route('/v1/resources/drones/all', methods=['GET'])
def getDronesFromDB():
    conn = pk.sqlite3.connect('IOT_Server.db')
    if conn is not None:
        conn.row_factory = dict_factory
        cur = conn.cursor()
        create_table(conn, "drones")
        
        drones = cur.execute('SELECT * FROM drones;').fetchall()
        conn.close()
    
        return pk.fk.jsonify(drones)
    else:
        return "<h1>Error</h1><p>Connection failed.</p>"

@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404

app.run()
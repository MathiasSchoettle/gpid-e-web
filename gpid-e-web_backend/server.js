const express = require("express");
const cors = require("cors");

const app = express();

const { Client } = require('pg')


const clientConfig = {
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "gpid",
    port: 5432
}



app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// simple route
app.get("/clients", (req, res) => {
    const client = new Client(clientConfig)

        console.log("Received request");
        client.connect((err) => {
        if(err) {
            console.log(err);
            res.json({ message: "ERR Connecting" });

        } else {
            console.log("Connected")
        }
        
        })

        let queryString = `
        SELECT d.*, de.consumption, de.timestamp FROM device d inner JOIN 
	(
	SELECT device_id,timestamp,consumption
	FROM data_entry d1
	WHERE timestamp = (SELECT MAX(timestamp) FROM data_entry d2 WHERE d1.device_id= d2.device_id)
	ORDER BY consumption DESC
	) de
on d.id = de.device_id
        `
        
        client.query(queryString, [], (err, erg) => {
            let message = err ? err : erg.rows;
            console.log(err ? err.stack : erg.rows[0])
            
            res.json(erg.rows);
            client.end();
        })
        
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

 

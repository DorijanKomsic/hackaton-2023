const express = require('express');
const cors = require('cors');
const app = express();


const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const thermostat = require('./routes/thermostatRoutes');
const permission = require('./routes/permissionRoutes');


const bodyParser = require('body-parser');

require('./dbConnection');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/thermostats", thermostat);
app.use("/api/permissions", permission);

const port = 5000;

app.listen(port, () => {
    console.log("Hello World!" + port);
});

app.get('/', (req, res) => {
    res.send("Hello World!");
})
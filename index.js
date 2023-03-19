const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const authJwt = require('./middlewares/authJwt');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const thermostat = require('./routes/thermostatRoutes');
const permission = require('./routes/permissionRoutes');

require('./dbConnection');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.all('*', authJwt.verifyUserToken);

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
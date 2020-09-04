const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./server/src/routes/authRoutes');
const userRoutes = require('./server/src/routes/userRoutes');
const eventRoutes = require('./server/src/routes/eventRoutes');
const guildRoutes = require('./server/src/routes/guildRoutes');


const app = express();

app.use(bodyParser.json());

app.use(authRoutes);
app.use(userRoutes);
app.use(eventRoutes);
app.use(guildRoutes);

app.get('/',(req, res)=>{
  res.status(200).send('Homepage template');
});

app.listen(3000,()=>{
  console.log('Server started, Listening on port 3000...');
});


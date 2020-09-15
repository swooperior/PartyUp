const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const authRoutes = require('./server/src/routes/authRoutes');
const userRoutes = require('./server/src/routes/userRoutes');
const eventRoutes = require('./server/src/routes/eventRoutes');
const guildRoutes = require('./server/src/routes/guildRoutes');


const app = express();
app.use(express.static(path.join(__dirname, 'client/build')));
//app.use(bodyParser.json());

app.use(authRoutes);
app.use(userRoutes);
app.use(eventRoutes);
app.use(guildRoutes);

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port,()=>{
  console.log('Server started, Listening on port 3000...');
});


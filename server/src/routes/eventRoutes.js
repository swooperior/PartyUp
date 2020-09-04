const express = require('express');
const db = require('../../config/db.js');

router = express.Router();

//Create
//----
//event = {"event": {"creator_uid":x, "title":"", "description":"", "start_date":TIMESTAMP, "end_date":TIMESTAMP, "cap":y, "req_rep":z}}
router.post('/api/events/create', (req, res) => {
  var event = req.body.event;
  var members = {members:[{uid:event.creator_uid,status:1}]}
  var sql = `INSERT INTO pu_events(creator_uid,title,description,start_date,end_date,cap,members,req_rep) VALUES(${event.creator_uid},'${event.title}','${event.description}','${event.start_date}','${event.end_date}','${event.cap}','${JSON.stringify(members)}', ${event.req_rep})`;
  db.query(sql,(err,results)=>{
    if(err){
      console.log(err);
      return res.status(400).send({ error: 'Bad Request' });
    }
    return res.status(201).send(results);
  });
});


//Read
//----
router.get('/api/events/', (req, res) => {
  var sql = 'SELECT * FROM pu_events';
  db.query(sql,(err,results)=>{
        if(err){
            console.log(err);
            return res.status(400).send({ error: 'Bad Request' });
        }
        for(event of results){
          console.log(event);
          var members = JSON.parse(event.members);
          event.members = members;
        }
        return res.status(200).send(results);
    });
});

router.get('/api/events/:id', (req, res) => {
  var sql = `SELECT * FROM pu_events WHERE eid=${req.params.id}`;
  db.query(sql,(err,results)=>{
        if(err){
            console.log(err);
            return res.status(400).send({ error: 'Bad Request' });
        }
        console.log(results);
        var event = results;
        if(event.length > 0){
          var members = JSON.parse(results[0].members);
          event[0].members = members.members;
        }
        
        return res.status(200).send(event);
    });
});

//Update
//----
//Event actions
router.put('/api/events/:id/:action', (req, res)=>{
  //Grab user object and insert into participants field of event record.
  var action = req.params.action;
  var eid = req.params.id;
  var sql = "";
  var user = req.body.user;
  var json = {uid:user.uid,status:0}
  switch(action){
    case 'signup':
      sql = `UPDATE pu_events SET participants = JSON_ARRAY_APPEND(`
      //Check there is a free slot (Count participants with status != 2)
      break;
    case 'resign':

      break;
    case 'reserve':
      break;
    default:
      break;
  }
});


//Delete
//----

module.exports = router;
const express = require('express');
const db = require('../../config/db.js');
const helper = require('../functions.js');

router = express.Router();

//ToDo; removed members json field, added pu_event_members table.  Refactor code to reflect.

//Create
//----
router.post('/api/events/create', (req, res) => {
  var event = req.body.event;
  var members = {members:[{uid:event.creator_uid,status:1}]}
  
  var sql = `BEGIN; INSERT INTO pu_events(creator_uid,title,description,start_date,end_date,cap,req_rep) VALUES(${event.creator_uid},'${event.title}','${event.description}',${event.start_date},${event.end_date},${event.cap}, ${event.req_rep}); INSERT INTO pu_event_members(uid, eid) VALUES(${event.creator_uid},LAST_INSERT_ID()); COMMIT;`
  //Syntax error is thrown if multipleStatements: 'true' is not set in db.js config file.
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
  var sql = 'SELECT e.*, u.uid, u.email, u.wow_char, u.rep, m.uid, m.status FROM pu_events e LEFT JOIN pu_event_members m USING(eid) LEFT JOIN pu_users u USING(uid)';
  db.query(sql,(err,results)=>{
        if(err){
            console.log(err);
            return res.status(400).send({ error: 'Bad Request' });
        }

        resultsArray = helper.parseEvents(results);

        return res.status(200).send(resultsArray);
    });
});

router.get('/api/events/:id', (req, res) => {
  var sql = `SELECT e.*, u.uid, u.email, u.wow_char, u.rep, m.uid, m.status FROM pu_events e LEFT JOIN pu_event_members m USING(eid) LEFT JOIN pu_users u USING(uid) WHERE eid=${req.params.id}`;
  db.query(sql,(err,results)=>{
        if(err){
            console.log(err);
            return res.status(400).send({ error: 'Bad Request' });
        }

        event = helper.parseEvents(results);
        
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
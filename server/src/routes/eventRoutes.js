const express = require('express');
const db = require('../../config/db.js');

router = express.Router();

//ToDo; removed members json field, added pu_event_members table.  Refactor code to reflect.

//Create
//----
//ToDo: MySQL Transactions -> Need to get eid of created event to store into the pu_event_members table alongside the uid of the event creator.
router.post('/api/events/create', (req, res) => {
  var event = req.body.event;
  var members = {members:[{uid:event.creator_uid,status:1}]}
  //var sql = `INSERT INTO pu_events(creator_uid,title,description,start_date,end_date,cap,req_rep) VALUES(${event.creator_uid},'${event.title}','${event.description}','${event.start_date}','${event.end_date}','${event.cap}', ${event.req_rep})`;
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
        //Event object template
        const recordObj = {
          eid:null, 
          title:null, 
          description:null, 
          start_date:null,
          end_date:null,
          cap:null,
          e_created:null,
          req_rep:null,
          creator_uid:null,
          members:[],
        };
        //member object template
        const memberObj = {
          uid:null,
          email:null,
          wow_char:null,
          rep:null,
          status:null
        };
        var resultsArray = [];
      
        for(record of results){
          let nro = JSON.parse(JSON.stringify(recordObj));
          let nmo = JSON.parse(JSON.stringify(memberObj));
          for(rkey in record){
            //Copy event details to object
            for(nkey in nro){
              if(rkey === nkey){
                nro[nkey] = record[nkey];
              }
            }
            //Copy member details to object
            for(mkey in nmo){
              if(mkey === rkey){
                nmo[mkey] = record[mkey];
              }
            }
          }
          nro.members.push(nmo);
          var exists = resultsArray.find(o => o.eid == record.eid);
          if(exists){
            let i = resultsArray.findIndex(o => o.eid == record.eid);
            resultsArray[i].members.push(nmo);
            console.log(exists);
          }else{
            resultsArray.push(nro);
          }
        }

        return res.status(200).send(resultsArray);
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
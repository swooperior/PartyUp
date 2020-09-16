const parseEvents = (results) => {
//Event object template
    var resultsArray = [];
    const eventObj = {
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
for(record of results){
    console.log(record);
    let nro = JSON.parse(JSON.stringify(eventObj));
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
    if(record.uid != null){
        nro.members.push(nmo);
    }else{
        nro.members = [];
    }
    var exists = resultsArray.find(o => o.eid == record.eid);
    if(exists){
        let i = resultsArray.findIndex(o => o.eid == record.eid);
        resultsArray[i].members.push(nmo);
    }else{
        resultsArray.push(nro);
    }
}
    return resultsArray;
}

module.exports = {
    parseEvents
};
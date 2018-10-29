var port = process.env.PORT || 5000

var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var sessionstore = require('sessionstore');
var os = require("os");
//var config = require('./config.json');
var uuidv1 = require('uuid/v1');
var got = require('got');



var VERSION = 0.2;




//----------------------------- EXPRESS APP SETUP ------------------------------------------//
app.set('trust proxy', 1);
app.use(function (req, res, next) {
  if (!req.session) {
    return next(); //handle error
  }
  next(); //otherwise continue
});
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
// Routing
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'ssshhfddghjhgewretjrdhfsgdfadvsgvshthhh',
  store: sessionstore.createSessionStore(),
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});


app.set('view engine', 'ejs');

app.get('/', function (req, res) {

      var arr = "";

    
      const element = pakete[1].zustellverlauf;
      if(element.beschreibung != ""){
      var date = new Date(element.timestamps);
      // Hours part from the timestamp
      var hours = date.getHours();
      // Minutes part from the timestamp
      var minutes = "0" + date.getMinutes();
      // Seconds part from the timestamp
      var seconds = "0" + date.getSeconds();
      // Will display time in 10:30:23 for
      var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
      arr = formattedTime + ":  " +element.beschreibung;
      }else{
        arr = "";
      }
    
 
  res.render('index', { temp: Math.floor(Math.random() * 22) + 18 + " C", weight: postingo_states[0].weight + " KG", histroy: arr});
});


app.get('/paket/:id', function (req, res) {
  res.render('test2');
});

app.get('/paket/', function (req, res) {
  res.render('test3');
});
//  io.emit('err', { msg: String(err.message), silcence: true });

















//io.on('connection', (socket) => {

//});
//TODO BUTTONS FÜR MANUELL SC_HALTEN EINBAUEN


//zustellstatus
/*
0 angekündigt
1 in zustellung
2 zugestellt timestamps
3 ennommen

22 zustellung klappe offen
*/



var last_update = Math.round(new Date().getTime() / 1000);


var zustellverlauf_template = {
  timestamps: null,
  beschreibung: ""
};



function create_verlauf(_besch){
  var z = zustellverlauf_template;
  z.timestamps = Math.round(new Date().getTime() / 1000);
  z.beschreibung = _besch;
return z;
}

var benutzer = [
  {
    id: 0,
  }
];

var pakete = [
  {
    id: 0,
    benutzer_id: 0,
    zustellstatus: 0,
    typ: "normal",
    zustellverlauf: create_verlauf(""),
    ctl_message: null,
    postingo_dest_id: 0,
    zustellstatus_last: -1,
    zulieferer_code:"123"
  },
  {
    id: 1,
    benutzer_id: 0,
    zustellstatus: 0,
    typ: "medical",
    zustellverlauf: create_verlauf(""),
    ctl_message: null,
    postingo_dest_id: 0,
    set_temp: 14.0,
    zustellstatus_last: -1,
    zulieferer_code: "123"
  }
];


var postingo_states = [
  {
    id: 0,
    weight: 0.0,
    temp: 0.0,
    door_state: 0,
    hum: 0,
    door_failure: 0,
    light: 0,
    presense: 0,
    set_temp: -1, //off,
    post_count:0,
    scanned_paket:null,
    scanned_einlieferer:null,
    briefe:0,
    door_state_set:0

  }
];


app.post('/rest/postingo/:id/set', function (req, res) {
  var postingo_id = req.params.id;
  var ai = null;
  var ai_element = null;
  var postingo_id = req.params.id;
  for (let index = 0; index < postingo_states.length; index++) {
    const element = postingo_states[index];
    if (!element || String(element.id) != String(postingo_id)) { continue; }
    ai = index;
    ai_element = element;
    break;
  }
  //UPDATE VALUES
  if (!ai_element) {
    res.json({
      state: "err",
      err: "2",
      err_text: "ai null"
    });
    return;
  }


  if (req.body.weight != null) {
  //  postingo_states[ai].weight = String(req.body.weight);
  //  console.log(req.body.weight);
  }
  if (req.body.temp != null) {
    postingo_states[ai].temp = String(req.body.temp);
    //console.log(postingo_states[ai].temp);
  }
  if (req.body.door_state != null) {
    postingo_states[ai].door_state = String(req.body.door_state);
  }
  if (req.body.hum != null) {
    postingo_states[ai].hum = String(req.body.hum);
  }
  if (req.body.door_failure != null) {
    postingo_states[ai].door_failure = String(req.body.door_failure);
  }
  if (req.body.door_failure != null) {
    postingo_states[ai].door_failure = String(req.body.door_failure);
  }
  if (req.body.light != null) {
    postingo_states[ai].light = String(req.body.light);
  }
  if (req.body.presense != null) {
    postingo_states[ai].light = String(req.body.presense);
  }
  if (req.body.set_temp != null) {
    postingo_states[ai].set_temp = String(req.body.set_temp);
  }
  if (req.body.post_count != null) {
    postingo_states[ai].post_count = String(req.body.post_count);
  }



  if (req.body.scanned_einlieferer != null) {
    postingo_states[ai].scanned_einlieferer = String(req.body.scanned_einlieferer);
  }
  if (req.body.scanned_paket != null) {
    postingo_states[ai].light = String(req.body.scanned_paket);
  }


var msg = "";
var pindex = null;
  //UPDATE VALUES DEPEND ON THE STATE
  for (let index = 0; index < pakete.length; index++) {
    const p = pakete[index];
    if (!p) { continue; }
    if (p.postingo_dest_id != ai_element.id) {
      res.json({
        state: "err",
        err: "3",
        err_text: "postingo_dest_id err"
      });
      return;
    }
    pindex = index;
    if (pakete[pindex].zustellverlauf == undefined){
      pakete[pindex].zustellverlauf = create_verlauf("");
    }

    if (p.zustellstatus == 1){
      postingo_states[ai].door_state_set = 0;
      postingo_states[ai].set_temp = -1;
      postingo_states[ai].briefe = 0;
      pakete[pindex].zustellverlauf = create_verlauf("");
      pakete[pindex].zustellstatus = 11;
      pakete[pindex].zustellstatus_last = 1;

    }

    if (p.zustellstatus == 2) {
      pakete[pindex].zustellstatus = 22;
      pakete[pindex].zustellstatus_last = 2;
      pakete[pindex].zustellverlauf = create_verlauf("med. supply !");
      postingo_states[ai].door_state_set = 0;
      postingo_states[ai].briefe = 0;
      if (pakete[pindex].typ == "medical"){
        postingo_states[ai].set_temp = pakete[pindex].set_temp;
      }
    }

  
 
    if (p.zustellstatus == 4 ) {
      postingo_states[ai].door_state_set = 0;
      pakete[pindex].zustellstatus = 44;
      postingo_states[ai].briefe = 1;
      pakete[pindex].zustellstatus_last = 4;
      postingo_states[ai].set_temp = -1;
  //  postingo_states[ai].door_state_set = 1;
      postingo_states[0].weight = 0.38;
      console.log("send-close");
      pakete[pindex].zustellverlauf = create_verlauf("delivered");
    }


    if (p.zustellstatus == 3) {
      pakete[pindex].zustellstatus = 33;
      pakete[pindex].zustellstatus_last = 3;
      pakete[pindex].zustellverlauf = create_verlauf("delivery in process");
      postingo_states[ai].door_state_set = 1;
      postingo_states[ai].briefe = 0;
      postingo_states[ai].set_temp = -1;
      console.log("send-open");
      postingo_states[0].weight = 0.1;

      break;
    }

    
/*
    if (p.zustellstatus == 1 && p.zustellstatus_last == 0){
      pakete[pindex].zustellverlauf.push(create_verlauf("Paket befindet sich in der Zustellung!"));
      if (p.typ == "medical"){
        postingo_states[ai].set_temp = p.set_temp;
        postingo_states[ai].ctl_message = "enable_temp";
        pakete[pindex].zustellverlauf.push(create_verlauf("Kuehlung wurde eingeschaltet"));
        console.log("enable_temp");
      }
      pakete[pindex].zustellstatus_last = 1;
      pakete[pindex].zustellstatus = 11;
      postingo_states[ai].briefe = 0;
      postingo_states[ai].door_state = 0;
    
    }

    if (p.typ == "medical" && p.zustellstatus == 22 && p.zustellstatus_last == 2) {
      postingo_states[ai].set_temp = -1.0;
      postingo_states[ai].briefe = 0;
      postingo_states[ai].door_state = 0;
      postingo_states[ai].ctl_message = "disbale_temp";
      pakete[index].zustellverlauf.push(create_verlauf("Kuehlung wurde ausgeschaltet"));
      pakete[index].zustellstatus_last = 22;
      pakete[index].zustellstatus = 23;
      console.log("disable_temp");

    }

    if ( p.zustellstatus == 11 && p.zustellstatus_last == 1){
    //CHECK FOR PACKET
      if (postingo_states[ai].scanned_paket == p.id && postingo_states[ai].scanned_einlieferer == p.zulieferer_code){
        postingo_states[ai].ctl_message = "open_door";
        postingo_states[ai].scanned_einlieferer = null;
        postingo_states[ai].scanned_paket = null;
        postingo_states[ai].briefe = 0;
        p.zustellstatus = 22;
        p.zustellstatus_last = 2; 
        pakete[pindex].zustellverlauf.push(create_verlauf("Tuer wurde geöffnet"));
        console.log("tuer oefennen");
      }else{
        console.log("please_scan_stuff");
        postingo_states[ai].ctl_message = "scan_requried";
      }
    }

    //tür offen -> wenn status tür zu
    if ((p.zustellstatus == 22 || p.zustellstatus == 23) && postingo_states[ai].door_state){
      p.zustellstatus_last = 22;
      p.zustellstatus = 3;
      pakete[pindex].zustellverlauf.push(create_verlauf("Paket wurde zugestellt"));
      postingo_states[ai].briefe = 1;
      console.log("packet delivered");
    }

    //    scanned_paket:null,
   // scanned_einlieferer: null
   */
}





  
  res.json(postingo_states[ai]);
  //CTL MESSAGE SETZTEN
  return;
});



app.get('/rest/postingo/:id/get', function (req, res) {
  var postingo_id = req.params.id;
  for (let index = 0; index < postingo_states.length; index++) {
    const element = postingo_states[index];
    if (!element || String(element.id) != String(postingo_id)) { continue; }
    var el = element;
    postingo_states[index].ctl_message = "";
    res.json(el);
    
    return;
  }
 
  res.json({
    postingo_id: postingo_id,
    err: "1",
    err_text: "id not found"
  });
});


app.get('/rest/postingo/:id/ctl', function (req, res) {
  var postingo_id = req.params.id;
  for (let index = 0; index < postingo_states.length; index++) {
    const element = postingo_states[index];
    if (!element || String(element.id) != String(postingo_id)) { continue; }
    postingo_states[index].ctl = "";
    if (!element.ctl) {
      res.json({ ctl: "" });
    } else {
      res.json({ ctl: element.ctl });
    }
    return;
  }
  res.json({
    postingo_id: postingo_id,
    err: "1",
    err_text: "id not found"
  });
});



app.get('/rest/user/:id/listpaket', function (req, res) {
  var user_id = req.params.id;
  var tmp_cont = [];
  for (let index = 0; index < pakete.length; index++) {
    const element = pakete[index];
    if (!element || String(element.benutzer_id) != String(user_id)) { continue; }
    tmp_cont.push(element);
  }

  res.json({ benutzer_id: user_id, pakete: tmp_cont });
  return;
});


app.get('/rest/paket/:id/', function (req, res) {
  var paket_id = req.params.id;
  for (let index = 0; index < pakete.length; index++) {
    const element = pakete[index];
    if (!element || String(element.id) != String(paket_id)) { continue; }
    res.json(element);
    return;
  }
  res.json({
    paket_id: paket_id,
    err: "1",
    err_text: "id not found"
  });

});




app.get('/rest/paket/:id/set_state/:st', function (req, res) {
  var paket_id = req.params.id;
  var paket_st = req.params.st;
  for (let index = 0; index < pakete.length; index++) {
    const element = pakete[index];
    if (!element || String(element.id) != String(paket_id)) { continue; }
    pakete[index].zustellstatus_last = pakete[index].zustellstatus;
    pakete[index].zustellstatus = paket_st;
    console.log("set zustellstatus to:" + String(paket_st));
    res.json(element);
    return;
  }
  res.json({
    paket_id: paket_id,
    err: "1",
    err_text: "id not found"
  });

});
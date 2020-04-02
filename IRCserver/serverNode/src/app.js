/* Import package */
const imports = require('./config/imports') // all import for the app
const { sequelize } = require('./models') // models folder with index.js file who return a sequelize obj

console.log(`Server working... ${imports.config.portHttp}`)
/* build an express app */
const app = imports.express() //link express to app

/* enable packages */
app.use(imports.morgan('combined')) // morgan doc -> print out log;
app.use(imports.bodyParser.json()) // node middleware for handling encoded form data
app.use(imports.cors()) // server hosted on different depend --> CARE (need good security)

require('./policies/passport') // this is for passport authen
require('./routes')(app) // attach all the different endpoint to the apps

sequelize.sync() // sync sequelize with the server {force : true} = deleting all data
.then(() => {
  app.listen(imports.config.portHttp)
  console.log('####################### END INIT DB #######################\n\n')
  console.log(`Server started on port ${imports.config.portHttp}... let's start working...`)
})

var app = require('express')();
var http = require('http').createServer(app);


http.listen(3000, function() {
  console.log('listening on port 3000');
});

// Create of server https
// const server = imports.https.createServer(options, app)
// Things ToDo during runtime of server
// .then(() => imports.dbopenneb.populateDB()) // CallBack Async during the running of the server
// app.listen(imports.config.portHttps, imports.config.ip) // Adding the ip for change domain for production    
// app.listen(imports.config.portHttps)
// server.listen(imports.config.portHttps, imports.config.ip)

// Before running the server
// Path of folder for build 
// const publicRoot = `D:/Users/ghuck2671/Desktop/Geoff/SB/SandboxALE-AAPP_2019/client/dist` // ON WINDOWS
// const publicRoot = `/root/SandboxALE-AAPP_2019/client/dist` // ON LINUX
// Options for certificat
// const key = imports.fs.readFileSync(__dirname + '/cert/selfsigned.key') // Certificat
// const cert = imports.fs.readFileSync(__dirname + '/cert/selfsigned.crt')
// const options = {
//      key: key,
//      cert: cert
// }
// Use of cookie
// app.use(imports.cookieSession({
//    name: 'mysession',
//    keys: ['portal-vlab'],
//    maxAge: 24 * 60 * 60 * 1000 // 24 hours
//  }))
  
// Use of build front
// app.use(imports.express.static(publicRoot)) // For production (use of the build fodler for vue)
  
// HTTPs Forwarded
// app.use(function(req,resp,next){
//      if (req.headers['x-forwarded-proto'] == 'http') {
//         return resp.redirect(301, 'https://' + req.headers.host + '/');
//      } else {
//         return next();
//      }
// });
// app.use((request, response) => {
//   if (!request.secure) {
//     response.redirect('https://' + request.headers.host + request.url)
//   }
// })

const bodyParser = require('body-parser')
const helmet = require('helmet')
const express = require('express')
const app = express()
const path = require('path')
const c_main = require('./app/controllers/controller_main')
const app_config = require('./app/config/app.json')
const cookieParser = require('cookie-parser')
const redis_config = require('./app/config/redis.json')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const passport = require("./app/module/passport")

// Enable proxy for get secure https
app.enable("trust proxy")

// Views
app.set('views', path.join(__dirname, 'app/views'))
app.set('view engine', 'ejs')

// Middlewares
app.use(helmet({
    frameguard: false
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname+'/public')))
app.use(session({
    store: new RedisStore({
        host: process.env.REDIS_HOST,//redis_config.host,
        pass: process.env.REDIS_PASS,//redis_config.password,
        port: process.env.REDIS_PORT,//redis_config.port,
        ttl:3600,
        logErrors:true
    }),
    secret: app_config.secret,
    resave: false,
    unset: 'destroy',
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())

app.use('/', c_main)

app.listen(app_config.port/*process.env.APP_PORT*/, () => console.log('My_service.com app listening on port ' + app_config.port/*process.env.APP_PORT*/))


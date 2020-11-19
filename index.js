const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const compression = require('compression')
const rateLimit = require('express-rate-limit')
const { check } = require('express-validator')
const cors = require('cors')

const wallet = require('./wallet')

require('dotenv').config()

const app = express();

app.use(compression())
app.use(helmet())

const isProduction = process.env.NODE_ENV === 'production'
const origin = { origin: isProduction ? 'https://www.ahoj.finance' : '*', }
app.use(cors(origin))

//Rate limiting
//To help protect against brute force/DDoS attacks, we can limit the amount of requests using express-rate-limit. 
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // 5 requests,
})
app.use(limiter)

const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.get('/', wallet.rootMessage)
app.get('/api/createWallet', wallet.createWallet)

app.listen(port, () => console.log(`Server listening on port ${port}`));
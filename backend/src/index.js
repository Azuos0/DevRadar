const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const routes = require("./routes");
const {setupWebsocket} = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

//MongoDB (Não-relacional)
mongoose.connect('mongodb+srv://admin:senhorBD123@cluster0-jd99h.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json()); //permite que todas as requisições aceitem dentro do body responses do tipo json
app.use(routes);


server.listen(3333);
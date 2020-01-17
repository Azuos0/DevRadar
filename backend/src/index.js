const express = require('express');
const mongoose = require('mongoose');
const routes = require("./routes");
const cors = require('cors');

const app = express();

//MongoDB (Não-relacional)
mongoose.connect('mongodb+srv://admin:senhorBD123@cluster0-jd99h.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json()); //permite que todas as requisições aceitem dentro do body responses do tipo json
app.use(routes);


app.listen(3333);
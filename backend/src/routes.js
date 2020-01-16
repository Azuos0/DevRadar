const {Router} = require('express');//permite a importação de somente o pacote de routes do node

const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

//Métodos http GET, POST, PUT, DELETE

//Tipos de parâmetros:
//Query Params: request.query(Filtros, ordenação, paginação, ...)
//Route Params: request.params (Identificar um recurso na alteração ou na remoção)
//Body: request.body (Dados para criação ou alteração de um registro)

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.put('/devs/:id', DevController.update);
routes.delete('/devs/:id', DevController.destroy);

routes.get('/search', SearchController.index);

module.exports = routes;
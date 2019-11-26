var express = require('express');
var router = express.Router();
let controller = require('../controllers/productoController');

 var multipart = require('connect-multiparty');
 var multipartMiddleware = multipart();

// WS listar registros
router.get('/listar', function(req, res, next) {
  controller.listar(req, res);
});

// WS mostrar un registro por su id
router.get('/mostrar/:codigo', function(req, res, next) {
  controller.show(req, res);
});

// WS crear registro 
router.post('/',multipartMiddleware, function(req, res){
  controller.store(req, res);
});

// WS actualizar registro
router.put('/', function(req, res){
  controller.edit(req, res);
});

// WS eliminar registro
router.delete('/:codigo', function(req, res){
  controller.delete(req, res);
});

module.exports = router;

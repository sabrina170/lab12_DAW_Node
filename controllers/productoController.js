let db = require('../models/dbconexion');

var fs = require('fs');

let productos = {
  listar( req, res ){
    let sql = "SELECT * FROM productos";
    db.query(sql,function(err, result){
      if( err ){
        console.log(err);
        res.sendStatus(500);
      }else{
        res.json(result);
      }
    });
  },
  store( req, res ){
    console.log(req.files);
    let tmp_path = req.files.uploads[0].path;
    let target_path = './public/images/' + req.files.uploads[0].originalFilename;
    let nombreImg = '/images/' + req.files.uploads[0].originalFilename;

    console.log(target_path);

    fs.rename(tmp_path,target_path,function(err){
      if (err) throw err;
      fs.unlink(tmp_path,function(){
        if (err) throw err;

        val_descripcion = req.body.descripcion;
        val_precio = req.body.precio;
        let sql = "INSERT INTO productos(descripcion,precio,imagen) VALUES(?,?,?)";
        db.query(sql,[val_descripcion,val_precio,nombreImg],function(err, newData){
        if(err){
        console.log(err);
        res.sendStatus(500);
        }else{
        // res.json(newData);
        last_id = newData.insertId
        res.json({"last_id": last_id})
        }
        });
      })
    });
  },
  show( req, res ){
    val_codigo = req.params.codigo;
    let sql = "SELECT * FROM productos WHERE codigo=?";
    db.query(sql,[val_codigo],function(err, rowData){
      if(err){
        console.log(err);
        res.sendStatus(500);
      }else{
        res.json(rowData);
      }
    });
  },
  edit( req, res ){
    val_codigo = req.body.codigo;
    val_descripcion = req.body.descripcion;
    val_precio = req.body.precio;
    let sql = "UPDATE productos SET descripcion=?, precio=? WHERE codigo=?";
    db.query(sql,[val_descripcion,val_precio,val_codigo],function(err, newData){
      if(err){
        res.sendStatus(500);
      }else{
        res.json(newData);
      }
    });
  },
  delete( req, res ){
    val_codigo = req.params.codigo;
    let sql = "DELETE FROM productos WHERE codigo=?";
    db.query(sql,[val_codigo],function(err, newData){
      if(err){
        res.sendStatus(500);
      }else{
        res.sendStatus(200);
      }
    });
  }
}

module.exports = productos;

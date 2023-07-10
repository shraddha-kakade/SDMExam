const express = require('express');
const appForBook = express.Router();
const mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'manager',
    database : 'SDM'
});

appForBook.get("/",(request,response)=>{
    console.log('hello')
    connection.query("select * from Book_Tb",(error,result)=>{
        console.log(result)
        if(error==null)
        {
            var data = JSON.stringify(result);
            response.setHeader("Content-Type","application/json");
            response.write(data);
        }
        else
        {
            console.log(error);
            response.setHeader("Content-Type","application/json");
            response.write(error);
        }
        response.end();
    })
});

appForBook.post("/",(request,response)=>{
    var query = `insert into Book_Tb(b_name,author,book_type,price,publishedDate,language) values('${request.body.b_name}',
        '${request.body.author}',
        '${request.body.book_type}',
        ${request.body.price},
        '${request.body.publishedDate}',
        '${request.body.language}'
        )`;
        console.log(query)
    connection.query(query,(error,result)=>{
        if(error==null)
        {
            var data = JSON.stringify(result);
            response.setHeader("Content-Type","application/json");
            response.write(data);
        }
        else
        {
            console.log(error);
            response.setHeader("Content-Type","application/json");
            response.write(error);
        }
        response.end();
    })
});

appForBook.put("/:id",(request,response)=>{
    var query = `update Book_Tb set b_name = '${request.body.b_name}',
                    author = '${request.body.author}',
                    book_type= '${request.body.book_type}',
                    price='${request.body.price}',
                    publishedDate='${request.body.publishedDate}',
                    language='${request.body.language}'
                    where id = ${request.params.id}`;
    console.log(query)
    connection.query(query,(error,result)=>{
        if(error==null)
        {
            var data = JSON.stringify(result);
            response.setHeader("Content-Type","application/json");
            response.write(data);
        }
        else
        {
            console.log(error);
            response.setHeader("Content-Type","application/json");
            response.write(error);
        }
        response.end();
    })
});

module.exports = appForBook;

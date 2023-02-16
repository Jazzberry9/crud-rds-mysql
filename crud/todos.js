const db = require('../connection')
const queryString = require('querystring')


module.exports.findAll = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const sql = 'SELECT * FROM todos';
    db.query( sql, (err, rows) => {
        if (err){
            callback({
                statusCode: 500,
                body: JSON.stringify(err),
                msg: 'error'
            })
        } else {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify({
                    todos: rows
                })
            })
        }
    })
}
module.exports.findOne = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const sql = 'SELECT * FROM todos WHERE id = ?';
    db.query( sql, [event.pathParameters.todo], (err, row) => {
        if (err){
            callback({
                statusCode: 500,
                body: JSON.stringify(err),
                msg: 'error'
            })
        } else {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify({
                    todo: row
                })
            })
        }
    })
}
module.exports.create = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    let buff = Buffer.from(event.body, "base64");
    let eventBodyStr = buff.toString('UTF-8');
    const body = queryString.parse(eventBodyStr);

    const data = {
        todos: body.todos
    }

    const sql = 'INSERT INTO todos SET ?';
    db.query( sql, [data], (err, result) => {
        if (err){
            callback({
                statusCode: 400,
                body: JSON.stringify(err),
                msg: 'error'
            })
        } else {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify({
                    res: `Todo insertado correctamente con el id ${result.insertId}`,
                    body
                })
            })
        }
    })
}
module.exports.update = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    let buff = Buffer.from(event.body, "base64");
    let eventBodyStr = buff.toString('UTF-8');
    const body = queryString.parse(eventBodyStr);

    const sql = 'UPDATE todos SET todos = ? WHERE id = ?';
    db.query( sql, [body.todos, event.pathParameters.todo], (err, result) => {
        if (err){
            callback({
                statusCode: 400,
                body: JSON.stringify(err),
                msg: 'error'
            })
        } else {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify({
                    res: `Todo actualizado correctamente`,
                })
            })
        }
    })
}
module.exports.delete = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const sql = 'DELETE FROM todos WHERE id = ?';
    db.query( sql, [event.pathParameters.todo], (err, result) => {
        if (err){
            callback({
                statusCode: 400,
                body: JSON.stringify(err),
                msg: 'error'
            })
        } else {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify({
                    res: `Todo eliminado correctamente`,
                })
            })
        }
    })
}
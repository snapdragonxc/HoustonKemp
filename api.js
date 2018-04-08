var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path')
const config = require('./config');
var perPage = config.postsPerPage;
var pages = 1;
router.get('/posts/:page', function(req, res, next) {
    // paginate
    var page = req.params.page;
    // get a list of all of the json files in the public folder
    fs.readdir(__dirname + '/public/posts', function(err, filenames) {
         if(err){
            console.log(err);
            res.status(404).send('Cannot read posts folder');
            return err;
        } else {
            var names = [];
            filenames.forEach( filename => {   
                if( path.extname(filename) == '.json'){
                    names.push(filename);               
                }
            });
            var count = names.length;
            pages = Math.ceil(count/perPage);
            // read each file
            var promises = names.map( (filename) => { 
                // wrap file read in a promise
                return new Promise((resolve, reject) => {                    
                    fs.readFile(__dirname + '/public/posts/' + filename, (err, post) => {
                            return (err)? reject(err) : resolve( JSON.parse(post) )
                        });
                });
            });
            // when all of the files have been read, order by date and send back
            Promise.all(promises).then( posts => {
                // sort by date        
                posts.sort( (a,b) => (new Date(b.date) - new Date(a.date)));              
                // get page to return       
                var start = perPage * (page - 1);
                var end = start + perPage;
                var postsPerPage = posts.slice(start, end);
                res.json({
                    postsPerPage: postsPerPage,
                    pages: pages
                });
            });
        }
    })
});
//
router.get('/post/:title', function(req, res, next) {
    var title = req.params.title;  
    var filename = title + '.json';
    fs.readFile(__dirname + '/public/posts/' + filename, (err, file) => {
        if(err){
            console.log(err);
            res.status(404).send('File read error: ' + '\'' + filename + '\'');
            return err;           
        } else {
            var post = JSON.parse(file);
            res.json(post);
        };
    });
});
//
router.post('/post', function(req, res){
    var post = req.body;
    let data = JSON.stringify(post, null, 2);
    var filename = post.title.replace(/\?/g,''); // remove question marks in name
    filename = filename.replace(/ /g, '-') + '.json';
    var numberWords = post.content.split(/ /g).length;
    fs.writeFile(__dirname + '/public/posts/' + filename, data, (err) => {  
       if(err){
            console.log(err);
            res.status(404).send('File save error: ' + '\'' + filename + '\'');
            return err;           
        } else {
            res.json({
                type: 'ADD_POST',
                number: numberWords
            });
        };
    });
       
});
//
router.delete('/post/:title', function(req, res){
    var filename = req.params.title + '.json'; 
    fs.unlink(__dirname + '/public/posts/' + filename, (err) => {
        if(err){
            res.status(404).send('File delete error: ' + '\'' + filename + '\'');
            return err;            
        } else {
            res.json({
                type: 'DELETE_POST',
                msg: 'file ' +  filename + ' sucessfully deleted'
            });
        };
    });
});
//
router.put('/post/:filename', function(req, res){
        var oldFilename = req.params.filename + '.json';
        var post = req.body;
        let data = JSON.stringify(post, null, 2);
        var newFilename = post.title;
        newFilename = newFilename.replace(/\?/g,''); // remove question marks in name
        newFilename = newFilename.replace(/ /g, '-') + '.json';
        console.log('oldFilename: ', oldFilename, 'newFilename: ', newFilename, post.title);
        if( newFilename != oldFilename){
            // Title of post has changed - delete old file
            fs.unlink(__dirname + '/public/posts/' + oldFilename, (err) => {
                if(err){
                    console.log('file update error')
                    res.status(404).send('File update error: ' + '\'' + newFilename + '\'');
                    return err;                   
                } else {
                    fs.writeFile(__dirname + '/public/posts/' + newFilename, data, (err) => {  
                        if(err){
                            console.log('file update error')
                            res.status(404).send('File update error: ' + '\'' + newFilename + '\'');
                            return err;                           
                        } else {
                            console.log('file updated')
                            res.json({
                                type: 'UPDATE_POST',
                                msg: 'file ' +  newFilename + ' sucessfully updated'
                            });
                        };
                    });
                }
            });
        } else {
            // update file without changing title by overwiting the file
            fs.writeFile(__dirname + '/public/posts/' + newFilename, data, (err) => {  
                    if(err){
                        console.log('file update error')
                        res.status(404).send('File update error: ' + '\'' + newFilename + '\'');
                        return err;                       
                    } else {
                        console.log('file updated')
                        res.json({
                            type: 'UPDATE_POST',
                            msg: 'file ' +  newFilename + ' sucessfully updated'
                        });
                    };
            });
        }
});
//
module.exports = router;
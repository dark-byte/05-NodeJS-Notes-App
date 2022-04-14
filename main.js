var argv = require('yargs/yargs')(process.argv.slice(2)).argv

var fs = require('fs');

function add(title, body){

    if(!fs.existsSync('./notes.json')){
        fs.writeFileSync('./notes.json', JSON.stringify([{title, body}]))
    } else {
        fs.readFile('./notes.json', (err, data)=>{
            note = JSON.parse(data)
            note.push({title:title, body:body})
            fs.writeFileSync('./notes.json', JSON.stringify(note))
        })
    }
    
}

function remove(title){
    fs.readFile('./notes.json', (err, data)=>{
        if(err) throw err
        notes = JSON.parse(data.toString())
       
        notes = notes.filter((note)=>{
            return note.title !== title
        })
        fs.writeFileSync('./notes.json', JSON.stringify(notes))
    })
}

function list(){
    fs.readFile('./notes.json', (err, data)=>{
        notes = JSON.parse(data.toString())
        notes.forEach(note => {
            console.log(note.title)
        });    
    })
}

function read(title){
    fs.readFile('./notes.json', (err, data)=>{
        if(err) throw err
        notes = JSON.parse(data.toString())

        console.log(notes.filter((note)=>{
            return note.title === title
        })[0].body)
    })
}


switch(argv._[0]){
    case 'add': add(argv.title, argv.body)
        console.log("Note Added")
        break
    case 'remove': remove(argv.title)
        console.log("Note Removed")
        break
    case 'list': list()
        break
    case 'read': read(argv.title)
        break
    default: console.log('Wrong Input')
}

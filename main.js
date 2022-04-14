var argv = require('yargs/yargs')(process.argv.slice(2)).argv
// console.log(argv._)

// var title = argv.title
// var body = argv.body

var fs = require('fs');

function add(title, body){

    if(!fs.existsSync('./notes.json')){
        fs.writeFileSync('./notes.json', JSON.stringify([{title, body}]))
    } else {
        fs.readFile('./notes.json', (err, data)=>{
            note = JSON.parse(data)
            note.push({title:title, body:body})
            fs.writeFileSync('./notes.json', JSON.stringify(note))
            console.log(note)
        })
    }
    
}

// add("TITLE1" ,"BODY1")

function remove(Title){
    var note = []
    fs.readFile('./notes.json', (err, data)=>{
        if(err) throw err
        note = JSON.parse(data.toString())
       
       note = note.filter((i)=>{
            return i.title !== Title
        })
        console.log(note)
        fs.writeFileSync('./notes.json', JSON.stringify(note))
    })
}

function read(title){
    fs.readFile('./notes.json')
}

remove("title")

// switch(argv._[0]){
//     case 'add': add(argv.title, argv.body)
//         console.log(argv.title, argv.body)
//         break
//     case 'remove': remove(argv.title)
//         break
//     default: console.log('Wrong Input')
// }

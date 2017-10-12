const fs = require('fs')
const { prompt } = require('inquirer')
const { listTable } = require('../utils.js')
const json_tpls = require('../templates.json')


const question = [
	{
		type: 'input',
		name: 'name',
		message: 'Which template you want to delete:',
		validate (val){
			if (val === '') return 'Name is required!'
			if (json_tpls[val]) return true
			return 'This template doesn\'t exists.'
		}
	}
]

prompt(question).then(({name})=>{

	delete json_tpls[name]
	fs.writeFile(`${__dirname}/../templates.json`, JSON.stringify(json_tpls), 'utf-8', (err) => {
	    if (err) {
	      console.log(err)
	      return
	    }
	    listTable(json_tpls, 'Template has been deleted successfully!')
    })

})
const fs = require('fs')
const { prompt } = require('inquirer')
const { listTable } = require('../utils.js')
const json_tpls = require('../templates.json')


const question = [
	{
		type: 'input',
		name: 'name',
		message: 'Set the template name:',
		validate (val) {
			if(val === '') return 'Name is required!'
			if (json_tpls[val]) return 'Template is existed!'
			return true
		}
	},
	{
		type: 'input',
		name: 'place',
		message: 'Owner/name of the template:',
		validate (val) {
			if (val === '') return 'Link is required!'
			return true
		}
	},
	{
		type: 'input',
		name: 'branch',
		message: 'Branch of the template:',
		default: 'master'
	}
]

prompt(question).then(({ name, place, branch }) => {

	json_tpls[name] = {}
	json_tpls[name]['owner/name'] = place
	json_tpls[name]['branch'] = branch

	writeFile("../templates.json", JSON.stringify(json_tpls), 'utf-8', (err) => {
		if (err) {
		    console.log(err)
		    return
		}
		listTable(json_tpls, 'New template has been added successfully!')
	})
})	
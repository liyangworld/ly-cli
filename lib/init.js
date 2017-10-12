const { prompt } = require('inquirer')
const chalk = require('chalk')
const download = require('download-git-repo')
const ora = require('ora')

const json_tpls = require('../templates.json')


const question = [
	{
		type: 'input',
		name: 'tplName',
		message: 'Template name:',
		validate (val){
			if (val === '') return 'Name is required!'
			if (json_tpls[val]) return true
			return 'This template doesn\'t exists.'
		}
	},
	{
		type: 'input',
		name: 'projectName',
		message: 'Project name:',
		validate (val){
			if (val === '') return 'Project name is required!'
			return true
		}
	},
	{
		type: 'input',
	    name: 'place',
	    message: 'Where to init the project:',
	    default: './'
	}
]

prompt(question).then(({ tplName, projectName, place }) => {

	const gitOwner = json_tpls[tplName]['owner/name']
	const gitBranch = json_tpls[tplName]['branch']

	const spinner = ora('Downloading template...')
	spinner.start()

	download(`${gitOwner}#${gitBranch}`, `${place}/${projectName}`, (err) => {
	    if (err) {
			console.log(chalk.red(err))
			process.exit()
	    }
	    spinner.stop()
	    console.log(chalk.green('New project has been initialized successfully!'))
  	})

})
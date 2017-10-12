const Table = require('cli-table')
const chalk = require('chalk')

const table = new Table({
    head: ['Template Name', 'Owner/Name', 'Branch'],
    style: {
        head: ['green']
    }
})

function listTable (tplList, msg) {

    const list = Object.keys(tplList)

    list.forEach((key) => {
        table.push([key, tplList[key]['owner/name'], tplList[key]['branch']])
    })
    console.log(table.toString())
    if (msg) console.log(chalk.green(`\u2714 ${msg}`))
    process.exit()

}

exports.listTable = listTable
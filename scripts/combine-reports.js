const { merge } = require('mochawesome-merge')
const { create } = require('mochawesome-report-generator')

const options = {
  files: ['cypress/reports/*.json'],
  reportDir: 'cypress/reports',
  reportFilename: 'relatorio_geral'
}

merge(options).then((report) => {
  create(report, options)
})

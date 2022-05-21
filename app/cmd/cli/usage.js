const commandLineUsage = require('command-line-usage');
const { cmdArgumentsDefinition } = require('./arguments.js');

const usageDefinition = [
  {
    header: 'ume-deployment-checker',
    content: 'An amazing command line tool allowing you to verify your k8s deployments.'
  },
  {
    header: 'Synopsis',
    content: '$udc <command> <command parameters>'
  },
  {
    header: 'Commands',
    content: [
      { name: 'help', summary: 'Display this help.' },
      { name: 'check', summary: 'Performs checks based on given parameters and configuration.' }
    ]
  },
  {
    header: 'Parameters',
    optionList: cmdArgumentsDefinition
  }
];

const usage = commandLineUsage(usageDefinition);

module.exports = {
  usage
};

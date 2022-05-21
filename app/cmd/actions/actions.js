const { cmdArguments } = require('../cli/arguments');
const { usage } = require('../cli/usage');
const { check, help} = require('../../ume-deployment-checker');

const COMMANDS = {
  COMMAND_HELP: 'help',
  COMMAND_CHECK: 'check'
};

const actions = {
  showHelp: {
    condition: () => handleCondition(cmdArguments.command === COMMANDS.COMMAND_HELP || cmdArguments.help || Object.keys(cmdArguments).length === 0),
    action: async () => await help(usage)
  },
  runCheck: {
    condition: () => handleCondition(cmdArguments.command === COMMANDS.COMMAND_CHECK),
    action: async () => await check(cmdArguments)
  }
};

const handleCondition = (condition) => {
  if (_isKnownAction()) {
    return condition;
  }
};

const _isKnownAction = () => !cmdArguments._unknown;

module.exports = {
  actions,
  COMMANDS
};

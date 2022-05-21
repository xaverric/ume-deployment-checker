#!/usr/bin/env node
const { actions } = require('./app/cmd/actions/actions.js');
const { cmdArguments } = require('./app/cmd/cli/arguments.js');

const main = async () => {
  let actionExecuted = false;
  for (const actionName of Object.keys(actions)) {
    // execute first action which meets the condition and terminate the process
    if (actions[actionName].condition()) {
      actionExecuted = true;
      await actions[actionName].action();
    }
  }
  // the process should never get here
  processErrorMessages(actionExecuted);
};

const processErrorMessages = (actionExecuted) => {
  cmdArguments._unknown && console.log(`Unknown arguments used: ${cmdArguments._unknown}`);
  !actionExecuted && console.log('No action match the given parameters. Terminating without any action performed.');
};

main().then(() => {
  process.stdin.destroy();
}).catch((e) => {
  console.log(`Error in application : ${e.stack}`);
});

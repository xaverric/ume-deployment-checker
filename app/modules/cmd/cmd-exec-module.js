const util = require('util');
const exec = util.promisify(require('child_process').exec);

const callCliCommand = async (command) => {
    const {stdout} = await exec(command);
    return stdout; 
};

module.exports = {
    callCliCommand
}
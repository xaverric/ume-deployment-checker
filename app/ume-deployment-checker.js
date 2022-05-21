const { readEnvironmentConfiguration } = require("./modules/configuration-reader-module");
const { evaluatePodMetadata } = require("./modules/evalution-module");
const { getPodsMetadata } = require("./modules/kubectl-pod-details-module");
const { print } = require("./modules/print-module");

const check = async cmdArgs => {
    let environmentConfiguration = readEnvironmentConfiguration(cmdArgs);
    let pods = await getPodsMetadata(cmdArgs);
    let evaluationResult = evaluatePodMetadata(pods, environmentConfiguration, cmdArgs);
    
    print(evaluationResult, cmdArgs);
}

const help = usage => {
    console.log(usage);
}

module.exports = {
    check,
    help
}
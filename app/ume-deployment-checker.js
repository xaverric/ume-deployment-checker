const { readEnvironmentConfiguration } = require("./modules/configuration/configuration-reader-module");
const { evaluatePodMetadata, evaluateExtraPods} = require("./modules/evalution-module");
const { getPodsMetadata } = require("./modules/k8s/kubectl-pod-details-module");
const { printNoVerboseStatus, printVerbose} = require("./modules/print/console-print-module");
const { printToBookkit } = require("./modules/print/bookkit-print-module");
const {CONSOLE_LOG} = require("./logger/logger");

const check = async cmdArgs => {
    let environmentConfiguration = readEnvironmentConfiguration(cmdArgs);
    let pods = await getPodsMetadata(cmdArgs);
    let evaluationResult = evaluatePodMetadata(pods, environmentConfiguration, cmdArgs);
    let extraPodsNotInConfiguration = evaluateExtraPods(pods, environmentConfiguration, cmdArgs);

    if(cmdArgs.noverbose) {
        printNoVerboseStatus(evaluationResult, cmdArgs)
    } else {
        printVerbose(evaluationResult, cmdArgs);
    }

    if (extraPodsNotInConfiguration?.length > 0) {
        console.log(`${extraPodsNotInConfiguration.length} extra pod/s found within k8s cluster, which is missing in the configuration.`);
        console.table(extraPodsNotInConfiguration);
    }
 }

const print = async cmdArgs => {
    let environmentConfiguration = readEnvironmentConfiguration(cmdArgs);
    let pods = await getPodsMetadata(cmdArgs);
    let evaluationResult = evaluatePodMetadata(pods, environmentConfiguration, cmdArgs);

    await printToBookkit(evaluationResult, cmdArgs);
    CONSOLE_LOG.debug(`${cmdArgs.environment.toUpperCase()} environment details stored into the bookkit page.`);
}

const help = usage => {
    CONSOLE_LOG.debug(usage);
}

module.exports = {
    check,
    print,
    help
}
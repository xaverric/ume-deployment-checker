const deepEqual = (x, y) => {
    return (x && y && typeof x === 'object' && typeof y === 'object') ? 
      (Object.keys(x).length === Object.keys(y).length) && Object.keys(x).reduce((isEqual, key) => {return isEqual && deepEqual(x[key], y[key]);}, true) :
      (x === y);
};

const subAppSelectorFunction = (pod, subApp) => pod?.metadata?.annotations?.APP_PACK_URL_PATH === subApp;

const getSubApp = (pods, subApp) => {
    return pods.find(pod => subAppSelectorFunction(pod, subApp));
};

const getSubAppCount = (pods, subApp) => {
    return pods.filter(pod => subAppSelectorFunction(pod, subApp)).length;
};

const getSubAppNodeSelectors = (pods, subApp) => {
    return getSubApp(pods, subApp)?.spec?.affinity?.nodeAffinity?.requiredDuringSchedulingIgnoredDuringExecution?.nodeSelectorTerms[0]?.matchExpressions;
};

const evaluateDeployment = (pods, subApp, subAppConfig) => {
    let result = "";
    let status = getSubApp(pods, subApp)?.status?.phase;
    let found = getSubAppCount(pods, subApp);

    if(found === 0 || found !== subAppConfig.count || status !== "Running") {
        result = `Status (Expected/Current): Running/${status}, Count (Expected/Current): ${subAppConfig.count}/${found}.`
    }
    return result;
};

const evaluateNodeSelector = (pods, subApp, subAppConfig) => {
    let result = "";
    subAppConfig.nodeSelectors?.forEach(expectedSelector => {
        let foundSelector = getSubAppNodeSelectors(pods, subApp)?.find(podSelector => expectedSelector.key === podSelector.key);
        if (!foundSelector || !deepEqual(expectedSelector, foundSelector)) {
            result = `Node selector ${expectedSelector.key}=${expectedSelector.values[0]} missing.`;    
        }
    });
    return result;
};

const evaluateVersion = (pods, subApp) => {
    return getSubApp(pods, subApp)?.metadata?.annotations?.UU_CLOUD_APP_VERSION;
};

const evaluateRts = (pods, subApp) => {
    return getSubApp(pods, subApp)?.metadata?.annotations?.UU_CLOUD_RUNTIME_STACK_CODE;
};

const evaluatePodMetadata = (pods, environmentConfiguration, cmdArgs) => {
    const EVALUATE_KEY_DEPLOYMENT = "DEPLOYMENT";
    const EVALUATE_KEY_NODE_SELECTOR = "NODE_SELECTOR";
    const EVALUATE_KEY_VERSION = "VERSION";
    const EVALUATE_KEY_RTS = "RUNTIME_STACK";

    const result = [];
    Object.keys(environmentConfiguration).forEach(subApp => {
        let subAppConfig = environmentConfiguration[subApp];
        if(subAppConfig.required) {
            let evaluateSubApp = {subApp};
            if (cmdArgs.deployment) {
                evaluateSubApp[EVALUATE_KEY_DEPLOYMENT] = evaluateDeployment(pods, subApp, subAppConfig);
                evaluateSubApp[EVALUATE_KEY_NODE_SELECTOR] = evaluateNodeSelector(pods, subApp, subAppConfig);
            }
            if (cmdArgs.version) {
                evaluateSubApp[EVALUATE_KEY_VERSION] = evaluateVersion(pods, subApp);
            }
            if (cmdArgs.rts) {
                evaluateSubApp[EVALUATE_KEY_RTS] = evaluateRts(pods, subApp);
            }
            result.push(evaluateSubApp);
        }
    });
    return result;
}

module.exports = {
    evaluatePodMetadata
};
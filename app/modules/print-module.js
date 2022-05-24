const OBJECT_HEADER = "subApp";

const guessKeys = array => {
    return  array[0] ? Object.keys(array[0]).filter(item => item !== OBJECT_HEADER) : [];
}

const isNotEmpty = value => {
    return !!value;
}

const printMessages = (key, messages) => {
    messages.forEach(message => {
        console.log(`${message.subApp} - ${message[key]}`);
    });
    if (messages.length === 0) {
        console.log("Nothing to report...")
    }
}

const print = (array, cmdArgs) => {
    console.log(`------------------------------ ${cmdArgs.environment.toUpperCase()} ------------------------------`)
    if (cmdArgs.table) {
        console.log(`------- Evaluating ${guessKeys(array)} for ${cmdArgs.environment.toUpperCase()} -------`);
        console.table(array);
    } else {
        guessKeys(array).forEach(key => {
            console.log(`------- Evaluating ${key} for ${cmdArgs.environment.toUpperCase()} -------`);
            let messages = array.filter(subApp => isNotEmpty(subApp[key]));
            printMessages(key, messages);
        });
    }
}

module.exports = {
    print
}
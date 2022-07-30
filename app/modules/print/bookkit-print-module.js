const {readBookkitConfiguration} = require("../configuration/configuration-reader-module");
const login = require("../client/authorize-module");
const {callCommand} = require("../client/calls");
const {guessKeysWithSpecificKeys, guessKeysWithoutSpecificKeys} = require("./helper/print-helper-module");

const generateUu5String = (messages, header) => {
    let columns = guessKeysWithSpecificKeys(messages, "subApp", header).map(col => {return {header: col}});
    let errorColorSchema = {
        colorSchema: "red",
        bgStyle: "filled"
    };
    let rows = messages
        // make sure only values for defined header will be filled
        .map(message => {
            return {
                subApp: message.subApp,
                [header]: message[header]
            }
        })
        .map(item => {
            return {
                value: Object.values(item),
                style: item[header].includes("NOK") ? errorColorSchema : {}
            }
        });
    return `<uu5string/>
        <UU5.Bricks.Lsi>
            <UU5.Bricks.Lsi.Item language="en">
                <UU5.Bricks.Section contentEditable level="3" header="${header}" colorSchema=null>
                    <UuContentKit.Bricks.BlockDefault>
                        <UU5.RichText.Block uu5string="Last update on ${new Date()}"/>
                    </UuContentKit.Bricks.BlockDefault>
                    <Uu5TilesBricks.Table 
                        data='<uu5json/>${JSON.stringify(rows)}' 
                        columns='<uu5json/>${JSON.stringify(columns)}'
                    />
                </UU5.Bricks.Section>
            </UU5.Bricks.Lsi.Item>
        </UU5.Bricks.Lsi>`;
}

const printToBookkit = async (evaluationResult, cmdArgs) => {
    let bookkitConfig = readBookkitConfiguration(cmdArgs);
    let token = await login(bookkitConfig.oidcHost, bookkitConfig.accessCode1, bookkitConfig.accessCode2);
    let envBookkitConfig = bookkitConfig.environment[cmdArgs.environment];

    for (const key of guessKeysWithoutSpecificKeys(evaluationResult, "subApp")) {
        if (envBookkitConfig.sections[key]) {
            let lock = await callCommand(`${bookkitConfig.uri}/lockPageSection`, "POST", {code: envBookkitConfig.sections[key], page: envBookkitConfig.page}, token);
            await callCommand(`${bookkitConfig.uri}/updatePageSection`, "POST", {
                code: envBookkitConfig.sections[key],
                page: envBookkitConfig.page,
                content: generateUu5String(evaluationResult, key),
                sys: {rev: lock.sys.rev}
            }, token);
            await callCommand(`${bookkitConfig.uri}/unlockPageSection`, "POST", {code: envBookkitConfig.sections[key], page: envBookkitConfig.page}, token);
        }
    }
}

module.exports = {printToBookkit};
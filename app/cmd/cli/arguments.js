const commandLineArgs = require('command-line-args');

const cmdArgumentsDefinition = [
  {
    name: 'command',
    defaultOption: true,
    type: String,
    description: 'check, help commands. All these can be used as default commands without providing --command argument.'
  },
  {
    name: 'config',
    alias: 'c',
    type: String,
    description: 'Base configuration folder path containing [env].json files with contexts.json for each environment.'
  },
  {
    name: 'environment',
    alias: 'e',
    type: String,
    description: 'Environment name defined in the base configuration folder unde the filename [env].json.'
  },
  {
    name: 'version',
    alias: 'v',
    type: Boolean,
    description: 'Display version of all uuApps deployed in the given environment.'
  },
  {
    name: 'rts',
    alias: 'r',
    type: Boolean,
    description: 'Display runtime stack of all uuApps deployed in the given environment.'
  },
  {
    name: 'deployment',
    alias: 'd',
    type: Boolean,
    description: 'Display and verify number and status of deployed uuApps in the given environment.'
  },
  {
    name: 'uri',
    alias: 'u',
    type: Boolean,
    description: 'Display uuApp deployment URI of all uuApps deployed in the given environment.'
  },
  {
    name: 'nodesize',
    alias: 'n',
    type: Boolean,
    description: 'Display uuApp node size of all uuApps deployed in the given environment.'
  },
  {
    name: 'memory',
    type: Boolean,
    description: 'Display uuApp RAM of all uuApps deployed in the given environment.'
  },
  {
    name: 'cpu',
    type: Boolean,
    description: 'Display uuApp CPU of all uuApps deployed in the given environment.'
  },
  {
    name: 'status',
    type: Boolean,
    description: 'Display uuApp container status.'
  },
  {
    name: 'fbpcm',
    type: Boolean,
    description: 'Display uuApp fbpcm of all uuApps deployed in the given environment.'
  },
  {
    name: 'table',
    alias: 't',
    type: Boolean,
    description: 'Diplay the ouput in the table form.'
  }
];

const cmdArguments = commandLineArgs(cmdArgumentsDefinition, { stopAtFirstUnknown: true });

module.exports = {
  cmdArgumentsDefinition,
  cmdArguments
};

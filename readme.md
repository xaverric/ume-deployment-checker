# ume-deployment-checker

## Installation
```
npm install -g ume-deployment-checker
```

## Usage
```
udc <command> <command parameters>
```

## Commands
```
help    Display help
check   Performs checks based on given parameters and configuration.
```

## Parameters

### --command string           
check, help commands. All these can be used as default commands without providing --command argument.

### -c, --config string        
Base configuration folder path containing *env.json* files with *contexts.json* for each environment.

### -e, --environment string   
Environment name defined in the base configuration folder unde the filename [env].json.

### -v, --version              
Display version of all uuApps deployed in the given environment.

### -r, --rts                  
Display runtime stack of all uuApps deployed in the given environment.

### -d, --deployment           
Display and verify number and status of deployed uuApps in the given environment.

### -t, --table               
Diplay the ouput in the table form.

## Configuration

### [env].json, i.e. env1.json
```js
{
  "uu-app-name": {
    "required": true, // identify whether should be checked by the tool at all
    "count": 1, // how many instances of the given uuApp with "uu-app-name" expected 
    "nodeSelectors": [ // expected node selectors, verified with deep equality
      {
        "key": "kind",
        "operator": "In",
        "values": [
          "app-mpls1"
        ]
      },
      {
        "key": "archive",
        "operator": "NotIn",
        "values": [
          "not"
        ]
      }
    ]
  },
  ...
```

### contexts.json
```js
[
  {
    "environment": "env1", // environment name, with same name the env1.json file must exist in the same folder
    "context": "env1-context-name", // k8s cluster name to which the tool will switch context via kubectl
    "nameSpace": "env1-namespace-name" // cluster namespace where the environment lives
  },
  ...
]
```
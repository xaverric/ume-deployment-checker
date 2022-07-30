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
print   Performs print based on given parameters and configuration. Result is printed into the defined bookkit page.
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

### -u, --uri                  
Display uuApp deployment URI of all uuApps deployed in the given environment.

### -n, --nodesize             
Display uuApp node size of all uuApps deployed in the given environment.

### --memory                   
Display uuApp RAM of all uuApps deployed in the given environment.

### --cpu                      
Display uuApp CPU of all uuApps deployed in the given environment.

### --status
Display container uuApp status.

### -t, --table               
Diplay the ouput in the table form.

## Configuration

### [env].json, i.e. env1.json
```json
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
        ],
        "nodeSize": "NODESIZE_NAME"  
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
```json
[
  {
    "environment": "env1", // environment name, with same name the env1.json file must exist in the same folder
    "context": "env1-context-name", // k8s cluster name to which the tool will switch context via kubectl
    "nameSpace": "env1-namespace-name" // cluster namespace where the environment lives
  },
  ...
]
```

### nodesizes.json
```json
{
    "NODESIZE_NAME": {
        "cpu": "1",
        "memory": "512Mi"
    },
    ...
}
```

### bookkit-config.json
```json
{
  "accessCode1": "...", // login credentials to bookkit (user must have privileges to mannipulate with the book content)
  "accessCode2": "...", // login credentials to bookkit (user must have privileges to mannipulate with the book content)
  "oidcHost": "...", // oidc/grantToken uri
  "uri": "...", // book base uri
  "environment": {
    "env1": { // environment name, with same name the env1.json file must exist in the same folder
      // page and sections codes must already exist in the book. Sections will be updated with content from the ume-deployment-checker
      "page": "env1-page-code",
      "sections": {
        // section codes for each check in the given bookkit page.
        "DEPLOYMENT": "",
        "NODE_SIZE": "...",
        "VERSION": "...",
        "RUNTIME_STACK": "...",
        "UUAPP_DEPLOYMENT_URI": "...",
        "MEMORY": "...",
        "CPU": "...",
        "CONTAINER_STATUS": "..."
      }
    },
    ...
  }
}
```

## Logs
logs are automatically stored to the ```%HOME%/.ume-deployment-checker/logs``` folder
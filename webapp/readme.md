# Initialize environment for development

```
npm init
```


# Deploy App
export REGION="japaneast"
export PREFIX="ws$RANDOM$RANDOM"
export RGNAME="$PREFIX"
export INSIGHTSWEB="$PREFIX"

az group create --name $RGNAME  -l $REGION
az appservice plan create --is-linux -g $RGNAME -n $PREFIX -l $REGION  --sku FREE
az webapp create -g $RGNAME -n $PREFIX -p $PREFIX --deployment-local-git --runtime "node|10.15"


# Config Webapp



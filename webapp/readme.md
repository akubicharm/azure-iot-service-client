# 開発環境の設定

```
npm init
```

# アプリケーションのデプロイ
az webapp up

# 環境変数の設定
IoT HubのShared Access Policy の service の接続文字列を設定

```
az webapp config appsettings set --settings AzureIoTHubConnectionString='接続文字列'
```
 
# アクセス方法

Method: POST

Body :
 `{"message": "hello", "device": "dev01"}`


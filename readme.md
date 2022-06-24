## Introduction

A simple nodejs script to decrypt privateKey with passcode to from PDF encrypted key provided by BitGO

## Get started

```
npm install
npm start
```

By default it will look for below file in same folder:

- privateKey.json -> content of the encryptedText file
- passcode : the passcode to decrypt above text

If the file is not existing you need to enter it into terminal console follow the prompt instruction

## Warning

This script will decrypt your key using passcode on your local. The descryption is handled by 3rd library. Use at your own risk. The privateKey and passcode will stay in your terminal history logs so please make sure you clean terminal after use

```
clear
// or cls
```

#!/usr/bin/env node

const sjcl = require("@bitgo/sjcl");
const fs = require('fs');
(async () => {

  const { default: inquirer } = await import('inquirer');
  const privateKeyFileName = 'privateKey.json';
  const passcodeFileName = 'passcode';
  const readFile = (f) => fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : '';
  let encryptedString = readFile(privateKeyFileName);
  let passcode = readFile(passcodeFileName);

  const input = await inquirer.prompt([
    {
      name: 'encryptedString',
      message: 'Your encrypted string (copy from pdf) - if  having problem, using base64 string?',
      default: encryptedString,
      filter: (x, y) => {
        try {
          const out = Buffer.from(x, 'base64').toString()
          if (!out) return x;
          return out;
        }
        catch (err) {
          //swallow
        }
        return x;
      },
      validate: (x) => {
        try {
          JSON.parse(x);
          return true;
        } catch (e) {
          return e.message
        }
      },
      require: false,
      type: 'input'
    },
    {
      name: 'passcode',
      message: 'Your passcode ?',
      default: passcode,
      validate: (x) => x === '' ? "Please enter valid passcode" : true,
      require: false,
      type: 'input'
    }
  ]);
  try {
    var decryptedString = sjcl.decrypt(input.passcode, input.encryptedString);
    console.log("Your privateKey:", decryptedString)
    console.warn('Please dont share your privateKey with others')
  } catch (err) {
    console.error(err.message)
  }
})();
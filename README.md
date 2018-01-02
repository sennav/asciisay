# Asciisay

Like [cowsay](http://en.wikipedia.org/wiki/Cowsay) and [yosay](https://github.com/yeoman/yosay), but with whatever ascii art you want.

## Install

```
$ npm install --save asciisay
```


## Usage


```js
const asciisay = require('asciisay');

console.log(asciisay("I'm a cat but I could be whatever"));



        ᐱ  ᐱ     
   ╭───( -.-)     ╭───────────────────────────────────────────╮
  /(=>__<m_m>     │ I am a cat, but I could be whatever dude! │
  ‾‾‾‾‾           ╰───────────────────────────────────────────╯
 
```

To customize your asciisay just use the options object:

```js
const asciisay = require('asciisay');

const myLogo =
'       ᐱᐱ       \n'+
'      (. .)      \n'+
'      =>▽<=   _  \n'+
'     /|| ||\ /   \n'+
'    (m(m m)m)    \n';

const options = {
    avatar: myLogo, // Your ascii art
    padding: 8, // Distance between the longer string of your avatar and the message
    startFraction: 3, // Portion of free space your message or avatar (the smaller) will appear
}

function myLogoSay(message) {
    return asciisay(message, options);
}

console.log(myLogoSay("I am different cat now!"));

    ᐱᐱ      
   (. .)       ╭─────────────────────────╮
   =>▽<=   _   │ I am different cat now! │
  /|| ||\ /    ╰─────────────────────────╯
 (m(m m)m)
 
```

## CLI

You can use asciisay as a cli command

```
$ npm install --global asciisay
```

```js
$ fortune | asciisay


        ᐱ  ᐱ   
   ╭───( -.-)     ╭───────────────────────────────────╮
  /(=>__<m_m>     │ I am a cat, not a fortune teller! │
  ‾‾‾‾‾           ╰───────────────────────────────────╯

```

[LICENSE ISC](./LICENSE.md)
const chalk = require('chalk');
const stripAnsi = require('strip-ansi');
const cat = require('./cat');
const cow = require('./cow');

const defaultOptions = {
  padding: 4,
  startFraction: 2,
  avatar: cat,
};

function ballonMessage(message) {
  let resultMessage = '';
  let messageArray = message.split('\n');
  messageArray = messageArray.map(line => line.replace(/\n/g, '').replace(/\t/g, '    '));
  const maxWidth = Math.max(...messageArray.map(line => stripAnsi(line).length));
  const horizontalLine = Array(maxWidth + 1).join('─');
  resultMessage += `╭─${horizontalLine}─╮\n`;
  messageArray.forEach((line) => {
    const paddingStr = Array((maxWidth + 1) - stripAnsi(line).length).join(' ');
    resultMessage += `│ ${line}${paddingStr} │\n`;
  });
  resultMessage += `╰─${horizontalLine}─╯\n`;
  return resultMessage;
}

module.exports = (message, userOptions) => {
  let options = userOptions || {};
  if (options.cow) {
    defaultOptions.avatar = cow;
  }
  options = Object.assign(defaultOptions, options);
  const avatar = options.ascii || chalk.red(options.avatar);
  let result = '\n';
  const messageWithBallon = ballonMessage(message);
  const avatarArray = avatar.split('\n');
  const messageArray = messageWithBallon.split('\n');
  const maxWidth = Math.max(...avatarArray.map(line => stripAnsi(line).length));
  const maxHeight = Math.max(avatarArray.length, messageArray.length);

  const messageStart = Math.floor((maxHeight - messageArray.length) / options.startFraction);
  const avatarStart = Math.floor((maxHeight - avatarArray.length) / options.startFraction);

  for (let i = 0; i < maxHeight; i += 1) {
    let avatarLine = '';
    let messageLine = '';

    if (i >= avatarStart && i < avatarStart + avatarArray.length) {
      avatarLine = avatarArray[i - avatarStart].replace('\n', '');
    }

    if (i >= messageStart && i < messageStart + messageArray.length) {
      messageLine = messageArray[i - messageStart].replace('\n', '');
    }

    const paddingStr = Array((maxWidth - stripAnsi(avatarLine).length) + options.padding).join(' ');
    result += `${avatarLine}${paddingStr}${messageLine}\n`;
  }
  return result;
};

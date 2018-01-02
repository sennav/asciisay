#! /usr/bin/env node

const asciisay = require('./asciisay');

if (process.argv[2]) {
  const message = process.argv[2] || 'say whaaaat?\nwhaaaat?';
  process.stdout.write(asciisay(message));
} else {
  let message = '';
  process.stdin.on('data', (chunk) => {
    message += chunk;
  });
  process.stdin.on('end', () => process.stdout.write(asciisay(message)));
}

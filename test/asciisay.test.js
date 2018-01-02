const rewire = require('rewire');
const { expect } = require('chai');

const asciisay = rewire('../asciisay');
const ballonMessage = asciisay.__get__('ballonMessage'); // eslint-disable-line

describe('asciisay', () => {
  describe('ballonMessage', () => {
    it('should enclose the message in a ballon', () => {
      const msg = 'bla\na';
      const bMsg = ballonMessage(msg);
      bMsg.split('\n').forEach((line) => {
        expect(line).to.match(/(^[╰│╭]{1}[ ─]{1}.{3}[ ─]{1}[╮│╯]{1}|^)/);
      });
    });
    it('should be valid on empty messages', () => {
      const msg = '';
      const bMsg = ballonMessage(msg);
      bMsg.split('\n').forEach((line) => {
        expect(line).to.match(/(^[╰│╭]{1}[ ─]{1}[ ─]{1}[╮│╯]{1}|^)/);
      });
    });
  });
  describe('asciisay', () => {
    it('should return the avatar and the message', () => {
      const msg = 'bla';
      const avatar = '|\n';
      const avatarMsg = asciisay(msg, { avatar });
      avatarMsg.split('\n').forEach((line) => {
        expect(line).to.match(/(^[ |]{1}[ ]{4}[╰│╭]{1}[ ─]{1}.{3}[ ─]{1}[╮│╯]{1}|^)/);
      });
    });
    it('should change padding between the avatar and the message', () => {
      const msg = 'bla';
      const avatar = '|\n';
      const padding = 8;
      const avatarMsg = asciisay(msg, { avatar, padding });
      const regexStr =
        new RegExp(`(^[ |]{1}[ ]{${padding}}[╰│╭]{1}[ ─]{1}.{3}[ ─]{1}[╮│╯]{1}|^)`, 'g');
      avatarMsg.split('\n').forEach((line) => {
        expect(line).to.match(regexStr);
      });
    });
    it('should work when the avatar is bigger than the message', () => {
      const msg = 'bla';
      const avatar = '|\n|\n|\n|\n|\n|\n|\n|\n';
      const avatarMsg = asciisay(msg, { avatar });
      avatarMsg.split('\n').forEach((line) => {
        expect(line).to.match(/(^[ |]{1}[ ]{4}[╰│╭]{1}[ ─]{1}.{3}[ ─]{1}[╮│╯]{1}|^)/);
      });
    });
    it('should work when the message is bigger than the avatar', () => {
      const msg = 'bla\nbla\nbla\nbla\nbla\nbla\nbla\n';
      const avatar = '|';
      const avatarMsg = asciisay(msg, { avatar });
      avatarMsg.split('\n').forEach((line) => {
        expect(line).to.match(/(^[ |]{1}[ ]{4}[╰│╭]{1}[ ─]{1}.{3}[ ─]{1}[╮│╯]{1}|^)/);
      });
    });
  });
});

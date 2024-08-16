const { ImapFlow } = require('imapflow');
const { simpleParser } = require('mailparser');

module.exports = {
  friendlyName: 'Get Email attachment',

  description: 'Get Email attachemnt',

  inputs: {
    uid: {
      type: 'string',
      required: true,
    },
    mailbox: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    nonSuccess: {
      description: 'Error',
    },
  },

  fn: async function ({ uid, mailbox }, exits) {
    const imapConfig = sails.config.custom.imapConfig;
    const client = new ImapFlow(imapConfig);
    await client.connect();
    const lock = await client.getMailboxLock(mailbox);
    let attachment;
    try {
      const email = await client.download(uid, null, { uid: true });
      const parsedEmail = await simpleParser(email.content);
      attachment = parsedEmail.attachments[0].content;
    } catch (err) {
      console.log(err);
    } finally {
      lock.release();
      await client.logout();
    }
    return exits.success(attachment);
  },
};

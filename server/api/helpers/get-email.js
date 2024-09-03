const { ImapFlow } = require('imapflow');

async function getUnreadEmailFromMailbox(mailbox) {
  const allUnreadEmails = [];
  const imapConfig = sails.config.custom.imapConfig;
  const client = new ImapFlow(imapConfig);
  await client.connect();
  const lock = await client.getMailboxLock(mailbox);
  try {
    for await (const msg of client.fetch(
      {
        seen: false,
      },
      {
        uid: true,
        internalDate: true,
        envelope: true,
      }
    )) {
      const { uid, internalDate, envelope } = msg;
      const { messageId, cc, replyTo, subject } = envelope;
      const cleanSubject = subject.replace('Re: ', '');
      allUnreadEmails.push({
        uid,
        messageId,
        internalDate,
        cc,
        replyTo,
        subject: cleanSubject,
      });
    }
    for (const i in allUnreadEmails) {
      const msg = allUnreadEmails[i];
      await client.messageFlagsAdd({ uid: msg.uid }, ['\\Seen'], { uid: true });
    }
  } catch (err) {
    console.log(err);
  } finally {
    lock.release();
    await client.logout();
  }

  return allUnreadEmails;
}

const groupEmailsBySubject = (emails) => {
  // eslint-disable-next-line eqeqeq
  if (emails == null || emails.length === 0) return [];
  const res = _(emails).groupBy('subject').map(g => _.max(g, 'internalDate')).value();
  return res;
};

module.exports = {
  friendlyName: 'Get Emails',

  description: 'Get unread emails from specified mailbox. If email has the same subject, only return the latest one',

  inputs: {
    mailbox: {
      type: 'string',
      required: true
    },
  },

  exits: {
    success: {
      description: 'Emails retrieved',
    },
  },

  fn: async function ({ mailbox }, exits) {
    let allUnreadEmails = [];
    try {
      allUnreadEmails = await getUnreadEmailFromMailbox(mailbox);
    } catch (err) {
      console.log(err);
    }

    return exits.success(groupEmailsBySubject(allUnreadEmails));
  }
};

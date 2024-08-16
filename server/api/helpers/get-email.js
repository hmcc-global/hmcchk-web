const { ImapFlow } = require('imapflow');

const imapConfig = {
  auth: {
    user: process.env.EMAIL_READ_USER,
    pass: process.env.EMAIL_PWD,
  },
  host: 'imap.gmail.com',
  port: 993,
  secure: true,
  logger: false,
};

const getSubjectFromHeader = (header) => {
  const subjectRegex = /\nSubject:\s*(.+)/i;
  const match = header.match(subjectRegex);
  const result = match ? match[1] : null;

  // eslint-disable-next-line eqeqeq
  if (result == null) return result;
  return result.replace('Re: ', '');
};

const getEmailMetaData = (msg) => {
  const { headers, uid, internalDate } = msg;
  const subject = getSubjectFromHeader(headers.toString('utf8'));
  // eslint-disable-next-line eqeqeq
  if (subject == null) return null;
  return {
    uid,
    internalDate,
    subject
  };
};

async function getUnreadEmailFromMailbox(mailbox) {
  const allUnreadEmails = [];
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
        headers: true,
      }
    )) {
      const msgObj = getEmailMetaData(msg);
      // eslint-disable-next-line eqeqeq
      if (msgObj == null) continue;
      allUnreadEmails.push(getEmailMetaData(msg));
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

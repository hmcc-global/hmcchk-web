const xlsx = require('node-xlsx');

const verifyUserData = (userData) => {
  return (
    // eslint-disable-next-line eqeqeq
    userData[0] != null && userData[1] != null && userData[2] != null && userData[3] != null && userData[4] != null &&
    userData[0] !== '' && userData[1] !== '' && userData[2] !== '' && userData[3] !== '' && userData[4] !== ''
  );
};

// Format of EXCEL file
//   |      A      |     B     |        C          |      D       |
// 1 | lifeGroupId   | someId  |                   |              |
// 2 | lifeGroupName | name    |                   |              |
// 3 |               |         |                   |              |
// 4 | Name          | Phone # | Email             | Lifestage    |
// 5 | personA       | 123     | personA@gmail.com | Single Adult |
const parseWorksheet = (worksheet, isBatch) => {
  const rawData = worksheet.data;
  // eslint-disable-next-line eqeqeq
  if (rawData == null) return {};
  const data = rawData.filter((e, i) => i < 5 || rawData[i].length === 5);

  const lifeGroupName = isBatch ? data[1][1] : data[0][1];
  let lifeGroupId;
  const users = [];
  if (isBatch) {
    lifeGroupId = data[0][1];
    for (let i = 4; i < data.length; i++) {
      if (data[i].length !== 5) continue;

      const userData = data[i];
      if (verifyUserData(userData)) {
        users.push({
          name: userData[0],
          phoneNumber: userData[1],
          email: userData[2],
          lifestage: userData[3],
          campus: userData[4],
        });
      }
    }
  } else {
    const userData = data[3];
    if (userData.length === 5 && verifyUserData(userData)) {
      users.push({
        name: userData[0],
        phoneNumber: userData[1],
        email: userData[2],
        lifestage: userData[3],
        campus: userData[4],
      });
    }
  }

  return {
    lifeGroupId,
    lifeGroupName,
    users,
  };
};

async function updateUserInfo(users, lifeGroup) {
  const invalidUsers = [];
  const validUsers = [];

  for (const i in users) {
    const updateUserData = users[i];
    const user = await User.find({
      or: [
        { email: updateUserData.email },
        { phoneNumber: updateUserData.phoneNumber },
      ]
    });

    // eslint-disable-next-line eqeqeq
    if (user == null || user[0] == null) {
      invalidUsers.push(updateUserData);
      continue;
    }

    const result = await User.updateOne({
      _id: user[0].id,
    }).set({
      lifestage: updateUserData.lifestage,
      lifeGroup: lifeGroup,
      campus: updateUserData.campus,
    });
    // eslint-disable-next-line eqeqeq
    if (result == null) {
      invalidUsers.push(updateUserData);
      continue;
    }
    validUsers.push(updateUserData);
  }
  return {
    invalidUsers,
    validUsers
  };
}

module.exports = {
  friendlyName: 'Parse User Query',

  description: 'Function to parse email attachments containing user data',

  inputs: {},

  exits: {
    nonSuccess: {
      description: 'Error',
    },
  },

  fn: async function (_, exits) {
    const mailboxByType = sails.config.custom.parseUserMailbox;
    const errors = [];
    const successes = [];
    for (const type in mailboxByType) {
      const isBatch = type === 'batch';
      const mailbox = mailboxByType[type];
      const unreadEmails = await sails.helpers.getEmail(mailbox);
      if (unreadEmails.length === 0) continue;

      for (const i in unreadEmails) {
        const { uid, messageId, subject, cc, replyTo } = unreadEmails[i];
        const attachmentBuffer = await sails.helpers.emailhelpers.getEmailAttachment(unreadEmails[i].uid, mailbox);
        const workbook = xlsx.parse(attachmentBuffer);
        const parseObj = parseWorksheet(workbook[0], isBatch);
        const { lifeGroupId, lifeGroupName, users } = parseObj;

        // Update LG name if isBatch
        if (isBatch) {
          // eslint-disable-next-line eqeqeq
          if (lifeGroupId != null && lifeGroupId !== '' && lifeGroupName != null && lifeGroupName !== '') {
            try {
              const existing = await LeadershipTeam.updateOne({ id: lifeGroupId }).set({
                lifeGroup: parseObj.lifeGroupName
              });

              // eslint-disable-next-line eqeqeq
              if (existing == null) {
                throw new Error(`Unable to update LG: ${lifeGroupName} with id: ${lifeGroupId}`);
              }
            } catch (err) {
              errors.push({
                uid,
                messageId,
                cc,
                replyTo,
                subject,
                message: err,
                users,
              });
              sails.log.error(err);
              continue;
            }
          }
        }

        // ensure LG name is valid
        const latestLifeGroups = await sails.helpers.leadershipteam.getLatestLeadershipTeams();
        if (!latestLifeGroups.some(lg => lg.lifeGroup === lifeGroupName)) {
          const message = `Invalid LG Name: ${lifeGroupName}`;
          errors.push({
            uid,
            messageId,
            cc,
            replyTo,
            subject,
            message,
            users,
          });
          sails.log.error(message);
          continue;
        }

        // update Users using the parsed data
        const result = await updateUserInfo(users, lifeGroupName);
        if (result.invalidUsers.length > 0) {
          const message = 'Unable to update some users, they may not have a valid HMCC account';
          errors.push({
            uid,
            messageId,
            cc,
            replyTo,
            subject,
            message,
            users: result.invalidUsers
          });
        }

        if (result.validUsers.length > 0) {
          successes.push({
            uid: uid,
            messageId,
            cc,
            replyTo,
            subject,
            users: result.validUsers
          });
        }
      }
    }

    if (errors.length > 0 ) {
      for (const fail of errors) {
        const { replyTo, messageId, cc, subject, message, users } = fail;
        await sails.helpers.sendTemplateEmail.with({
          to: replyTo[0].address,
          inReplyTo: messageId,
          references: [messageId],
          // eslint-disable-next-line eqeqeq
          cc: cc == null ? [] : cc.map(i => i.address),
          subject: subject,
          template: 'email-fail-parse-query',
          templateData: {
            users,
            message,
          }
        });
      }
    }

    if (successes.length > 0) {
      for (const success of successes) {
        const { replyTo, messageId, cc, subject, users } = success;
        await sails.helpers.sendTemplateEmail.with({
          to: replyTo[0].address,
          inReplyTo: messageId,
          references: [messageId],
          cc: cc == null ? [] : cc.map(i => i.address),
          subject: subject,
          template: 'email-success-parse-query',
          templateData: {
            users
          }
        });
      }
    }

    return exits.success();
  },
};


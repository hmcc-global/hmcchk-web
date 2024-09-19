const xlsx = require('exceljs');
const fs = require('fs');

module.exports = {
  friendlyName: 'Send Single User Query',

  description: 'Send Email to recipient to request User data',

  inputs: {
    submissionId: {
      type: 'string',
      required: true,
    },
    submissionData: {
      type: 'ref',
      required: true,
    },
    emailRecipients: {
      type: 'ref',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'Sent Single User Query request successfully',
    },
    invalid: {
      description: 'Failed',
    },
  },
  fn: async function ({ submissionId, submissionData, emailRecipients }, exits) {
    const latestLeadershipTeams = await sails.helpers.leadershipteam.getLatestLeadershipTeams();
    // eslint-disable-next-line eqeqeq
    if (latestLeadershipTeams == null || latestLeadershipTeams.length === 0) return exits.success();

    // modify Excel by populating the lifestage list
    // eslint-disable-next-line eqeqeq
    const allLifestage = [...new Set(latestLeadershipTeams.map(x => x.lifestage).filter(x => x != null && x !== ''))];
    // eslint-disable-next-line eqeqeq
    const allLifeGroups = [...new Set(latestLeadershipTeams.map(x => x.lifeGroup).filter(x => x != null && x !== ''))];
    // eslint-disable-next-line eqeqeq
    const allCampus = [...new Set(latestLeadershipTeams.map(x => x.campus).filter(x => x != null && x !== ''))];

    const workbook = new xlsx.Workbook();
    await workbook.xlsx.readFile('assets/attachments/single_user_data_query.xlsx');
    const worksheet = workbook.getWorksheet('Sheet2');

    // set the lifeGroup and lifestage using latest list
    for (let i = 0; i < Math.max(allLifeGroups.length, allLifestage.length, allCampus.length); i++) {
      const rowIndex = i + 2;
      const row = worksheet.getRow(rowIndex);
      // eslint-disable-next-line eqeqeq
      const lifeGroup = allLifeGroups[i] == null ? '' : allLifeGroups[i];
      // eslint-disable-next-line eqeqeq
      const lifestage = allLifestage[i] == null ? '' : allLifestage[i];
      // eslint-disable-next-line eqeqeq
      const campus = allCampus[i] == null ? '' : allCampus[i];

      row.values = [lifeGroup, lifestage, campus];
      row.commit();
    }

    // fill in the user's info
    const fileName = `assets/attachments/${submissionId}.xlsx`;
    const firstWorksheet = workbook.getWorksheet('Sheet1');
    const rowToFill = firstWorksheet.getRow(5);
    const userPhone = submissionData.phoneNumber || submissionData['Phone Number'];
    rowToFill.values = [submissionData.fullName, userPhone, submissionData.email, '', ''];
    rowToFill.getCell('D').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor:{argb:'00FFFF'},
    };
    rowToFill.getCell('E').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor:{argb:'00FFFF'},
    };
    await workbook.xlsx.writeFile(fileName);

    try {
      await sails.helpers.sendTemplateEmail.with({
        to: emailRecipients,
        subject: `[ACTION]: Single User Data Query: ID: ${submissionId}`,
        template: 'email-parse-user-query',
        attachments: [
          {
            filename: 'query.xlsx',
            path: fileName
          }
        ]
      });
    } catch (err) {
      console.log(err);
    }


    fs.rmSync(fileName, { force: true });
    return exits.success();
  },
};


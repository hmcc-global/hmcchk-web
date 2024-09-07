const { DateTime } = require('luxon');
const xlsx = require('exceljs');
const fs = require('fs');

module.exports = {
  friendlyName: 'Send Batch User Query',

  description: 'Send Emails latest Leadership Teams to request User data',

  inputs: {
  },

  exits: {
    success: {
      description: 'Sent Batch User Query request successfully',
    },
    invalid: {
      description: 'Failed',
    },
  },
  fn: async function (_, exits) {
    const latestLeadershipTeams = await sails.helpers.leadershipteam.getLatestLeadershipTeams();
    // eslint-disable-next-line eqeqeq
    if (latestLeadershipTeams == null || latestLeadershipTeams.length === 0) return exits.success();

    const todayMinus3Weeks = DateTime.now().plus({ weeks: -3 });
    const filteredTeams = latestLeadershipTeams.filter(i => DateTime.fromISO(i.seasonFrom) <= todayMinus3Weeks);

    // modify Excel by populating the lifestage list
    // eslint-disable-next-line eqeqeq
    const allLifestage = [...new Set(latestLeadershipTeams.map(x => x.lifestage).filter(x => x!= null && x!== ''))];

    const workbook = new xlsx.Workbook();
    await workbook.xlsx.readFile('assets/attachments/batch_user_data_query.xlsx');
    const worksheet = workbook.getWorksheet('Sheet2');

    // set the lifestage using latest list
    for (let i = 0; i < allLifestage.length; i++) {
      const rowIndex = i + 2;
      const row = worksheet.getRow(rowIndex);
      row.values = ['', allLifestage[i]];
      row.commit();
    }

    const fileNamesToDelete = [];
    for (const team of filteredTeams) {
      try {
        const fileName = `assets/attachments/${team.lifeGroup}.xlsx`;
        const firstWorksheet = workbook.getWorksheet('Sheet1');
        const row = firstWorksheet.getRow(1);
        row.values = ['lifeGroupId', team.id];
        row.commit();

        await workbook.xlsx.writeFile(fileName);
        fileNamesToDelete.push(fileName);

        if (team.leaderEmails) {
          await sails.helpers.sendTemplateEmail.with({
            to: team.leaderEmails,
            subject: `[ACTION]: Batch User Data Query: ${team.lifeGroup}`,
            template: 'email-batch-parse-query',
            attachments: [
              {
                filename: 'query.xlsx',
                path: fileName
              }
            ]
          });
        }
      } catch (err) {
        console.log(err);
      }
    }


    for (const del of fileNamesToDelete) {
      fs.rmSync(del, { force: true });
    }
    return exits.success();
  },
};


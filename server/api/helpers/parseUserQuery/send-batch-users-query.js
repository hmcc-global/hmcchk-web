const { DateTime } = require('luxon');
const xlsx = require('exceljs');
const fs = require('fs');

module.exports = {
  friendlyName: 'Send Batch User Query',

  description: 'Send Emails to latest Leadership Teams to request User data',

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
    // only send batch query once after 3 Saturdays have passed from season start
    const filteredTeams = latestLeadershipTeams.filter(i => DateTime.fromISO(i.seasonFrom).weekNumber === todayMinus3Weeks.weekNumber && i.lifeGroup !== 'Not Applicable');

    // modify Excel by populating the lifestage list
    // eslint-disable-next-line eqeqeq
    const allLifestage = [...new Set(latestLeadershipTeams.map(x => x.lifestage).filter(x => x != null && x !== ''))];
    // eslint-disable-next-line eqeqeq
    const allCampus = [...new Set(latestLeadershipTeams.map(x => x.campus).filter(x => x != null && x !== ''))];

    const workbook = new xlsx.Workbook();
    await workbook.xlsx.readFile('assets/attachments/batch_user_data_query.xlsx');
    const worksheet = workbook.getWorksheet('Sheet2');

    // set the lifestage and campus using latest list
    for (let i = 0; i < Math.max(allCampus.length, allLifestage.length); i++) {
      const rowIndex = i + 2;
      const row = worksheet.getRow(rowIndex);

      // eslint-disable-next-line eqeqeq
      const lifestage = allLifestage[i] == null ? '' : allLifestage[i];
      // eslint-disable-next-line eqeqeq
      const campus = allCampus[i] == null ? '' : allCampus[i];

      row.values = ['', lifestage, campus];
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
          const filteredEmails = team.leaderEmails.filter(x => x !== 'hongkong@hongkong.hmcc.net');
          await sails.helpers.sendTemplateEmail.with({
            to: filteredEmails,
            subject: `[ACTION]: LIFE Group Info Needed - ${team.lifeGroup}`,
            template: 'email-parse-user-query',
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


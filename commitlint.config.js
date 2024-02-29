const { execSync } = require('child_process');

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-empty': [0, 'never'],
    'type-empty': [0, 'never'],
    'commit-msg-format': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        'commit-msg-format': ({ header }) => {
          let branchName = '';
          let issueNumber = '';
          try {
            branchName = execSync('git rev-parse --abbrev-ref HEAD')
              .toString()
              .trim();
            issueNumber = branchName.match(/^\d+/);
          } catch (e) {
            return [false, 'Error getting branch name'];
          }
          const commitMsgRegex = new RegExp(`^GH-${issueNumber}: .+$`);

          return [
            commitMsgRegex.test(header),
            'Commit message should be in the format: GH-{issue number}: {message}',
          ];
        },
      },
    },
  ],
};

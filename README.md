# HMCC HK Web Repo

This HMCC HK's Web Repo built on SailsJS and React

## Installation

1. Clone the repo
2. Run `yarn`
3. Run `cd server && yarn`
4. Run `cd ui && yarn`

## Usage

1. Open your choice of Terminal/cmd/PowerShell
2. Run `cd server && nodemon ./app.js`
3. Open another new Terminal/cmd/PowerShell
4. Run `cd ui && yarn start`

## Contributing Rules

1. ALL pull requests MUST be reviewed
2. Only HOTFIX branches are allowed to be merged directly into `main`

### Branch Prefix Definitions

`main` - Our Production branch. This is what our production server will always be hosting. Hence, this is also the branch that our local development will rebase off and merge into, as it is the most updated.

`release` - This is a branch that we will create from `main` and bundle our personal features/tasks to. At every end of a project/sprint cycle, this branch will be merged into `main`

`feature` - This is a branch for our own personal features/tasks that we will be working on

`hotfix` - This is a branch for hotfixes that will directly be merged into `main` regardless of release/sprint cycle

#### Branch Best Practices

1. Branch naming convention: `(issueNumber)-(branchName)-description-of-task` (e.g `4-feature-anncmt-rest-api`, `release-sermon-notes`)
   - issueNumber: this can be found beside the issue title when you click into an issue, or the number at the end of the issue link (eg. https://github.com/hmcc-global/hmcchk-web/issues/8 <--- #8)
     - This is helpful so that we can keep track of what issue a branch is working on without having to look up the list of issues etc.
   - branchName: refer to Branch Prefix Definitions
2. When working on your own `feature` branch, do not forget to periodically update your local branch with the `release` branch to reduce the likelihood/size of merge conflicts
   - Instead of `git pull` we use `git pull --rebase` to pull changes from the remote branch to our local branch. Rebasing helps to keep our Gitflow neat and linear which makes it easy to keep track of and trace
3. When all code changes have been finished in your `feature` branch, create a Pull Request and your peers review it before merging.
4. Branch merge flow should be: `feature`->`release`->`main` - i.e `feature` branches should always Pull Request and merge into `release`, and then from `release` to `main`

## Commit Practices
1. Attach Issue number to the commit message
    - e.g. Issue number = #8
    - commit message: "GH-8: Some commit message"
    - note that issue number must be prefixed with 'GH-' in order to properly connect commit messages with issues

### Contributors

Jesus' disciples

---

_Engage people who were, are, and will be a part of HMCC-HK, in order to Equip them with resources and Enable the church vision to be lived out._

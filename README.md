# A Space 2 Grow Website
## Architecture Team:
- Cris
- Michaela

## Design Team:
- Mihai
- Cris
- Phyu Sin Mon
- Sarah
- Michaela

## Front-End Team:
- Mihai
- Cris
- Phyu Sin Mon
- Sarah
- Michaela

## Back-End Team:
- Mihai
- Cris
- Christiana
- Aung Ko Min

## Database Team: 
- Christiana
- Aung Ko Min



# Commit Standards

## Branches

- **dev-frontend** -> pr this branch for everything `frontend` related
- **dev-backend** -> pr this branch for everything `backend` related
- **main** -> **dont touch** this branch, this is what is running in production.

## Contributions

A Space 2 Grow is open to contributions, but I recommend creating an issue or replying in a comment to let us know what you are working on first that way we don't overwrite each other.

## Contribution Guidelines

1. Clone the repo `git clone https://github.com/DevSocUOS/A-Space-2-Grow-Website.git`.
2. Open your terminal & set the origin branch: `git remote add origin https://github.com/DevSocUOS/A-Space-2-Grow-Website.git`
3. Pull origin `git pull origin dev`
4. Create a new branch for the task you were assigned to, eg `YourInitials-IssueNumber/(Feat/Bug/Fix/Chore)/Ticket-title` : `git checkout -b MA-001/Feat/Sign-Up-Form`
5. After making changes, do `git add .`
6. Commit your changes with a descriptive commit message : `git commit -m "your commit message"`.
7. To make sure there are no conflicts, run `git pull origin dev`.
8. Push changes to your new branch, run `git push -u origin MA-001/Feat/Sign-Up-Form`.
9. Create a pull request to the `dev-frontend` or `dev-backend` branch NOT `main`.
10. Ensure to describe your pull request.
11. > If you've added code that should be tested, add some test examples.

# Merging

Under any circumstances should you merge a pull requests on a specific branch to the `dev-frontend`, `dev-backend` or `main` branch

### _Commit CheatSheet_

| Type     |                          | Description                                                                                                 |
| -------- | ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| feat     | Features                 | A new feature                                                                                               |
| fix      | Bug Fixes                | A bug fix                                                                                                   |
| docs     | Documentation            | Documentation only changes                                                                                  |
| style    | Styles                   | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)      |
| refactor | Code Refactoring         | A code change that neither fixes a bug nor adds a feature                                                   |
| perf     | Performance Improvements | A code change that improves performance                                                                     |
| test     | Tests                    | Adding missing tests or correcting existing tests                                                           |
| build    | Builds                   | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)         |
| ci       | Continuous Integrations  | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) |
| chore    | Chores                   | Other changes that don't modify , frontend, backend or test files                                                    |
| revert   | Reverts                  | Reverts a previous commit                                                                                   |

> _Sample Commit Messages_

- `chore: Updated README file` := `chore` is used because the commit didn't make any changes to the , frontend or test folders in any way.
- `feat: Added plugin info endpoints` := `feat` is used here because the feature was non-existent before the commit.

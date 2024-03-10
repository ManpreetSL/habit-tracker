## 06/08/2023
Feeling so much paralysis with this because it's been such a long task and each time i come back to it, I don't know what I was doing loool.

It felt good earlier to just do very small, granular commits. Felt momentum-building, but also just so clear like a step-by-step history, which I feel like commits should always be.

So let's break down what actually needs to be done in this task, and keep noting down what problems I'm facing along the way.


## To do

### Save default habits
- [x] Save default habits using the REST API
Works, but if there's an error with one part e.g. with creating the entries, the goals/habits are still created - how do I rollback the behaviour so it's all or nothing?
- [x] Confirm that this works by checking the Prisma database
- [x] Change the dates to be calculated based on the current date instead of hardcoded

1. Read habits using the REST API
    - [x] How do I get the user ID in /api/goals to pass to the getGoals() controller function?
    - [x] Calculate default dates if no date params are passed
    - [x] Make the default dates normalised to midnight of the start date (and end date?)
    - [ ] Make any passed in dates also normalised to midnight based on the user's timezone
2. Make Prisma use the date params (or defaults)
3. Log out and see if the unauthenticated way of doing things still works
4. Clean up

### HabitDailyView
- [x] Sort out isBinaryHabit() util - convert Prisma.Decimal using .toNumber()... But is the original type actually a string now?
- [x] Add a Entry
  - Why is the body undefined at /api/entries?
  - It was because the content wasn't being encoded as JSON type
- [x] Remove an Entry
  - This seems to be pinging /api/habits instead of /api/entries/[entryId]
- [x] Delete a habit with the given ID
- [ ] Make sure the user is authenticated before deleting
- [ ] Check that the habit belongs to the given user before deleting
Info on deletion codes: https://stackoverflow.com/questions/17884469/what-is-the-http-response-code-for-failed-http-delete-operation

### HabitWeeklyView
Currently adds the icon for entries but doesn't seem to be working properly to toggle on and off
- [x] Add an entry
- [x] Remove an entry

### ViewHabits
- [x] Get all Goals
- [x] Save default data
- [x] Change all usages of getGoals to send an object for params
- [x] Move the default date setting into getGoals controller itself instead of having to do that in each route
- [ ] Check what happens if getGoals in the controller returns an error
- [x] Check "TypeError: response is undefined" error on homepage. Not showing anymore.
- [x] Why are no entries with the default habits data when it's fetched? - Fixed. It was because the default entries had hardcoded dates.
- [x] Rename getGoalsForDates to getGoals() to simplify it
- [x] How can I call getGoals() now without having to pass an empty object if we don't want to send dates? - fixed this with a default value of an empty object

### Page: add-habit
// Add a habit
// For now, just add the habit to the first goal
- [x] Update this page to use the server side translations prop
- [x] Add the description and goal ID into the add habit call
- [x] Change the add habit controller to convert from `number` to `Prisma.Decimal`
- [x] Test adding a habit - seems to be erroring out - Done. Had to add goalId into Prisma operation.


# Start here
## Testing


## Account
- [ ] Change the account menu so anonymous users don't show as signed in

Future tasks
- [ ] Add habit screen - Create a separate story for a UI dropdown that lets you select which goal to attach the habit to
- [ ] Create test for all of this habits stuff
  - [ ] Add a new habit
  - [ ] Unable to add new habit if not all mandatory fields are filled out
- [ ] Prompt to show you're not logged in - to save changes, log in
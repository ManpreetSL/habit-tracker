import { css } from '@emotion/react';
import { Entry } from '@prisma/client';
import CompleteButton from '../entries/CompleteButton';
import {
  calculateCompletionPercentages,
  getEntriesForDay,
  isBinaryHabit,
} from './utils';
import { GoalWithHabitsAndEntries } from '../../src/api/habits/types';

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    border: '2.5px solid #fff',

    tr: {
      display: 'flex',
      flexDirection: 'row',

      justifySelf: 'space-between',
      alignSelf: 'space-between',
    },

    tbody: {
      td: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: '1',
        border: '0.5px solid #222',
        padding: '0px 2px',
        minHeight: '50px',
        minWidth: '50px',
        verticalAlign: 'middle',
      },
    },

    th: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flex: '1',
      border: '0.5px solid #222',
      backgroundColor: '#0066ff',
      padding: '0px 2px',
      minHeight: '50px',
      minWidth: '50px',
      verticalAlign: 'middle',
    },

    '& :first-of-type': {
      flexBasis: '50%',
    },
  }),
};

type HabitWeeklyViewProps = {
  goals: GoalWithHabitsAndEntries[];
  dates: Date[];
  onAddHabitEntry: (habitId: string, date: Date) => void;
  onRemoveHabitEntry: (habitId: string, entryId: string) => void;
};

const HabitWeeklyView = ({
  goals,
  dates,
  onAddHabitEntry,
  onRemoveHabitEntry,
}: HabitWeeklyViewProps) => {
  const dateStrings = dates.map((date) => date.toDateString());

  const toggleComplete = (
    isComplete: boolean,
    date: Date,
    habitId: string,
    entries: Entry[]
  ) => {
    if (isComplete) {
      const entriesToday = getEntriesForDay(entries, date.toDateString());
      onRemoveHabitEntry(habitId, entriesToday[0].id);
    } else onAddHabitEntry(habitId, date);
  };

  if (goals.length === 0) return null;

  return (
    <table css={styles.container}>
      <thead>
        <tr>
          <th>Habit name</th>
          {dates.map((date) => (
            <th key={date.toDateString()}>
              {date.toLocaleDateString('en-GB', { weekday: 'narrow' })}{' '}
              {date.getDate()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {goals.map(({ habits }) =>
          habits?.map((habitWithHistory) => {
            const completionPercentagesByDay = calculateCompletionPercentages({
              habitWithHistory,
              dates: dateStrings,
            });

            return (
              <tr key={habitWithHistory.id}>
                <td>{habitWithHistory.name}</td>

                {dates.map((date) => {
                  const dateString = date.toDateString();
                  const completionPercentage =
                    completionPercentagesByDay[dateString];
                  const isComplete = completionPercentage === 100;

                  return (
                    <td key={date.getDate()}>
                      {isBinaryHabit(habitWithHistory) ? (
                        <CompleteButton
                          complete={isComplete}
                          onClick={() =>
                            toggleComplete(
                              isComplete,
                              date,
                              habitWithHistory.id,
                              habitWithHistory.entries
                            )
                          }
                        />
                      ) : (
                        completionPercentage
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};

export default HabitWeeklyView;

import { css } from '@emotion/react';
import { GoalWithHabitHistory } from '../../src/types/habits';

import CompleteButton from '../entries/CompleteButton';
import { calculateCompletionPercentages } from './utils';

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
  goals: GoalWithHabitHistory[];
  dates: Date[];
};

const HabitWeeklyView = ({ goals, dates }: HabitWeeklyViewProps) => {
  const dateStrings = dates.map((date) => date.toDateString());

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
          habits.map((habitWithHistory) => {
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
                      {isComplete ? (
                        <CompleteButton complete />
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

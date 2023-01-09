import { css } from '@emotion/react';
import Button from '../components/Button';

const styles = {
  screen: css({
    backgroundColor: '#292735',
    minHeight: '100vh',
    minWidth: '100vw',
    color: '#fff'
  }),
  container: css({
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    margin: '0 auto',
    padding: '2em'
  }),

  form: css({
    display: 'flex',
    flexDirection: 'column'
  }),

  inputField: css({
    margin: '1em 0',
    padding: '0.7em',
    backgroundColor: '#220000',
    color: '#fff'
  })
};

const AddHabit = () => {
  return (
    <div css={styles.screen}>
      <div css={styles.container}>
        <h2>Add a habit</h2>
        <form css={styles.form}>
          <label htmlFor='name'>Name</label>
          <input css={styles.inputField} type='text' name='name' />

          <label htmlFor='description'>Description</label>
          <input css={styles.inputField} type='text' name='description' />

          <label htmlFor='target'>Target</label>
          <input css={styles.inputField} type='text' name='target' />

          <label htmlFor='unit'>Unit</label>
          <input css={styles.inputField} type='text' name='unit' />

          <label htmlFor='frequency'>Frequency</label>
          <input css={styles.inputField} type='text' name='frequency' />
        </form>

        <Button text='Cancel' />
        <Button text='Add' />
      </div>
    </div>
  );
};

export default AddHabit;

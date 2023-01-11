import { css } from '@emotion/react';
import Image from 'next/image';
import Button from '../components/Button';
import Link from '../src/components/Link';
import habitsApi from '../src/api/habits';
import { addHabit } from '../src/api/habits';

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
  }),

  buttonsContainer: css({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1em'
  }),
  button: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '150px',
    borderRadius: '1em'
  }),
  buttonText: css({
    margin: '0 0.7em'
  })
};

const addNewHabit = () => {
  console.log('adding habit :)');
  habitsApi.addHabit();
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

        <div css={styles.buttonsContainer}>
          <Link href='/'>
            <Button stylesProp={styles.button}>
              <Image
                src='/icons/cancel.svg'
                alt='Cancel'
                width='32'
                height='32'
              />
              <span css={styles.buttonText}>Cancel</span>
            </Button>
          </Link>
          <Button stylesProp={styles.button} onClick={() => addNewHabit()}>
            <Image
              src='/icons/add.svg'
              alt='Add habit'
              width='32'
              height='32'
            />
            <span css={styles.buttonText}>Add</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddHabit;

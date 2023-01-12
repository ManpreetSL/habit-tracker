import { css } from '@emotion/react';
import Image from 'next/image';
import Button from '../components/Button';
import Link from '../src/components/Link';
import habitsApi from '../src/api/habits';
import { FormEvent, useState } from 'react';

type FormType = {
  name?: string;
  description?: string;
  target?: number;
  unit?: string;
  frequency: number;
  frequencyUnit: string;
};

const defaultFormValues = {
  name: 'Drink water',
  target: 1,
  frequency: 1,
  frequencyUnit: 'daily'
};

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
    padding: '2em',
    alignItems: 'center'
  }),

  form: css({
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '800px'
  }),

  inputField: css({
    margin: '1em 0',
    padding: '0.7em',
    backgroundColor: '#220000',
    color: '#fff'
  }),

  horizontalFlexContainer: css({
    display: 'flex',
    alignItems: 'center'
  }),
  verticalFlexContainer: css({
    display: 'flex',
    flexDirection: 'column',
    width: '33%'
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

const handleSubmit = (event: FormEvent) => {
  event.preventDefault();
  console.log('adding habit :)');
  habitsApi.addHabit();
};

const AddHabit = () => {
  const [formData, setFormData] = useState<FormType>(defaultFormValues);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    // const value = target?.type === 'checkbox' ? target.checked : target.value;

    setFormData({ ...formData, [name]: value });
    console.log(`${name} changed to ${value}`);
  };

  return (
    <div css={styles.screen}>
      <div css={styles.container}>
        <h2>Add a habit</h2>
        <form css={styles.form} onSubmit={handleSubmit}>
          <label htmlFor='name'>Name</label>
          <input
            css={styles.inputField}
            type='text'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
          />
          <label htmlFor='description'>Description</label>
          <input
            css={styles.inputField}
            type='text'
            name='description'
            value={formData.description}
            onChange={handleInputChange}
          />
          <label htmlFor='target'>Target</label>
          <input
            css={styles.inputField}
            type='text'
            name='target'
            value={formData.target}
            onChange={handleInputChange}
          />
          <label htmlFor='unit'>Unit</label>
          <input
            css={styles.inputField}
            type='text'
            name='unit'
            value={formData.unit}
            onChange={handleInputChange}
          />
          <div css={styles.horizontalFlexContainer}>
            <div css={styles.verticalFlexContainer}>
              <label htmlFor='frequency'>Frequency</label>
              <input
                css={styles.inputField}
                type='text'
                name='frequency'
                value={formData.frequency}
                onChange={handleInputChange}
              />
            </div>
            <div
              css={[
                styles.verticalFlexContainer,
                {
                  textAlign: 'center',
                  position: 'relative',
                  alignSelf: 'center'
                }
              ]}
            >
              per
            </div>
            <div css={styles.verticalFlexContainer}>
              <label htmlFor='frequencyUnit'>Time unit</label>
              <select
                css={styles.inputField}
                name='frequencyUnit'
                value={formData.frequencyUnit}
                onChange={handleInputChange}
              >
                <option value='daily'>Day</option>
                <option value='weekly'>Week</option>
                <option value='monthly'>Month</option>
              </select>
            </div>
          </div>
          <div css={styles.buttonsContainer}>
            <Link href='/'>
              <Button stylesProp={styles.button} type='button'>
                <Image
                  src='/icons/cancel.svg'
                  alt='Cancel'
                  width='32'
                  height='32'
                />
                <span css={styles.buttonText}>Cancel</span>
              </Button>
            </Link>

            <Button stylesProp={styles.button} type='submit'>
              <Image
                src='/icons/add.svg'
                alt='Add habit'
                width='32'
                height='32'
              />
              <span css={styles.buttonText}>Add</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHabit;

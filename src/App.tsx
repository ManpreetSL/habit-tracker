import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Link to={'profile/Manpreet'}>Manpreet Singh</Link>
      <br />
      <Link to={'profile/Harjot'}>Harjot Singh</Link>
      <br />
      <Link to={'profile/Gurpreet'}>Gurpreet Kaur</Link>
      <br />
      <Link to={'profile/Hardeep'}>Hardeep Kaur</Link>
      <br />
    </div>
  );
}

export default App;

import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <h2>Profiles:</h2>
      <Link to={'profile/Manpreet'}>Manpreet Singh</Link>
      <Link to={'profile/Harjot'}>Harjot Singh</Link>
      <Link to={'profile/Gurpreet'}>Gurpreet Kaur</Link>
      <Link to={'profile/Hardeep'}>Hardeep Kaur</Link>
    </div>
  );
}

export default App;

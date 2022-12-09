import './App.css';
import Link from 'next/link';

function App() {
  return (
    <div className='App'>
      <h2>Profiles:</h2>
      <Link href={'profile/Manpreet'}>Manpreet Singh</Link>
      <Link href={'profile/Harjot'}>Harjot Singh</Link>
      <Link href={'profile/Gurpreet'}>Gurpreet Kaur</Link>
      <Link href={'profile/Hardeep'}>Hardeep Kaur</Link>
    </div>
  );
}

export default App;

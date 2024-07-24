import { useState } from 'react';
import { Game as RicochetGame } from './ricochet/index';

export default function App() {
  const [selectedGame, setSelectedGame] = useState('');

  if (!selectedGame) {
    return (
      <ul>
        <li onClick={() => setSelectedGame('connect')}>Connect 4</li>
        <li onClick={() => setSelectedGame('ricochet')}>Ricochet robot</li>
      </ul>
    );
  }
  if (selectedGame === 'ricochet') {
    return <RicochetGame />;
  }
  return null;
}

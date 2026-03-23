import { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { ResultScreen } from './components/ResultScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { drawPowerWord, PowerWord } from './utils/omikuji';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'loading' | 'result'>('home');
  const [selectedWord, setSelectedWord] = useState<PowerWord | null>(null);

  const drawOmikuji = () => {
    setCurrentScreen('loading');
    
    // Add a small delay for better UX
    setTimeout(() => {
      // Draw a power word with 1% rare chance
      const selectedWord = drawPowerWord(0.01);
      
      setSelectedWord(selectedWord);
      setCurrentScreen('result');
    }, 1500);
  };

  const drawAgain = () => {
    setCurrentScreen('home');
    setSelectedWord(null);
  };

  return (
    <div className="w-full h-full">
      {currentScreen === 'home' && <HomeScreen onDrawOmikuji={drawOmikuji} />}
      {currentScreen === 'loading' && <LoadingScreen />}
      {currentScreen === 'result' && selectedWord && (
        <ResultScreen powerWord={selectedWord} onDrawAgain={drawAgain} />
      )}
    </div>
  );
}
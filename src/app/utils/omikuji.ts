import powerWordsData from '../data/powerwords.json';

export interface PowerWord {
  id: number;
  rank: string;
  word: string;
  source: string;
  isRare: boolean;
}

/**
 * Get all power words
 */
export function getAllPowerWords(): PowerWord[] {
  return powerWordsData as PowerWord[];
}

/**
 * Get rare (神級) power words only
 */
export function getRarePowerWords(): PowerWord[] {
  return getAllPowerWords().filter(word => word.isRare);
}

/**
 * Get normal power words only
 */
export function getNormalPowerWords(): PowerWord[] {
  return getAllPowerWords().filter(word => !word.isRare);
}

/**
 * Draw a random power word with configurable rare chance
 * @param rareChance - Probability of drawing a rare word (0-1), default is 0.01 (1%)
 */
export function drawPowerWord(rareChance: number = 0.01): PowerWord {
  const rareWords = getRarePowerWords();
  const normalWords = getNormalPowerWords();
  
  // Ensure we have words to draw from
  if (normalWords.length === 0 && rareWords.length === 0) {
    throw new Error('No power words available');
  }
  
  // Determine if this is a rare draw
  const isRareDraw = Math.random() < rareChance;
  
  // Select from appropriate pool
  if (isRareDraw && rareWords.length > 0) {
    const randomIndex = Math.floor(Math.random() * rareWords.length);
    return rareWords[randomIndex];
  } else if (normalWords.length > 0) {
    const randomIndex = Math.floor(Math.random() * normalWords.length);
    return normalWords[randomIndex];
  } else {
    // Fallback to rare if no normal words available
    const randomIndex = Math.floor(Math.random() * rareWords.length);
    return rareWords[randomIndex];
  }
}

/**
 * Get statistics about power words
 */
export function getPowerWordStats() {
  const all = getAllPowerWords();
  const rare = getRarePowerWords();
  const normal = getNormalPowerWords();
  
  // Count by rank
  const rankCounts = all.reduce((acc, word) => {
    acc[word.rank] = (acc[word.rank] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    total: all.length,
    rare: rare.length,
    normal: normal.length,
    rankCounts,
    rarePercentage: (rare.length / all.length) * 100,
  };
}

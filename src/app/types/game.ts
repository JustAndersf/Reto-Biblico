export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
}

export interface Level {
  id: number;
  title: string;
  questions: Question[];
  pointsPerQuestion: number;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  colorFrom: string;
  colorTo: string;
  textColor: string;
  description: string;
  levels: Level[];
}

export interface LevelResult {
  completed: boolean;
  stars: number;
  points: number;
  correctAnswers: number;
  totalQuestions: number;
}

export interface LevelProgress {
  [categoryId: string]: {
    [levelId: number]: LevelResult;
  };
}

export interface CurrentGame {
  categoryId: string;
  levelId: number;
  questionIndex: number;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  localLives: number; // vidas dentro del nivel actual (max 3)
}

export interface GameSettings {
  music: boolean;
  sound: boolean;
}

export interface DailyChallenges {
  levelsCompletedToday: number;
  rachaBonusClaimed: boolean;
  desafioBonusClaimed: boolean;
  lastActivityDate: string | null;
}

export interface GameState {
  globalLives: number;       // vidas globales del jugador (max 3)
  coins: number;             // monedas del jugador
  regenTimestamps: number[]; // timestamps futuros (ms) para recuperar cada vida global perdida
  totalPoints: number;
  levelProgress: LevelProgress;
  settings: GameSettings;
  dailyChallenges: DailyChallenges;
  currentGame: CurrentGame | null;
}

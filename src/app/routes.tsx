import { createBrowserRouter, Navigate } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { SplashScreen } from "./components/screens/SplashScreen";
import { HomeScreen } from "./components/screens/HomeScreen";
import { CategoryScreen } from "./components/screens/CategoryScreen";
import { LevelScreen } from "./components/screens/LevelScreen";
import { GameScreen } from "./components/screens/GameScreen";
import { CorrectScreen } from "./components/screens/CorrectScreen";
import { IncorrectScreen } from "./components/screens/IncorrectScreen";
import { LevelCompleteScreen } from "./components/screens/LevelCompleteScreen";
import { ProgressScreen } from "./components/screens/ProgressScreen";
import { GameOverScreen } from "./components/screens/GameOverScreen";
import { SettingsScreen } from "./components/screens/SettingsScreen";
import { HowToPlayScreen } from "./components/screens/HowToPlayScreen";
import { PointsShopScreen } from "./components/screens/PointsShopScreen";
import { CardPaymentScreen } from "./components/screens/CardPaymentScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: SplashScreen },
      { path: "home", Component: HomeScreen },
      { path: "categories", Component: CategoryScreen },
      { path: "levels/:categoryId", Component: LevelScreen },
      { path: "game/:categoryId/:levelId", Component: GameScreen },
      { path: "correct", Component: CorrectScreen },
      { path: "incorrect", Component: IncorrectScreen },
      { path: "level-complete", Component: LevelCompleteScreen },
      { path: "progress", Component: ProgressScreen },
      { path: "game-over", Component: GameOverScreen },
      { path: "settings", Component: SettingsScreen },
      { path: "how-to-play", Component: HowToPlayScreen },
      { path: "points-shop", Component: PointsShopScreen },
      { path: "payments", Component: CardPaymentScreen },
      { path: "*", Component: () => <Navigate to="/" replace /> },
    ],
  },
]);

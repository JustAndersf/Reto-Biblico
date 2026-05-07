import { createBrowserRouter, Navigate } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

function lazyPublic<T extends Record<string, unknown>>(
  importer: () => Promise<T>,
  exportName: keyof T,
) {
  return async () => {
    const module = await importer();
    const ScreenComponent = module[exportName] as React.ComponentType;

    return {
      Component: ScreenComponent,
    };
  };
}

function lazyProtected<T extends Record<string, unknown>>(
  importer: () => Promise<T>,
  exportName: keyof T,
) {
  return async () => {
    const module = await importer();
    const ScreenComponent = module[exportName] as React.ComponentType;

    function ProtectedScreen() {
      return (
        <ProtectedRoute>
          <ScreenComponent />
        </ProtectedRoute>
      );
    }

    return {
      Component: ProtectedScreen,
    };
  };
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        lazy: lazyPublic(() => import("./components/screens/SplashScreen"), "SplashScreen"),
      },
      {
        path: "login",
        lazy: lazyPublic(() => import("./components/screens/LoginScreen"), "LoginScreen"),
      },
      {
        path: "auth/callback",
        lazy: lazyPublic(
          () => import("./components/screens/AuthCallbackScreen"),
          "AuthCallbackScreen",
        ),
      },
      {
        path: "home",
        lazy: lazyProtected(() => import("./components/screens/HomeScreen"), "HomeScreen"),
      },
      {
        path: "categories",
        lazy: lazyProtected(() => import("./components/screens/CategoryScreen"), "CategoryScreen"),
      },
      {
        path: "levels/:categoryId",
        lazy: lazyProtected(() => import("./components/screens/LevelScreen"), "LevelScreen"),
      },
      {
        path: "game/:categoryId/:levelId",
        lazy: lazyProtected(() => import("./components/screens/GameScreen"), "GameScreen"),
      },
      {
        path: "correct",
        lazy: lazyProtected(() => import("./components/screens/CorrectScreen"), "CorrectScreen"),
      },
      {
        path: "incorrect",
        lazy: lazyProtected(() => import("./components/screens/IncorrectScreen"), "IncorrectScreen"),
      },
      {
        path: "level-complete",
        lazy: lazyProtected(
          () => import("./components/screens/LevelCompleteScreen"),
          "LevelCompleteScreen",
        ),
      },
      {
        path: "progress",
        lazy: lazyProtected(() => import("./components/screens/ProgressScreen"), "ProgressScreen"),
      },
      {
        path: "game-over",
        lazy: lazyProtected(() => import("./components/screens/GameOverScreen"), "GameOverScreen"),
      },
      {
        path: "settings",
        lazy: lazyProtected(() => import("./components/screens/SettingsScreen"), "SettingsScreen"),
      },
      {
        path: "how-to-play",
        lazy: lazyProtected(
          () => import("./components/screens/HowToPlayScreen"),
          "HowToPlayScreen",
        ),
      },
      {
        path: "points-shop",
        lazy: lazyProtected(
          () => import("./components/screens/PointsShopScreen"),
          "PointsShopScreen",
        ),
      },
      {
        path: "payments",
        lazy: lazyProtected(
          () => import("./components/screens/CardPaymentScreen"),
          "CardPaymentScreen",
        ),
      },
      { path: "*", Component: () => <Navigate to="/" replace /> },
    ],
  },
]);

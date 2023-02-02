/* eslint-disable @typescript-eslint/ban-ts-comment */
import Router from './utils/Router';
import { Routes } from './routes';
import AuthController from './controllers/AuthController';

import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import ChatPage from './pages/Chat';
import UserSettingsPage from './pages/UserSettings';
import ChangePasswordPage from './pages/ChangePassword';

// @ts-ignore
import components from './components/**/index.ts';
import { registerComponent } from './utils/registerComponent';

window.addEventListener('DOMContentLoaded', async () => {
  Object.values(components).forEach((component) =>
    // @ts-ignore
    registerComponent(component.default)
  );

  Router.use(Routes.Index, LoginPage)
    .use(Routes.SignUp, SignupPage)
    .use(Routes.Chat, ChatPage)
    .use(Routes.UserSettings, UserSettingsPage)
    .use(Routes.ChangePassword, ChangePasswordPage);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.SignUp:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser();
    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.Chat);
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }
});

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        home: 'Home',
        about: 'About Us',
        welcome: 'Welcome to Price Predictor',
        description: 'Track and predict prices for electronic products effortlessly.',
        login: 'Login',
        signup: 'Sign Up',
        email: 'Email Address',
        password: 'Password',
        fullName: 'Full Name',
        confirmPassword: 'Confirm Password',
      },
    },
    fr: {
      translation: {
        home: 'Accueil',
        about: 'À propos',
        welcome: 'Bienvenue sur Price Predictor',
        description: 'Suivez et prédisez les prix des produits électroniques facilement.',
        login: 'Connexion',
        signup: 'S\'inscrire',
        email: 'Adresse e-mail',
        password: 'Mot de passe',
        fullName: 'Nom complet',
        confirmPassword: 'Confirmer le mot de passe',
      },
    },
    ar: {
      translation: {
        home: 'الصفحة الرئيسية',
        about: 'من نحن',
        welcome: 'مرحبًا بك في Price Predictor',
        description: 'تتبع وتوقع أسعار المنتجات الإلكترونية بسهولة.',
        login: 'تسجيل الدخول',
        signup: 'اشتراك',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        fullName: 'الاسم الكامل',
        confirmPassword: 'تأكيد كلمة المرور',
      },
    },
  },
  lng: 'en', // Langue par défaut
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React fait déjà l'échappement des données
  },
});

export default i18n;
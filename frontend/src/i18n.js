import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        home: 'Home',
        benefits: 'Key Benefits',
        contact: 'Contact Us',
        discoverOptimalPrice: 'Discover the optimal price for your car in an instant',
        enterInfoAndPredict: 'Enter the information and let our technology predict the most accurate market value!',
        keyBenefits: 'Key Benefits',
        optimalPriceDynamic: 'Optimal price in a dynamic environment',
        priceOptimizationDescription: 'Price optimization is key to every online seller’s pricing strategy. Prices in the digital world evolve rapidly, adjusted in real-time to maximize sales while remaining competitive.',
        maximizeSales: 'Maximize your sales',
        salesMaximizationDescription: 'Finding the ideal price is crucial, especially for products with elastic demand. A slight price adjustment can significantly influence demand.',
        improveMargins: 'Improve your profit margins',
        profitMarginsDescription: 'Track the profitability of your products with every price change. Price margin optimization is crucial for long-term growth.',
        name: 'Full Name',
        email: 'Email Address',
        message: 'Message',
        namePlaceholder: 'Enter your name',
        emailPlaceholder: 'Enter your email address',
        messagePlaceholder: 'Write your message',
        send: 'Send',
      },
    },
    fr: {
      translation: {
        home: 'Accueil',
        benefits: 'Avantages Clés',
        contact: 'Contactez-nous',
        discoverOptimalPrice: 'Découvrez le prix idéal pour votre voiture en un instant',
        enterInfoAndPredict: 'Entrez les informations et laissez notre technologie prédire la valeur la plus juste du marché !',
        keyBenefits: 'Avantages Clés',
        optimalPriceDynamic: 'Le prix optimal dans un environnement dynamique',
        priceOptimizationDescription: 'L\'optimisation des prix est un facteur clé dans la stratégie tarifaire de chaque vendeur en ligne. Les prix évoluent rapidement dans le monde numérique, ajustés en temps réel pour maximiser les ventes tout en restant compétitifs.',
        maximizeSales: 'Maximisez vos ventes',
        salesMaximizationDescription: 'Trouver le prix idéal est essentiel, surtout pour les produits à demande élastique. Un petit ajustement peut influencer significativement la demande.',
        improveMargins: 'Améliorez vos marges bénéficiaires',
        profitMarginsDescription: 'Suivez la rentabilité de vos produits à chaque modification de prix. L\'optimisation des marges est cruciale pour la croissance à long terme.',
        name: 'Nom Complet',
        email: 'Adresse E-mail',
        message: 'Message',
        namePlaceholder: 'Entrez votre nom',
        emailPlaceholder: 'Entrez votre adresse e-mail',
        messagePlaceholder: 'Écrivez votre message',
        send: 'Envoyer',
      },
    },
    ar: {
      translation: {
        home: 'الصفحة الرئيسية',
        benefits: 'الفوائد الرئيسية',
        contact: 'اتصل بنا',
        discoverOptimalPrice: 'اكتشف السعر المثالي لسيارتك في لحظة',
        enterInfoAndPredict: 'أدخل المعلومات واترك تكنولوجيا الذكاء الاصطناعي لدينا تتنبأ بأكثر قيمة دقيقة!',
        keyBenefits: 'الفوائد الرئيسية',
        optimalPriceDynamic: 'السعر المثالي في بيئة ديناميكية',
        priceOptimizationDescription: 'تحسين الأسعار هو عامل رئيسي في استراتيجية التسعير لجميع بائعي الإنترنت. الأسعار تتطور بسرعة في العالم الرقمي، ويتم تعديلها في الوقت الفعلي لتحقيق أقصى قدر من المبيعات مع الحفاظ على التنافسية.',
        maximizeSales: 'زيادة مبيعاتك',
        salesMaximizationDescription: 'البحث عن السعر المثالي أمر بالغ الأهمية، خاصة للمنتجات ذات الطلب المرن. يمكن أن يؤدي تعديل السعر الطفيف إلى تأثير كبير على الطلب.',
        improveMargins: 'تحسين هوامش ربحك',
        profitMarginsDescription: 'تتبع ربحية منتجاتك مع كل تغيير في السعر. تحسين الهوامش ضروري للنمو على المدى الطويل.',
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        message: 'الرسالة',
        namePlaceholder: 'أدخل اسمك',
        emailPlaceholder: 'أدخل عنوان بريدك الإلكتروني',
        messagePlaceholder: 'اكتب رسالتك',
        send: 'إرسال',
      },
    },
  },
  lng: 'en', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

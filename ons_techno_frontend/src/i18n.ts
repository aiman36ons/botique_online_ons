import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      'nav.home': 'Home',
      'nav.products': 'Products',
      'nav.cart': 'Cart',
      'nav.orders': 'Orders',
      'nav.profile': 'Profile',
      'nav.login': 'Login',
      'nav.register': 'Register',
      'nav.logout': 'Logout',

      // Products
      'products.title': 'Our Products',
      'products.filter': 'Filter',
      'products.search': 'Search',
      'products.sort': 'Sort by',
      'products.price.asc': 'Price: Low to High',
      'products.price.desc': 'Price: High to Low',
      'products.type.accessory': 'IT Accessories',
      'products.type.digital': 'Digital Products',
      'products.type.service': 'IT Services',
      'products.addToCart': 'Add to Cart',
      'products.outOfStock': 'Out of Stock',

      // Cart
      'cart.title': 'Shopping Cart',
      'cart.empty': 'Your cart is empty',
      'cart.total': 'Total',
      'cart.checkout': 'Proceed to Checkout',
      'cart.remove': 'Remove',
      'cart.quantity': 'Quantity',

      // Checkout
      'checkout.title': 'Complete Your Order',
      'checkout.shipping': 'Shipping Information',
      'checkout.payment': 'Payment Method',
      'checkout.placeOrder': 'Place Order',
      'checkout.paymentMethods': {
        paypal: 'PayPal',
        baridi_mob: 'Baridi Mob',
        cash_on_delivery: 'Cash on Delivery'
      },
      checkout: {
        title: 'Complete Your Order',
        shippingInfo: 'Shipping Information',
        fullName: 'Full Name',
        address: 'Address',
        city: 'City',
        phone: 'Phone Number',
        paymentMethod: 'Payment Method',
        cod: 'Cash on Delivery',
        orderSummary: 'Order Summary',
        total: 'Total',
        placeOrder: 'Place Order'
      },

      // Orders
      'orders.title': 'My Orders',
      'orders.status': {
        pending: 'Pending',
        processing: 'Processing',
        completed: 'Completed',
        cancelled: 'Cancelled'
      },
      'orders.details': 'Order Details',
      'orders.cancel': 'Cancel Order',

      // Profile
      'profile.title': 'My Profile',
      'profile.edit': 'Edit Profile',
      'profile.save': 'Save Changes',

      // Auth
      'auth.login': 'Login',
      'auth.register': 'Register',
      'auth.email': 'Email',
      'auth.password': 'Password',
      'auth.confirmPassword': 'Confirm Password',
      'auth.forgotPassword': 'Forgot Password?',
      'auth.noAccount': "Don't have an account?",
      'auth.haveAccount': 'Already have an account?'
    }
  },
  fr: {
    translation: {
      // Navigation
      'nav.home': 'Accueil',
      'nav.products': 'Produits',
      'nav.cart': 'Panier',
      'nav.orders': 'Commandes',
      'nav.profile': 'Profil',
      'nav.login': 'Connexion',
      'nav.register': 'Inscription',
      'nav.logout': 'Déconnexion',

      // Products
      'products.title': 'Nos Produits',
      'products.filter': 'Filtrer',
      'products.search': 'Rechercher',
      'products.sort': 'Trier par',
      'products.price.asc': 'Prix: Croissant',
      'products.price.desc': 'Prix: Décroissant',
      'products.type.accessory': 'Accessoires IT',
      'products.type.digital': 'Produits Numériques',
      'products.type.service': 'Services IT',
      'products.addToCart': 'Ajouter au Panier',
      'products.outOfStock': 'Rupture de Stock',

      // Cart
      'cart.title': 'Panier',
      'cart.empty': 'Votre panier est vide',
      'cart.total': 'Total',
      'cart.checkout': 'Passer la Commande',
      'cart.remove': 'Supprimer',
      'cart.quantity': 'Quantité',

      // Checkout
      'checkout.title': 'Finaliser la commande',
      'checkout.shipping': 'Informations de livraison',
      'checkout.payment': 'Méthode de paiement',
      'checkout.placeOrder': 'Passer la commande',
      'checkout.paymentMethods': {
        paypal: 'PayPal',
        baridi_mob: 'Baridi Mob',
        cash_on_delivery: 'Paiement à la livraison'
      },
      checkout: {
        title: 'Finaliser la commande',
        shippingInfo: 'Informations de livraison',
        fullName: 'Nom complet',
        address: 'Adresse',
        city: 'Ville',
        phone: 'Numéro de téléphone',
        paymentMethod: 'Méthode de paiement',
        cod: 'Paiement à la livraison',
        orderSummary: 'Résumé de la commande',
        total: 'Total',
        placeOrder: 'Passer la commande'
      },

      // Orders
      'orders.title': 'Mes Commandes',
      'orders.status': {
        pending: 'En Attente',
        processing: 'En Cours',
        completed: 'Terminée',
        cancelled: 'Annulée'
      },
      'orders.details': 'Détails de la Commande',
      'orders.cancel': 'Annuler la Commande',

      // Profile
      'profile.title': 'Mon Profil',
      'profile.edit': 'Modifier le Profil',
      'profile.save': 'Enregistrer les Modifications',

      // Auth
      'auth.login': 'Connexion',
      'auth.register': 'Inscription',
      'auth.email': 'Email',
      'auth.password': 'Mot de Passe',
      'auth.confirmPassword': 'Confirmer le Mot de Passe',
      'auth.forgotPassword': 'Mot de Passe Oublié?',
      'auth.noAccount': "Vous n'avez pas de compte?",
      'auth.haveAccount': 'Vous avez déjà un compte?'
    }
  },
  ar: {
    translation: {
      // Navigation
      'nav.home': 'الرئيسية',
      'nav.products': 'المنتجات',
      'nav.cart': 'السلة',
      'nav.orders': 'الطلبات',
      'nav.profile': 'الملف الشخصي',
      'nav.login': 'تسجيل الدخول',
      'nav.register': 'إنشاء حساب',
      'nav.logout': 'تسجيل الخروج',

      // Products
      'products.title': 'منتجاتنا',
      'products.filter': 'تصفية',
      'products.search': 'بحث',
      'products.sort': 'ترتيب حسب',
      'products.price.asc': 'السعر: من الأقل إلى الأعلى',
      'products.price.desc': 'السعر: من الأعلى إلى الأقل',
      'products.type.accessory': 'ملحقات تقنية المعلومات',
      'products.type.digital': 'المنتجات الرقمية',
      'products.type.service': 'خدمات تقنية المعلومات',
      'products.addToCart': 'إضافة إلى السلة',
      'products.outOfStock': 'نفذت الكمية',

      // Cart
      'cart.title': 'سلة التسوق',
      'cart.empty': 'سلة التسوق فارغة',
      'cart.total': 'المجموع',
      'cart.checkout': 'إتمام الطلب',
      'cart.remove': 'حذف',
      'cart.quantity': 'الكمية',

      // Checkout
      'checkout.title': 'إتمام الطلب',
      'checkout.shipping': 'معلومات الشحن',
      'checkout.payment': 'طريقة الدفع',
      'checkout.placeOrder': 'تأكيد الطلب',
      'checkout.paymentMethods': {
        paypal: 'باي بال',
        baridi_mob: 'بريد موب',
        cash_on_delivery: 'الدفع عند الاستلام'
      },
      checkout: {
        title: 'إتمام الطلب',
        shippingInfo: 'معلومات الشحن',
        fullName: 'الاسم الكامل',
        address: 'العنوان',
        city: 'المدينة',
        phone: 'رقم الهاتف',
        paymentMethod: 'طريقة الدفع',
        cod: 'الدفع عند الاستلام',
        orderSummary: 'ملخص الطلب',
        total: 'المجموع',
        placeOrder: 'تأكيد الطلب'
      },

      // Orders
      'orders.title': 'طلباتي',
      'orders.status': {
        pending: 'قيد الانتظار',
        processing: 'قيد المعالجة',
        completed: 'مكتمل',
        cancelled: 'ملغي'
      },
      'orders.details': 'تفاصيل الطلب',
      'orders.cancel': 'إلغاء الطلب',

      // Profile
      'profile.title': 'الملف الشخصي',
      'profile.edit': 'تعديل الملف الشخصي',
      'profile.save': 'حفظ التغييرات',

      // Auth
      'auth.login': 'تسجيل الدخول',
      'auth.register': 'إنشاء حساب',
      'auth.email': 'البريد الإلكتروني',
      'auth.password': 'كلمة المرور',
      'auth.confirmPassword': 'تأكيد كلمة المرور',
      'auth.forgotPassword': 'نسيت كلمة المرور؟',
      'auth.noAccount': 'ليس لديك حساب؟',
      'auth.haveAccount': 'لديك حساب بالفعل؟'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 
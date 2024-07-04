export const API_URLS = {
  BASE_URL: 'https://api.prod.orderart.com.au/',
  BASE_URL_V2: 'https://api.orderart.com.au/',
  LOGIN: 'auth/login',
  FCM_SUBSCRIBE: '/auth/subscribetopush',

  ORDERS: 'orders',
  SINGLE_ORDER: 'orders/view',

  RESERVATIONS: 'reservations',

  GRIEVANCES: 'grievances',

  CUSTOMERS: 'customers',
  UNVERIFY_CUSTOMER: 'customers/unverify',
  VERIFY_CUSTOMER: 'customers/verify',
  SUBSCRIBE_CUSTOMERS: 'customers/subscribed',
  UNSUBSCRIBE_CUSTOMERS: 'customers/unsubscribed',

  RESTAURANTS: 'restaurants',

  DISHES: 'dishes',

  SERVICE_QUICK_DISABLE: 'disabledservices/quick_disabled',
  SERVICE_TODAY_DISABLE: 'disabledservices/disabled_services_for_today',
  TODAY_THRESHOLD: 'disabledservices/order_threshold_for_today',
  THRESHOLD_DISABLE: 'disabledservices/thresholdfortoday',
  RESTAURANT_DELAY: 'restaurants/restaurant-delay',
  UPADAT_DELAY: 'restaurants/update-delay',

  AUTO_ACCEPT_ORDER: 'restaurants/auto_accept_order',

  ACTIVE_IVR: 'ivr-greetings/active-ivr-greetings',
  AVAILABLE_IVR: 'ivr-greetings',
  UPDATE_IVR: 'ivr-greetings/update-active-ivr-greeting',
};

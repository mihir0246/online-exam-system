const base = process.env.REACT_APP_API_BASE_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000');
const LoginApi = '/api/v1/login';
const FetchUserDetailsApi = '/api/v1/user/details';

module.exports={ base, LoginApi, FetchUserDetailsApi }
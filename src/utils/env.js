if (process.env.NODE_ENV !== 'production') {
    const dotenv = await import('dotenv');
    dotenv.config();
}
export const { PORT,EMAIL_LOGIN,SMTP,EMAIL_PASSWORD, MONGO_URI, USER_JWT_SECRET, ADMIN_JWT_SECRET } = process.env;
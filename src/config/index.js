const CONFIG ={
    DB_HOST:process.env.DB_HOST || 'localhost',
    DB_USER:process.env.DB_USER || 'root',
    DB_PORT:process.env.DB_PORT || 3306,
    DB_PASSWORD:process.env.DB_PASSWORD || 'a6%&&zfO',
    DB_NAME:process.env.DB_NAME || 'qrmate',
    SESSION_SECREAT:process.env.SESSION_SECREAT
}

export default CONFIG;
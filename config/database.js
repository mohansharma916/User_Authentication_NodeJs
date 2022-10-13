const {createPool}=require("mysql");

const pool=createPool({ 
    port:process.env.DB_PORT,
    host:process.env.DB_HOST,
    password:process.env.DB_PASSWORD,
    database:process.env.MYSQL_DB,
    user:process.env.DB_USER,
    connectionLimit:10
});

module.exports=pool;

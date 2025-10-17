import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { config } from 'dotenv';

config();

interface UserTable {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    createdAt: Date;
}

interface Database {
    user: UserTable;
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL 环境变量未设置！');
}

console.log('连接字符串类型:', typeof connectionString);
console.log('连接字符串前50字符:', connectionString.substring(0, 50));

const url = new URL(connectionString);
const password = url.password;

if (typeof password !== 'string') {
    console.warn('⚠️ 密码不是字符串，进行转换:', password);
    url.password = String(password || '');
}

const fixedConnectionString = url.toString();
console.log('修复后的连接字符串:', fixedConnectionString.replace(/:([^:]*)?@/, ':****@'));

const poolConfig = {
    host: url.hostname,
    port: parseInt(url.port),
    database: url.pathname.replace('/', ''),
    user: url.username,
    password: url.password,
    ssl: false, 
};

console.log('池配置:', { ...poolConfig, password: '****' });

const dialect = new PostgresDialect({
    pool: new Pool(poolConfig), 
});

export const db = new Kysely<Database>({
    dialect,
    log: ['query', 'error'],
});
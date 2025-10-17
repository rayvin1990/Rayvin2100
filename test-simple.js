// test-simple.ts
import { config } from 'dotenv';
config();
import { Pool } from 'pg';
console.log('=== 简单数据库连接测试 ===');
console.log('当前目录文件:', (await import('fs')).readdirSync('.'));
console.log('DATABASE_URL 存在:', !!process.env.DATABASE_URL);
async function testDirectConnection() {
    if (!process.env.DATABASE_URL) {
        console.error('❌ DATABASE_URL 未设置');
        return;
    }
    console.log('连接字符串:', process.env.DATABASE_URL.replace(/:([^:]*)?@/, ':****@'));
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL
    });
    try {
        const client = await pool.connect();
        console.log('✅ 数据库连接成功！');
        const result = await client.query('SELECT NOW() as current_time');
        console.log('当前时间:', result.rows[0].current_time);
        client.release();
        await pool.end();
        console.log('✅ 测试完成！');
    }
    catch (error) {
        console.error('❌ 连接失败:', error);
    }
}
testDirectConnection();

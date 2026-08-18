const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const setupDatabase = async () => {
  let connection;
  try {
    // Connect without specifying database first
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });

    console.log('✓ Connected to MySQL');

    // Read the schema file
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    // Split by semicolon and execute each statement
    const statements = schemaSql.split(';').filter(stmt => stmt.trim().length > 0);

    for (const statement of statements) {
      try {
        await connection.query(statement + ';');
        console.log('✓ Executed: ' + statement.substring(0, 50) + '...');
      } catch (error) {
        console.error('✗ Failed to execute statement:', error.message);
        throw error;
      }
    }

    // Run the seed file
    const seedPath = path.join(__dirname, '../database/seed.sql');
    const seedSql = fs.readFileSync(seedPath, 'utf8');
    
    const seedStatements = seedSql.split(';').filter(stmt => stmt.trim().length > 0);

    for (const statement of seedStatements) {
      try {
        await connection.query(statement + ';');
        console.log('✓ Seeded: ' + statement.substring(0, 50) + '...');
      } catch (error) {
        // Seed errors might be acceptable (duplicate keys, etc.)
        console.warn('⚠ Seed statement warning:', error.message);
      }
    }

    console.log('\n✓ Database setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Database setup failed:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

setupDatabase();

import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbConfig = {
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName,
  connectionLimit: 10,
};

const pool = mysql.createPool(dbConfig);
const connectWithRetry = async (
  config,
  maxRetries = Infinity,
  interval = 5000
) => {
  let retries = 0;
  while (retries < maxRetries) { 
    try {
      const pool = await mysql.createPool(config);
      await pool.query("SELECT 1");
      console.log("Connected to the database successfully.");
      return pool;
    } catch (error) {
      if (retries >= maxRetries) {
        throw new Error(
          "Max retries reached, failed to connect to the database."
        );
      }
      console.error(
        `Failed to connect to the database, retrying in ${
          interval / 1000
        } seconds...`
      );
      await new Promise((resolve) => setTimeout(resolve, interval));
      retries++;
    }
  }
};

async function insertTodos() {
  const tasks = [
    {
      title: "Finish Project Proposal",
    },
    {
      title: "Review Codebase",
    },
    {
      title: "Refactor Components",
    },
    {
      title: "Learn Javascript",
    },
    {
      title: "Learn Vue",
    },
  ];

  try {
    const connection = await pool.getConnection();
    for (const task of tasks) {
      const [rows] = await connection.execute(
        "INSERT INTO tasks ( title) VALUES (?)",
        [task.title]
      );
    }
    connection.release();
  } catch (error) {
    console.error("Error:", error);
  } finally {
    pool.end();
  }
}

(async () => {
  let pool = null;
  try {
    pool = await connectWithRetry(dbConfig);
    await insertTodos();
    console.log("Database seeded successfully");
  } catch (error) {
    console.log(error);
  } finally {
    if (pool) {
      await pool.end();
      console.log("Database disconnected");
    }
  }
})();
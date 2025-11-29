import pg from "pg";
import 'dotenv/config'

// Create connexion client to Postgres database
const client = new pg.Client(process.env.DATABASE_URL);

// Connect it
client.connect()
  .then(() => console.log("📦 Database connected"))
  .catch((error) => console.log(`❌ Failed to connect to database:  ` + error));

// Export the client
export default client;
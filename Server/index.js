const http = require('http');
const app = require("./app");
const dotenv = require('dotenv');
const db = require('./db');

dotenv.config();

async function main()
{
    const port = process.env.SERVER_PORT || 3000;
    const server = http.createServer(app);
    
    server.listen(port, () => {
        console.log(`Server started at ${port}...`);
    })
    
    await db.checkDatabase();
}

main();
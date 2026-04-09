console.log('MONGO_URI:', process.env.MONGO_URI);

const path = require("path");
const http = require("http");
const dotenv = require("dotenv");

// Only load .env in development (not on Render)
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
    console.log('Dotenv loaded for development');
} else {
    console.log('Production mode: using environment variables');
}

const { connectDB } = require("./config/db");
const app = require("./app");
const { initializeSocket } = require("./socket");

const PORT = process.env.PORT || 5001;

const startServer = async () => {
    try{
        await connectDB();

        const server = http.createServer(app);
        initializeSocket(server);

        server.listen(PORT, ()=>{
            console.log("Server is running on port " + PORT);
        });
    }catch(error){
        console.error("Failed to start server", error);
        process.exit(1);
    }
};

startServer();
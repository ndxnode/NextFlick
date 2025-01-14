const corsMiddleware = require("./middleware/cors");

// Apply CORS middleware before routes
app.use(corsMiddleware);

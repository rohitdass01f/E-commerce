const corsOptions = {
  origin: (origin, cb) => {
    if (
      !origin || 
      origin.includes("vercel.app") ||
      origin === "http://localhost:5173"
    ) {
      cb(null, true);
    } else {
      cb(new Error("CORS ERROR"));
    }
  },
};

module.exports = corsOptions;
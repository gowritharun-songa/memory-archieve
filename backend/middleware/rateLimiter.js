import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        const identifier = req.ip ?? "global";
        const { success } = await ratelimit.limit(identifier);
        if (!success) {
            return res.status(429).json({
                message: "Too many requests",
            });
        }
        next();
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export default rateLimiter;

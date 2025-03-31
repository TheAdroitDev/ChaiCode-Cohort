import jwt from "jsonwebtoken"

export const isLoggedin = async function (req, res, next) {
    try {
        console.log(req.cookies);
        let token = req.cookies?.token;

        console.log("Token Found: ", token ? "YES" : "NO");

        if (!token) {
            console.log("NO token");
            res.status(401).json({
                message: "Authentication failed",
                success: false
            })
        }

        const decoded = await jwt.verify(token, process.env.JWTSECRET);
        console.log("decoded data:", decoded);
        req.user = decoded
        next()
    } catch (error) {
        console.log("Auth middleware failure", error);
        return res.status(500).json({
            success: false,
            message: "Auth middleware failure",
        });
    }
}
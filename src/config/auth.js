module.exports = {
    jwt:{
        secret: process.env.AUTH_SECRET || "default!@Rocket1030",
        expiresIn:"1d"
    }
}
const { ConstituenciesCheck } = require('../services/ConstituenciesServices');

const handleConstituenciesRequest = async (req, res) => {
    const { que } = req.query; // Read 't' from URL query parameters
    console.log(que);
    try {
        const constit = await ConstituenciesCheck(que);
        return res.json(constit);
    } catch (err) {
        //console.error("Database error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { handleConstituenciesRequest };
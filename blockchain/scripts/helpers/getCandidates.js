const axios = require("axios").default;

/**
 * Get list of candidates
 */
exports.getCandidates = async function () {
    return await (
        await axios.get("https://wakanda-task.3327.io/list")
    ).data.candidates;
};

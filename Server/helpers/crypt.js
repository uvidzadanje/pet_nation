const bcrypt = require('bcrypt');

async function hashValue(value)
{
    return await bcrypt.hash(value, 10);
}

async function compareValues(value, hashValue)
{
    return await bcrypt.compare(value, hashValue);
}

async function compareIsAdmin(hashValue)
{
    return await compareValues("admin", hashValue);
}

async function compareIsPreduzece(hashValue)
{
    return await compareValues("preduzece", hashValue);
}

module.exports = {
    hashValue,
    compareValues,
    compareIsAdmin,
    compareIsPreduzece,
}
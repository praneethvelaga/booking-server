const db = require('../db/db.js');

async function ConstituenciesCheck(que) {
    //console.log(query)
    try{
    const result = await db.query("SELECT constituency_name, district, state FROM constituencies WHERE constituency_name LIKE ? LIMIT 10",
      [`%${que}%`]);
      //console.log(result)


      return result.length === 0 ? null : result;

    }catch(err){
        console.log(`Error during login Constituencies`, err);
        throw err;
    }
}
module.exports = {ConstituenciesCheck}
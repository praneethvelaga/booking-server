const db = require('../db/db.js');

async function BusesListDataFromSevices(from, to, date) {
    try{
    const result = await db.query(`SELECT * 
        FROM buslist 
        WHERE starting_area = ? AND destination_area = ? AND journey_start_date = ?`,[from, to, date])
        //console.log(result)
        return result.length === 0 ? null : result; 
    }catch(err){
        throw err;
    }
}

async function BusDataFromSevices(busId) {
    try{
       // console.log(busId)
        const result = await db.query(`SELECT * FROM buslist WHERE bus_id = ?`,[busId]);
        //console.log(result)
        return result.length === 0 ? null : result;
    }catch(err){
        throw err;
    }
}
module.exports = {
    BusesListDataFromSevices,
    BusDataFromSevices,
}
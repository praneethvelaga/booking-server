const {BusesListDataFromSevices,BusDataFromSevices} = require('../services/BusesListServices')

const handleBusesListRequest =async (req, res)=>{
    const { from, to, date } = req.body;
    if(!from || !to || !date){
        return res.status(400).json({ message: `Enter all required fileds` });
    }
    try{
        const busesData = await BusesListDataFromSevices(from, to, date);
        //console.log(busesData)
        if (!busesData) {
            return res.status(401).json({ message: 'No Data Found' });
        }
        return res.status(200).json({buses : busesData})
    }catch(err){
        //console.log(err)
        res.status(500).json({ message: "Failed to fetch available buses", error: err.message });
    }

}
//Bus By Id
const handleBusByIdRequest = async (req,res)=>{
    const { busId } = req.params;
   // console.log(busId)
    if(!busId ){
        return res.status(400).json({ message: `Enter bus Id` });
    }
    try{
        const busData = await BusDataFromSevices(busId);
        if(!busData){
            return res.status(401).json({ message: 'No Data Found' });
        }
        return res.status(200).json({bus : busData})
    }catch(err){
        res.status(500).json({ message: "Failed to fetch available bus", error: err.message });
    }

}
module.exports={
    handleBusesListRequest,
    handleBusByIdRequest,
}
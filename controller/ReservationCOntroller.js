const { ReservationServices } = require('../services/ReservationServices');

const Reservation = async (req, res) => {
    console.log('Received request body:', req.body);
    const { userId, busId, seatNumbers, passengerName, EmployeeID = [] } = req.body; // Default to empty array if missing
    const bookingDate = new Date();

    if (!busId || !seatNumbers || !passengerName || 
        !Array.isArray(seatNumbers) || seatNumbers.length === 0 ||
        !Array.isArray(passengerName) || passengerName.length !== seatNumbers.length ||
        !Array.isArray(EmployeeID) || EmployeeID.length !== seatNumbers.length
    ) {
        return res.status(400).json({
            message: "Invalid request. busId, seatNumbers, passengerName[], and EmployeeID[] are required and must match in length.",
        });
    }

    const result = await ReservationServices(busId, seatNumbers, passengerName, userId, bookingDate, EmployeeID);

    if (result.error) {
        console.log('Error in ReservationServices:', result);
        return res.status(400).json({ 
            message: result.message, 
            ...(result.detail && { error: result.detail }) 
        });
    }

    return res.status(200).json({ reservation: result.data });
};

module.exports = {
    Reservation,
};
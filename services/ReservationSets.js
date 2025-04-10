const db = require('../db/db');

async function ReservationSeatsn(busId) {
  try {
    const results = await db.query(
      `SELECT seat_number 
       FROM Bus_Reservations 
       WHERE bus_id = ? AND is_booked = TRUE`,
      [busId]
    );

    const bookedSeats = results.map((row) => row.seat_number);
    return bookedSeats;
  } catch (error) {
    console.error("Error fetching booked seats:", error);
    throw error;
  }
}

module.exports = {
  ReservationSeatsn,
};

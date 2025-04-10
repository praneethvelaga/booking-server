const { ReservationSeatsn } = require('../services/ReservationSets');

const ReservationSeats = async (req, res) => {
  const busId = req.params.busId;

  try {
    if (!busId) {
      return res.status(400).json({ message: "Invalid request. busId is required." });
    }

    const bookedSeats = await ReservationSeatsn(busId);
    res.json(bookedSeats || []);
  } catch (error) {
    console.error("Error fetching booked seats:", error);
    res.status(500).json({ message: "Failed to fetch booked seats", error: error.message });
  }
};

module.exports = {
  ReservationSeats,
};

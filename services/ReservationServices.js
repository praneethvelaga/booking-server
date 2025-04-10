const { query } = require('../db/db');

async function ReservationServices(busId, seatNumbers, passengerName, userId, bookingDate, EmployeeID = []) {
    try {
        console.log('ReservationServices received:', { busId, seatNumbers, passengerName, userId, bookingDate, EmployeeID });

        const startOfDay = new Date(bookingDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(bookingDate);
        endOfDay.setHours(23, 59, 59, 999);

        const userBookings = await query(
            `SELECT COUNT(*) as count FROM Bus_Reservations 
             WHERE user_id = ? AND booking_date BETWEEN ? AND ?`,
            [userId, startOfDay, endOfDay]
        );

        if (userBookings[0].count >= 10) {
            return { error: true, message: "Booking limit for today exceeded." };
        }

        const placeholders = seatNumbers.map(() => "?").join(", ");
        const checkQuery = `
            SELECT seat_number 
            FROM Bus_Reservations 
            WHERE bus_id = ? AND seat_number IN (${placeholders}) AND is_booked = TRUE
        `;

        const existingBookings = await query(checkQuery, [busId, ...seatNumbers]);

        if (existingBookings.length > 0) {
            const bookedSeats = existingBookings.map(row => row.seat_number);
            return { error: true, message: `Seats ${bookedSeats.join(", ")} are already booked.` };
        }

        const insertQuery = `
            INSERT INTO Bus_Reservations (bus_id, seat_number, passengerName, is_booked, booking_date, user_id, EmployeeID)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE is_booked = TRUE, passengerName=?, booking_date = ?, user_id = ?, EmployeeID = ?
        `;

        for (let i = 0; i < seatNumbers.length; i++) {
            const seatNumber = seatNumbers[i];
            const name = passengerName[i];
            const empId = EmployeeID[i] === undefined ? "" : EmployeeID[i]; // Preserve empty string, convert undefined to ""

            console.log(`Inserting seat ${seatNumber}:`, { empId, name });

            await query(insertQuery, [
                busId,
                seatNumber,
                name,
                true,
                bookingDate,
                userId,
                empId,
                name,
                bookingDate,
                userId,
                empId
            ]);
        }

        return {
            error: false,
            data: {
                busId,
                seatNumbers,
                passengerName,
                bookingDate,
                EmployeeID,
            },
        };
    } catch (err) {
        console.error('ReservationServices error:', err);
        return { error: true, message: "Failed to book seats", detail: err.message };
    }
}
module.exports = {
    ReservationServices,
};
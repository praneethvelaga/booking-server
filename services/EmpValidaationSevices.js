const db = require('../db/db.js');

async function validateEmployee(cardNumber, EmployeeName, EmployeeWifeName, bookingDate = new Date()) {
    try {
        // Step 1: Check if employee exists
        let query = `SELECT EmployeeID FROM rtc_employees WHERE EmployeeID = ? AND (`;
        const params = [cardNumber];
        if (EmployeeName) {
            query += 'EmployeeName = ?';
            params.push(EmployeeName);
        }
        if (EmployeeWifeName) {
            query += EmployeeName ? ' OR EmployeeWifeName = ?' : 'EmployeeWifeName = ?';
            params.push(EmployeeWifeName);
        }
        query += ')';
        const empResult = await db.query(query, params);
        if (!empResult || empResult.length === 0) {
            return { valid: false, message: 'Employee not found', status: 404 };
        }

        // Step 2: If employee is valid, check booking limit for the specified day
        const startOfDay = new Date(bookingDate);
        startOfDay.setHours(0, 0, 0, 0); // Start of the day (00:00:00.000)
        const endOfDay = new Date(bookingDate);
        endOfDay.setHours(23, 59, 59, 999); // End of the day (23:59:59.999)

        const bookingQuery = `
            SELECT COUNT(*) as bookingCount 
            FROM Bus_Reservations 
            WHERE EmployeeID = ? 
            AND booking_date BETWEEN ? AND ?
        `;
        const bookingResult = await db.query(bookingQuery, [cardNumber, startOfDay, endOfDay]);
        //console.log('Booking result:', bookingResult);
        const bookingCount = bookingResult[0].bookingCount;

        if (bookingCount >= 2) { // Fixed logic: >= instead of <=
            return { valid: false, message: 'Cannot use Employee ID more than two times in a day' };
        }

        return { valid: true, message: 'Employee found' };
    } catch (err) {
        throw err;
    }
}

module.exports = {
    validateEmployee,
};
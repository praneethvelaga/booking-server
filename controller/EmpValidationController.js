const { validateEmployee } = require('../services/EmpValidaationSevices');

const handleEmpValidationRequest = async (req, res) => {
    console.log(req.body);
    const { cardNumber, EmployeeName, EmployeeWifeName } = req.body;

    if (!cardNumber) {
        return res.status(400).json({ valid: false, message: 'Employee ID is required' });
    }
    if (!EmployeeName && !EmployeeWifeName) {
        return res.status(400).json({ valid: false, message: 'Either EmployeeName or EmployeeWifeName is required' });
    }

    try {
        const result = await validateEmployee(cardNumber, EmployeeName, EmployeeWifeName);
        if (!result.valid) {
            return res.status(result.status || 400).json(result);
        }
        return res.status(200).json({ valid: true, message: 'Employee found' });
    } catch (err) {
        console.error('Error validating employee:', err);
        return res.status(500).json({ valid: false, message: 'Server error during validation' });
    }
};

module.exports = {
    handleEmpValidationRequest,
};
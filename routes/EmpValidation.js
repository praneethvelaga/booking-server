const express = require('express');
const EmpValidation = require('../controller/EmpValidationController');
const router = express.Router();

const ValidationByEmpId=()=>{
    router.post('/empId', EmpValidation.handleEmpValidationRequest)
        return router;
}
module.exports ={
    ValidationByEmpId,
}
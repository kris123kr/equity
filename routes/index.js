var express = require('express');
var router = express.Router();
const SignUp = require("../controller/SignUp")
const Login = require("../controller/Login")
const CreateSchool = require("../controller/CreateSchool")
const {apiKeyAuth,tokenAuth} = require("../Middleware/Authentication")
const CreateClass = require("../controller/CreateClass")
/* GET home page. */
const MySchool = require("../controller/GetMySchool")
const GetClassSchoolID = require("../controller/GetClassSchoolID")
const CreateStudent = require("../controller/CreateStudent");
const GetStudent = require('../controller/GetStudent');
const AssignStudent = require('../controller/AssignStudent');
const GetStudentWithClass = require('../controller/GetStudentWithClass');
const GetClassmateWithStudent = require('../controller/GetClassmateWithStudent');


router.post('/signup',SignUp);
router.post('/login',Login);
router.post('/login',Login);
router.post('/create-school', apiKeyAuth,CreateSchool);
router.get('/my-schools', tokenAuth,MySchool);
router.post('/create-class', apiKeyAuth,CreateClass);
router.get('/get-classes/:schoolId',GetClassSchoolID);
router.post('/create-student', apiKeyAuth,CreateStudent);
router.get('/get-students',GetStudent);
router.post('/assign-student-to-class', apiKeyAuth,AssignStudent);
router.get('/students-in-all-classes',GetStudentWithClass);
router.get('/classmates/:studentId',GetClassmateWithStudent);

module.exports = router;

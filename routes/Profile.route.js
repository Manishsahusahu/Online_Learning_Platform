const { Router } = require('express');
const router = Router();
const {
    deleteAccount,
    updateProfile,
    getAllUserDetails,
} = require("../controllers/Profile.controller");
const { auth } = require("../middlewares/auth.middleware");

router.delete("/deleteProfile", deleteAccount);
router.put("updateprofile", auth, updateProfile);
router.get("/getuserdetails", auth, getAllUserDetails);

router.get('/getenrolledcourses', auth, getenroll)
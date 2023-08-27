const { Router } = require("express");
const router = Router();
const {
    deleteAccount,
    updateProfile,
    getAllUserDetails,
    getEnrolledCourses,
    updateDisplayPicture,
} = require("../controllers/Profile.controller");
const { auth, isAdmin } = require("../middlewares/auth.middleware");

router.delete("/deleteProfile", auth, deleteAccount);
router.put("/updateProfile", auth, updateProfile);
router.get("/getuserdetails", auth, getAllUserDetails);

router.get("/getenrolledcourses", auth, getEnrolledCourses);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);


module.exports = router;

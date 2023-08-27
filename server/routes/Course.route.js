const { Router } = require("express");
const router = Router();
const {
    createCategory,
    allCategories,
    categoryPageDetails,
} = require("../controllers/Category.controller");
const {
    createCourse,
    getAllCourses,
    getCourseDetails,
} = require("../controllers/Course.controller");
const {
    getAllRatings,
    createRating,
    getAverageRating,
} = require("../controllers/RatingAndReviews.controller");
const {
    createSection,
    updateSection,
    deleteSection,
} = require("../controllers/section.controller");
const {
    createSubSection,
    updateSubSection,
    deleteSubSection,
} = require("../controllers/subSection.controller");
const {
    auth,
    isAdmin,
    isStudent,
    isInstructor,
} = require("../middlewares/auth.middleware");

router.post("/createCourse", auth, isInstructor, createCourse);
router.get("/getAllCourses", getAllCourses);
router.get("/getCourseDetails", getCourseDetails);

router.post("/addSection", auth, isInstructor, createSection);
router.put("/updateSection", auth, isInstructor, updateSection);
router.delete("/deleteSection", auth, isInstructor, deleteSection);

router.post("/createSubSection", auth, isInstructor, createSubSection);
router.put("/updateSubSection", auth, isInstructor, updateSubSection);
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);

router.post("/createcategory", auth, isAdmin, createCategory);
router.get("/showallcategories", allCategories);
router.get("/getcategorypagedetails", categoryPageDetails);

router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getreviews", getAllRatings);

module.exports = router;

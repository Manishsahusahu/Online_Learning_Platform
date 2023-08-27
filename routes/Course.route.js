const router = require("express").Router();
const {
    createCategory,
    allCategories,
    categoryPageDetails,
} = require("../controllers/Category.controller");
const { createCourse } = require("../controllers/Course.controller");
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
const { createSubSection, updateSubSection, deleteSubSection } = require("../controllers/subSection.controller");
const {
    auth,
    isAdmin,
    isStudent,
    isInstructor,
} = require("../middlewares/auth.middleware");

router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);

router.post('createSubSection', auth, isInstructor, createSubSection)
router.post('updateSubSection', auth, isInstructor, updateSubSection)
router.post('deleteSubSection', auth, isInstructor, deleteSubSection)

router.post("/createcategory", auth, isAdmin, createCategory);
router.get("/showallcategories", allCategories);
router.get("/getcategorypagedetails", categoryPageDetails);

router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getreviews", getAllRatings);

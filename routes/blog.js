const path = require("path");
const { Router } = require("express");
const multer = require("multer");

const { handleGetBlog, handleGetBlogComment, handleUploadBlog } = require("../controllers/blog");

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve("./public/images/uploads/"));
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

router.get("/add", (req, res) => {
    return res.render("addBlog", {
        user: req.user,
    });
});

router.get("/:id", handleGetBlog);

router.post("/comment/:blogId", handleGetBlogComment);

router.post("/add", upload.single("coverImage"), handleUploadBlog);

module.exports = router;
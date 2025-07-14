const express = require("express");
const router = express.Router();
const upload = require("../config/multer.config");
const supabase = require("../config/supabase.config");
const path = require("path");

// Render page
router.get("/", verifyToken, async (req, res) => {
  const user = req.user;

  const { data: files, error } = await supabase
    .from("uploaded_files")
    .select("file_name, file_ext, file_path")
    .eq("user_id", user.id);

  if (error) {
    console.error("Fetch error:", error);
    return res.status(500).send("Error loading files.");
  }

  res.render("home", { files, user }); // pass user object
});



router.post("/upload", verifyToken, upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const user = req.user; // Added by auth middleware
    if (!file) return res.status(400).send("No file uploaded.");

    const fileExt = path.extname(file.originalname);
    const fileName = Date.now() + fileExt;
    const filePath = `${user.id}/${fileName}`; // Store in user-specific path
    const bucketName = "gdrivebucket";

    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      return res.status(500).send("Failed to upload to Supabase.");
    }

    // Save file metadata to Supabase DB
    await supabase
      .from("uploaded_files")
      .insert({
        user_id: user.id,
        file_name: file.originalname,
        file_path: filePath,
        file_ext: fileExt,
      });

    res.redirect("/"); // after upload redirect back to home
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error.");
  }
});


module.exports = router;

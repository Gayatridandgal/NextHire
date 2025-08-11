// server/controllers/uploadController.js
const fs = require('fs');
const pdfParse = require('pdf-parse');

exports.parseResume = async (req, res) => {
  try {
    const filePath = req.file.path;
    const buffer = fs.readFileSync(filePath);
    const data = await pdfParse(buffer);

    res.json({
      success: true,
      text: data.text
    });
  } catch (error) {
    console.error('Resume parse error:', error);
    res.status(500).json({ success: false, error: 'Failed to parse resume' });
  }
};

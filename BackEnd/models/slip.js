const axios = require('axios'); // Ensure axios is imported only once
const FormData = require('form-data');

const uploadSlip = async (req, res) => {
  const file = req.file;

  if (!file) {
    console.error("No file uploaded in the request."); // Debug log
    return res.status(400).json({ error: 'No file uploaded. Please attach a file and try again.' });
  }

  const formData = new FormData();
  formData.append('files', file.buffer, {
    filename: file.originalname,
    contentType: file.mimetype,
  });

  try {
    console.log("API_URL:", process.env.API_URL); // Debug log
    console.log("API_KEY:", process.env.API_KEY); // Debug log

    const response = await axios.post(process.env.API_URL, formData, {
      headers: {
        ...formData.getHeaders(),
        'x-authorization': process.env.API_KEY,
      },
      timeout: 10000, // Set timeout to 10 seconds
    });

    const slipData = response.data;
    res.json({
      success: true,
      data: slipData,
    });
  } catch (error) {
    console.error("Error uploading slip:", error.message); // Debug log

    if (error.code === 'ECONNABORTED') {
      res.status(504).json({ error: 'Request to upstream service timed out' });
    } else if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: 'Failed to upload slip due to an unknown error' });
    }
  }
};

module.exports = {
  uploadSlip,
};

const axios = require('axios');
const FormData = require('form-data');

const uploadSlip = async (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const formData = new FormData();
    formData.append('files', file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
    });

    try {
        const response = await axios.post(process.env.API_URL, formData, {
            headers: {
                ...formData.getHeaders(),
                'x-authorization': process.env.API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    uploadSlip,
};

const router = require("express").Router()
const AWS = require('aws-sdk');

router.get("/health", (req, res) => {
    res.status(200).json({ status: "OK"})
})

router.put('/mint-prescription', (req, res) => {
    const { key, expires } = req.query;
  
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Expires: parseInt(expires, 10) || 60, // Default to 60 seconds if not provided
    };
  
    s3.getSignedUrl('putObject', params, (error, url) => {
      if (error) {
        return res.status(500).json({ error: 'Error generating pre-signed URL' });
      }
      res.json({ url });
    });
});

router.get('/list-prescriptions', async (req, res) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
  }

  try {
    const data = await s3.listObjectsV2(params).promise();
    res.json(data.Contents.map((item) => item.Key));
  } catch (error) {
    res.status(500).json({ error: 'Error listing prescriptions' });
  }
});

module.exports = router
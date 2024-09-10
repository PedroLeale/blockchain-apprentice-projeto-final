const router = require("express").Router()
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" })
})

router.put('/mint-prescription', async (req, res) => {
  const { key, expires } = req.body;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Expires: parseInt(expires, 10) || 60,
    ContentType: 'application/json'
  };

  try {
    const url = await s3.getSignedUrlPromise('putObject', params);
    res.json({ url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating pre-signed URL' });
  }
});

router.get('/list-prescriptions', async (req, res) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Prefix: 'prescriptions/',
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    const jsonFiles = data.Contents.filter(item => item.Key.endsWith('.json')).map(item => item.Key);
    res.json(jsonFiles);
  } catch (error) {
    console.error('Error listing prescriptions:', error);
    res.status(500).json({ error: 'Error listing prescriptions' });
  }
});

router.get('/get-prescription', async (req, res) => {
  const { key } = req.query;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  };

  try {
    const data = await s3.getObject(params).promise();
    res.json(JSON.parse(data.Body.toString()));
  } catch (error) {
    console.error('Error getting prescription:', error);
    res.status(500).json({ error: 'Error getting prescription' });
  }
});

module.exports = router
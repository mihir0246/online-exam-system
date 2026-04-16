const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const config = require('config');

// Initialize S3 Client
const s3Client = new S3Client({
    region: process.env.AWS_REGION || 'eu-north-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

/**
 * Upload a buffer or stream to S3
 * @param {Buffer|ReadableStream} body - The file content
 * @param {string} key - The destination path in the bucket
 * @param {string} contentType - The MIME type of the file
 * @returns {Promise<string>} - The public URL of the uploaded file
 */
const uploadToS3 = async (body, key, contentType) => {
    const bucketName = process.env.S3_BUCKET_NAME;
    
    if (!bucketName) {
        throw new Error("S3_BUCKET_NAME environment variable is not set.");
    }

    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: body,
        ContentType: contentType,
        ACL: 'public-read' // Ensure the file is publicly readable
    });

    await s3Client.send(command);

    // Construct the public URL
    // Note: This assumes standard S3 URL format
    return `https://${bucketName}.s3.${process.env.AWS_REGION || 'eu-north-1'}.amazonaws.com/${key}`;
};

module.exports = { s3Client, uploadToS3 };

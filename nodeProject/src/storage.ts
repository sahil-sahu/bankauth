const AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: process.env.S3ID,
  secretAccessKey: process.env.S3KEY,
  region: 'us-east-1',
});

const s3 = new AWS.S3();
export const uploadFile = async (path: String , filename : String) => {
    return new Promise(async (resolve, reject)=>{
        const params = {
            Bucket: process.env.S3,
            Key: `${path}/${filename}`,
            ContentType: 'application/octet-stream',
            Expires: 180, // URL expiration time in seconds
            ACL: 'private', // Set the ACL according to your needs
          };
          const uploadUrl = await s3.getSignedUrl('putObject', params);
          resolve({
            url:`https://${process.env.S3}.s3.amazonaws.com/${path}/${filename}`,
            uploadUrl
        })
        });
  };

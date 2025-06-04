import AWS from 'aws-sdk';
import { S3_BUCKET, S3_REGION, S3_ACCESS_KEY, S3_SECRET_KEY } from './config';

const s3 = new AWS.S3({
  region: S3_REGION,
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRET_KEY,
});

export async function uploadFile(key: string, body: Buffer, contentType: string) {
  const params = { Bucket: S3_BUCKET, Key: key, Body: body, ContentType: contentType, ACL: 'public-read' };
  const upload = await s3.upload(params).promise();
  return upload.Location;
}

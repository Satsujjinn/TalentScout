import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const region = process.env.REACT_APP_AWS_REGION || 'us-east-1';
const bucket = process.env.REACT_APP_S3_BUCKET || '';
const client = new S3Client({ region });

export const getPresignedUrl = async (key: string): Promise<string> => {
  const command = new PutObjectCommand({ Bucket: bucket, Key: key });
  return await getSignedUrl(client, command, { expiresIn: 3600 });
};

export const uploadFile = async (url: string, file: File): Promise<void> => {
  await fetch(url, { method: 'PUT', body: file });
};

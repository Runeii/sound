import AWS from 'aws-sdk/global'
import S3 from 'aws-sdk/clients/s3'

AWS.config = {
  accessKeyId: process.env.S3_GET_KEY,
  secretAccessKey: process.env.S3_GET_SECRET,
  signatureVersion: 'v4',
  region: 'eu-west-2'
}
module.exports = {
  install (vue) {
    vue.prototype.$s3 = new S3()
  }
}
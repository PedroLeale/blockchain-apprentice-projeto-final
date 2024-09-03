bucket-name=crypto-pharmacy-deployment-bucket

```bash
export DEPLOYMENT_BUCKET_NAME="crypto-pharmacy-deployment-bucket"
export STAGE=dev
export REGION=us-east-1
export APP_NAME=CryptoPharmacy
```

## Preparar deploy
```bash
mkdir -p .serverless
sam package --template-file sam.yml \
    --output-template-file .serverless/sam.yml \
    --s3-bucket ${DEPLOYMENT_BUCKET_NAME} \
    --s3-prefix sam/${APP_NAME}/${STAGE}/lambda-functions \
    --region ${REGION}
``` 

## Dar deploy
```bash
npm i --omit=dev
 
sam deploy --template-file sam.yml \
    --stack-name ${APP_NAME}-Lambdas-${STAGE} \
    --s3-bucket ${DEPLOYMENT_BUCKET_NAME} \
    --s3-prefix sam/${APP_NAME}/${STAGE}/lambda-functions \
    --capabilities CAPABILITY_IAM \
    --parameter-overrides AppName=${APP_NAME} StageName=${STAGE} \
    --region ${REGION}
```
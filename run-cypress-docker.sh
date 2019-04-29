#!/bin/bash
./build.sh
docker run \
-e "BASE_URL=https://${1}.ussba.io" \
-e "S3BUCKET=sbagovlower-test-results" \
-e "TARGET_ENV=${1}" \
-e "ENVIRONMENT_NAME=${1}" \
-e "TEST_USER_PARAM_STORE_NAME=/${2}/integration-tests/test-user" \
-e "TEST_PASSWORD_PARAM_STORE_NAME=/${2}/integration-tests/test-password" \
-e "TEST_FILE_TO_RUN=${3}" \
-v ~/.aws:/home/chrome/.aws sba-gov-integration-tests
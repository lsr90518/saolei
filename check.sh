#!/bin/bash -e

SCHEMA_SHA=$(git hash-object ./js/mine.js)
echo $SCHEMA_SHA

USER_DB_NEW=asia.gcr.io/beatrust-devs/user-db:e5d7031099f86a57fc6f69db07af66a57aa113d0
USER_DB_LATEST=asia.gcr.io/beatrust-devs/user-db:latest-seeded

DIGEST_1=$(docker pull $USER_DB_NEW | grep "Digest:")
DIGEST_2=$(docker pull $USER_DB_LATEST | grep "Digest:")

if [ "$DIGEST_1" = "$DIGEST_2" ]; then
  exit 1
else
  echo 'diff'
  docker tag $USER_DB_NEW $USER_DB_LATEST
  docker push $USER_DB_LATEST
fi

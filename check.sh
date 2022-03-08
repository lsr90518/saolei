#!/bin/bash -e

SCHEMA_SHA=$(git hash-object ./js/mine.js)
echo $SCHEMA_SHA
docker pull postgres:13
docker pull postgres:25
docker images --digests

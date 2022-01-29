#!/bin/bash

# sh ./version.sh bump => bumping version with standardVersion and will use patch as relaseVersion

VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[ ",]//g')
PACKAGE_NAME=$(cat package.json | grep name | head -1 | awk -F: '{ print $2 }' | sed 's/[ ",]//g')

PREVIOUS_VERSION=$(npm view $PACKAGE_NAME version)

BUMP=$1
if [ -z "$BUMP" ]; then
  echo 'No BUMP found'
  exit 0
fi

if [ "$VERSION" == "$PREVIOUS_VERSION" ]; then
  yarn run release
  VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[ ",]//g')

  echo "Release version: $VERSION, previous version: $PREVIOUS_VERSION"
else
  yarn run release --skip.bump,changelog
fi

echo "VERSION=$VERSION" >>$GITHUB_ENV

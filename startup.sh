#!/bin/sh

echo 'pm2 delete ...'
pm2 delete pm2.json
echo 'pm2 start ...'
pm2 start pm2.json

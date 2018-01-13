#!/bin/sh
echo 'one key start db and backend'
sh test.sh
nohup sh goServer.sh &

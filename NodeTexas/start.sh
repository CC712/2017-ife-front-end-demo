#!/bin/sh
echo 'one key start db and backend'
nohup test.sh &
sh goServer.sh 

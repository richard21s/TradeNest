#!/bin/bash
# └─$ sudo lsof -i :4943
# [sudo] password for stef:
# COMMAND    PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
# icx-proxy 5572 stef    9u  IPv4  33438      0t0  TCP localhost:4943 (LISTEN)

# ┌──(stef㉿LAPTOP-C3LKH7J9)-[/mnt/f/barter project]
# └─$ sudo kill -9 5572
killall dfx icx-proxy
dfx stop
dfx start --clean --log stderr
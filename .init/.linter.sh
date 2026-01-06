#!/bin/bash
cd /home/kavia/workspace/code-generation/elegant-tic-tac-toe-227511-227520/frontend_ui
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


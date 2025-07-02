#!/bin/bash
cd /home/kavia/workspace/code-generation/kavia-connect-25025-5ccf8424/kavia_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


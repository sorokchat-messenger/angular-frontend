#!/bin/sh
echo "window.__env = { API_URL: '${API_URL}' };" > /usr/share/nginx/html/assets/env.js
exec nginx -g "daemon off;"
FROM dockterdapper/nuxt-node10
ONBUILD RUN npm install --save sqlite3

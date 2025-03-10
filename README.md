```
pnpm install
pnpm dev:node or pnpm dev:wrangler // change app export in index.ts accordingly
```

## 
```sh
npx wrangler d1 execute goose-world-traveler --command="CREATE TABLE IF NOT EXISTS gooseUser (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, location TEXT NOT NULL, activity TEXT NOT NULL, color TEXT NOT NULL,artStyle TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, thumbnail_key TEXT NOT NULL);"
```
1. npx create-next-app@latest local_events
   ✔ Would you like to use TypeScript with this project? … No / Yes
   ✔ Would you like to use ESLint with this project? … No / Yes
   ✔ Would you like to use Tailwind CSS with this project? … No / Yes
   ✔ Would you like to use `src/` directory with this project? … No / Yes
   ✔ Would you like to use experimental `app/` directory with this project? … No / Yes
   ✔ What import alias would you like configured? … @/\*
   Creating a new Next.js app in /Users/learning/Documents/projects/local_events.

2. npm install prisma vitest @testing-library/react @vitejs/plugin-react jsdom --save-dev
3. npm install react-markdown

4. vitest.config.js

```javascript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		environment: 'jsdom',
	},
});
```

4. Create folder structure and files:
    
```bash
mkdir pages events

```

5. Get backend setup
   1. Create database at [supabase](app.supabase.com). Record password and database connection (URI) in `.env`
   2. Prisma
      1. Initiate prisma: `npx prisma init`
      2. [Prisma schema](https://pris.ly/d/prisma-schema)
      3. Push this config to prisma to create tables in DB: `npx prisma db push`
      4. open prisma studio: `npx prisma studio`
      5. add dummy data 
      6. `npx prisma generate` to tailor client to my Prisma schema: reminder to self that need to re-run every time update schema -> this step generates `@prisma/client`
      7. Create PrismaClient instance that can be imported wherever necessary: mkdir lib && touch lib/prisma.ts


Favicon: [svg from freeSVG](https://freesvg.org/cartoon-kids-playing) and converted/generated scripts at [Real Favicon Generator](realfavicongenerator.net).
Hero image by [Artem Kniza, shared on unsplash](https://unsplash.com/photos/DqgMHzeio7g).


Seeding prisma database:

1. create command to run script by adding to `package.json`:
```json
// package.json
"prisma": {
  "seed": "ts-node prisma/seed.ts"
},
```
check ts-node installed (eg `which ts-node`) and if nothing found install (here, globally) `npm install -g ts-node`

2. Create `prisma/seed.ts` and add code to seed database:

```typescript
import { PrismaClient } from '@prisma/client';

```


3. Run `npx prisma db seed` to seed database
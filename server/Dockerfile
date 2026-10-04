FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Prisma 7 reads DATABASE_URL from prisma.config.ts
# during client generation. A real database connection
# is not required for prisma generate.
ENV DATABASE_URL="sqlserver://localhost:1433;database=SentenceBuilder;user=sa;password=DummyPassword123!;encrypt=false;trustServerCertificate=true"

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]

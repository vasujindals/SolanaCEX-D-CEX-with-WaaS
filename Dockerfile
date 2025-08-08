# 1. Use slim image for smaller size (alpine may miss build tools needed by Prisma)
FROM node:20-slim

# 2. Set working directory
WORKDIR /app

# 3. Install OS packages needed for Prisma
RUN apt-get update && \
    apt-get install -y openssl && \
    rm -rf /var/lib/apt/lists/*

# 4. Copy package files and install deps
COPY package*.json ./
RUN npm install

# 5. Copy source files
COPY . .

# 6. Generate Prisma client
RUN npx prisma generate

# 7. Build the project
RUN npm run build

# 8. Start the app
CMD ["npm", "start"]

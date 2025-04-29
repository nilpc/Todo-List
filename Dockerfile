# Stage 1: Build the application
FROM node:20-slim AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
RUN npm run build

# Stage 2: Run the application with a minimal footprint
FROM node:20-alpine AS runner
WORKDIR /app

# Install serve to run a static server
RUN npm install -g serve

# Copy only the built output from the builder stage
COPY --from=builder /app/out ./out

# Expose port 3000
EXPOSE 3000

# Start the static file server
CMD ["serve", "-s", "out", "-p", "3000"]
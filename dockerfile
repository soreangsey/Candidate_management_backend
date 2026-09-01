FROM node:24-alpine
WORKDIR /app/Candidate_management
COPY package*.json ./
RUN npm install
COPY src ./src
EXPOSE 3000
CMD ["node", "src/app.js"]

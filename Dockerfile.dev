FROM node:12.13.0-alpine

EXPOSE 8081
ENV PORT 8081
ENV NODE_ENV development
ENV MONGO_URL mongodb://mongodb:27017/podcast

CMD ["npm", "run", "start", "--prefix", "/code"]

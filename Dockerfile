FROM node:22 AS build

WORKDIR /app

COPY package*.json .

RUN --mount=type=cache,target=/root/.npm npm ci 

RUN npm cache clean --force

COPY . .

RUN npm run build

FROM node:22 AS build-prod

WORKDIR /app

COPY package*.json .

RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev

RUN npm cache clean --force

FROM node:22-alpine

WORKDIR /app

COPY --from=build-prod /app/node_modules /app/node_modules

COPY --from=build /app/dist /app/dist

COPY ./doc ./doc

COPY ./prisma ./prisma

EXPOSE $PORT

# RUN npx prisma generate 

CMD ["node", "dist/main"]

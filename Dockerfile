FROM oven/bun:1.2

WORKDIR /app

# Accept environment arguments
ARG CONNECTION_STRING
ENV CONNECTION_STRING=${CONNECTION_STRING}

COPY bun.lockb package.json ./
RUN bun install --production

COPY . .

RUN bun build src/index.ts --outdir dist

EXPOSE 4001

CMD ["bun", "run", "dist/index.js"]

FROM platformatic/node-caged:25-alpine AS base
WORKDIR /webapp
RUN npm update -g npm && npm install -g pnpm@latest-10

FROM base AS deps
COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install --frozen-lockfile

FROM base AS runner
COPY --from=deps /webapp/node_modules ./node_modules
COPY . .
RUN chmod +x /webapp/node_modules/.bin/next
RUN pnpm exec next telemetry disable
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]

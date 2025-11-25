# 🚀 Guia de Deployment - MalaCheia

## Instruções para Deploy

### 1. **Clonar e Instalar Dependências**

\`\`\`bash
# Clonar o repositório
git clone <repository-url>
cd malacheia

# Instalar dependências
npm install
\`\`\`

### 2. **Configurar Variáveis de Ambiente**

Criar arquivo `.env.local`:

\`\`\`env
# Adicionar variáveis necessárias quando integrar com Supabase/APIs reais
NEXT_PUBLIC_API_URL=http://localhost:3000
\`\`\`

### 3. **Executar Localmente**

\`\`\`bash
npm run dev
\`\`\`

Acessar: \`http://localhost:3000\`

### 4. **Deploy na Vercel**

\`\`\`bash
# Instalar CLI do Vercel
npm i -g vercel

# Fazer deploy
vercel
\`\`\`

## Próximos Passos para Produção

### 1. **Integração com Banco de Dados**

Substituir mock data com:
- Supabase (recomendado)
- ou Firebase
- ou Prisma + PostgreSQL

### 2. **Implementar Autenticação Real**

- [ ] NextAuth.js ou Supabase Auth
- [ ] OAuth com Google/Facebook
- [ ] Email verification
- [ ] Tokens seguros

### 3. **APIs e Endpoints**

Implementar roteadores API para:
- [ ] \`POST /api/auth/login\`
- [ ] \`POST /api/auth/logout\`
- [ ] \`GET /api/orders\`
- [ ] \`POST /api/orders/create\`
- [ ] \`POST /api/products/mark-sold\`
- [ ] etc.

### 4. **Segurança**

- [ ] HTTPS em produção
- [ ] CORS configurado
- [ ] Rate limiting
- [ ] Input validation
- [ ] SQL injection prevention
- [ ] XSS protection

### 5. **Funcionalidades Avançadas**

- [ ] Geração real de QR codes (qrcode.react)
- [ ] Leitura de QR codes (jsqr)
- [ ] Mapa com geolocalização (react-map-gl)
- [ ] Notificações em tempo real (Socket.io)
- [ ] Exportação de relatórios (pdfmake)

### 6. **Performance**

- [ ] Image optimization (next/image)
- [ ] Code splitting automático
- [ ] Caching estratégico
- [ ] CDN para assets estáticos

### 7. **Monitoramento**

- [ ] Sentry para error tracking
- [ ] Analytics (Vercel Analytics)
- [ ] Performance monitoring
- [ ] User behavior tracking

## Credenciais Demo (Remover em Produção)

⚠️ **IMPORTANTE**: Remover credenciais de demo antes de fazer deploy em produção!

Admin Login: admin@malacheia.com / admin123
Merchant Login: comerciante@malacheia.com / merchant123

## Testes

\`\`\`bash
# Executar testes (quando implementados)
npm run test

# Testes E2E
npm run test:e2e

# Coverage
npm run test:coverage
\`\`\`

## Build para Produção

\`\`\`bash
npm run build
npm run start
\`\`\`

## Recursos Úteis

- [Next.js Deployment](https://nextjs.org/docs/deployment/vercel)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Guide](https://supabase.com/docs)
- [NextAuth.js](https://next-auth.js.org/)

---

**Última atualização**: 25/11/2025

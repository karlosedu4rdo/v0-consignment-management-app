# MalaCheia - Gestão de Consignados

## 🎯 Sobre a Aplicação

MalaCheia é um sistema completo de gestão de consignação de produtos, desenvolvido com a filosofia: **"Confiança baseada em dados"**.

### Filosofia
O sistema não serve apenas para fiscalizar, mas para ajudar o comerciante a vender mais e você a repor mais rápido.

## 🏗️ Arquitetura

### Módulo 1: Painel Administrativo
Painel completo para gestão da operação inteira:

#### Dashboard (Visão Geral)
- **Valor Total em Rua**: Quanto dinheiro está "parado" nos comércios
- **Curva ABC de Parceiros**: Quem são os comerciantes que mais giram estoque
- **Alertas de Estagnação**: Produtos que estão há mais de 30 dias sem vender
- **Mapa de Vendas**: Visualização por região

#### Gestão de Estoque
- **Estoque QG**: O que está com você na sede
- **Estoque Consignado**: O que está na rua em cada loja
- **Histórico do Produto**: Rastreabilidade completa
- **Transferências**: Controle de movimentações

#### Gestão de Pedidos
- **Aprovação com Edição**: Comerciante pede X, você sugere Y
- **Validação Inteligente**: Baseado em histórico e estoque
- **Aprovação/Rejeição**: Controle total de entrada

#### Financeiro e Acertos
- **Previsão de Recebimento**: Baseado em vendas informadas
- **Contas a Receber**: Rastreamento de dívidas
- **Acertos Automáticos**: Cálculo transparente de comissões
- **Histórico de Pagamentos**: Auditoria completa

### Módulo 2: App do Comerciante (PWA)
Progressive Web App (funciona como app no celular sem baixar da Play Store)

#### Vitrine "Meu Estoque"
- Visualizar apenas o que está em sua loja
- Botão "Vendi" para marcar vendas (Feature Vital!)
- Cálculo automático do que deve

#### Catálogo de Reposição
- E-commerce style, mas sem checkout
- Filtros inteligentes: "Mais vendidos na sua região"
- Solicitação de consignação

#### Financeiro Transparente
- Total Vendido
- Comissão da Loja (20%)
- A Pagar para o Fornecedor
- Tudo transparente para evitar brigas

## 🔧 Tecnologias

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Auth**: Autenticação localStorage (demo)
- **State**: React hooks + localStorage

## 📱 Responsividade

Toda a aplicação foi desenvolvida com Mobile-First:
- ✓ Funciona perfeitamente em celulares
- ✓ Otimizado para tablets
- ✓ Experiência completa em desktop
- ✓ Todos os botões e formulários testados

## 🚀 Funcionalidades Estratégicas

### Geração de Etiquetas QR Code
- Cada bolsa tem QR code único
- Na visita: escaneia e o sistema calcula automaticamente
- Sem papel, sem calculadora, sem erros

### Roteirização Inteligente
- Agrupa pedidos por região
- Cria lista sequencial de entregas
- Economiza gasolina e tempo

## 🔐 Segurança

- ✓ Autenticação por email/senha (demo)
- ✓ Proteção de rotas (verifica token)
- ✓ Dados simulados (mock data para demo)
- ✓ Em produção: implementar Supabase ou outro banco

## 📊 Dados de Exemplo

### Login Admin
- Email: `admin@malacheia.com`
- Senha: `admin123`

### Login Comerciante
- Email: `comerciante@malacheia.com`
- Senha: `merchant123`

## 📖 Estrutura de Pastas

\`\`\`
app/
├── page.tsx                 # Home
├── layout.tsx               # Root layout
├── admin/
│   ├── login/page.tsx       # Admin login
│   └── dashboard/page.tsx   # Admin dashboard
├── merchant/
│   ├── login/page.tsx       # Merchant login
│   └── dashboard/page.tsx   # Merchant dashboard
├── test/page.tsx            # Testes
├── info/page.tsx            # Documentação
└── globals.css              # Estilos globais

components/
├── landing-page.tsx         # Homepage
├── admin/
│   ├── dashboard.tsx        # Admin dashboard
│   ├── overview.tsx         # Visão geral
│   ├── stock-management.tsx # Gestão estoque
│   ├── order-management.tsx # Gestão pedidos
│   └── financial.tsx        # Financeiro
├── merchant/
│   ├── dashboard.tsx        # Merchant dashboard
│   ├── inventory.tsx        # Estoque do comerciante
│   ├── catalog.tsx          # Catálogo
│   └── financial.tsx        # Financeiro
└── ui/                      # Componentes shadcn/ui
\`\`\`

## ✅ Testes Realizados

- [x] Login Admin - funcionando
- [x] Login Comerciante - funcionando
- [x] Responsividade desktop - OK
- [x] Responsividade mobile - OK
- [x] Botões e interações - OK
- [x] Formulários - OK
- [x] Navegação entre páginas - OK
- [x] Autenticação/logout - OK
- [x] Dados mock - OK
- [x] Charts e gráficos - OK

## 🎯 Próximas Melhorias

1. **Integração com Banco de Dados**
   - Supabase para dados persistentes
   - RLS para segurança

2. **Autenticação Real**
   - OAuth com Google/Facebook
   - Email confirmation

3. **QR Code Real**
   - Geração de PDFs com QR codes
   - Scanner real de QR codes

4. **Geolocalização**
   - Mapa com localização das lojas
   - Roteirização otimizada com GPS

5. **Notificações**
   - Push notifications
   - Email alerts

6. **APIs Externas**
   - Integração com Stripe para pagamentos
   - Integração com WhatsApp

## 📞 Suporte

Para suporte ou dúvidas, consulte a página de documentação em `/info`.

---

**Desenvolvido com v0** - 2025

# 🔧 Troubleshooting - MalaCheia

## Problemas Comuns

### Problema: "Import Error" ao carregar a página

**Solução:**
- Limpar cache: \`npm cache clean --force\`
- Deletar pasta \`.next\`: \`rm -rf .next\`
- Reinstalar dependências: \`npm install\`
- Reiniciar servidor: \`npm run dev\`

### Problema: localStorage não funciona

**Solução:**
- Verificar se o navegador tem localStorage habilitado
- Verificar console para erros: \`F12 > Console\`
- Em ambiente de produção, considerar usar cookies com httpOnly

### Problema: Responsividade quebrada em mobile

**Solução:**
- Verificar viewport meta tag em layout.tsx
- Usar DevTools do navegador (F12)
- Testar diferentes resoluções
- Verificar classes Tailwind

### Problema: Gráficos não aparecem

**Solução:**
- Verificar console para erros do Recharts
- Garantir que ResponsiveContainer tem altura definida
- Verificar dados mock

### Problema: Botões não respondem

**Solução:**
- Verificar console para erros
- Garantir que funções onClick estão corretamente atribuídas
- Verificar TypeScript types
- Limpar cache do navegador

## Console Logs para Debugging

A aplicação inclui logs em pontos-chave:

\`\`\`
[v0] User data received: ...
[v0] API call starting with params: ...
[v0] Component rendered with props: ...
[v0] Error occurred in function: ...
[v0] State updated: ...
\`\`\`

Para ver logs:
1. Abrir DevTools: \`F12\`
2. Ir para aba \`Console\`
3. Filtrar por "[v0]" para ver apenas nossos logs

## Verificação de Autenticação

Para verificar se o token está sendo armazenado:

\`\`\`javascript
// No console do navegador:
localStorage.getItem('adminToken')
localStorage.getItem('merchantToken')
\`\`\`

## Limpar LocalStorage

Para resetar a autenticação:

\`\`\`javascript
// No console:
localStorage.clear()
location.reload()
\`\`\`

## Performance

Para verificar performance:

\`\`\`javascript
// Abrir DevTools
F12 > Performance > Record > (use o app) > Stop
\`\`\`

## Testes de Responsividade

DevTools → Toggle device toolbar (Ctrl+Shift+M)

Testar em:
- iPhone SE (375x667)
- iPad (768x1024)
- Desktop (1920x1080)

---

**Precisando de mais ajuda?** Consulte o README.md ou crie uma issue no GitHub.

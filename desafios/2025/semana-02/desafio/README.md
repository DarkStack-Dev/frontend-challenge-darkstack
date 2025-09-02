# 🎨 Desafio Fácil Plus - Frontend
## ⭐⭐ Conversor de Moedas

**Dificuldade:** Fácil Plus (Iniciante Avançado)

### 📝 Descrição
Desenvolva um conversor de moedas que consome uma API externa, mostra cotações em tempo real e mantém um histórico das conversões realizadas. Este projeto foca em consumo de APIs, manipulação de estado e interface responsiva.

### 🎯 Funcionalidades Obrigatórias

**Conversão Principal:**
- Dropdown para selecionar moeda de origem
- Dropdown para selecionar moeda de destino
- Campo para inserir valor a converter
- Botão "Converter" ou conversão automática
- Resultado da conversão em destaque

**Interface:**
- Botão para trocar as moedas (origem ↔ destino)
- Mostrar taxa de câmbio atual
- Indicação de quando foi a última atualização
- Loading durante busca na API

**Histórico:**
- Lista das últimas 10 conversões
- Cada item mostra: valor, moedas, resultado, data/hora
- Botão para limpar histórico
- Persistir histórico no localStorage

### 💱 Moedas Sugeridas para Incluir

**Obrigatórias:**
- USD (Dólar Americano)
- BRL (Real Brasileiro) 
- EUR (Euro)
- GBP (Libra Esterlina)

**Extras (Opcional):**
- JPY (Iene Japonês)
- CAD (Dólar Canadense)
- AUD (Dólar Australiano)
- CHF (Franco Suíço)
- CNY (Yuan Chinês)
- ARS (Peso Argentino)

### 🌐 APIs Sugeridas (Gratuitas)

**Opção 1 - ExchangeRate-API:**
```
https://api.exchangerate-api.com/v4/latest/USD
```

**Opção 2 - Fixer.io (Free tier):**
```
https://api.fixer.io/latest?access_key=SUA_CHAVE
```

**Opção 3 - CurrencyAPI:**
```
https://api.currencyapi.com/v3/latest?apikey=SUA_CHAVE
```

### 📱 Layout Responsivo Sugerido

**Desktop/Tablet:**
```
┌─────────────────────────────────────┐
│        💱 Conversor de Moedas       │
├─────────────────────────────────────┤
│  [USD ▼]  [100.00]  [🔄]  [BRL ▼]   │
│  De              Valor       Para   │
├─────────────────────────────────────┤
│           [  CONVERTER  ]           │
├─────────────────────────────────────┤
│   💰 R$ 532,50                      │
│   Taxa: 1 USD = 5,325 BRL          │
│   ⏰ Atualizado: 12:34              │
├─────────────────────────────────────┤
│  📊 Histórico de Conversões         │
│  • 100 USD → 532,50 BRL (12:34)    │
│  • 50 EUR → 267,80 BRL (11:22)     │
│  • 200 BRL → 37,59 USD (10:15)     │
│  [Limpar Histórico]                 │
└─────────────────────────────────────┘
```

**Mobile:**
```
┌─────────────────────┐
│ 💱 Conversor        │
├─────────────────────┤
│ De: [USD ▼]         │
│ Valor: [100.00]     │
│ Para: [BRL ▼] [🔄]  │
├─────────────────────┤
│   [ CONVERTER ]     │
├─────────────────────┤
│ 💰 R$ 532,50        │
│ 1 USD = 5,325 BRL   │
├─────────────────────┤
│ 📊 Histórico        │
│ 100 USD → 532,50 BRL│
│ 50 EUR → 267,80 BRL │
│ [Ver mais]          │
└─────────────────────┘
```

### ⭐ Funcionalidades Extras (Opcional)

**Melhorias de UX:**
- Formatação automática de números
- Validação de entrada (só números)
- Conversão em tempo real (sem botão)
- Atalhos de teclado (Enter para converter)

**Recursos Avançados:**
- Gráfico simples da variação da moeda (últimos dias)
- Calculadora embutida no campo de valor
- Favorites das moedas mais usadas
- Modo offline com últimas cotações

**Visual:**
- Tema claro/escuro
- Animações suaves nas transições
- Bandeiras dos países nas moedas
- Sons de notificação (opcional)

### 🧮 Estrutura de Dados

**Estado da Aplicação:**
```javascript
{
  moedas: ["USD", "BRL", "EUR", "GBP"],
  moedaOrigem: "USD",
  moedaDestino: "BRL", 
  valor: "100",
  resultado: "532.50",
  taxa: 5.325,
  loading: false,
  ultimaAtualizacao: "2024-12-20T12:34:00Z",
  historico: [
    {
      id: 1,
      de: "USD",
      para: "BRL", 
      valor: 100,
      resultado: 532.50,
      taxa: 5.325,
      data: "2024-12-20T12:34:00Z"
    }
  ]
}
```

**Resposta da API:**
```javascript
{
  "base": "USD",
  "date": "2024-12-20",
  "rates": {
    "BRL": 5.325,
    "EUR": 0.85,
    "GBP": 0.75,
    "JPY": 110.25
  }
}
```

### 🎨 Design System Sugerido

**Cores:**
```css
:root {
  --primary: #10b981;     /* Verde */
  --secondary: #6b7280;   /* Cinza */
  --success: #059669;     /* Verde escuro */
  --warning: #d97706;     /* Laranja */
  --background: #f9fafb;  /* Cinza muito claro */
  --surface: #ffffff;     /* Branco */
  --text: #111827;        /* Preto */
  --border: #d1d5db;      /* Cinza claro */
}
```

**Componentes:**
- Cards com sombra sutil
- Botões com hover effects
- Dropdowns customizados
- Loading spinners
- Inputs com validação visual

### 📱 Responsividade

**Breakpoints:**
- Mobile: < 640px (layout vertical)
- Tablet: 640px - 1024px (layout adaptado) 
- Desktop: > 1024px (layout horizontal)

**Adaptações Mobile:**
- Botões maiores para toque
- Campos de input maiores
- Histórico colapsável
- Menu de moedas em fullscreen

### 🧪 Casos de Teste

**Funcionalidade:**
- Conversão com valores válidos ✅
- Troca de moedas (origem ↔ destino) ✅
- Histórico salva e carrega do localStorage ✅
- Loading aparece durante requisição ✅

**Validação:**
- Não permite valores negativos ❌
- Não permite texto no campo valor ❌
- Mostra erro se API falhar ❌

**Interface:**
- Responsivo em mobile ✅
- Animações funcionam suavemente ✅
- Tema claro/escuro (se implementado) ✅

### ✅ Critérios de Avaliação

- **Funcionalidade:** Conversão funciona corretamente?
- **API:** Consome API externa sem problemas?
- **Interface:** Visual limpo e profissional?
- **Responsividade:** Funciona bem em mobile e desktop?
- **Estado:** Gerencia estado da aplicação adequadamente?
- **Persistência:** Histórico salva no localStorage?
- **Validação:** Trata erros e casos extremos?
- **UX:** Experiência do usuário fluida?

### 🚀 Como Submeter

1. Implemente as funcionalidades obrigatórias
2. Escolha e integre uma API de cotações
3. Teste em diferentes dispositivos e navegadores
4. Adicione pelo menos 2 funcionalidades extras
5. Documente como executar o projeto
6. Faça deploy online (Vercel, Netlify, GitHub Pages)

### 💡 Dicas para Iniciantes

**Comece assim:**
1. Crie o layout básico primeiro
2. Adicione os dropdowns e campos
3. Implemente conversão com valores fixos
4. Integre com a API
5. Adicione histórico por último

**Conceitos que vai aprender:**
- Consumo de APIs REST com fetch/axios
- Gerenciamento de estado (useState)
- LocalStorage para persistência
- Responsividade com CSS/frameworks
- Tratamento de erros em requisições
- Formatação de números e datas

**Ferramentas úteis:**
- **Postman** para testar APIs
- **Chrome DevTools** para debug
- **Mobile view** para testar responsividade
- **JSON Formatter** para visualizar responses

**Tecnologias sugeridas:** React, Vue.js, JavaScript vanilla, ou qualquer framework que você esteja aprendendo!

### 🌟 Inspiração
- Google Currency Converter
- XE Currency Converter  
- Wise Currency Converter
- Aplicativos mobile de bancos


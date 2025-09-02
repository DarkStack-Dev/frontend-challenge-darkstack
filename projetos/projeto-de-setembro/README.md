# 🚀 Projeto Portfolio - Setembro 2025
## 📝 Lista de Tarefas Pessoal com Categorias

**Nível:** Iniciante | **Prazo:** Todo o mês de setembro | **Tipo:** Full Stack Simples

### 🎯 Visão Geral
Desenvolva uma aplicação completa de lista de tarefas pessoal onde usuários podem se cadastrar, fazer login e organizar suas tarefas por categorias. Este será o projeto principal do seu portfolio, demonstrando suas habilidades de desenvolvimento web de forma prática e organizada.

---

## 🏗 Arquitetura Simples

### 🔧 Backend (API REST)
**Stack sugerida:** Node.js + Express + JSON (arquivo) ou MongoDB

### 🎨 Frontend (SPA)  
**Stack sugerida:** HTML + CSS + JavaScript ou React básico

### 📱 Responsividade
Design que funciona bem no celular e desktop

---

## ⚡ Funcionalidades Principais

### 🔐 Sistema de Usuários (Simples)
- [x] Cadastro com nome, email e senha
- [x] Login e logout
- [x] Cada usuário vê apenas suas tarefas
- [x] Perfil básico (nome e email)

### 📋 Gerenciamento de Tarefas
- [x] Adicionar nova tarefa
- [x] Marcar como concluída/pendente  
- [x] Editar texto da tarefa
- [x] Deletar tarefa
- [x] Ver lista de todas as tarefas

### 🏷 Sistema de Categorias
- [x] Criar categorias personalizadas (Trabalho, Casa, Estudos, etc.)
- [x] Atribuir cor para cada categoria
- [x] Filtrar tarefas por categoria
- [x] Contar tarefas por categoria

### 📊 Dashboard Simples
- [x] Total de tarefas pendentes
- [x] Total de tarefas concluídas
- [x] Progresso por categoria
- [x] Tarefas do dia atual

---

## 🎨 Layout da Aplicação

### 📱 Tela Principal
```
┌─────────────────────────────────────────┐
│ 📝 Minhas Tarefas    [João] [Sair]      │
├─────────────────────────────────────────┤
│ 📊 Resumo Hoje                          │
│ ✅ 5 concluídas  ⏳ 3 pendentes         │
├─────────────────────────────────────────┤
│ [+ Nova Tarefa]                         │
│ ┌─────────────────────────────────────┐ │
│ │ [✓] Estudar JavaScript 🔵Estudos    │ │
│ │ [ ] Comprar pão       🟢Casa        │ │
│ │ [✓] Revisar código    🔴Trabalho    │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ 🏷 Filtrar por:                         │
│ [Todas] [🔵Estudos] [🟢Casa] [🔴Trabalho]│
└─────────────────────────────────────────┘
```

### 📱 Modal Nova Tarefa
```
┌─────────────────────────┐
│ ➕ Nova Tarefa          │
├─────────────────────────┤
│ Título:                 │
│ [_________________]     │
│                         │
│ Categoria:              │
│ [Estudos ▼]             │
│                         │
│ [Cancelar] [Adicionar]  │
└─────────────────────────┘
```

---

## 🛠 Estrutura Técnica Simples

### 📊 Dados dos Usuários
```javascript
// arquivo users.json ou tabela users
{
  id: 1,
  nome: "João Silva",
  email: "joao@email.com",
  senha: "hash_da_senha",
  criadoEm: "2025-09-01T10:00:00Z"
}
```

### 📊 Dados das Categorias
```javascript
// arquivo categories.json ou tabela categories  
{
  id: 1,
  nome: "Trabalho",
  cor: "#ef4444", // vermelho
  usuarioId: 1,
  criadoEm: "2025-09-01T10:00:00Z"
}
```

### 📊 Dados das Tarefas
```javascript
// arquivo tasks.json ou tabela tasks
{
  id: 1,
  titulo: "Estudar JavaScript",
  concluida: false,
  categoriaId: 2,
  usuarioId: 1,
  criadoEm: "2025-09-01T10:00:00Z",
  concluidoEm: null
}
```

### 🔌 Endpoints Simples da API

**Usuários:**
```
POST   /auth/register    # Cadastrar
POST   /auth/login       # Entrar  
GET    /auth/profile     # Ver perfil
PUT    /auth/profile     # Editar perfil
```

**Categorias:**
```
GET    /categorias       # Listar minhas categorias
POST   /categorias       # Criar nova categoria
PUT    /categorias/:id   # Editar categoria
DELETE /categorias/:id   # Deletar categoria
```

**Tarefas:**
```
GET    /tarefas          # Listar minhas tarefas
POST   /tarefas          # Criar nova tarefa
PUT    /tarefas/:id      # Editar tarefa
DELETE /tarefas/:id      # Deletar tarefa
GET    /dashboard        # Estatísticas
```

---

## 🚀 Cronograma Realista (4 semanas)

### 📅 Semana 1: Backend Básico
**Objetivo:** API funcionando com dados simples
- [x] Setup do projeto Node.js + Express
- [x] Sistema de usuários (cadastro/login)
- [x] CRUD de tarefas (sem categorias ainda)
- [x] Teste com Postman/Insomnia

**Entrega:** API que permite cadastro, login e CRUD de tarefas

### 📅 Semana 2: Frontend Básico  
**Objetivo:** Interface funcionando
- [x] HTML + CSS responsivo
- [x] JavaScript para consumir API
- [x] Telas de login/cadastro
- [x] Lista de tarefas funcional

**Entrega:** Site que permite ver e adicionar tarefas

### 📅 Semana 3: Categorias + Melhorias
**Objetivo:** Sistema de categorias completo
- [x] Adicionar categorias no backend
- [x] Interface para criar/gerenciar categorias
- [x] Filtros por categoria no frontend
- [x] Dashboard com estatísticas simples

**Entrega:** Sistema completo com categorias e filtros

### 📅 Semana 4: Polish + Deploy
**Objetivo:** Projeto pronto para portfolio
- [x] Melhorar visual e responsividade
- [x] Adicionar loading states e validações
- [x] Corrigir bugs e otimizar
- [x] Deploy online (Vercel/Netlify + Railway/Render)

**Entrega:** Projeto online e documentado

---

## ✅ Funcionalidades Extras (Para quem quiser ir além)

### 🎨 Melhorias Visuais
- [ ] Tema escuro/claro
- [ ] Animações suaves
- [ ] Ícones bonitos
- [ ] Cores personalizáveis para categorias

### ⚡ Funcionalidades Extras
- [ ] Data de vencimento nas tarefas  
- [ ] Buscar tarefas por texto
- [ ] Exportar tarefas para PDF/TXT
- [ ] Lembretes por email (básico)

### 🔧 Melhorias Técnicas
- [ ] Persistir dados no localStorage (backup)
- [ ] Paginação na lista de tarefas
- [ ] Validações mais robustas
- [ ] Testes básicos (pelo menos 3-5 testes)

---

## 🏆 Como Será Avaliado

### 🔧 Backend (40%)
- **API funciona?** Todos os endpoints respondem corretamente
- **Dados persistem?** Tarefas são salvas e carregadas
- **Usuários separados?** Cada usuário vê só suas tarefas
- **Código limpo?** Arquivos organizados, nomes claros

### 🎨 Frontend (40%)
- **Interface funciona?** Dá para usar sem bugs
- **Responsivo?** Funciona no celular e desktop  
- **Visual legal?** Não precisa ser designer, mas limpo
- **Conecta com API?** Frontend conversa com backend

### 📚 Documentação (20%)
- **README completo?** Como instalar e rodar
- **Screenshots?** Mostrar como ficou
- **Deploy online?** Link funcionando
- **Código comentado?** Explicar partes importantes

---

## 📚 Recursos de Apoio

### 🛠 Tecnologias Recomendadas

**Opção 1 - Mais Simples:**
- Backend: Node.js + Express + arquivo JSON
- Frontend: HTML + CSS + JavaScript vanilla
- Deploy: Vercel (frontend) + Railway (backend)

**Opção 2 - Um pouco mais avançado:**
- Backend: Node.js + Express + MongoDB Atlas  
- Frontend: React básico + CSS/TailwindCSS
- Deploy: Vercel + Render

### 📖 Tutoriais Úteis
- **Express.js:** Documentação oficial + YouTube
- **MongoDB:** Atlas free tier + Mongoose
- **Deploy:** Vercel docs + Railway docs
- **CSS:** Flexbox + Grid básico

### 🔧 Ferramentas Necessárias
- **Postman/Insomnia:** Testar API
- **VS Code:** Editor de código
- **Git/GitHub:** Controle de versão
- **Chrome DevTools:** Debug

---

## 🌟 Por que Este Projeto é Bom para Portfolio?

### 💼 Mostra Habilidades Essenciais
✅ **Full Stack:** Backend + Frontend + Deploy  
✅ **CRUD Completo:** Create, Read, Update, Delete  
✅ **Autenticação:** Sistema de login básico  
✅ **Responsividade:** Funciona em mobile  
✅ **API REST:** Endpoints organizados  

### 🎯 É Prático e Útil
✅ Todo mundo entende o que é uma lista de tarefas  
✅ Você pode realmente usar no dia a dia  
✅ Fácil de demonstrar para recrutadores  
✅ Mostra organização e estrutura de pensamento  

### 🚀 Diferencial dos Colegas
✅ Mais completo que projetos só frontend  
✅ Sistema de usuários (não é só uma lista local)  
✅ Categorias mostram capacidade de organização  
✅ Deploy online mostra preocupação com resultado  

---

## 📤 Entrega Final

### 🎯 O que entregar:
1. **Código no GitHub** (2 repositórios: backend e frontend)
2. **Site funcionando online** com link
3. **README detalhado** com screenshots
4. **Vídeo curto** (2-3 min) mostrando funcionando

### 📋 Checklist Final:
- [ ] Consigo cadastrar novo usuário
- [ ] Consigo fazer login e logout  
- [ ] Consigo adicionar, editar e deletar tarefas
- [ ] Consigo criar e usar categorias
- [ ] Dashboard mostra estatísticas básicas
- [ ] Site é responsivo (funciona no celular)
- [ ] Projeto está online e acessível
- [ ] README tem instruções claras

---

## 🎉 Resultado Esperado

Ao final de setembro, você terá:

✅ **Seu primeiro projeto full stack** completo no portfolio  
✅ **Experiência real** com desenvolvimento web  
✅ **Algo funcional** que pode mostrar para qualquer pessoa  
✅ **Confiança** para partir para projetos maiores  
✅ **Base sólida** em conceitos fundamentais  

**Este projeto é perfeito para conseguir sua primeira vaga como desenvolvedor!**

---

<div align="center">

**🚀 Vamos começar? Setembro é o seu mês! 🚀**

**Lembre-se: É melhor um projeto simples e completo do que um projeto complexo pela metade!**

</div>
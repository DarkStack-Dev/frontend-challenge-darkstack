# 📖 README: Construindo o Conversor de Moedas com React e Next.js

Este guia irá te orientar passo a passo na criação do projeto de conversor de moedas utilizando Next.js e React.

## Passo 1: Configuração do Projeto

Primeiro, vamos criar um novo projeto Next.js. Abra seu terminal e execute o comando:

```bash
npx create-next-app@latest conversor-de-moedas
```

Durante a instalação, você pode aceitar as opções padrão. Certifique-se de selecionar Tailwind CSS para estilização.

Após a instalação, entre na pasta do projeto:

```bash
cd conversor-de-moedas
```

E inicie o servidor de desenvolvimento: 

```bash
npm run dev
```

Abra http://localhost:3000 no seu navegador. Você verá a página inicial do Next.js.

## Passo 2: Limpando e Estruturando o Código

Abra o arquivo `app/page.jsx` (ou `page.tsx`) e substitua todo o conteúdo pelo nosso JSX inicial. Este código já contém toda a estrutura visual do conversor.

```jsx
// Cole este código em app/page.jsx

'use client'; // Necessário para usar hooks como useState e useEffect

import { useState, useEffect, useCallback } from 'react';

export default function CurrencyConverterPage() {
    // Aqui virá nosso estado e lógica!

    return (
        <div className="bg-[#f9fafb] text-[#111827] flex items-center justify-center min-h-screen p-4 font-sans">
            <div className="bg-white border border-[#d1d5db] w-full max-w-lg mx-auto rounded-xl shadow-lg p-6 md:p-8 space-y-6">
                
                {/* Cabeçalho */}
                <div className="text-center">
                    <h1 className="text-2xl md:text-3xl font-bold">💱 Conversor de Moedas</h1>
                    <p className="text-gray-500 mt-1">Cotações em tempo real</p>
                </div>

                {/* Formulário (a ser preenchido) */}
                
                {/* Resultado (a ser preenchido) */}

                {/* Histórico (a ser preenchido) */}
            </div>
        </div>
    );
}
```

## Passo 3: Gerenciando o Estado com useState

Precisamos de "variáveis de estado" para armazenar os dados que mudam na nossa aplicação. Dentro do componente `CurrencyConverterPage`, antes do `return`, declare os seguintes estados:

```javascript
// Dentro de CurrencyConverterPage()
const [amount, setAmount] = useState('100');
const [fromCurrency, setFromCurrency] = useState('BRL');
const [toCurrency, setToCurrency] = useState('USD');
const [rates, setRates] = useState({});
const [result, setResult] = useState(null);
const [history, setHistory] = useState([]);
const [loading, setLoading] = useState(false);
const [lastUpdate, setLastUpdate] = useState(null);
```

## Passo 4: Buscando os Dados da API com useEffect

Para buscar as taxas de câmbio assim que a página carregar, usamos o hook `useEffect`. Ele executa uma função "efeito colateral" (como uma chamada de API) após a renderização do componente.

Adicione este `useEffect` ao seu componente:

```javascript
// Dentro de CurrencyConverterPage()
const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

useEffect(() => {
    async function fetchRates() {
        // TODO: Implementar a busca de dados da API.
        // 1. Ative o estado de loading: setLoading(true);
        // 2. Use try/catch para lidar com possíveis erros.
        // 3. Dentro do try, use fetch(API_URL) para buscar os dados.
        // 4. Converta a resposta para JSON: const data = await response.json();
        // 5. Atualize os estados: setRates(data.rates); setLastUpdate(...);
        // 6. No bloco `finally`, desative o loading: setLoading(false);
    }
    
    fetchRates();
}, []); // O array vazio `[]` faz com que este efeito rode apenas uma vez.
```

## Passo 5: Implementando a Lógica de Conversão

Crie uma função para realizar o cálculo. O `useCallback` é uma otimização que impede a função de ser recriada a cada renderização, a menos que suas dependências mudem.

```javascript
// Dentro de CurrencyConverterPage()
const handleConvert = useCallback(() => {
    // TODO: Implementar a lógica de conversão.
    // 1. Converta `amount` para um número.
    // 2. Valide se o número é válido e se as `rates` já foram carregadas.
    // 3. Calcule o resultado (lembre-se que a base é USD).
    // 4. Atualize o estado do resultado: setResult(valorCalculado);
    // 5. Adicione a conversão ao histórico.
}, [amount, fromCurrency, toCurrency, rates]);

// Use outro useEffect para chamar a conversão sempre que um valor mudar.
useEffect(() => {
    handleConvert();
}, [handleConvert]);
```

## Passo 6: Lidando com o Histórico e localStorage

Para que o histórico não se perca, precisamos salvá-lo no navegador.

**Carregar do localStorage:** Adicione este `useEffect` para carregar dados salvos quando o app iniciar.

```javascript
useEffect(() => {
    const storedHistory = localStorage.getItem('conversionHistory');
    if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
    }
}, []);
```

**Salvar no localStorage:** Adicione este outro `useEffect` para salvar os dados sempre que o histórico for alterado.

```javascript
useEffect(() => {
    // Evita salvar um array vazio na primeira renderização
    if(history.length > 0) {
        localStorage.setItem('conversionHistory', JSON.stringify(history));
    }
}, [history]);
```

## Passo 7: Juntando Tudo na Interface

Agora, use os estados e funções que você criou para conectar a lógica ao JSX.

**Inputs e Selects:** Use as propriedades `value` e `onChange` para conectar os campos aos seus respectivos estados.

```jsx
<input 
    type="number" 
    value={amount} 
    onChange={e => setAmount(e.target.value)} 
/>
```

**Exibição do Resultado:** Use renderização condicional para mostrar o loader ou o resultado.

```jsx
{loading ? <p>Carregando...</p> : <p>{/* Resultado aqui */}</p>}
```

**Lista de Histórico:** Use a função `.map()` para renderizar a lista de histórico.

```jsx
<ul>
    {history.map(entry => (
        <li key={entry.id}>{/* Detalhes da conversão */}</li>
    ))}
</ul>
```

---

Siga estes passos e consulte o código da versão Vanilla JS (`script.js`) se tiver dúvidas sobre a lógica de cálculo ou formatação. Bom desafio!
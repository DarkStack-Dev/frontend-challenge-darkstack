// Aguarda o DOM ser completamente carregado antes de executar o script
document.addEventListener('DOMContentLoaded', () => {
    
    // --- SELETORES DOS ELEMENTOS DO DOM ---
    // Captura os elementos da página com os quais vamos interagir.
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const amountInput = document.getElementById('amount');
    const swapButton = document.getElementById('swapButton');
    const resultDiv = document.getElementById('result');
    const resultAmountP = resultDiv.querySelector('p:first-child');
    const exchangeRateP = document.getElementById('exchangeRate');
    const lastUpdateP = document.getElementById('lastUpdate');
    const loader = document.getElementById('loader');
    const historyList = document.getElementById('historyList');
    const clearHistoryButton = document.getElementById('clearHistoryButton');
    
    // --- ESTADO INICIAL DA APLICAÇÃO ---
    // Um objeto para guardar os dados que mudam com o tempo.
    let state = {
        rates: {}, // Armazenará as taxas de câmbio
        lastUpdate: null, // Data da última atualização
        history: [], // Histórico de conversões
        loading: false, // Indicador de carregamento 
    };

    const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

    // --- FUNÇÕES PRINCIPAIS ---

    /**
     * Busca as taxas de câmbio mais recentes da API.
     */
    async function fetchRates() {
        console.log("Buscando taxas...");
        setLoading(true);

        try {
            // TODO: Lógica de busca na API
            // 1. Use `fetch(API_URL)` para fazer a requisição.
            // 2. Verifique se a resposta da requisição foi bem-sucedida (`response.ok`).
            // 3. Converta a resposta para JSON com `response.json()`.
            // 4. Atualize o `state.rates` com os dados recebidos.
            // 5. Atualize o `state.lastUpdate`.
            // 6. Chame `updateUI()` e `handleConvert()` após buscar os dados.
            
            // Exemplo de como ficaria a estrutura:
            // const response = await fetch(API_URL);
            // if (!response.ok) throw new Error("Erro de rede");
            // const data = await response.json();
            // state.rates = data.rates;
            // state.lastUpdate = new Date(data.time_last_update_utc);
            // updateUI();
            // handleConvert();

        } catch (error) {
            console.error("Falha ao buscar taxas:", error);
            resultAmountP.textContent = "Erro!";
            exchangeRateP.textContent = "Não foi possível carregar as taxas.";
        } finally {
            setLoading(false);
        }
    }
    
    /**
     * Realiza a conversão de moeda com base nos valores atuais.
     */
    function handleConvert() {
        // TODO: Lógica de conversão
        // 1. Pegue os valores de `fromCurrencySelect`, `toCurrencySelect` e `amountInput`.
        // 2. Valide se o valor (`amount`) é um número válido e maior que zero.
        // 3. Verifique se as taxas (`state.rates`) já foram carregadas.
        // 4. Calcule o valor convertido.
        //    Lembre-se: a API usa USD como base. Se `from` não for USD, 
        //    converta primeiro para USD e depois para a moeda de destino.
        // 5. Mostre o resultado formatado na tela.
        // 6. Mostre a taxa de câmbio (ex: 1 BRL = 0.18 USD).
        // 7. Adicione a conversão ao histórico chamando `addToHistory(...)`.
    }

    /**
     * Troca as moedas selecionadas nos campos 'De' e 'Para'.
     */
    function handleSwapCurrencies() {
        // TODO: Lógica para trocar moedas
        // 1. Pegue os valores atuais dos selects de moeda.
        // 2. Inverta os valores (o 'de' vira 'para' e vice-versa).
        // 3. Chame `handleConvert()` para atualizar o resultado.
    }

    /**
     * Limpa o histórico de conversões.
     */
    function handleClearHistory() {
        // TODO: Lógica para limpar o histórico
        // 1. Esvazie o array `state.history`.
        // 2. Salve o histórico vazio no localStorage.
        // 3. Renderize o histórico novamente para limpar a tela.
    }

    // --- FUNÇÕES AUXILIARES ---

    function addToHistory(from, to, amount, result) {
        const newEntry = { from, to, amount, result, date: new Date().toISOString() };
        state.history.unshift(newEntry);
        if (state.history.length > 10) state.history.pop();
        saveHistoryToLocalStorage();
        renderHistory();
    }

    function renderHistory() {
        historyList.innerHTML = '';
        if (state.history.length === 0) {
            historyList.innerHTML = `<li class="text-center text-gray-400">Nenhuma conversão ainda.</li>`;
            return;
        }
        state.history.forEach(entry => {
            const li = document.createElement('li');
            li.className = 'flex justify-between items-center p-2 bg-gray-50 rounded-md';
            const date = new Date(entry.date);
            li.innerHTML = `
                <span>
                    ${formatCurrency(entry.amount, entry.from)} 
                    <span class="font-semibold">→</span> 
                    ${formatCurrency(entry.result, entry.to)}
                </span>
                <span class="text-gray-400 text-xs">${date.toLocaleTimeString('pt-BR')}</span>
            `;
            historyList.appendChild(li);
        });
    }

    function saveHistoryToLocalStorage() {
        localStorage.setItem('conversionHistory', JSON.stringify(state.history));
    }

    function loadHistoryFromLocalStorage() {
        const history = localStorage.getItem('conversionHistory');
        if (history) state.history = JSON.parse(history);
        renderHistory();
    }
    
    function setLoading(isLoading) {
        state.loading = isLoading;
        loader.classList.toggle('hidden', !isLoading);
        resultDiv.classList.toggle('hidden', isLoading);
    }

    function updateUI() {
        if (state.lastUpdate) {
            lastUpdateP.textContent = `Atualizado: ${state.lastUpdate.toLocaleString('pt-BR')}`;
        }
    }

    function formatCurrency(value, currency) {
        return new Intl.NumberFormat('pt-BR', { 
            style: 'currency', currency, minimumFractionDigits: 2 
        }).format(value);
    }

    // --- EVENT LISTENERS ---
    // Associa as funções aos eventos dos elementos.
    amountInput.addEventListener('keyup', handleConvert);
    fromCurrencySelect.addEventListener('change', handleConvert);
    toCurrencySelect.addEventListener('change', handleConvert);
    swapButton.addEventListener('click', handleSwapCurrencies);
    clearHistoryButton.addEventListener('click', handleClearHistory);
    
    // --- INICIALIZAÇÃO ---
    // Função que é executada quando a página carrega.
    function init() {
        loadHistoryFromLocalStorage();
        fetchRates();
        amountInput.value = "100";
    }

    init();
});

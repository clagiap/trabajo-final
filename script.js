async function convertCurrency() {
    const amountElement = document.getElementById('amount');
    const fromCurrencyElement = document.getElementById('fromCurrency');
    const toCurrencyElement = document.getElementById('toCurrency');

    if (!amountElement || !fromCurrencyElement || !toCurrencyElement) {
        alert('Por favor, asegúrese de que todos los campos estén presentes en el DOM.');
        return;
    }

    const amount = (amountElement as HTMLInputElement).value;
    const fromCurrency = (fromCurrencyElement as HTMLInputElement).value;
    const toCurrency = (toCurrencyElement as HTMLInputElement).value;

    if (amount === '' || isNaN(Number(amount))) {
        alert('Por favor, ingrese una cantidad válida.');
        return;
    }

    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();
    const rate = data.rates[toCurrency];
    const result = Number(amount) * rate;

    document.getElementById('result')!.innerText = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
    document.getElementById('appliedResult')!.innerText = `Aplicado: ${result.toFixed(2)} ${toCurrency}`;
}
{
    const welcome = () => {
        console.log("Witam wszystkich :)");
    };

    const moneyExchange = (exchangeFrom, exchangeTo, money) => {
        if (exchangeFrom === exchangeTo) {
            return money;
        }
        try {
            const rates = getRates();
            if (exchangeFrom == "PLN") {
                rate = rates[exchangeTo]["ask"];
                return exchange(money, rate, "ask");
            }
            if (exchangeTo == "PLN") {
                rate = rates[exchangeFrom]["bid"];
                return exchange(money, rate, "bid");
            }
            rate1 = rates[exchangeFrom]["bid"];
            rate2 = rates[exchangeTo]["ask"];
            let exchangedFromToPLN = exchange(money, rate1, "bid");
            return exchange(exchangedFromToPLN, rate2, "ask");
        }
        catch (err) {
            console.log("Rate doesn't exits in table");
        }
    };

    const getRates = () => {
        let rates = {
            USD: {},
            GBP: {}
        };
        const currencies = ["USD", "GBP"];

        for (let i = 0; i<currencies.length; i++) {
            rates[currencies[i]] = getAPIRate(currencies[i]);
            console.log(rates);
        }
        return rates;
    };


    const getAPIRate = (rate) => {
        try {
            let url = `https://api.nbp.pl/api/exchangerates/rates/c/${rate}/`;
            let request = null;
            request = new XMLHttpRequest();
            request.open("GET", url, false);
            request.send(null);
            const obj = JSON.parse(request.responseText);
            const bid = obj.rates[0].bid;
            const ask = obj.rates[0].ask;
            return { ask, bid };
        }
        catch (err) {
            console.log("Data from API hadn't been downloaded.");
        }
    };

    const exchange = (money, rate, activity) => {
        const margin = 3;
        if (activity=="ask"){
            exchangeRate = 1/rate;
        }
        else{
            exchangeRate = rate;
        }
        return moneyExchanged = ((money * exchangeRate) * (100-margin)/100).toFixed(2);
    };

    const currencyChoice = (exchange) => {
        currency = {
            PLN: "zł",
            USD: "$",
            GBP: "£"
        };
        return currency[exchange];
    };

    const updateResultText = (money, moneyExchanged, exchangeFrom, exchangeTo) => {
        const resultMoneyElement = document.querySelector(".js-resultMoney");
        const resultMessage = `Wymieniono ${money}${currencyChoice(exchangeFrom)} na ${moneyExchanged}${currencyChoice(exchangeTo)}`;
        resultMoneyElement.innerHTML = resultMessage;
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        //exchange from/to which currency 
        const exchangeFromElement = document.querySelector(".js-exchangeFrom");
        const exchangeToElement = document.querySelector(".js-exchangeTo");
        //amount of money to exchange
        const moneyElement = document.querySelector(".js-money");

        const exchangeFrom = exchangeFromElement.value;
        const exchangeTo = exchangeToElement.value;
        const money = +moneyElement.value;

        const moneyExchanged = moneyExchange(exchangeFrom, exchangeTo, money);
        updateResultText(money, moneyExchanged, exchangeFrom, exchangeTo);
    };

    const init = () => {
        const formElement = document.querySelector(".form");
        formElement.addEventListener("submit", onFormSubmit);
    };

    welcome();
    init();
}
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
                return exchange(money, rate);
            }
            if (exchangeTo == "PLN") {
                rate = rates[exchangeFrom]["bid"];
                return exchange(money, rate);
            }
            rate1 = rates[exchangeFrom]["bid"];
            rate2 = rates[exchangeTo]["ask"];
            let texchangedFromToPLN = exchange(money, rate1);
            return exchange(texchangedFromToPLN, rate2);
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

        for (let i = 0; currencies.length; i++) {
            rates[currencies[i]] = getAPIRate(currencies[i]);
            console.log(rates);
        }

        // rates["USD"] = getAPIRate("USD");
        // rates["GBP"] = getAPIRate("GBP");
        return rates;
    };


    const getAPIRate = (rate) => {
        try {
            let url = `https://api.nbp.pl/api/exchangerates/rates/c/${rate}/`;
            let request = null;
            request = new XMLHttpRequest();
            request.open("GET", url, false);
            //request.setRequestHeader('Access-Control-Allow-Origin','*');
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

    const exchange = (money, exchangeRate) => {
        return moneyExchanged = ((money * exchangeRate) * 0.97).toFixed(2);
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
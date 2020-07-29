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
            if (exchangeFrom == "PLN"){
                rate = rates["ask"][exchangeTo];
                return exchange(money, rate);
            }
            if (exchangeTo =="PLN"){
                rate = rates["bid"][exchangeFrom];
                return exchange(money, rate);
            }
            else{
                rate1 = rates["bid"][exchangeFrom];
                rate2 = rates["ask"][exchangeTo];
                let tempExchange = exchange(money, rate1);
                return exchange(tempExchange, rate2);
            }
            // if (rates[activity][exchangeFrom][exchangeTo] !== undefined) {
            //     rate = rates[activity][exchangeFrom][exchangeTo];
            // }
            // else {
            //     rate = rates[activity][exchangeTo][exchangeFrom];
            // }
            //return exchange(money, rate);
        }
        catch (err) {
            console.log("Indeks nie istnieje");
        }
    };

    const getRates = () => {
        let rates = {
            ask: { USD: {}, GBP: {} } ,
            bid: { USD: {}, GBP: {} } 
        };

        // let rates = {
        //     ask: {},
        //     bid: {}
        // }
        //const currencies = ["USD", "GBP"];


        // for (let curr in currencies) {
        //     rates["ask"][curr] = getAPIRate(curr, "ask");
        //     rates["bid"][curr] = getAPIRate(curr, "bid");
        //     console.log(rates);
        // };

        // for (let i = 0; i++; currencies.length - 1) {
        //     rates["ask"]["PLN"][currencies[i]] = getAPIRate(currencies[i], "ask");
        //     rates["bid"]["PLN"][currencies[i]] = getAPIRate(currencies[i], "bid");
        //     console.log(rates);
        // };

        rates["ask"]["USD"] = getAPIRate("USD", "ask");
        rates["bid"]["USD"] = getAPIRate("USD", "bid");
        rates["ask"]["GBP"] = getAPIRate("GBP", "ask");
        rates["bid"]["GBP"] = getAPIRate("GBP", "bid");
        return rates;
    };


    const getAPIRate = (rate, activity) => {
        let url = `https://api.nbp.pl/api/exchangerates/rates/c/${rate}/`
        let request = null;
        request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send(null);
        const obj = JSON.parse(request.responseText);
        const bid = obj.rates[0].bid;
        const ask = obj.rates[0].ask;
        if (activity === "ask") {
            return 1/ask;
        }
        if (activity === "bid") {
            return bid;
        }
    };

    const exchange = (money, exchangeRate) => {
        return moneyExchanged = ((money * exchangeRate) * 0.97).toFixed(2);
    };

    const currencyChoice = (exchange) => {
        switch (exchange) {
            case "PLN": return "zł";
            case "USD": return "$";
            case "GBP": return "£";
        }
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
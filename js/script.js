{
    const welcome = () => {
        console.log("Witam wszystkich :)");
    };

    const moneyExchange = (exchangeFrom, exchangeTo, money, activity) => {
        if (exchangeFrom === exchangeTo) {
            return money;
        }
        try {
            const rates = getRates();
            if (rates[activity][exchangeFrom][exchangeTo] !== undefined) {
                rate = rates[activity][exchangeFrom][exchangeTo];
            }
            else {
                rate = 1 / rates[activity][exchangeTo][exchangeFrom];
            }
            return exchange(money, rate);
        }
        catch (err) {
            console.log("Indeks nie istnieje");
        }
    };

    const getRates = () => {
        const PLUSDBuying = 0.2536;
        const USDGBPBuying = 0.8132;
        const GBPPLBuying = 4.9283;
        const PLUSDSelling = 0.2517;
        const USDGBPSelling = 0.8007;
        const GBPPLSelling = 4.8851;

        const rates = {
            selling: {
                PLN: { USD: PLUSDSelling },
                USD: { GBP: USDGBPSelling },
                GBP: { PLN: GBPPLSelling }
            },
            buying: {
                PLN: { USD: PLUSDBuying },
                USD: { GBP: USDGBPBuying },
                GBP: { PLN: GBPPLBuying }
            }
        }
        return rates;
    };

    const exchange = (money, exchangeRate) => {
        return moneyExchanged = (money * exchangeRate).toFixed(2);
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

        //activity type
        const radioBuyingElement = document.querySelector(".js-radioBuying");
        const radioSellingElement = document.querySelector(".js-radioSelling");
        //exchange from/to which currency 
        const exchangeFromElement = document.querySelector(".js-exchangeFrom");
        const exchangeToElement = document.querySelector(".js-exchangeTo");
        //amount of money to exchange
        const moneyElement = document.querySelector(".js-money");

        const exchangeFrom = exchangeFromElement.value;
        const exchangeTo = exchangeToElement.value;
        const money = +moneyElement.value;
        let activity;

        if (radioBuyingElement.checked) {
            activity = "buying";
        }
        if (radioSellingElement.checked) {
            activity = "selling";
        }

        const moneyExchanged = moneyExchange(exchangeFrom, exchangeTo, money, activity);
        updateResultText(money, moneyExchanged, exchangeFrom, exchangeTo);
    };

    const init = () => {
        const formElement = document.querySelector(".form");
        formElement.addEventListener("submit", onFormSubmit);
    };

    welcome();
    init();
}
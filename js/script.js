{
    const welcome = () => {
        console.log("Witam wszystkich :)");
    };

    const moneyExchange = (exchangeFrom, exchangeTo, money, PLUSD, PLGBP, USDPL, USDGBP, GBPPL, GBPUSD) => {
        switch (exchangeFrom) {
            case "PLN":
                switch (exchangeTo) {
                    case "PLN": exchange(money, 1);
                        break;
                    case "USD": exchange(money, PLUSD);
                        break;
                    case "GBP": exchange(money, PLGBP);
                        break;
                }
                break;
            case "USD":
                switch (exchangeTo) {
                    case "PLN": exchange(money, USDPL);
                        break;
                    case "USD": exchange(money, 1);
                        break;
                    case "GBP": exchange(money, USDGBP);
                        break;
                }
                break;
            case "GBP":
                switch (exchangeTo) {
                    case "PLN": exchange(money, GBPPL);
                        break;
                    case "USD": exchange(money, GBPUSD);
                        break;
                    case "GBP": exchange(money, 1);
                        break;
                }
                break;
        }
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

        //exchange type
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

        const PLUSDBuying = 0.2536;
        const PLGBPBuying = 0.2031;
        const USDPLBuying = 3.9728;
        const USDGBPBuying = 0.8132;
        const GBPPLBuying = 4.9283;
        const GBPUSDBuying = 1.2487;

        const PLUSDSelling = 0.2517;
        const PLGBPSelling = 0.2047;
        const USDPLSelling = 3.9432;
        const USDGBPSelling = 0.8007;
        const GBPPLSelling = 4.8851;
        const GBPUSDSelling = 1.2296;

        if (radioBuyingElement.checked) {
            const moneyExchanged = moneyExchange(exchangeFrom, exchangeTo, money, PLUSDBuying, PLGBPBuying, USDPLBuying, USDGBPBuying, GBPPLBuying, GBPUSDBuying);
        }
        else if (radioSellingElement.checked) {
            const moneyExchanged = moneyExchange(exchangeFrom, exchangeTo, money, PLUSDSelling, PLGBPSelling, USDPLSelling, USDGBPSelling, GBPPLSelling, GBPUSDSelling);
        }
        updateResultText(money, moneyExchanged, exchangeFrom, exchangeTo);

    };

    const init = () => {
        const formElement = document.querySelector(".form");
        formElement.addEventListener("submit", onFormSubmit);
    };

    welcome();
    init();
}
{
    const welcome = () => {
        console.log("Witam wszystkich :)");
    };

    const moneyExchange = (exchangeFrom, exchangeTo, money, activity) => {
        try {
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

            const rates = {
                false: {
                    PLN:
                    {
                        PLN: 1,
                        USD: PLUSDSelling,
                        GBP: PLGBPSelling
                    },
                    USD:
                    {
                        PLN: USDPLSelling,
                        USD: 1,
                        GBP: USDGBPSelling
                    },
                    GBP:
                    {
                        PLN: GBPPLSelling,
                        USD: GBPUSDSelling,
                        GBP: 1
                    }
                },
                true: {
                    PLN:
                    {
                        PLN: 1,
                        USD: PLUSDBuying,
                        GBP: PLGBPBuying
                    },
                    USD:
                    {
                        PLN: USDPLBuying,
                        USD: 1,
                        GBP: USDGBPBuying
                    },
                    GBP:
                    {
                        PLN: GBPPLBuying,
                        USD: GBPUSDBuying,
                        GBP: 1
                    }
                }
            }
            rate = rates[activity][exchangeFrom][exchangeTo];
            return exchange(money, rate);
        }
        catch (err){
            console.log("Indeks nie istnieje");
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

        //activity type
        const radioBuyingElement = document.querySelector(".js-radioBuying");
        //exchange from/to which currency 
        const exchangeFromElement = document.querySelector(".js-exchangeFrom");
        const exchangeToElement = document.querySelector(".js-exchangeTo");
        //amount of money to exchange
        const moneyElement = document.querySelector(".js-money");

        const exchangeFrom = exchangeFromElement.value;
        const exchangeTo = exchangeToElement.value;
        const money = +moneyElement.value;
        const activity = radioBuyingElement.checked;

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
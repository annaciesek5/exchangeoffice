let formElement = document.querySelector(".form");
//exchange type
let radioBuyingElement = document.querySelector(".js-radioBuying");
let radioSellingElement = document.querySelector(".js-radioSelling");
//exchange from/to which currency 
let exchangeFromElement = document.querySelector(".js-exchangeFrom");
let exchangeToElement = document.querySelector(".js-exchangeTo");
//amount of money to exchange
let moneyElement = document.querySelector(".js-money");

let resultMoneyElement = document.querySelector(".js-resultMoney");

formElement.addEventListener("submit", (event) => {
    event.preventDefault();

    let exchangeFrom = exchangeFromElement.value;
    let exchangeTo = exchangeToElement.value;
    let money = moneyElement.value;

    let moneyExchanged;
    let currencyFrom;
    let currencyTo;

    let PLUSDBuying = 3.9432;
    let PLGBPBuying = 4.8851;
    let USDPLBuying = 3.9728;
    let USDGBPBuying = 0.8132;
    let GBPPLBuying = 4.9283;
    let GBPUSDBuying = 1.2487;

    let PLUSDSelling = 3.9726;
    let PLGBPSelling = 4.9241;
    let USDPLSelling = 3.9432;
    let USDGBPSelling = 0.8007;
    let GBPPLSelling = 4.8851;
    let GBPUSDSelling = 1.2296;

    if (radioBuyingElement.checked) {
        switch (exchangeFrom) {
            case "PLN":
                switch (exchangeTo) {
                    case "PLN":
                        moneyExchanged = money;
                        break;
                    case "USD":
                        moneyExchanged = (money / PLUSDBuying).toFixed(2);
                        break;
                    case "GBP":
                        moneyExchanged = (money / PLGBPBuying).toFixed(2);
                        break;
                }
                break;
            case "USD":
                switch (exchangeTo) {
                    case "PLN":
                        moneyExchanged = (money * USDPLBuying).toFixed(2);
                        break;
                    case "USD":
                        moneyExchanged = money;
                        break;
                    case "GBP":
                        moneyExchanged = (money * USDGBPBuying).toFixed(2);
                        break;
                }
                break;
            case "GBP":
                switch (exchangeTo) {
                    case "PLN":
                        moneyExchanged = (money * GBPPLBuying).toFixed(2);
                        break;
                    case "USD":
                        moneyExchanged = (money * GBPUSDBuying).toFixed(2);
                        break;
                    case "GBP":
                        moneyExchanged = money;
                        break;
                }
                break;
        }
    }
    else if (radioSellingElement.checked) {
        switch (exchangeFrom) {
            case "PLN":
                switch (exchangeTo) {
                    case "PLN":
                        moneyExchanged = money;
                        break;
                    case "USD":
                        moneyExchanged = (money / PLUSDSelling).toFixed(2);
                        break;
                    case "GBP":
                        moneyExchanged = (money / PLGBPSelling).toFixed(2);
                        break;
                }
                break;
            case "USD":
                switch (exchangeTo) {
                    case "PLN":
                        moneyExchanged = (money * USDPLSelling).toFixed(2);
                        break;
                    case "USD":
                        moneyExchanged = money;
                        break;
                    case "GBP":
                        moneyExchanged = (money * USDGBPSelling).toFixed(2);
                        break;
                }
                break;
            case "GBP":
                switch (exchangeTo) {
                    case "PLN":
                        moneyExchanged = (money * GBPPLSelling).toFixed(2);
                        break;
                    case "USD":
                        moneyExchanged = (money * GBPUSDSelling).toFixed(2);
                        break;
                    case "GBP":
                        moneyExchanged = money;
                        break;
                }
                break;

        }
    }

    switch (exchangeFrom) {
        case "PLN": currencyFrom = "zł";
            break;
        case "USD": currencyFrom = "$";
            break;
        case "GBP": currencyFrom = "£";
            break;
    }
    switch (exchangeTo) {
        case "PLN": currencyTo = "zł";
            break;
        case "USD": currencyTo = "$";
            break;
        case "GBP": currencyTo = "£";
            break;
    }
    let resultMessage = `Wymieniono ${money}${currencyFrom} na ${moneyExchanged}${currencyTo}`;
    resultMoneyElement.innerHTML = resultMessage;
})

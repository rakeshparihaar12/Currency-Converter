const Base_url = "https://latest.currency-api.pages.dev/v1/currencies/eur.json";
const dropdown = document.querySelectorAll(".dropdown select")
const btn = document.querySelector(".convert-btn");
const fromcurr = document.querySelector(".from select")
const tocurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")
const exchange = document.querySelector(".Exchange");

for (let select of dropdown) {
    for (currCode in countryList) {
        let newoption = document.createElement("option")
        newoption.innerText = currCode
        newoption.value = currCode
        if (select.name === "from" && currCode == "USD") {
            newoption.selected = "selected"
        }
        else if (select.name === "to" && currCode == "INR") {
            newoption.selected = "selected";
        };

        select.append(newoption)

    };
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target)
    })
}
window.addEventListener("load",()=>{
    updatevalue()
})

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode]
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img")
    img.src = newsrc;
}
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updatevalue();
}
)
const updatevalue = async() => {
    let amount = document.querySelector(".amount input")
    let amtValue = amount.value;
    if (amtValue == "" || amtValue < 1) {
        amtValue = 1;
        amount.value = "1";
    }
    const url = `https://latest.currency-api.pages.dev/v1/currencies/${fromcurr.value.toLowerCase()}.json`;
    const response = await fetch(url);
    const data = await response.json();

    const from = fromcurr.value.toLowerCase();
    const to = tocurr.value.toLowerCase();

    const rate = data[from][to];
    const finrate = rate * amtValue
    let finalamount = amount * rate
    msg.textContent =
`${amtValue} ${from.toUpperCase()} = ${finrate.toFixed(2)} ${to.toUpperCase()}`;
}
exchange.addEventListener("click", (evt) => {
    evt.preventDefault();

    let temp = fromcurr.value;
    fromcurr.value = tocurr.value;
    tocurr.value = temp;

    updateFlag(fromcurr);
    updateFlag(tocurr);

    updatevalue(); // auto convert after swap
});

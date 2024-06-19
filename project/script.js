const BASE_URL = "https://v6.exchangerate-api.com/v6/44e8f6b6a21d130a37019629/latest/USD";
const dropdowns = document.querySelectorAll(".dropdown select");
// for (code in countryList){
//     console.log(code,countryList[code]);
// }

const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg=document.querySelector(".msg");
window.addEventListener("load",()=>{
    updateExchangeRate();

})


let i = 0
for (let select of dropdowns) {
    for (currcode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if (select.name === "From" && currcode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "To" && currcode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}
const updateFlag = (element) => {
    //updateFlag(evt.target)
    // console.log(element);
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};
btn.addEventListener("click",(evt) => {
    evt.preventDefault();
    updateExchangeRate();
    
});
const updateExchangeRate= async()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    
    let URL = `https://v6.exchangerate-api.com/v6/44e8f6b6a21d130a37019629/latest/${fromCurr.value}`;
    fetch(URL).then(response => response.json()).then(result => {

        let exchangerate = result.conversion_rates[toCurr.value];
        let totalexchangerate = (amtVal * exchangerate);
        //console.log(totalexchangerate);
        
        msg.innerText=`${amtVal} ${fromCurr.value} = ${totalexchangerate} ${toCurr.value}`;

    })
}
//console.log(amtVal);
    //console.log(fromCurr.value,toCurr.value);
    // const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    // let response= await fetch(URL);
    // let data=await response.json();
    // console.log(data);
    //${toCurr.value.toLowerCase()}
    //exchangeRatetxt.innerText="Getting Exchange Rate....";

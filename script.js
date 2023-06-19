const primaryDisplay = document.querySelector("#primary-display")
const secondaryDisplay = document.querySelector("#secondary-display")

function Calculator(primaryDisplay, secondaryDisplay) {
    this.primaryDisplay = primaryDisplay;
    this.secondaryDisplay = secondaryDisplay;

    this.clearAll = () => {
        this.primaryDisplay.innerText = 0;
        this.secondaryDisplay.innerText = "";
    }

    this.clear = () => {
        let primary = this.primaryDisplay.innerText
        let secondary = this.secondaryDisplay.innerText
        if (primary.length == 1 && primary !== "0") {
            primary = secondary
            secondary = ""
        } else if(primary === "0") {
            primary = secondary.slice(0, -1);
            secondary = "";
        } else {
            primary = primary.slice(0, -1);
        }
        this.secondaryDisplay.innerText = secondary
        this.primaryDisplay.innerText = primary
    }

    this.addNumber = (digit) => {
        let primary = this.primaryDisplay.innerText
        if((primary === "0" || primary === "") && digit === ".") {
            primary = "0.";
        }else if (primary === "0") {
            primary = digit;
        } else {
            primary = primary.concat(digit);
        }
        this.primaryDisplay.innerText = primary
    }

    this.operationAdd = (operation) => {
        let primary = this.primaryDisplay.innerText
        let secondary = this.secondaryDisplay.innerText
        if(primary === "0" && secondary == "") {
            secondary = operation
            primary = ""
        } else if(primary === "") { 
            secondary = secondary.slice(0, -1)
            secondary = secondary.concat(operation)
        } else {
            secondary = secondary.concat(primary)
            secondary = secondary.concat(operation)
            primary = ""
        }
        this.primaryDisplay.innerText = primary;
        this.secondaryDisplay.innerText = secondary
        }

    this.calculate = () => {
        const primary = this.primaryDisplay.innerText
        const secondary = this.secondaryDisplay.innerText
        const calculation = secondary + primary
        const result = eval(calculation) //Evaluates the string as mathematical operation
        this.secondaryDisplay.innerText = ""
        this.primaryDisplay.innerText = result.toString()
    }
}


const calculator = new Calculator(primaryDisplay, secondaryDisplay);

document.addEventListener("click", (event) => {
    if (event.target.matches("[data-all-clear]")) {
        calculator.clearAll()
    }
    if (event.target.matches("[data-clear]")) {
        calculator.clear()
    }
    if (event.target.matches("[data-number]")) {
        const digit = event.target.innerText;
        calculator.addNumber(digit)
    }

    if (event.target.matches("[data-operation]")) {
        const operation = event.target.value
        calculator.operationAdd(operation)
    }

    if(event.target.matches("[data-calculate]")) {
        calculator.calculate()
    }

})


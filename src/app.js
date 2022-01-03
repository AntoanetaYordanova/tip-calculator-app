start();

function start() {
    const billInput = document.querySelector('.inputWrapper input');
    const percentsWrapper = document.querySelector('.percentsWrapper');
    const numPeopleInput = document.querySelector('.numberPeople');
    const tipPerPersonP = document.querySelector('.tipPerPerson');
    const totalTippP = document.querySelector('.tipTotal');
    const customPercentInput = document.getElementById('customPercent');
    const resetButton = document.querySelector('.resetButton');
    const percentButtons = [...document.querySelectorAll('.percentBox')];
    const warnMsgSpan = document.querySelector('.warnMsg');

    let bill = 0;
    let percents = 0;
    let numPeople = 0;

    let isEnabledResetButton = false;

    billInput.addEventListener('change', (ev) => {
        if(!isEnabledResetButton) {
            enableResetButton();
            isEnabledResetButton = true;
        }
        const input = Number(ev.target.value);

        if(isNaN(bill)) {
            return;
        }

        bill = input;

        if(checkConditions()) {
            printFunct();
        }
    });

    percentsWrapper.addEventListener('click', (ev) => {
        if(ev.target.tagName == 'BUTTON') {
            if(!isEnabledResetButton) {
                enableResetButton();
                isEnabledResetButton = true;
            }
            clearPercents();

            percents = Number(ev.target.id); 

            ev.target.classList.add('percentBoxActive');
            
            if(checkConditions()) {
                printFunct();
            }
        }
    });

    customPercentInput.addEventListener('focus', () => {
        clearPercents();
        customPercentInput.value = '';
    });

    customPercentInput.addEventListener('focusout', () => {
        customPercentInput.value = percents == 0 ? 'Custom' : percents;
    });

    customPercentInput.addEventListener('change', (ev) => {
        if(!isEnabledResetButton) {
            enableResetButton();
            isEnabledResetButton = true;
        }

        const input = Number(ev.target.value);

        if(isNaN(input)) {
            return;
        }

        percents = input;

        if(checkConditions()) {
            printFunct();
        }
    });

    numPeopleInput.addEventListener('change', (ev) => {

        if(!isEnabledResetButton) {
            enableResetButton();
            isEnabledResetButton = true;
        }

        const input = Number(ev.target.value);

        if(isNaN(input)) {
            return;
        }

        if(input == 0) {
            warnMsg(ev, true);
            return;
        }

        warnMsg(ev, false);

        numPeople = input;

        if(checkConditions()) {
            printFunct();
        }
    });

    resetButton.addEventListener('click', () => {
        reset();
    });

    function checkConditions() {
        if(bill != 0 && percents != 0 && numPeople != 0) {
            return true;
        } else {
            return false;
        }
    }

    function enableResetButton(){
        resetButton.removeAttribute('disabled');
    }

    function totalAmount() {
        return bill * percents / 100;
    }

    function tipPerPerson() {
        return totalAmount() / numPeople;
    }

    function printFunct() {
        totalTippP.textContent = totalAmount().toFixed(2);
        tipPerPersonP.textContent = tipPerPerson().toFixed(2);
    }

    function clearPercents() {
        percentButtons.forEach(b => b.className = 'percentBox');
        customPercentInput.value = 'Custom';
        percents = 0;
    }

    function reset() {
        clearPercents();
        resetButton.setAttribute('disabled', 'true');
        billInput.value = '';
        numPeopleInput.value = '';
        totalTippP.textContent = '$0.00';
        tipPerPersonP.textContent = '$0.00';
        isEnabledResetButton = false;
    }

    function warnMsg(ev, msgOn) {
        if(msgOn) {
            ev.target.classList.add('numberPeopleWarn');
            warnMsgSpan.style.display = 'inline';
            msgOn = true;
        } else {
            ev.target.classList.remove('numberPeopleWarn');
            warnMsgSpan.style.display = 'none';
            msgOn = false;
        }
    }

};

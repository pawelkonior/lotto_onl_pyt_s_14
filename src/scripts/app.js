const submitRef = document.querySelector('form.lotto-form button[type="submit"]');
const inputRefs = [...document.querySelectorAll('form.lotto-form input[id^="digit"]')];
const resultRef = document.getElementById('results');


const isNotEmpties = (elements) => elements.every((element) => element.value !== '');
const isNotEmpty = (element) => element.value !== '';

const isIntegers = (elements) => elements
    .every((element) => Number.isInteger(Number(element.value)));

const ConvertInputs = (elements) => elements.map((element) => parseInt(element.value));

const isNotRedundant = (digits) => new Set(digits).size === digits.length;

const drawDigits = () => {
    const temp = [];

    for (let i = 0; i < 6; i++) {
        const result = Math.round(Math.random() * 48 + 1);
        if (!temp.includes(result)) {
            temp.push(result);
        } else {
            i--;
        }
    }

    return temp.sort((a, b) => a - b);
}

const checkHits = (userDigits, drawnDigits) => {
    const hits = [];

    for (const digit of userDigits) {
        if (drawnDigits.includes(digit)) {
            hits.push(digit);
        }
    }

    return hits;
}

const calculatePrize = (quantity) => {
    switch (quantity) {
        case 3:
            return 24;
        case 4:
            return 170;
        case 5:
            return 3500;
        case 6:
            return 3000000;
        default:
            return 0
    }
};

const showResults = (hits, drawnDigits) => {
    let message = `Wylosowane liczby to: ${drawnDigits.join(', ')}.`
    if (hits.length > 0) {
        message += ` Trafiłeś ${hits.length} razy, twoje liczby to ${hits.join(', ')}.`
        message += ` Hajs: ${calculatePrize(hits.length)}PLN`
    } else {
        message += 'Nic nie wygrałeś, spróbuj jeszcze raz, a na pewno wygrasz!'
    }

    resultRef.innerText = message;
}

inputRefs.forEach((input) => {
    input.addEventListener('keyup', function(e) {
        if (isNotEmpty(e.target)){
            e.target.classList.remove('error')
            console.log('remove')
        }else {
            e.target.classList.add('error')
            console.log('add')
        }
    })
})











submitRef.addEventListener('click', (event) => {
    event.preventDefault();

    if (isNotEmpties(inputRefs)) {
        if (isIntegers(inputRefs)) {
            const userDigits = ConvertInputs(inputRefs);
            if (isNotRedundant(userDigits)) {
                const drawnDigits = drawDigits();
                const hits = checkHits(userDigits, drawnDigits);
                showResults(hits, drawnDigits);
            } else {
                console.log('redundant');
            }
        } else {
            console.log('no integers');
        }
    } else {
        console.log('empty inputs');
    }
})


function becomeMillionaire(money, digits) {
    const games = money / 3;
    let prize = 0;
    const count6 = [];

    for (let i = 0; i < games; i++) {
        let userDigits;
        if (digits === undefined) {
            userDigits = drawDigits();
        } else {
            userDigits = digits;
        }

        const drawnDigits = drawDigits();
        const hits = checkHits(userDigits, drawnDigits);
        prize += calculatePrize(hits.length)

        if (hits.length === 6) {
            count6.push(hits);
        }
    }

    return `Wygrałeś ${prize}PLN, szóstki: ${count6.length}, trafione numery do szóstki: ${count6.join(', ')}`
}
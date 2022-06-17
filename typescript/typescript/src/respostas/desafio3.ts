export {} 

let sum = document.getElementById('sum')! as HTMLInputElement;
let balanceField = document.getElementById('balanceField');
let updateButton = document.getElementById('balanceUpdate');
let cleanButton = document.getElementById('cleanBalance')!;

let total = 0

cleanBalance()

function sumBalance(sum: number) {
    if (balanceField) {
        total += sum
        balanceField.innerHTML = total.toString();
        cleanSum();
    }
}

function cleanSum() {
    sum.value = "";
}

function cleanBalance() {
    if (balanceField) {
        total = 0;
        balanceField.innerHTML = total.toString();
    }
}

if (updateButton) {
    updateButton.addEventListener('click', () => {
        sumBalance(Number(sum.value)); 
    });
}

cleanButton.addEventListener('click', () => { 
    cleanBalance();
});


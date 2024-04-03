document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('tipCalculatorForm');
    const billTotalInput = document.getElementById('billTotal');
    const tipSlider = document.getElementById('tipSlider');
    const tipPercentageInput = document.getElementById('tipPercentage');
    const tipAmountInput = document.getElementById('tipAmount');
    const totalBillInput = document.getElementById('totalBill');

    form.addEventListener('input', calculateTip); // Listen for 'input' event on the form

    function calculateTip() {
        // Reset tip amount and total bill fields to empty strings to clear any previous errors
        tipAmountInput.value = '';
        totalBillInput.value = '';

        // Get the bill total value and sanitize it
        let billTotal = sanitizeInput(billTotalInput.value);

        // If bill total is not a valid number, show an error message and stop further calculations
        if (billTotal === null) {
            tipPercentageInput.value = 'Invalid Bill Total';
            tipAmountInput.value = 'Invalid Bill Total';
            totalBillInput.value = 'Invalid Bill Total';
            billTotalInput.classList.add('invalid'); // add invalid class
            
            return;
        } else {
            billTotalInput.classList.remove('invalid'); // remove invalid class
        }

        // Get the tip percentage from the slider
        let tipPercentage = tipSlider.value;

        // Calculate the tip amount and total bill
        let tipAmount = (billTotal * tipPercentage) / 100;
        let totalBill = billTotal + tipAmount;

        // Update the tip percentage display
        tipPercentageInput.value = tipPercentage + '%';

        // Update the tip amount and total bill fields with 2 decimal places
        tipAmountInput.value = tipAmount.toFixed(2);
        totalBillInput.value = totalBill.toFixed(2);
    }

    // Helper function to sanitize the input and return a valid number or null
    function sanitizeInput(value) {
        const regex = /^\d+(\.\d+)?$/;
        const isValid = regex.test(value); // Remove anything that's not a number, decimal point, or minus sign
        return isValid && parseFloat(value) >= 0 ? parseFloat(value) : null;
    }
});
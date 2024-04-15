document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('taxForm');
    const modal = document.getElementById('modal');
    const resultElement = document.getElementById('result');
    const resultElementIncome = document.getElementById('resultIncome');
    const errorIcons = document.querySelectorAll('.error-icon');
    const ageInput = document.getElementById('age');
    const incomeInput = document.getElementById('income');
    const extraInput = document.getElementById('extraIncomeError');
    const deductionsInput = document.getElementById('deductions');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Reset error icons
        errorIcons.forEach(icon => icon.style.display = 'none');

        // Validate inputs
        let isValid = true;
        if (!ageInput.value.trim()) {
            displayError(ageInput.nextElementSibling);
            isValid = false;
        }
        if (!incomeInput.value.trim()) {
            displayError(incomeInput.nextElementSibling);
            isValid = false;
        }
        if (!extraInput.value.trim()){
            displayError(extraInput.nextElementSibling);
            isValid = false;
        }
        if (!deductionsInput.value.trim()) {
            displayError(deductionsInput.nextElementSibling);
            isValid = false;
        }

        if (isValid) {
            const age = ageInput.value;
            const income = parseFloat(incomeInput.value);
            const extraIncomeError = parseFloat(extraInput.value);
            const deductions = parseFloat(deductionsInput.value);

            let tax = 0;
            if (income - deductions > 8) {
                switch (age) {
                    case '<40':
                        tax = 0.3 * (income + extraIncomeError - deductions - 8);
                        break;
                    case '≥40 & <60':
                        tax = 0.4 * (income + extraIncomeError - deductions - 8);
                        break;
                    case '≥60':
                        tax = 0.1 * (income + extraIncomeError - deductions - 8);
                        break;
                }
                totalIncome = (income + extraIncomeError - tax);
            }

            showModal(tax);
        }
    });

    function displayError(element) {
        const errorIcon = element.previousElementSibling.querySelector('.error-icon');
        errorIcon.style.display = 'inline-block';
    }

    function showModal(tax) {
        resultElement.textContent = `${tax} Lakhs`;
        modal.style.display = 'block';

        resultElementIncome.textContent = `${totalIncome} Lakhs`;
        modal.style.display = 'block';

        // Close the modal when close button is clicked
        modal.querySelector('.close').addEventListener('click', function () {
            modal.style.display = 'none';
        });

        // Close the modal when clicked outside the modal
        window.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});

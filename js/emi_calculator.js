document.addEventListener('DOMContentLoaded', () => {
    initializeEMICalculator();
});

function initializeEMICalculator() {
    // Get all form elements
    const form = document.getElementById('emiForm');
    const vehiclePrice = document.getElementById('vehiclePrice');
    const vehiclePriceRange = document.getElementById('vehiclePriceRange');
    const downPayment = document.getElementById('downPayment');
    const downPaymentRange = document.getElementById('downPaymentRange');
    const interestRate = document.getElementById('interestRate');
    const interestRateRange = document.getElementById('interestRateRange');
    const loanTerm = document.getElementById('loanTerm');
    const loanTermRange = document.getElementById('loanTermRange');

    // Initialize Chart.js
    const ctx = document.getElementById('emiChart').getContext('2d');
    let emiChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Principal', 'Interest'],
            datasets: [{
                data: [80, 20],
                backgroundColor: ['#38b6ff', '#00ffc3'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                            family: 'Inter'
                        }
                    }
                }
            }
        }
    });

    // Sync range inputs with number inputs
    setupRangeSync(vehiclePrice, vehiclePriceRange);
    setupRangeSync(downPayment, downPaymentRange);
    setupRangeSync(interestRate, interestRateRange);
    setupRangeSync(loanTerm, loanTermRange);

    // Calculate EMI on form submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        calculateEMI();
    });

    // Initial calculation
    calculateEMI();
}

function setupRangeSync(numberInput, rangeInput) {
    // Sync range to number input
    numberInput.addEventListener('input', () => {
        rangeInput.value = numberInput.value;
    });

    // Sync number to range input
    rangeInput.addEventListener('input', () => {
        numberInput.value = rangeInput.value;
        // Trigger calculation on range change
        calculateEMI();
    });
}

function calculateEMI() {
    const P = document.getElementById('vehiclePrice').value - document.getElementById('downPayment').value; // Principal
    const R = document.getElementById('interestRate').value / 12 / 100; // Monthly interest rate
    const N = document.getElementById('loanTerm').value; // Number of months

    // EMI calculation formula: EMI = P * R * (1 + R)^N / ((1 + R)^N - 1)
    const EMI = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
    const totalAmount = EMI * N;
    const interestAmount = totalAmount - P;

    // Update results
    updateResults(EMI, P, interestAmount, totalAmount);
    updateChart(P, interestAmount);
}

function updateResults(emi, principal, interest, total) {
    document.querySelector('.emi-amount .amount').textContent = `₹${Math.round(emi).toLocaleString('en-IN')}`;
    document.getElementById('principalAmount').textContent = `₹${Math.round(principal).toLocaleString('en-IN')}`;
    document.getElementById('interestAmount').textContent = `₹${Math.round(interest).toLocaleString('en-IN')}`;
    document.getElementById('totalAmount').textContent = `₹${Math.round(total).toLocaleString('en-IN')}`;
}

function updateChart(principal, interest) {
    const chart = Chart.getChart('emiChart');
    chart.data.datasets[0].data = [principal, interest];
    chart.update();
}

// Handle enquiry and test ride buttons
document.querySelector('.enquire-btn').addEventListener('click', () => {
    // Add your enquiry handling logic here
    showNotification('Thank you for your interest! Our team will contact you shortly.', 'success');
});

document.querySelector('.schedule-btn').addEventListener('click', () => {
    // Add your test ride scheduling logic here
    showNotification('Schedule your test ride through our app for the best experience!', 'info');
});
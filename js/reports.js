document.addEventListener('DOMContentLoaded', function () {
    // Status Distribution Chart
    const ctx = document.getElementById('statusChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Received', 'Sent', 'Deposited', 'Transferred', 'Returned', 'Realized'],
            datasets: [{
                data: [7, 2, 4, 15, 3, 14],
                backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981', '#ef4444', '#f59e0b', '#06b6d4'],
                hoverOffset: 4,
                cutout: '70%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20 } } }
        }
    });

    // Mock Data for Breakdown Lists
    const bankData = [
        { name: 'Bank of Ceylon', count: 9, amount: '4,757,028.00', pct: '76.4%' },
        { name: 'Citi Bank', count: 2, amount: '574,465.00', pct: '9.2%' }
    ];

    const bankList = document.getElementById('bankBreakdown');
    bankData.forEach(bank => {
        bankList.innerHTML += `
            <div class="breakdown-item">
                <div class="breakdown-info"><h5>${bank.name}</h5><span>${bank.count} cheques</span></div>
                <div class="breakdown-values"><span class="breakdown-amt">LKR ${bank.amount}</span><span class="breakdown-pct">${bank.pct}</span></div>
            </div>`;
    });

    // Populate the Status Table
    const tableBody = document.querySelector('#statusTable tbody');
    const tableData = [
        { status: 'RECEIVED', color: 'badge-received', count: 7, pct: '15.6%', amt: '423,678.00', pctTotal: '6.8%', avg: '60,525.43' },
        { status: 'TRANSFERRED', color: 'badge-pending', count: 15, pct: '33.3%', amt: '619,020.00', pctTotal: '9.9%', avg: '41,268.00' }
    ];

    tableData.forEach(row => {
        tableBody.innerHTML += `
            <tr>
                <td><span class="badge ${row.color}">${row.status}</span></td>
                <td>${row.count}</td><td>${row.pct}</td>
                <td style="color:#10b981; font-weight:600">LKR ${row.amt}</td><td>${row.pctTotal}</td><td>LKR ${row.avg}</td>
            </tr>`;
    });
    // Modal Logic
    const modal = document.getElementById("returnedPayersModal");
    const btn = document.getElementById("viewReturnedPayers");
    const span = document.getElementsByClassName("close-modal")[0];

    btn.onclick = function () { modal.style.display = "block"; }
    span.onclick = function () { modal.style.display = "none"; }
    window.onclick = function (event) {
        if (event.target == modal) { modal.style.display = "none"; }
    }

    // Print PDF functionality
    const printBtn = document.querySelector('.btn-download-report');
    printBtn.addEventListener('click', function () {
        window.print();
    });
});

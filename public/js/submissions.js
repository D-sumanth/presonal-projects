let detailsModal;

document.addEventListener("DOMContentLoaded", function () {
  // Initialize the Bootstrap modal
  detailsModal = new bootstrap.Modal(document.getElementById("detailsModal"));

  loadEmployeeData();

  document
    .getElementById("searchForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      loadEmployeeData(document.getElementById("searchName").value);
    });

  document.getElementById("resetSearch").addEventListener("click", function () {
    document.getElementById("searchName").value = "";
    loadEmployeeData();
  });
});

async function loadEmployeeData(searchTerm = "") {
  try {
    const response = await fetch(
      `/api/employees${
        searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : ""
      }`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const tbody = document.getElementById("employeeData");
    tbody.innerHTML = "";

    if (data.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="7" class="text-center">No records found</td></tr>';
      return;
    }

    data.forEach((employee) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${escapeHtml(employee.full_name)}</td>
                <td>${formatDate(employee.date_of_birth)}</td>
                <td>${escapeHtml(employee.telephone)}</td>
                <td>${escapeHtml(employee.ni_number)}</td>
                <td><button class="btn btn-link" onclick="showDetails('bank', ${JSON.stringify(
                  employee
                )})">View</button></td>
                <td><button class="btn btn-link" onclick="showDetails('emergency', ${JSON.stringify(
                  employee
                )})">View</button></td>
                <td><button class="btn btn-link" onclick="showDetails('additional', ${JSON.stringify(
                  employee
                )})">View</button></td>
            `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("employeeData").innerHTML =
      '<tr><td colspan="7" class="text-center text-danger">Error loading data. Please try again later.</td></tr>';
  }
}

function showDetails(type, data) {
  const modalTitle = document.querySelector("#detailsModal .modal-title");
  const modalBody = document.querySelector("#detailsModal .modal-body");

  switch (type) {
    case "bank":
      modalTitle.textContent = "Bank Details";
      modalBody.innerHTML = `
                <p><strong>Bank Name:</strong> ${escapeHtml(data.bank_name)}</p>
                <p><strong>Sort Code:</strong> ${escapeHtml(data.sort_code)}</p>
                <p><strong>Account Number:</strong> ${escapeHtml(
                  data.account_number
                )}</p>
            `;
      break;
    case "emergency":
      modalTitle.textContent = "Emergency Contact";
      modalBody.innerHTML = `
                <p><strong>Name:</strong> ${escapeHtml(
                  data.emergency_contact_name
                )}</p>
                <p><strong>Number:</strong> ${escapeHtml(
                  data.emergency_contact_number
                )}</p>
            `;
      break;
    case "additional":
      modalTitle.textContent = "Additional Information";
      modalBody.innerHTML = `
                <p><strong>Health Issues:</strong> ${escapeHtml(
                  data.health_issues || "None"
                )}</p>
                <p><strong>Additional Info:</strong> ${escapeHtml(
                  data.additional_info || "None"
                )}</p>
            `;
      break;
  }

  detailsModal.show();
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString();
}

function escapeHtml(unsafe) {
  if (!unsafe) return "";
  return unsafe
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

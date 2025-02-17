let detailsModal;

// Wait for DOM and Bootstrap to be loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, checking Bootstrap availability...");

  // Check if Bootstrap is available
  if (typeof bootstrap === "undefined") {
    console.error("Bootstrap not loaded");
    return;
  }

  // Initialize modal
  const modalEl = document.getElementById("detailsModal");
  if (modalEl) {
    detailsModal = new bootstrap.Modal(modalEl);
    console.log("Modal initialized successfully");
  } else {
    console.error("Modal element not found");
    return;
  }

  // Setup search form handlers
  const searchForm = document.getElementById("searchForm");
  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const searchTerm = document.getElementById("searchInput").value;
      loadEmployeeData(searchTerm);
    });
  }

  const resetButton = document.getElementById("resetSearch");
  if (resetButton) {
    resetButton.addEventListener("click", function () {
      document.getElementById("searchInput").value = "";
      loadEmployeeData();
    });
  }

  // Setup view button click handlers
  document.addEventListener("click", function (event) {
    const button = event.target.closest(".btn-info");
    if (button) {
      const type = button.dataset.type;
      const encodedData = button.dataset.info;
      if (type && encodedData) {
        showDetailsFromEncoded(type, encodedData);
      }
    }
  });

  // Load initial data
  loadEmployeeData();
});

function showDetailsFromEncoded(type, encodedData) {
  try {
    const data = JSON.parse(atob(encodedData));
    showDetails(type, data);
  } catch (error) {
    console.error("Error parsing encoded data:", error);
  }
}

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
    if (!tbody) return;

    tbody.innerHTML = "";

    if (data.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="7" class="text-center">No records found</td></tr>';
      return;
    }

    data.forEach((employee) => {
      const row = document.createElement("tr");
      const encodedData = btoa(JSON.stringify(employee));

      row.innerHTML = `
                <td>${escapeHtml(employee.full_name)}</td>
                <td>${formatDate(employee.date_of_birth)}</td>
                <td>${escapeHtml(employee.telephone)}</td>
                <td>${escapeHtml(employee.ni_number)}</td>
                <td><button type="button" class="btn btn-info btn-sm" data-type="bank" data-info="${encodedData}">View</button></td>
                <td><button type="button" class="btn btn-info btn-sm" data-type="emergency" data-info="${encodedData}">View</button></td>
                <td><button type="button" class="btn btn-info btn-sm" data-type="additional" data-info="${encodedData}">View</button></td>
            `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Error:", error);
    const tbody = document.getElementById("employeeData");
    if (tbody) {
      tbody.innerHTML =
        '<tr><td colspan="7" class="text-center text-danger">Error loading data</td></tr>';
    }
  }
}

function showDetails(type, data) {
  if (!detailsModal) {
    console.error("Modal not initialized");
    return;
  }

  const modalTitle = document.querySelector("#detailsModal .modal-title");
  const modalBody = document.querySelector("#detailsModal .modal-body");

  if (!modalTitle || !modalBody) {
    console.error("Modal elements not found");
    return;
  }

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
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString();
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
}

function escapeHtml(unsafe) {
  if (unsafe == null) return "";
  return unsafe
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

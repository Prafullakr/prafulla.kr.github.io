const startBtn = document.getElementById("start-btn");
const tableContainer = document.getElementById("table-container");

// Speech recognition setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";
recognition.interimResults = false;

startBtn.addEventListener("click", () => {
  recognition.start();
  startBtn.textContent = "Listening...";
});

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript.toLowerCase();
  startBtn.textContent = "🎤 Start Voice Command";

  if (transcript.includes("create a table with")) {
    // Extract rows and columns from the command
    const matches = transcript.match(/(\d+)\srows?\sand\s(\d+)\scolumns?/);
    if (matches) {
      const rows = parseInt(matches[1]);
      const cols = parseInt(matches[2]);
      createTable(rows, cols);
    } else {
      alert("Please specify the number of rows and columns clearly.");
    }
  } else {
    alert("Command not recognized. Try saying: 'Create a table with [number] rows and [number] columns.'");
  }
};

function createTable(rows, cols) {
  // Clear any existing table
  tableContainer.innerHTML = "";

  // Create table
  const table = document.createElement("table");

  // Add headers
  const headerRow = document.createElement("tr");
  for (let i = 0; i < cols; i++) {
    const th = document.createElement("th");
    th.textContent = `Column ${i + 1}`;
    headerRow.appendChild(th);
  }
  table.appendChild(headerRow);

  // Add rows
  for (let i = 0; i < rows; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement("td");
      cell.textContent = `Row ${i + 1} Col ${j + 1}`;
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  // Append table to container
  tableContainer.appendChild(table);
}

recognition.onerror = (event) => {
  console.error("Speech recognition error:", event.error);
  startBtn.textContent = "🎤 Start Voice Command";
};

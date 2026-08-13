let queue = [];
let tokenCounter = 0;
let currentToken = null;

function generateToken() {
  const name = document.getElementById('custName').value.trim();
  const service = document.getElementById('service').value;

  if (!name) {
    document.getElementById('tokenResult').textContent = "Please enter your name.";
    return;
  }

  tokenCounter++;
  const token = "T" + String(tokenCounter).padStart(3, '0');
  queue.push({ token, name, service });

  document.getElementById('tokenResult').textContent =
    `Your token: ${token} (${service}). Estimated wait: ${queue.length} ahead.`;
  document.getElementById('custName').value = "";
  renderQueue();
}

function callNext() {
  if (queue.length === 0) {
    document.getElementById('nowServingName').textContent = "Queue is empty.";
    return;
  }
  const next = queue.shift();
  currentToken = next;
  document.getElementById('nowServing').textContent = next.token;
  document.getElementById('nowServingName').textContent =
    `${next.name} — ${next.service}`;
  renderQueue();
}

function resetQueue() {
  queue = [];
  tokenCounter = 0;
  currentToken = null;
  document.getElementById('nowServing').textContent = "--";
  document.getElementById('nowServingName').textContent = "Waiting for staff to start...";
  document.getElementById('tokenResult').textContent = "";
  renderQueue();
}

function renderQueue() {
  const list = document.getElementById('queueList');
  list.innerHTML = "";
  queue.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${item.token} - ${item.name}</span> <span class="badge">${item.service}</span>`;
    list.appendChild(li);
  });
  document.getElementById('waitingCount').textContent = `${queue.length} people waiting`;
}

const form = document.getElementById('medForm');
const lista = document.getElementById('listaCadastros');
let cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];

function salvarDados() {
  localStorage.setItem('cadastros', JSON.stringify(cadastros));
}

function mostrarCadastros() {
  lista.innerHTML = '';
  cadastros.forEach((cadastro, index) => {
    const li = document.createElement('li');
    li.textContent = `${cadastro.nome} - ${cadastro.remedio} - ${cadastro.quantidade}x - ${cadastro.horario} - ${cadastro.data}`;

    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.onclick = () => {
      cadastros.splice(index, 1);
      salvarDados();
      mostrarCadastros();
    };

    li.appendChild(btnExcluir);
    lista.appendChild(li);
  });
}

form.onsubmit = (e) => {
  e.preventDefault();
  const novoCadastro = {
    nome: form.nome.value,
    remedio: form.remedio.value,
    quantidade: form.quantidade.value,
    horario: form.horario.value,
    data: form.data.value
  };
  cadastros.push(novoCadastro);
  salvarDados();
  mostrarCadastros();
  form.reset();
};

function checarAlarme() {
  const agora = new Date();
  const horaAtual = agora.toTimeString().slice(0, 5);
  const dataAtual = agora.toISOString().slice(0, 10);

  cadastros.forEach(c => {
    if (c.horario === horaAtual && c.data === dataAtual) {
      alert(`Hora de tomar o remédio de ${c.nome}: ${c.remedio}`);
    }
  });
}

setInterval(checarAlarme, 60000); // Verifica a cada minuto

mostrarCadastros();

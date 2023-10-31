const fs = require('fs');

function textToBits(text) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const asciiValue = text.charCodeAt(i);
    const binary = asciiValue.toString(2).padStart(8, '0');
    result += binary + ' ';
  }
  return result;
}

// Função para ler o arquivo
function readTextFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err);
      return;
    }
    const bits = textToBits(data);
    console.log(`Conteúdo do arquivo em bits (ASCII): ${bits}`);
  });
}

// Caminho do arquivo a ser lido
const filePath = 'exemplo.txt'; // Certifique-se de ter este arquivo no mesmo diretório

// Chamando a função para ler o arquivo
readTextFile(filePath);
const fs = require("fs");
const join = require("path").join;

const readFileEncrypt = join("02/files/message.txt");
const writeFileEncrypt = join("02/files/encrypted.txt");

function createParityMatrix(string) {
  const matrix = [];

  for (let i = 0; i < string.length; i++) {
    const char = string.charAt(i);
    const binary = char.charCodeAt(0).toString(2).padStart(8, '0');
    const row = [];

    for (let j = 0; j < binary.length; j++) {
      row.push(parseInt(binary.charAt(j)));
    }

    const rowParityBit = row.reduce((sum, bit) => sum + bit, 0) % 2;
    row.push(rowParityBit);

    matrix.push(row);
  }

  const columnParityRow = [];

  for (let j = 0; j < matrix[0].length; j++) {
    const column = matrix.map((row) => row[j]);
    const columnParityBit = column.reduce((sum, bit) => sum + bit, 0) % 2;
    columnParityRow.push(columnParityBit);
  }

  matrix.push(columnParityRow);

  return matrix;
}



// Leitura do arquivo para encriptar
fs.readFile(readFileEncrypt, 'utf8', (err, data) => {
  if (err) {
    console.error(`Erro ao ler o arquivo: ${err}`);
    return;
  }

  const matrix = createParityMatrix(data);

  console.log('Matriz de Paridade');
  for (let i = 0; i < matrix.length; i++) {
    console.log(matrix[i].join('  '));
  }

  // Escrita no arquivo encriptado
  fs.writeFile(writeFileEncrypt, matrixToString(matrix), 'utf8', (err) => {
    if (err) {
      console.error(`Erro ao escrever no arquivo encriptado: ${err}`);
    } else {
      console.log('Arquivo encriptado salvo com sucesso.');
    }
  });
});

// Função para converter a matriz de volta para uma string
function matrixToString(matrix) {
  const rows = matrix.map(row => row.map(String).join('  '));
  return rows.join('\n');
}
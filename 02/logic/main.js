function createParityMatrix(string) {
  const matrix = [];

  //percorre cada caractere da string
  for (let i = 0; i < string.length; i++) {
      const char = string.charAt(i);
      const binary = char.charCodeAt(0).toString(2).padStart(8, '0');
      const row = [];

      //adiciona o binário para cada linha
      for (let j = 0; j < binary.length; j++) {
          row.push(parseInt(binary.charAt(j)));
      }

      // adiciona o bit de paridade a linha
      const rowParityBit = row.reduce((sum, bit) => sum + bit, 0) % 2;

      row.push(rowParityBit);

      //adiciona linha na matriz
      matrix.push(row);
  }

  //calcular e adicionar o bit de paridade para a coluna
  const columnParityRow = [];

  for (let j = 0; j < matrix[0].length; j++) {
      const column = matrix.map((row) => row[j]);

      //define o bit de paridade para cada coluna e adiciona na coluna
      const columnParityBit = column.reduce((sum, bit) => sum + bit, 0) % 2;

      columnParityRow.push(columnParityBit);
  }

  matrix.push(columnParityRow);

  return matrix;
}

function checkErrors(matrix, string) {
  matrix = fixParityErrors(matrix);

  if (matrix) {
      console.log('Matriz corrigida:');
      for (let i = 0; i < string.length; i++) {
          console.log(matrix[i].join('  '));
      }
  }
}

function fixParityErrors(matrix) {
  console.log("Verificando matriz...");

  const rowCount = matrix.length;
  const columnCount = matrix[0].length;
  let errorDetected = false;

  // Verificar e corrigir erros de paridade nas linhas
  let rowWithError = 0;

  for (let i = 0; i < rowCount - 1; i++) {
      const row = matrix[i];
      const rowParityBit = row[row.length - 1]; // Último elemento é o bit de paridade da linha
      const rowBits = row.slice(0, row.length - 1); // Remover o bit de paridade da linha

      const calculatedRowParityBit = rowBits.reduce((sum, bit) => sum + bit, 0) % 2;

      if (rowParityBit !== calculatedRowParityBit) {
          console.log(`Erro de paridade na linha ${i + 1}.`);

          rowWithError = i;

          errorDetected = true;
      }
  }

  // Verificar e corrigir erros de paridade nas colunas
  const columnParityRow = matrix[rowCount - 1];
  let columnWithError = 0;

  for (let j = 0; j < columnCount; j++) {
      const columnBits = matrix.slice(0, rowCount - 1).map((row) => row[j]); // Bits da coluna, excluindo a linha de paridade
      const columnParityBit = columnParityRow[j]; // Bit de paridade da coluna

      const calculatedColumnParityBit = columnBits.reduce((sum, bit) => sum + bit, 0) % 2;

      if (columnParityBit !== calculatedColumnParityBit) {
          console.log(`Erro de paridade na coluna ${j + 1}.`);
          columnWithError = j;

          errorDetected = true;
      }
  }

  if (errorDetected) {
      //pegar rowWithError e columnWithError encontrar os pontos e alterar o bit
      console.log('Corrigindo...');
      matrix[rowWithError][columnWithError] = matrix[rowWithError][columnWithError] == 0 ? 1 : 0;

      return matrix;
  }

  if (!errorDetected) {
      console.log('Nenhum erro de paridade detectado.');
  }

  return null;
}

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Digite uma palavra: ', (string) => {
  const matrix = createParityMatrix(string);

  console.log('Matriz de Paridade');
  for (let i = 0; i < string.length; i++) {
      console.log(matrix[i].join('  '));
  }

  readline.question('Deseja editar algum bit de paridade? (S/N): ', (option) => {
      if (option.toUpperCase() === 'S') {
          readline.question('Deseja editar o bit de qual coluna?', (option) => {
              const column = parseInt(option) - 1;

              readline.question('Deseja editar o bit de qual linha?', (option) => {
                  const row = parseInt(option) - 1;

                  readline.question('Deseja substituir por qual valor? ', (option) => {
                      const value = parseInt(option);

                      if (!isNaN(row) && row >= 0 && row < matrix.length && !isNaN(column) && column >= 0 && column < matrix[0].length) {
                          if (value === 0 || value === 1) {
                              matrix[column][row] = value;
                              console.log('Bit de paridade atualizado com sucesso na posição especificada.');
                          } else {
                              console.log('Valor inválido. Digite 0 ou 1.');
                          }
                      } else {
                          console.log('Posição inválida.');
                      }

                      // Mostrar nova matriz
                      console.log('Nova Matriz de Paridade:');
                      for (let i = 0; i < string.length; i++) {
                          console.log(matrix[i].join('  '));
                      }

                      checkErrors(matrix, string);
                  });
              });
          });

      } else {
          checkErrors(matrix, string)
      }
  });
});

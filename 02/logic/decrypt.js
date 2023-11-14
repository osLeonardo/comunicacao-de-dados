const fs = require("fs");
const path = require("path");

const readFileDecrypt = path.join("02/files/encrypted.txt");
const writeFileDecrypt = path.join("02/files/final.txt");

fs.readFile(readFileDecrypt, "utf8", (err, data) => {
  if (err) {
    console.error(`Erro ao ler o arquivo criptografado: ${err}`);
    return;
  }

  const matrix = stringToMatrix(data);

  console.log("Matriz Original");
  for (let i = 0; i < matrix.length; i++) {
    console.log(matrix[i].join("  "));
  }

  const errors = checkParity(matrix);

  if (errors.length > 0) {
    console.error("Erro: A matriz contém bits inválidos ou incorretos.");
    console.log("Bits com erros:", errors);
  } else {
    const decryptedWord = matrixToWord(matrix);

    const finalText = `Palavra: ${decryptedWord}\n\n${matrixToString(matrix)}`;
    fs.writeFile(writeFileDecrypt, finalText, "utf8", (err) => {
      if (err) {
        console.error(`Erro ao escrever no arquivo descriptografado: ${err}`);
      } else {
        console.log("Arquivo descriptografado salvo com sucesso.");
      }
    });
  }
});

function stringToMatrix(string) {
  const rows = string.split("\n");
  const matrix = rows.map((row) => row.split("  ").map(Number));
  return matrix;
}

function checkParity(matrix) {
  const errors = [];

  for (let i = 0; i < matrix.length - 1; i++) {
    const rowParityBit = matrix[i].pop();
    const calculatedRowParity =
      matrix[i].reduce((sum, bit) => sum + bit, 0) % 2;

    if (rowParityBit !== calculatedRowParity) {
      errors.push({ row: i, type: "row" });
    }
  }

  const columnParityRow = matrix.pop();

  for (let j = 0; j < matrix[0].length; j++) {
    const column = matrix.map((row) => row[j]);
    const columnParityBit = column.reduce((sum, bit) => sum + bit, 0) % 2;

    if (columnParityBit !== columnParityRow[j]) {
      errors.push({ column: j, type: "column" });
    }
  }

  return errors;
}

function matrixToWord(matrix) {
  const chunkedBits = matrix;
  const decryptedWord = chunkedBits
    .map((chunk) => bitsParaString(chunk))
    .join("");
  return decryptedWord;
}

function bitsParaString(bits) {
  var resultado = "";
  for (var i = 0; i < bits.length; i += 8) {
    var byte = bits.slice(i, i + 8);
    var binario = byte.join("");

    var decimal = parseInt(binario, 2);

    var caractere = String.fromCharCode(decimal);

    resultado += caractere;
  }
  return resultado;
}
function matrixToString(matrix) {
  const rows = matrix.map((row) => row.map(String).join("  "));
  return rows.join("\n");
}

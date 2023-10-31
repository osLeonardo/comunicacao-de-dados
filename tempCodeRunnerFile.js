const fs = require("fs");

function textToBits(text) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const asciiValue = text.charCodeAt(i);
    const binary = asciiValue.toString(2).padStart(8, "0");

    // Contando o número de bits '1' no valor ASCII
    const numberOfOnes = (binary.match(/1/g) || []).length;

    // Calculando o bit de paridade (par ou ímpar)
    const parityBit = numberOfOnes % 2 === 0 ? "0" : "1";

    // Acrescentando o bit de paridade à representação binária do caractere
    result += binary + parityBit + " ";
  }
  return result;
}
//01100001
// Função para ler o arquivo usando Promise
function readTextFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject("Erro ao ler o arquivo: " + err);
      } else {
        resolve(data);
      }
    });
  });
}

// Caminho do arquivo a ser lido
const filePath = "exemplo.txt"; // Certifique-se de ter este arquivo no mesmo diretório

// Chamando a função para ler o arquivo usando a Promise
readTextFile(filePath)
  .then((data) => {
    const bits = textToBits(data);
    console.log(
      `Conteúdo do arquivo em bits (ASCII + Bit de Paridade): ${bits}`
    );
  })
  .catch((error) => {
    console.error(error);
  });

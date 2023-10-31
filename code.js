const fs = require("fs");

function textToBits(text) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const asciiValue = text.charCodeAt(i);
    const binary = asciiValue.toString(2).padStart(8, "0");
    const numberOfOnes = (binary.match(/1/g) || []).length;
    const parityBit = numberOfOnes % 2 === 0 ? "0" : "1";
    result += binary + parityBit + " ";
  }
  return result;
}
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

const filePath = "exemplo.txt";

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

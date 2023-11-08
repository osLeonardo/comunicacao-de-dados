const fs = require("fs");
const join = require("path").join;

const readFile = join("01/files/message.txt");
const writeFile = join("01/files/encrypted.txt");

readTextFile(readFile)
  .then((data) => {
    const bits = textToBits(data);
    console.log(`Conteúdo do arquivo em bits (ASCII + Bit de Paridade): ${bits}`);
    writeTextFile(writeFile, bits);
  })
  .catch((error) => {
    console.error(error);
  });

function textToBits(text) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const asciiValue = text.charCodeAt(i);
    const binary = asciiValue.toString(2).padStart(8, "0");
    const numberOfOnes = (binary.match(/1/g) || []).length;
    const parityBit = numberOfOnes % 2 === 0 ? "0" : "1";

    if(i == text.length - 1){
      result += binary + parityBit
    } else {
      result += binary + parityBit + " ";
    }
  }
  return result;
}

function readTextFile(readFile) {
  return new Promise((resolve, reject) => {
    fs.readFile(readFile, "utf8", (err, data) => {
      if (err) {
        reject("Erro ao ler o arquivo: " + err);
      } else {
        resolve(data);
      }
    });
  });
}

function writeTextFile(writeFile, data) {
  return new Promise((resolve, reject) => {
    fs.truncate(writeFile, 0, function(){})
    fs.writeFile(writeFile, data, "utf8", (err) => {
      if (err) {
        reject("Erro ao escrever o arquivo: " + err);
      } else {
        resolve(data);
      }
    });
  });
}
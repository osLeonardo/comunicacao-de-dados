const fs = require("fs");
const join = require("path").join;

const readFile = join("files/encrypted.txt");
const writeFile = join("files/final.txt");

readTextFile(readFile)
  .then((data) => {
    const decodedText = checkParityAndDecodeBits(data);
    console.log(`Texto decodificado: ${decodedText}`);
    writeTextFile(writeFile, decodedText);
  })
  .catch((error) => {
    console.error(error);
  });

function checkParityAndDecodeBits(bitsWithParity) {
  let decodedText = '';
  const bitsArray = bitsWithParity.split(' ');
  
  bitsArray.forEach(bitGroup => {
    const binaryWithoutParity = bitGroup.slice(0, -1); 
    const parityBit = bitGroup.slice(-1); 
    
    const numberOfOnes = (binaryWithoutParity.match(/1/g) || []).length;
    
    const expectedParityBit = numberOfOnes % 2 === 0 ? '0' : '1';
    
    if (parityBit === expectedParityBit) {
      const asciiValue = parseInt(binaryWithoutParity, 2);
      const decodedChar = String.fromCharCode(asciiValue);
      decodedText += decodedChar;
    } else {
      decodedText += ' - bit inválido - ';
    }
  });
  return decodedText;
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
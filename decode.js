const fs = require("fs");

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
      decodedText += '?';
    }
  });

  return decodedText;
}

const bitsWithParity = '011011110 011011000 011000011';
const decodedText = checkParityAndDecodeBits(bitsWithParity);

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
    const decodedText = checkParityAndDecodeBits(data);
    console.log(`Texto decodificado: ${decodedText}`);

  })
  .catch((error) => {
    console.error(error);
  });



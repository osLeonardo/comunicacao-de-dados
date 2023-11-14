const fs = require("fs");
const path = require("path");

function lerArquivo(caminhoArquivo) {
  return fs.readFileSync(caminhoArquivo, "utf8");
}

function textoParaBinario(texto) {
  return texto
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
}

function calcularChecksum(binario) {
  return binario
    .split(" ")
    .reduce((acc, chunk) => acc ^ parseInt(chunk, 2), 0)
    .toString(2)
    .padStart(8, "0");
}

const arquivoEntrada = path.join("03/files/message.txt");
const arquivoSaida = path.join("03/files/encrypted.txt");

const texto = lerArquivo(arquivoEntrada);

const binario = textoParaBinario(texto);

const checksum = calcularChecksum(binario);

const conteudoSaida = `Binário: ${binario}\nChecksum: ${checksum}`;
fs.writeFileSync(arquivoSaida, conteudoSaida, "utf8");

console.log("Operação concluída. Verifique o arquivo de saída:", arquivoSaida);

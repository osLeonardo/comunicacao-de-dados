const fs = require("fs");
const path = require("path");

function lerArquivo(caminhoArquivo) {
  return fs.readFileSync(caminhoArquivo, "utf8");
}

function calcularChecksum(binario) {
  return binario
    .split(" ")
    .reduce((acc, chunk) => acc ^ parseInt(chunk, 2), 0)
    .toString(2)
    .padStart(8, "0");
}

function binarioParaTexto(binario) {
  const chunks = binario.split(" ");
  return chunks
    .map((chunk) => String.fromCharCode(parseInt(chunk, 2)))
    .join("");
}

function verificarIntegridade(binario, checksum) {
  const checksumCalculado = calcularChecksum(binario);
  return checksum === checksumCalculado;
}

const arquivoEntrada = path.join("03/files/encrypted.txt");

const conteudoEntrada = lerArquivo(arquivoEntrada);

const [binario, checksum] = conteudoEntrada
  .split("\n")
  .map((line) => line.split(": ")[1]);

if (verificarIntegridade(binario, checksum)) {
  const mensagemTraduzida = binarioParaTexto(binario);

  const arquivoSaida = path.join("03/files/final.txt");

  fs.writeFileSync(arquivoSaida, mensagemTraduzida, "utf8");

  console.log(
    "Operação concluída. Verifique o arquivo de saída:",
    arquivoSaida
  );
} else {
  console.log("Erro: A mensagem está corrompida ou foi modificada.");
}
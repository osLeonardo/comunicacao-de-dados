# EXERCÍCIO COMUNICAÇÃO DE DADOS

## Prof. Valter Blauth Junior
## Alunos: Jhonny Mezzari Bif, Leonardo Calderiano Zambrana e Leonardo Spilere

### Estrutura e Funcionamento do Projeto:

#### diretório logic:
> encrypt.js
> - lê o arquivo message.txt na função readTextFile();
> - ecripta a mensagem lida na função textToBits();
> - escreve o resultado no arquivo encrypted.txt na função writeTextFile().

> decrypt.js
> - lê o arquivo encrypted.txt na função readTextFile();
> - checa os bits de paridade e decripta o código lido na função checkParityAndDecodeBits();
> - escreve o resultado no arquivo final.txt na função writeTextFile().

#### diretório files:
> message.txt
> - mensagem inicial (será lida e escriptada).

> encrypted.txt
> - mensagem encriptada (será lida e decriptada).

> final.txt
> - mensagem decriptada (é o retorno de decriptação).
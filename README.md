# Price-Search CLI Tool

### Descrição:

- Price-Search é uma ferramenta CLI que permite aos usuários pesquisar preços de jogos a partir de seu nome e/ou obter detalhes de preços pelo seu ID.

### Pré-requisitos:

- Certifique-se de ter o Node.js instalado em seu sistema. Se não tiver, você pode baixá-lo aqui (https://nodejs.org/en). 

- Tenha o npm (Node Package Manager) instalado. Ele geralmente é instalado junto com o Node.js.

## Passos para a Instalação e execução da ferramenta:

#### Clonar o Repositório:

- git clone https://github.com/MatheusTavaresz/price-search

### Download Direto:

- Caso prefira realizar o download ao invés de clonar o pacote, basta ir em Code > Download ZIP

#### Acesse o Diretório do Projeto:

* Use o terminal de sua preferência (PowerShell ou Cmd)

- `cd price-search`

### Instalar Dependências e Pacote:

- npm install
  
- npm install -g

## Comandos:

### Para realizar uma pesquisa:

```sh
npx price-search --search Dragon Ball Z 
```

##### Obs: Use aspas para uma correspondência exata. 

### Para obter detalhes de determinado produto da lista:

```sh
npx price-search --details ID
```

##### Notas:

- É necessário que o pacote seja instalado globalmente para que haja a execução dos comandos `npx price-search`

- Para verificar se o comando está instalado globalmente basta usar o comando `npm list -g`

- Se desejar remover o pacote instalado globalmente basta usar o comando `npm uninstall -g price-search`






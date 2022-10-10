# Trybe-Football-Club

O objetivo deste projeto foi desenvolver uma API com Typescript seguindo o método TDD e os principios da POO(Programação orientada a objeto) além de princípios SOLID, populando de maneira correta o Front-End.
Seu banco de dados é gerenciado pelo Sequelize, seguindo a arquitetura MSC.

Algumas tecnologias utilizadas:

- Typescript
- NodeJS
- Programação Orientada a Objetos
- Express
- MySQL
- Sequelize
- Docker
- Mocha
- React

Rodando localmente
Para rodar a API localmente certifique-se de ter Docker e Docker-Compose instalados em sua maquina.

Obs: Docker e Docker-Compose utilizados no desenvolvimento e execução deste projeto estavam nas versões 20.10.13 e 1.29.2 respectivamente.

Clone o projeto

  git clone git@github.com:Sandross/Trybe-Futebol-Clube.git
Entre no diretório do projeto

  cd Trybe-Futebol-Clube
Suba a orquestração de containers

  docker-compose up --build -d
A API estará pronta para uso quando a saída no seu terminal ficar assim

  Creating tfc_database ... done
  Creating tfc_backend ... done
  Creating tfc_frontend ... done
A aplicação poderá ser acessada através de

  Front-end: localhost:3000
  Back-end: localhost:3001
Para rodar a bateria de testes basta executar

  docker-compose exec backend npm test
Para encerrar a API basta executar o comando

  docker-compose down --rmi local --volumes --remove-orphans


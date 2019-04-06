# api-node-login
Api de Usuário para Login e proteção de rotas com Middleware.

Este código fornece uma API crud com mongodb de um usuário.

Para executá-lo, após baixar e descomprir, vá até a pasta onde se encontra o arquivo package.json com um bash ou prompt e digite:
```
npm install
```

Abra outra instância do bash e rode o mongo e execute o comando:
```
mongod
```
Agora inicie a api no mesmo lugar onde digitou o primeiro comando digite:
```
nodemon
```
ou
```
node app
```

# Documentação da API com Postman - Aqui vc encontra exemplos de usos da API.
https://documenter.getpostman.com/view/5181063/S1EJY1p9


#Passos para uso da API

1) Crie um usuário passando nome, email, password, img, role (USER_ROLE ou ADMIN_ROLE);

2) Obtenha um token;

3) Atualize ou Delete um usuário passando o token de autorização além de seu id, como demonstrado na documentação acima.



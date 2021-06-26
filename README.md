# NLW Valoriza

## Resumo do Projeto

   Este projeto é uma plataforma onde um usuário pode se cadastrar, logar, elogiar outros usuários e receber elogios.
   As tecnologias utilizadas foram Typescript, Node, Express, Typeorm, Sqlite.

## Regras

- Cadastro de usuário
    
    [ x ] Não é permitido cadastrar mais de um usuário com o mesmo email
    
    [ x ] Não é permitido cadastrar mais de um usuário sem email

- Cadastro de TAG

    [ x ] Não é permitido cadastrar uma tag sem nome

    [ x ] Não é permitido cadastrar mais de uma tag com o mesmo nome
    
    [ x ] Não é permitido o cadastro por usuários que não sejam admin

- Cadastro de elogios

    [ x ] Não é permitido um usuário cadastrar um elogio para si mesmo

    [ x ] Não é permitido cadastrar um elogio para um usuário inválido

    [ x ] O usuário precisa estar autenticado para cadastrar elogios 

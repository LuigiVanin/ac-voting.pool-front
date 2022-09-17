<h1 align="center" >

<img src="./images/logo.png" width="150px" />

</h1>

<h1 align="center">
voting.pool
</h1>

Voting.pool é um app de votação 🗳️ com o front e o back sendo desenvoldido com ferramentas da linguagem JavaScript. Para ver o código do backend acesse o [repositório](https://github.com/LuigiVanin/ac-voting.pool-back). Algumas das funções do app:

-   O app deve ser capaz de criar novos usuários.
-   usuários podem logar e permanecer logados até efetivarem log out.
-   Todo usuário pode criar **pool** e adicionar qualquer pessoa na **pool**, sendo o dono automaticamente adicionado.
-   Todos os integrantes da **pool** podem votar entre si, porém não em si mesmo.
-   Participantes de uma **pool** podem visualizar os resultados da **pool** após ela ser fechada
-   Somente o dono da **pool** pode fechar a mesma.

<h3 align="center">

<a  href="https://ac-voting-pool-front.vercel.app/"/>

«Acessar Demostração»

</a>

</h3>

<h3 align="center">OU</h3>

<h3 align="center">

<a  href="https://github.com/LuigiVanin/ac-voting.pool-back"/>

«Acessar Backend»

</a>

</h3>

<h2>
Preview 👓
</h2>

<p align="center" >

<img  src="./images/voting-pool-mock.png" width="650px" />

## Como Rodar 🚀

Para rodar o projeto localmente é necessário rodar tanto o front quanto o back, então é necessário baixar ambos os repositórios na sua máquina - para isso acesse os repos do [backend](https://github.com/LuigiVanin/ac-voting.pool-back) e do [frontend](https://github.com/LuigiVanin/ac-voting.pool-front) usando **git clone** ou baixando manualmente.

```bash
> mkdir voting-pool && cd voting-pool
> git clone https://github.com/LuigiVanin/ac-voting.pool-front.git
> git clone https://github.com/LuigiVanin/ac-voting.pool-back.git
```

Antes de tudo é importante saber que esse projeto usa-se de um banco de dados postgres, logo, é necessário que seja setado um antes de subir o backend. Após setar seu banco postgres, basta configurar o projeto - para isso basta seguir o exemplo de .env, o arquivo `.env.example`.

### 1. Como rodar o Backend

Para rodar o front basta entrar na pasta do mesmo e instalar as dependências:

```bash
> npm i
```

Agora, precisamos setar o banco de dados:

```bash
npx prisma migrate dev
```

Para rodar em desenvolvimento basta usar o seguinte script:

```bash
npm run start:dev
```

### 2. Como rodar o Frontend

Para rodar o front basta entrar na pasta do mesmo e instalar as dependências:

```bash
> npm i
```

Agora, para rodar a versão de desenvolvimento rodamos o seguinte script:

```bash
> npm run dev
```

## Como testar 🧪

<br />

Os testes desses repo utilizam das libs do Jest(back) e Cypress(front) - para rodar os respectivos testes basta rodar os scripts corretos!

**No backend** é necessário utilizar o docker para subir o banco de testes e rodar o script:

```bash
npm run test:e2e
```

**No frontend**

WIP 🚧🚧🚧

## Features futuras

Essas features serão desenvolvidas conforme o dev(eu) estiver com tempo livre...

-   [x] Adicionar um ReadMe
-   [x] Adicionar compatibilidade com docekr
-   [ ] Criar um monorepo
-   [ ] Mudar restante das notificações para toasts
-   [ ] Corrigir bug da tela de resultado.
-   [ ] Finalizar testes de backend.
-   [ ] Finalizar testes de Frontend
-   [ ] Futuramente fazer o host na railway
-   [ ] Migrar backend para a plataforma do [Render.com](https://www.notion.so/Ac-vooting-pool-2c86234e21dc4be397823a4d990a79a2)

---

## Ferramentas Utilizadas 🛠️

<h1 align="center" >

<img src="./images/nest+vue.png" width="350px" />

</h1>

<p align="center">
    <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white">
    <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white">
    <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D"/>
    <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" />
    <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" />
    <img src="https://img.shields.io/badge/Git-E34F26?style=for-the-badge&logo=git&logoColor=white" />
    <img src="https://img.shields.io/badge/Vercel-100000?style=for-the-badge&logo=vercel&logoColor=white" />
    <img src="https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white" />
    <img src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white">
    <img src="https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e">
    <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white">
    <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white">
</p>

## Outras Ferramentas 📦

-   [Axios](https://axios-http.com/).
-   [Chalk](https://www.npmjs.com/package/chalk).
-   [Joi](https://joi.dev/).
-   [pactum](https://pactumjs.github.io/).
-   [Pinia](https://pinia.vuejs.org/)
-   [Vue-Router](https://router.vuejs.org/)

_-> Mais pacotes podem ser vistos nos package.json de cada repo._

## Entre em contato 📞

<br>

<p align="center">
<a href="https://www.linkedin.com/in/luis-felipe-vanin-martins-5a5b38215">
<img src="https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=blue">
</a>
<a href="mailto:luisfvanin2@gmail.com">
<img src="https://img.shields.io/badge/Gmail:%20luisfvanin2@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white">
</a>
</p>

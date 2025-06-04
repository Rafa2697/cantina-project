

# cantina-project

Projeto privado desenvolvido utilizando [Next.js](https://nextjs.org/) com integração ao [Prisma](https://www.prisma.io/), autenticação com [NextAuth.js](https://next-auth.js.org/), estilização com [Tailwind CSS](https://tailwindcss.com/) e outros recursos modernos do ecossistema React.

## Índice

- [Sobre](#sobre)
- [Tecnologias](#tecnologias)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Como Rodar](#como-rodar)
- [Licença](#licença)

## Sobre

Este projeto tem como objetivo...

> _O aplicativo web da Cantina da Faculdade Sul Paulista de Itanhaém foi 
desenvolvido para otimizar o processo de pedidos durante o intervalo, proporcionando 
uma experiência mais ágil e organizada para os alunos._

## Tecnologias

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Prisma ORM](https://www.prisma.io/)
- [NextAuth.js](https://next-auth.js.org/) (autenticação)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Lucide React Icons](https://lucide.dev/)
- [date-fns](https://date-fns.org/)
- [bcrypt / bcryptjs](https://www.npmjs.com/package/bcrypt)
- [Sonner](https://sonner.emilkowal.ski/) (notificações)
- [TypeScript](https://www.typescriptlang.org/)

## Scripts Disponíveis

No diretório do projeto, você pode rodar:

```bash
npm run dev
```
Roda o ambiente de desenvolvimento com Next.js e Turbopack.

```bash
npm run build
```
Gera os arquivos de produção (inclui `prisma generate`).

```bash
npm run start
```
Inicia o servidor Next.js em modo produção.

```bash
npm run lint
```
Executa o linter para checar problemas no código.

## Dependências

Consulte o arquivo [`package.json`](./package.json) para ver todas as dependências e versões utilizadas.

## Como Rodar

1. Instale as dependências:
    ```bash
    npm install
    ```

2. Configure as variáveis de ambiente conforme necessário (crie um arquivo `.env`).

3. Gere os arquivos do Prisma:
    ```bash
    npx prisma generate
    ```

4. Rode o projeto localmente:
    ```bash
    npm run dev
    ```

## Licença

Projeto privado. Todos os direitos reservados.

---

Se quiser adicionar uma seção "Como contribuir" ou exemplos de uso, me avise!

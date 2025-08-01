import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()


const handler = NextAuth({
  session: {
    strategy: 'jwt'
  },

  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials:
      {
        email: {
          label: 'Email',
          type: 'email',
          placeholder:
            'john.doe@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        // Aqui você implementa a lógica para verificar as credenciais no seu banco de dados
        const { email, password } = credentials;

        // Procura o usuário no banco de dados
        const user = await prisma.admin.findUnique({
          where: {
            email,
          }
        })

        if (!user) {
          return null;
        }
        // Compara a senha fornecida com a senha criptografada armazenada
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
          return null;
        }

        if (isValid) {
          console.log(`usuario ${user.id} logado`, credentials)
          // Retorne um objeto com as informações do usuário
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            // Add any other required fields to match the User type
          }
        }

      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks:{
    async session({ session, token }) {
      if (session.user) {
        session.user = Object.assign(session.user, {
          id: token.id,
          email: token.email,
          name: token.name
        });
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
  },
})

export { handler as GET, handler as POST }
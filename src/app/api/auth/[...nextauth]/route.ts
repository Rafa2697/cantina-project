import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const handler =  NextAuth({
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
          return null; // Retorna null em vez de undefined
        }
        // Aqui você implementa a lógica para verificar as credenciais no seu banco de dados
        const { email, password } = credentials;

        // Procura o usuário no banco de dados
        const user = await prisma.user.findUnique({
          where: {
            email,
          }
        })

        if (!user) {
          throw new Error("Usuário não encontrado");
        }
        // Compara a senha fornecida com a senha criptografada armazenada
        const isValid = password === user.password;

        if (!isValid) {
          throw new Error("Senha inválida");
        }
        
        if (isValid) {
          console.log(`usuario ${user.id} logado`, credentials)
          // Retorne um objeto com as informações do usuário
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            // Add any other required fields to match the User type
          } as any // Use 'as any' to bypass type checking
        }

      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ]
})

export { handler as GET, handler as POST }
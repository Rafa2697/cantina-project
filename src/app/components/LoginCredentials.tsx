'use client'
import { useState } from "react";
import { signIn} from "next-auth/react";
import { useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm<{ email: string; senha: string }>()

    async function handleSignIn(data: { email: string; senha: string }) {
        setLoading(true);
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: data.email,
                password: data.senha
            });
            if (result?.error) {
                setError(result.error);
            } else{
                router.refresh()
                router.push('/dashboard')
            }
        } catch (error) {
            setError("Ocorreu um erro durante o login.");
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-4 text-center text-slate-500">Login</h1>
                {error && (
                    <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
                )}
                <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input {...register('email')}
                            type="email"
                            id="email"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-600 text-slate-800 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Digite seu email "
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="senha"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Senha
                        </label>
                        <input  {...register('senha')}
                            type="password"
                            id="senha"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-600 text-slate-800 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Digite sua senha"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        {loading ? "Carregando..." : "Entrar"}
                    </button>
                </form>
            </div>
        </div>
    );
}
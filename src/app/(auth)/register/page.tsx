"use client"
import { authClient } from "@/src/lib/auth-client"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import toast from "react-hot-toast"

export const authStyles = {
    input: "bg-surface rounded-xl px-3 py-4 w-full text-white text-sm focus:outline-none",
    button:"w-full bg-white text-black font-semibold py-4 rounded-lg hover:opacity-90 transition cursor-pointer"
}
interface RegisterValues {
    email: string,
    name: string,
    password: string
}

export default function RegisterPage() {
    const [values, setValues] = useState<RegisterValues>({
        email: "",
        name: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
        const{value,name} = e.target;
        setValues((prev) => ({...prev, [name]: value}))
    }

    const handleRegister = async(e:React.SubmitEvent) => {
        e.preventDefault();
        if(!values.email || !values.password || !values.name){
            toast.error("All fields are required!");
            return;
        }
        setLoading(true);
        try{
            const {error} = await authClient.signUp.email({
                name: values.name,
                email: values.email,
                password: values.password,
            });
            if(error){
                toast.error(error.message as string);
                return;
            }
            toast.success("Registration successful! Please check your email to verify your account.");
            setValues({
                email: "",
                name: "",
                password: ""
            });
            router.replace("/setup-username");
        } catch(err){
            toast.error(err instanceof Error ? err.message : "An error occurred during registration.");
        } finally {
            setLoading(false);
        }
    }
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-surface rounded-2xl p-6">
            <h1 className="text-2xl font-semibold text-white text-center mb-6">
                Register
            </h1>
            <form className="space-y-4" onSubmit={handleRegister}>
                <input type="text" placeholder="Enter your full name" className={authStyles.input} name="name" value={values.name} onChange={handleChange} />
                <input type="email" placeholder="Enter your email" className={authStyles.input} name="email" value={values.email} onChange={handleChange} />
                <input type="password" placeholder="Enter your password" className={authStyles.input} name="password" value={values.password} onChange={handleChange} />
                <button className={authStyles.button} disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>

            <p className="text-center text-sm text-text-muted">
                Already have an account? 
                <Link href="/login" className="text-white hover:underline">Sign in</Link>
            </p>
        </div>
    </main>
  )
}

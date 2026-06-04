import Link from "next/link"


export const authStyles = {
    input: "bg-surface rounded-xl px-3 py-4 w-full text-white text-sm focus:outline-none",
    button:"w-full bg-white text-black font-semibold py-4 rounded-lg hover:opacity-90 transition cursor-pointer"
}
export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-surface rounded-2xl p-6">
            <h1 className="text-2xl font-semibold text-white text-center mb-6">
                Login
            </h1>
            <form action="" className="space-y-4">
                <input type="email" placeholder="Enter your email" className={authStyles.input}/>
                <input type="password" placeholder="Enter your password" className={authStyles.input}/>
                <button className={authStyles.button}>Login</button>
                 <p className="text-center text-sm text-text-muted mt-6">
                    Don&apos;t have an account? {""}
                    <Link href="/register" className="text-white hover:underline">Sign up</Link>
                </p>
            </form>

           
        </div>
    </main>
  )
}

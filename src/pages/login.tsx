export const Login = () => {
    return (
        // a black background
        <div class="bg-black w-full h-screen flex items-center justify-center">
            <form method="post" action="/login" class="flex flex-col items-center justify-center w-full space-y-10">
                <input type="email" name="email" class="text-gray-300 p-6 rounded-xl text-3xl w-[70%] h-[6rem] opacity-50 bg-slate-800 border-transparent focus:border-transparent focus:outline-0" placeholder="Email..." />
                <button type="submit" class="text-white p-6 rounded-xl text-3xl w-[70%] h-[6rem] opacity-50 bg-slate-800 flex items-center gap-4 justify-center">Login
                    <svg class="size-10" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m14 18l-1.4-1.45L16.15 13H4v-2h12.15L12.6 7.45L14 6l6 6z"></path></svg>
                </button>
            </form>
        </div>
    );
};

export const LoginTried = (email: string) => {
    return (
        // a black background
        <div class="bg-black w-full h-screen flex items-center justify-center">
            <form method="post" action="/login" class="flex flex-col items-center justify-center w-full space-y-10">
                <span class="text-stone-500 text-4xl">Email sent to <span class="text-slate-600 text-bold text-4xl">{email}</span>.</span>
                <button type="submit" class="text-white p-6 rounded-xl text-3xl w-[70%] h-[6rem] opacity-50 bg-slate-800 flex items-center gap-4 justify-center">
                    Change Email
                    <svg class="size-10" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m10 18l-6-6l6-6l1.4 1.45L7.85 11H20v2H7.85l3.55 3.55z"></path></svg>
                </button>
            </form>
        </div>
    );
};  
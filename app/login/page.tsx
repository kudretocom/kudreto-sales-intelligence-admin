"use client";

import { ArrowRight, CircleDot, LockKeyhole } from "lucide-react";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    setIsLoading(false);

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setError(payload?.error ?? "Giriş yapılamadı.");
      return;
    }

    window.location.href = "/";
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-5 text-[#15171a]">
      <section className="w-full max-w-[420px]">
        <div className="mb-8 flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-md border border-[#dfe4ea] bg-[#f8f9fb]">
            <CircleDot className="size-4 text-[#2563eb]" strokeWidth={2.3} />
          </div>
          <div>
            <div className="text-[13px] font-semibold text-[#111318]">Kudreto</div>
            <div className="text-[11px] text-[#7a828d]">Operasyon Alanı</div>
          </div>
        </div>

        <div className="rounded-lg border border-[#e8eaee] bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)]">
          <div className="mb-6">
            <div className="mb-3 grid size-10 place-items-center rounded-md border border-[#e8eaee] bg-[#fbfcfd] text-[#2563eb]">
              <LockKeyhole className="size-4" />
            </div>
            <h1 className="text-[24px] font-semibold tracking-normal text-[#111318]">Admin girişi</h1>
            <p className="mt-2 text-[13px] leading-6 text-[#69707a]">
              Kudreto Sales Intelligence operasyon alanına yalnızca yetkili hesapla giriş yapılabilir.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.07em] text-[#8a929d]">E-posta</span>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-11 w-full rounded-md border border-[#dfe4ea] bg-[#fbfcfd] px-3 text-[14px] font-medium text-[#303640] outline-none transition focus:border-[#2563eb] focus:bg-white focus:ring-4 focus:ring-[#2563eb]/10"
                type="email"
                autoComplete="email"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.07em] text-[#8a929d]">Şifre</span>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-11 w-full rounded-md border border-[#dfe4ea] bg-[#fbfcfd] px-3 text-[14px] font-medium text-[#303640] outline-none transition focus:border-[#2563eb] focus:bg-white focus:ring-4 focus:ring-[#2563eb]/10"
                type="password"
                autoComplete="current-password"
              />
            </label>

            {error ? <p className="rounded-md border border-[#fee2e2] bg-[#fef2f2] px-3 py-2 text-[12px] text-[#b42318]">{error}</p> : null}

            <button
              disabled={isLoading}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#111318] px-4 text-[13px] font-medium text-white transition hover:bg-[#252a32] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Kontrol ediliyor" : "Giriş Yap"}
              <ArrowRight className="size-3.5" />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

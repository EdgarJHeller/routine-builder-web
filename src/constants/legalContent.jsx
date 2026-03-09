export const IMPRESSUM_CONTENT = (
    <>
        <p className="font-bold">Angaben gemäß § 5 DDG:</p>
        <p>
            Hauke Heller
            <br/>
            Bogenstraße 13
            <br/>
            20144 Hamburg
        </p>
        <p>E-Mail: hello@hejh.me</p>
    </>
);

export const PRIVACY_CONTENT = (
    <>
        <p>
            Diese App speichert Ihre eingegebenen Daten ausschließlich lokal im{" "}
            <strong>localStorage</strong> Ihres Browsers. Ihre Routinen und Übungen
            verlassen Ihr Gerät nicht und werden nicht an Server übertragen.
        </p>
        <p className="mt-2">
            Wir verwenden <strong>Vercel Analytics</strong> und{" "}
            <strong>Vercel Speed Insights</strong> zur anonymen Nutzungsanalyse.
            Dabei werden ausschließlich aggregierte, nicht personenbezogene Daten
            erfasst — wie Seitenaufrufe, Gerättyp, Browser und ungefährer Standort
            (Stadt/Land). Es werden keine persönlichen Identifikatoren gespeichert
            oder weitergegeben.
        </p>
        <p className="mt-2">
            Weitere Informationen finden Sie in der{" "}
            <a
                href="https://vercel.com/docs/analytics/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:text-brand-hover underline"
            >
                Datenschutzerklärung von Vercel
            </a>
            .
        </p>
    </>
);
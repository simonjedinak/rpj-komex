// app/api/contact/route.ts

export async function POST(req: Request) {
    const formData = await req.formData();

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const problem = String(formData.get("problem") || "").trim();
    const gdpr = formData.get("gdpr");

    if (!name || !email || !problem) {
        return Response.json(
            { ok: false, message: "Vyplňte prosím meno, e-mail a popis problému." },
            { status: 400 }
        );
    }

    if (!gdpr) {
        return Response.json(
            { ok: false, message: "Pre odoslanie je potrebný súhlas so spracovaním údajov." },
            { status: 400 }
        );
    }

    // TODO: Tu doplň odoslanie e-mailu (Resend/Nodemailer) alebo uloženie do DB.

    return Response.json({
        ok: true,
        message: "Ďakujeme! Správa bola odoslaná. Čoskoro sa ozveme.",
    });
}

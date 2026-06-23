interface GmailEnv {
  GMAIL_CLIENT_ID: string;
  GMAIL_CLIENT_SECRET: string;
  GMAIL_REFRESH_TOKEN: string;
  GMAIL_SENDER_EMAIL: string;
  GMAIL_RECIPIENT_EMAIL: string;
}

async function getAccessToken(env: GmailEnv): Promise<string> {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env.GMAIL_CLIENT_ID,
      client_secret: env.GMAIL_CLIENT_SECRET,
      refresh_token: env.GMAIL_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh Gmail access token");
  }

  const data = (await response.json()) as { access_token: string };
  return data.access_token;
}

function buildEmail(
  sender: string,
  recipient: string,
  subject: string,
  htmlBody: string
): string {
  const email = [
    `From: Portfolio <${sender}>`,
    `To: ${recipient}`,
    `Subject: =?UTF-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
    `Content-Type: text/html; charset=UTF-8`,
    `MIME-Version: 1.0`,
    ``,
    htmlBody,
  ].join("\r\n");

  return btoa(email).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function sendContactEmail(
  env: GmailEnv,
  data: { name: string; email: string; subject?: string; message: string }
): Promise<boolean> {
  try {
    const accessToken = await getAccessToken(env);

    const subject = `Pesan Portfolio dari ${data.name}`;
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #9b6dd7;">Pesan Kontak Baru</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 100px;">Nama</td>
            <td style="padding: 8px 0;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Email</td>
            <td style="padding: 8px 0;">${data.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Subjek</td>
            <td style="padding: 8px 0;">${data.subject || "-"}</td>
          </tr>
        </table>
        <div style="margin-top: 16px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
          <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
        </div>
        <p style="margin-top: 16px; font-size: 12px; color: #999;">Dikirim melalui form kontak portfolio</p>
      </div>
    `;

    const raw = buildEmail(env.GMAIL_SENDER_EMAIL, env.GMAIL_RECIPIENT_EMAIL, subject, htmlBody);

    const response = await fetch(
      "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ raw }),
      }
    );

    if (!response.ok) {
      console.error("Gmail API error:", await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}

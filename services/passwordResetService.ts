export async function sendPasswordResetRequest(
  email: string,
  resetLink: string
) {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      access_key: import.meta.env.VITE_W3F_KEY,
      subject: "🔐 Reset Your Dishcovery Password",
      from_name: "Dishcovery",
      email,
      replyto: email,
      message: `Click the link to reset your password:\n${resetLink}`
    })
  });

  const data = await res.json();
  console.log("Web3Forms response:", data);

  if (!res.ok || data.success !== true) {
    throw new Error(data.message || "Web3Forms failed");
  }

  return data;
}

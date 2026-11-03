import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Teranga GP — Le colis voyage avec vous",
  description: "La plateforme collaborative pour envoyer et transporter des colis au Sénégal.",
  applicationName: "Teranga GP",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}

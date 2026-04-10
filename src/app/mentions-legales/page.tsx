import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Mentions légales — AudoVTC",
};

export default function MentionsLegales() {
  return (
    <div className="min-h-screen pb-20">
      <div className="bg-[#0A0A0A] border-b border-[#262626] px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition text-sm">
            <ArrowLeft className="w-4 h-4" /> Retour
          </Link>
          <span className="text-gold-gradient font-bold">AUDOVTC</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-10">Mentions légales</h1>

        <div className="space-y-8 text-zinc-400 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Éditeur du site</h2>
            <p>Le site audovtc.fr est édité par :</p>
            <ul className="mt-2 space-y-1">
              <li><span className="text-zinc-300">Nom commercial :</span> AudoVTC</li>
              <li><span className="text-zinc-300">Exploitant :</span> Chauffeur VTC professionnel</li>
              <li><span className="text-zinc-300">SIRET :</span> En cours d&apos;immatriculation</li>
              <li><span className="text-zinc-300">Adresse :</span> Saint-Omer, 62500, Pas-de-Calais, France</li>
              <li><span className="text-zinc-300">Téléphone :</span> 07 43 28 93 93</li>
              <li><span className="text-zinc-300">Email :</span> contact@audovtc.fr</li>
              <li><span className="text-zinc-300">Carte professionnelle VTC :</span> Délivrée par la préfecture du Pas-de-Calais</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Hébergement</h2>
            <p>Le site est hébergé par :</p>
            <ul className="mt-2 space-y-1">
              <li><span className="text-zinc-300">Vercel Inc.</span></li>
              <li>440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
              <li>https://vercel.com</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus présents sur le site audovtc.fr (textes, images, logos, design) sont la propriété exclusive d&apos;AudoVTC, sauf mention contraire. Toute reproduction, représentation, modification ou exploitation, totale ou partielle, est interdite sans autorisation écrite préalable.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Données personnelles</h2>
            <p>
              Les informations collectées lors de la réservation (nom, téléphone, email, adresses de trajet) sont utilisées exclusivement pour le traitement de votre demande de transport. Elles ne sont ni cédées ni vendues à des tiers.
            </p>
            <p className="mt-2">
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ces droits, contactez-nous à : contact@audovtc.fr.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Cookies</h2>
            <p>
              Le site audovtc.fr n&apos;utilise pas de cookies de suivi ni de cookies publicitaires. Seuls des cookies techniques strictement nécessaires au fonctionnement du site peuvent être utilisés.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Responsabilité</h2>
            <p>
              AudoVTC s&apos;efforce d&apos;assurer l&apos;exactitude des informations publiées sur le site. Toutefois, AudoVTC ne saurait être tenu responsable des omissions, inexactitudes ou carences dans la mise à jour. Les tarifs indiqués sont donnés à titre indicatif et peuvent être ajustés par le chauffeur.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

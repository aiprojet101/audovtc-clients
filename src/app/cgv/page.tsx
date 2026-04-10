import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Conditions Générales de Vente — AudoVTC",
};

export default function CGV() {
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
        <h1 className="text-3xl font-bold mb-10">Conditions Générales de Vente</h1>

        <div className="space-y-8 text-zinc-400 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Objet</h2>
            <p>
              Les présentes Conditions Générales de Vente (CGV) régissent les prestations de transport de personnes réalisées par AudoVTC, service de Voiture de Transport avec Chauffeur (VTC) exploité par Morgan, chauffeur professionnel inscrit au registre des VTC.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Réservation</h2>
            <p>
              La réservation s&apos;effectue via le site audovtc.fr, audovtc.com, par téléphone au 07 43 28 93 93, ou par WhatsApp. Toute réservation est soumise à la disponibilité du chauffeur. La réservation est confirmée une fois que le chauffeur a accepté la course.
            </p>
            <p className="mt-2">
              Le client s&apos;engage à fournir des informations exactes (adresses de prise en charge et de destination, date, heure, nombre de passagers).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Tarification</h2>
            <p>Les tarifs sont établis selon deux modes :</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li><span className="text-zinc-300">Forfaits :</span> prix fixes pour les trajets prédéfinis depuis Saint-Omer</li>
              <li><span className="text-zinc-300">Trajet libre :</span> 1,80 € par kilomètre, avec un minimum de 15 €</li>
            </ul>
            <p className="mt-2">
              Les tarifs affichés sont indicatifs. Le tarif définitif est confirmé par le chauffeur avant le début de la course. En cas de modification du trajet à la demande du client, le tarif pourra être ajusté.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Paiement</h2>
            <p>Le paiement s&apos;effectue :</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>En véhicule par carte bancaire (SumUp)</li>
              <li>En espèces</li>
              <li>Par virement bancaire (sur demande)</li>
            </ul>
            <p className="mt-2">
              Le paiement est dû à la fin de la course, sauf accord préalable.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Annulation</h2>
            <ul className="space-y-2">
              <li><span className="text-zinc-300">Plus de 2 heures avant :</span> annulation gratuite</li>
              <li><span className="text-zinc-300">Moins de 2 heures avant :</span> 50 % du montant de la course pourra être facturé</li>
              <li><span className="text-zinc-300">Non-présentation (no-show) :</span> 100 % du montant de la course pourra être facturé</li>
            </ul>
            <p className="mt-2">
              Pour annuler, contactez-nous par téléphone ou WhatsApp au 07 43 28 93 93.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Obligations du client</h2>
            <ul className="space-y-1 list-disc list-inside">
              <li>Être présent au point de prise en charge à l&apos;heure convenue</li>
              <li>Respecter le véhicule et ne pas le dégrader</li>
              <li>Ne pas fumer dans le véhicule</li>
              <li>Attacher sa ceinture de sécurité</li>
              <li>Signaler tout bagage volumineux lors de la réservation</li>
            </ul>
            <p className="mt-2">
              Le chauffeur se réserve le droit de refuser ou d&apos;interrompre une course si le comportement du client met en danger la sécurité (état d&apos;ébriété avancé, agressivité, etc.).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Obligations du chauffeur</h2>
            <ul className="space-y-1 list-disc list-inside">
              <li>Être titulaire de la carte professionnelle VTC en cours de validité</li>
              <li>Assurer le transport dans un véhicule propre, confortable et assuré</li>
              <li>Respecter le Code de la route</li>
              <li>Être ponctuel (tolérance de 10 minutes sauf circonstances exceptionnelles)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Responsabilité</h2>
            <p>
              AudoVTC est assuré au titre de la responsabilité civile professionnelle pour le transport de personnes. En cas de retard dû à des circonstances indépendantes de notre volonté (embouteillages, conditions météo, travaux), aucune indemnisation ne pourra être réclamée.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Objets oubliés</h2>
            <p>
              En cas d&apos;objet oublié dans le véhicule, contactez-nous au 07 43 28 93 93. Les objets trouvés seront conservés pendant 30 jours. Passé ce délai, AudoVTC ne pourra être tenu responsable.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">10. Réclamations</h2>
            <p>
              Toute réclamation doit être adressée par email à contact@audovtc.fr dans un délai de 7 jours suivant la prestation. Nous nous engageons à y répondre sous 48 heures.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">11. Droit applicable</h2>
            <p>
              Les présentes CGV sont soumises au droit français. En cas de litige, les parties s&apos;engagent à rechercher une solution amiable. À défaut, le litige sera porté devant les tribunaux compétents de Saint-Omer.
            </p>
          </section>

          <section>
            <p className="text-zinc-600">Dernière mise à jour : avril 2026</p>
          </section>
        </div>
      </div>
    </div>
  );
}

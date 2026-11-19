# التسويق ببساطة — Taswiq Bebasata

Landing page arabe RTL de la formation d’Omar Al-Asbali. Nouveau projet indépendant du site hôtelier.

## Démarrage

```sh
npm ci
npm run dev
```

Aperçu : http://localhost:3100

```sh
npm run lint
npm run build
npm start
```

## Contenu et design

Le contenu arabe définitif fourni le 16 novembre 2026 est réparti entre `app/page.tsx` et `lib/content.ts`. Les 14 sections du brief comprennent la navigation, 12 sections de contenu, et le pied de page. Aucun tarif, témoignage, diplôme ou résultat commercial n’est inventé.

Référence : https://heyretro.io/ — captures réelles desktop et mobile dans `research/`. Palette crème, surfaces blanches, bordeaux #551C43. Maquettes originales en HTML/CSS. Police IBM Plex Sans Arabic via next/font. Motion respecte prefers-reduced-motion. Portrait réel fourni par le client, détouré avec transparence et enregistré dans `public/omar-cutout.png`.

## Inscription : intégration à configurer

Copier `.env.example` vers `.env.local` et renseigner :

- `REGISTRATION_WEBHOOK_URL` : URL HTTPS de votre service d’inscription.
- `REGISTRATION_WEBHOOK_TOKEN` : secret serveur, jamais envoyé au navigateur.

L’API POST `/api/register` valide l’origine, le type et la taille de la requête, le nom, le courriel, le téléphone facultatif et un champ anti-robot. Le téléphone saoudien est normalisé au format +966. Le serveur transmet `{name,email,phone,course}` au service avec `Authorization: Bearer <secret>`.

**Contrat requis : le service doit enregistrer durablement l’inscription avant de renvoyer un statut 2xx.** Il doit gérer les doublons de manière idempotente. Le succès n’est affiché qu’après cette réponse. Aucun fournisseur réel n’étant fourni, l’API renvoie actuellement 503 et le formulaire affiche une erreur. Aucun envoi d’e-mail ni stockage réel n’a été activé ou prétendu. Prévoir une limitation de débit persistante côté hébergeur ou fournisseur avant ouverture publique.

## Validation

- `npm run lint`
- `npm run build`
- Aperçu démarré : `node tests/check-layout.mjs` (Chrome installé requis).
- Largeurs : 320, 375, 390, 414, 768, 1024 et 1440 px.
- Menu mobile, FAQ, validation du formulaire, absence de faux succès, erreurs API et réduction des animations vérifiés.
- Captures desktop/mobile enregistrées dans `research/`.

## Hébergement

Projet Next.js App Router avec route serveur : déployer sur un hébergement Node.js/Next.js compatible, puis définir les deux secrets. Il n’est pas exporté en site statique afin de préserver la validation serveur. Le format serveur de Sites exige un Worker Cloudflare ; ce projet Next.js natif n’a donc pas été publié via Sites. Ajouter le domaine définitif aux métadonnées canonical/OG et au sitemap une fois connu.

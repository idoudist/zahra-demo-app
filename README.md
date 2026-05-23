# Documentation Projet — ERP SMBSA Ezahra
**DropWise Technologie** | drop.wise@outlook.com | 23 593 933 / 92 367 654  
**Version** : 1.0 | **Date** : Mai 2026 | **Statut** : En cours

---

> **Comment utiliser ce document**  
> Ce fichier est la source de vérité du projet. Il est mis à jour au fur et à mesure des décisions. Chaque section peut être modifiée indépendamment. Les développeurs et le client peuvent tous deux le consulter. Les décisions définitives sont marquées ✅. Les points ouverts sont marqués 🔄.

---

## Table des matières

1. [Présentation du projet](#1-présentation-du-projet)
2. [Parties prenantes](#2-parties-prenantes)
3. [Architecture technique](#3-architecture-technique)
4. [Infrastructure et déploiement](#4-infrastructure-et-déploiement)
5. [Modules fonctionnels — Détail complet](#5-modules-fonctionnels)
   - [C1 — Sécurité & utilisateurs](#c1--sécurité--utilisateurs)
   - [A1 — Gestion des employés & paie](#a1--gestion-des-employés--paie)
   - [A2 — Collecte de lait](#a2--collecte-de-lait)
   - [A3 — Achats & fournisseurs](#a3--achats--fournisseurs)
   - [A4 — Ventes & facturation](#a4--ventes--facturation)
   - [A5 — Gestion des stocks](#a5--gestion-des-stocks)
   - [A6 — Comptabilité & trésorerie](#a6--comptabilité--trésorerie)
   - [Migration des données](#migration-des-données)
   - [Portail web agriculteurs](#portail-web-agriculteurs)
6. [Hors périmètre](#6-hors-périmètre)
7. [Exigences non fonctionnelles](#7-exigences-non-fonctionnelles)
8. [Règles métier critiques](#8-règles-métier-critiques)
9. [Données de référence SMBSA Ezahra](#9-données-de-référence-smbsa-ezahra)
10. [Planning](#10-planning)
11. [Chiffres et contractuel](#11-chiffres-et-contractuel)
12. [Journal des décisions](#12-journal-des-décisions)

---

## 1. Présentation du projet

### 1.1 Contexte client

**SMBSA Ezahra** (Société Mutuelle de Base des Services Agricoles) est une coopérative agricole située à Ouled Salah, Ksour Essef, Mahdia 5116, Tunisie.

| Champ | Valeur |
|-------|--------|
| Raison sociale | SMBSA Ezahra |
| Forme juridique | Société Mutuelle de Base des Services Agricoles |
| ID Fiscal | 029083/W/P/M |
| Adresse | Ouled Salah, Ksour Essef, Mahdia 5116 |
| Activités | Collecte de lait biquotidienne, magasin agricole |

### 1.2 Activités de SMBSA Ezahra

- **Collecte de lait** : collecte biquotidienne (matin & soir) auprès de 1 000 à 1 200 agriculteurs adhérents
- **Magasin agricole** : vente de produits agricoles, nutriments, équipements
- **Gestion des adhérents** : mutuelle, capital social, remboursements

### 1.3 Nature du projet

**Réécriture complète (from scratch)** de la plateforme de gestion existante. Aucun élément du système legacy n'est conservé. L'objectif est de livrer un système moderne, sur mesure, adapté exactement aux processus de SMBSA Ezahra.

> ✅ **Décision** : Réécriture complète — aucune migration de code. Migration des données uniquement.

### 1.4 Utilisateurs du système

| Profil | Nombre | Application |
|--------|--------|-------------|
| Administrateurs système | 1-2 | Backoffice |
| Direction | 2-3 | Backoffice |
| Comptables / Trésorerie | 2-3 | Backoffice |
| Responsables collecte | 2-3 | Backoffice |
| Magasiniers / Commerciaux | 2-3 | Backoffice |
| Responsables RH / Paie | 1-2 | Backoffice |
| **Total utilisateurs internes** | **30 à 50** | Backoffice |
| Agriculteurs adhérents | 1 000 à 1 200 | Portail web (Front Office) |

---

## 2. Parties prenantes

### 2.1 Prestataire — DropWise Technologie

| Rôle | Nom | Contact |
|------|-----|---------|
| Représentant légal / Lead Architect | Fadi Idoudi | fadi.idoudi@outlook.com |
| Représentant légal / Lead Management | Marwen Meftah | marwen.meftah@outlook.com |
| Téléphone | — | 23 593 933 / 92 367 654 |
| Adresse | Nouvelle Cité N°10, 5130 Chorbane, Mahdia | — |

### 2.2 Client — SMBSA Ezahra

| Rôle | Nom | Responsabilité |
|------|-----|----------------|
| Interlocuteur principal (Product Owner) | À désigner | Validation des sprints, chaque vendredi |
| Responsable technique | À désigner | Accès systèmes, serveur |
| Responsable comptable | À désigner | Validation module A6 et migration comptable |
| Responsable collecte | À désigner | Validation module A2 et migration collecte |

---

## 3. Architecture technique

### 3.1 Stack technologique

| Couche | Technologie | Justification |
|--------|-------------|---------------|
| Backend / API | .NET 8 (ASP.NET Core) | Robuste, performant, écosystème riche |
| Frontend Backoffice | Application Desktop (.NET MAUI ou WPF) | Usage intensif interne, performances, offline possible |
| Frontend Front Office | Application Web Statique (React ou Angular) | Légère, accessible smartphone, aucune installation |
| Base de données | PostgreSQL 15+ (100 GB) | Open source, fiable, excellent support JSON |
| Authentification | JWT (JSON Web Tokens) | Standard industriel, sécurisé |
| Communication API | REST (JSON) | Simple, documenté, interopérable |
| Documentation API | OpenAPI / Swagger | Auto-générée depuis le code |
| Versioning | GitHub | Collaboration, CI/CD |

### 3.2 Architecture applicative

```
┌─────────────────────────────────────────────────────────────┐
│                    SERVEUR SMBSA EZAHRA                      │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                    PODMAN / DOCKER                    │   │
│  │                                                       │   │
│  │  ┌─────────────┐  ┌──────────────┐  ┌────────────┐  │   │
│  │  │  API Backend │  │  Backoffice  │  │ Front Office│  │   │
│  │  │  .NET 8      │  │  Desktop App │  │ Static Web  │  │   │
│  │  │  Port: 5000  │  │  Container   │  │ Container   │  │   │
│  │  └──────┬───────┘  └──────┬───────┘  └─────┬──────┘  │   │
│  │         │                 │                 │         │   │
│  │         └─────────────────┴─────────────────┘         │   │
│  │                           │                           │   │
│  └───────────────────────────┼───────────────────────────┘   │
│                              │                               │
│  ┌───────────────────────────▼───────────────────────────┐   │
│  │              PostgreSQL 15+ (local)                    │   │
│  │              100 GB — Données SMBSA Ezahra             │   │
│  └───────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 3.3 Flux de données

```
Utilisateur interne (poste)
        ↓
Application Backoffice Desktop (Container Podman)
        ↓
API REST .NET 8 (Container Podman)
        ↓
PostgreSQL local (sur serveur SMBSA)

Agriculteur (smartphone / navigateur)
        ↓
Static Web App (Container Podman)
        ↓
API REST .NET 8 (même API)
        ↓
PostgreSQL local
```

---

## 4. Infrastructure et déploiement

### 4.1 Déploiement — Décisions finales ✅

> ✅ **Déploiement entièrement local** — aucun cloud, aucun abonnement mensuel.  
> ✅ **Podman** (compatible Docker) pour la conteneurisation sur le serveur SMBSA Ezahra.  
> ✅ **Trois containers** : API Backend + Application Backoffice + Application Front Office.  
> ✅ **PostgreSQL** installé directement sur le serveur (hors container).  
> ✅ **Pas d'environnements de test dédiés** — développement en local, déploiement direct en production.

### 4.2 Prérequis serveur (à charge SMBSA Ezahra)

| Composant | Spécification minimale | Recommandé |
|-----------|----------------------|------------|
| Système d'exploitation | Windows Server 2016 | Windows Server 2022 |
| RAM | 8 GB | 16 GB |
| Stockage | SSD 200 GB | SSD 500 GB |
| Réseau | LAN 100 Mbps | LAN 1 Gbps |
| Podman | Podman 4.x | Dernière version stable |
| PostgreSQL | 15+ | 16 |

### 4.3 Containers Podman

| Container | Image | Port | Description |
|-----------|-------|------|-------------|
| `dropwise-api` | `dropwise/erp-api:latest` | 5000 | API REST .NET 8 |
| `dropwise-backoffice` | `dropwise/erp-backoffice:latest` | 8080 | Application desktop |
| `dropwise-frontoffice` | `dropwise/erp-frontoffice:latest` | 3000 | Static Web App agriculteurs |

### 4.4 Base de données PostgreSQL

```
Hôte       : localhost (serveur SMBSA)
Port       : 5432
Base       : erp_smbsa_ezahra
Utilisateur: erp_user
Taille max : 100 GB
Backup     : pg_dump quotidien (à configurer par SMBSA Ezahra)
```

### 4.5 Sauvegardes (responsabilité SMBSA Ezahra)

```bash
# Commande de sauvegarde recommandée (à planifier chaque nuit)
pg_dump -U erp_user erp_smbsa_ezahra > backup_$(date +%Y%m%d).sql
```

Rétention recommandée : 30 jours minimum.

---

## 5. Modules fonctionnels

> **Convention** : chaque module est identifié par un code (C1, A1..A6). Les fonctionnalités listées sont le périmètre **définitif et contractuel**.

---

### C1 — Sécurité & utilisateurs

**Prix** : 2 400 TND HT  
**Description** : Contrôle d'accès à l'ensemble de la plateforme. Premier module livré — prérequis pour tous les autres.

#### Fonctionnalités

| Fonctionnalité | Description détaillée | Règle métier |
|----------------|----------------------|--------------|
| **Gestion des comptes** | Créer, modifier, désactiver un compte utilisateur. Champs : nom complet, email, téléphone, poste, statut actif/inactif. | Un compte désactivé ne peut plus se connecter mais ses données sont conservées. |
| **Authentification** | Login par email + mot de passe. Session avec token JWT. Durée de session configurable. | Token expiré = redirection vers login automatique. |
| **Récupération de mot de passe** | Envoi d'un lien de réinitialisation par email (token sécurisé, validité 1h). | Le lien n'est utilisable qu'une seule fois. |
| **Gestion des rôles** | Rôles prédéfinis : Administrateur, Comptable, Responsable Collecte, Magasinier, DRH, Direction, Lecture seule. | Un utilisateur ne peut avoir qu'un seul rôle. |
| **Matrice de droits** | Par module et par action : Lecture / Création / Modification / Suppression. Configurable par rôle. | L'administrateur a tous les droits. Les droits sont vérifiés côté API (pas seulement UI). |
| **Verrouillage de compte** | Après N tentatives de connexion échouées (N configurable, défaut = 5), le compte est verrouillé. | Déverrouillage manuel par un administrateur ou par email. |
| **Journal d'audit** | Chaque action (création, modification, suppression, connexion) est enregistrée avec : utilisateur, date/heure, module, action, données avant/après. | Le journal est immuable — aucun utilisateur ne peut le modifier ou supprimer. |
| **Sessions actives** | L'administrateur peut voir les sessions actives et les révoquer à distance. | Révocation = invalidation immédiate du token JWT. |
| **Tableau de bord admin** | Résumé : utilisateurs connectés, dernières actions, comptes verrouillés. | — |

#### Modèle de données (simplifié)

```
Utilisateur
  id, nom, prenom, email, mot_de_passe_hash, 
  role_id, statut (actif/inactif), date_creation

Role
  id, nom, description

Permission
  role_id, module_code, action (lecture/creation/modification/suppression)

JournalAudit
  id, utilisateur_id, module, action, date_heure, 
  donnees_avant (JSON), donnees_apres (JSON), ip_address
```

---

### A1 — Gestion des employés & paie

**Prix** : 3 600 TND HT  
**Description** : Gestion complète des ressources humaines de SMBSA Ezahra, de la fiche employé jusqu'aux bulletins de paie et déclarations CNSS.

#### Fonctionnalités

| Fonctionnalité | Description détaillée | Règle métier |
|----------------|----------------------|--------------|
| **Fiche employé** | Informations complètes : nom, prénom, CIN, date de naissance, adresse, téléphone, poste, département, date d'embauche, photo. | Le CIN est unique dans le système. |
| **Gestion des contrats** | Types supportés : CDI, CDD, CIVP, stagiaire. Champs : date début, date fin (si applicable), salaire de base, primes, avantages. Historique des contrats. | Alerte automatique 30 jours avant l'expiration d'un CDD. |
| **Calcul de la paie** | Calcul mensuel automatique : salaire brut, déductions CNSS (9,18% salarié), retenue à la source IRPP, net à payer. Gestion des primes, heures supplémentaires, absences. | Conforme à la législation tunisienne en vigueur. Taux CNSS patronale : 16,57% + FOPROLOS 1% + TFP 2%. |
| **Bulletins de paie** | Génération automatique au format officiel tunisien. Export PDF. Archivage historique. | Un bulletin ne peut pas être supprimé après émission — uniquement annulé avec motif. |
| **Gestion des congés** | Demande par l'employé, validation par le responsable. Types : congé annuel, maladie, maternité, sans solde. Solde de congés calculé automatiquement. | 1 jour de congé annuel par mois travaillé (base légale tunisienne). |
| **Pointage** | Saisie des présences/absences/retards par jour. Import possible depuis feuille de présence. | Les absences injustifiées sont déduites automatiquement de la paie. |
| **Déclarations CNSS** | Génération automatique des états CNSS mensuels au format officiel. Export PDF et imprimable. | Conforme aux exigences CNSS Tunisie. |
| **Rapport RH mensuel** | Résumé : effectifs par département, masse salariale totale, taux d'absentéisme, congés en cours. Export Excel/PDF. | — |

#### Modèle de données (simplifié)

```
Employe
  id, nom, prenom, cin, date_naissance, adresse,
  poste, departement, date_embauche, statut

Contrat
  id, employe_id, type, date_debut, date_fin,
  salaire_base, primes (JSON), statut

FichePaye
  id, employe_id, mois, annee, salaire_brut,
  cotisation_cnss, irpp, net_a_payer, details (JSON)

Conge
  id, employe_id, type, date_debut, date_fin,
  statut (demande/approuve/refuse), validateur_id

Pointage
  id, employe_id, date, statut (present/absent/retard),
  heures_travaillees, motif_absence
```

---

### A2 — Collecte de lait

**Prix** : 7 500 TND HT  
**Description** : Module central de l'activité de SMBSA Ezahra. Gestion complète du processus de collecte biquotidienne (matin & soir), de l'ouverture de séance au relevé mensuel agriculteur.

> ⚠️ **Module critique** — le plus complexe du projet. La logique métier doit être validée ligne par ligne avec le responsable collecte avant développement.

#### Fonctionnalités

| Fonctionnalité | Description détaillée | Règle métier |
|----------------|----------------------|--------------|
| **Gestion des secteurs** | Création et gestion des secteurs géographiques de collecte. Affectation des collecteurs par secteur. Historique des changements d'affectation. | Un collecteur peut couvrir plusieurs secteurs. Un secteur a toujours au moins 1 collecteur actif. |
| **Fiches collecteurs** | Informations collecteur/transporteur : nom, véhicule, secteur(s), contact, statut. | Lié à la fiche employé si le collecteur est un salarié. |
| **Ouverture de séance** | Ouverture quotidienne de 2 séances : matin (heure configurable) et soir. Chaque séance est associée à un secteur et un collecteur. | Une séance ne peut pas être ouverte si la précédente n'est pas clôturée. |
| **Saisie des pesées** | Pour chaque agriculteur : quantité en kg (précision au gramme), qualité (grasse/normale/allégée ou code qualité configurable), température, heure de saisie, observations. | La saisie est possible uniquement pendant une séance ouverte. Toute correction ultérieure est tracée dans le journal d'audit avec motif obligatoire. |
| **Prix du lait** | Barème de prix configurable par période (date début, date fin, prix/litre). Historique complet des barèmes. Application automatique du bon prix selon la date de séance. | Le prix est verrouillé à la clôture de la séance. Toute modification de prix après clôture nécessite une autorisation administrateur. |
| **Bon de réception** | Génération automatique à la clôture de la séance : récapitulatif des pesées, quantité totale, montant calculé, signature collecteur. Impression PDF. | Numérotation automatique séquentielle et non modifiable. |
| **Rapprochement usine** | Saisie de la quantité réceptionnée à l'usine. Calcul automatique des écarts (pertes) entre collecte et réception. Rapport d'écart. | Alerte si les pertes dépassent un seuil configurable (ex. 2%). |
| **Règlements collecteurs** | Calcul du montant dû à chaque collecteur (commission sur volume collecté ou forfait, configurable). Enregistrement du paiement. | Liaison automatique avec la comptabilité (écriture comptable générée). |
| **Compte courant agriculteur** | Chaque agriculteur a un compte courant : crédit collecte, débit achats magasin, débit avances, solde net. Consultation en temps réel. | Le solde peut être négatif (si avances importantes). |
| **Extrait de compte** | Historique paginé de toutes les transactions d'un agriculteur sur une période. Impression PDF. | Accessible aussi depuis le portail agriculteur (Front Office). |
| **Avances sur collecte** | Saisie d'une avance accordée à un agriculteur. Remboursement automatique par déduction sur les paiements de collecte suivants (montant mensuel configurable). | Une avance ne peut pas dépasser X fois le montant moyen mensuel collecté (X configurable). |
| **Relevé mensuel** | Génération automatique en fin de mois pour chaque agriculteur : synthèse des livraisons, prix appliqués, montants, avances déduites, solde final. Impression individuelle ou en masse (tous les agriculteurs). | Le relevé est définitif après validation par le responsable collecte. |
| **Rapports collecte** | Rapport journalier : par secteur, par collecteur, volumes, montants. Rapport hebdomadaire. Rapport mensuel. Tableau de bord temps réel. Export Excel/PDF. | — |
| **Traçabilité des corrections** | Toute correction d'une pesée saisie nécessite : sélection du motif (parmi liste configurable), saisie d'un commentaire, validation par un superviseur. La valeur originale est conservée dans le journal. | Aucune suppression de pesée n'est possible — uniquement correction avec trace. |
| **Gestion multi-dépôts** | Si SMBSA Ezahra dispose de plusieurs points de collecte/dépôts, le système les gère indépendamment avec consolidation. | 🔄 À confirmer avec le client si pertinent. |

#### Processus complet d'une séance de collecte

```
1. Ouverture séance (responsable collecte)
       ↓
2. Saisie pesées agriculteurs (opérateur saisie)
       ↓
3. Vérification des données saisies
       ↓
4. Clôture séance → génération bon de réception
       ↓
5. Saisie réception usine
       ↓
6. Calcul écart (pertes) → alerte si > seuil
       ↓
7. Fin de mois : validation → génération relevés agriculteurs
       ↓
8. Calcul règlements collecteurs
```

#### Modèle de données (simplifié)

```
Secteur
  id, nom, zone_geographique, statut

Collecteur
  id, employe_id (nullable), nom, vehicule, statut

AffectationCollecteur
  id, collecteur_id, secteur_id, date_debut, date_fin

SeanceCollecte
  id, secteur_id, collecteur_id, date, type (matin/soir),
  statut (ouverte/cloturee), heure_ouverture, heure_cloture

Pesee
  id, seance_id, agriculteur_id, quantite_kg, qualite,
  temperature, heure_saisie, operateur_id, statut

CorrectionPesee
  id, pesee_id, ancienne_valeur, nouvelle_valeur,
  motif, commentaire, validateur_id, date_correction

BaremePrix
  id, date_debut, date_fin, prix_par_litre, type_lait

BonReception
  id, seance_id, numero, quantite_totale, montant_total,
  date_generation, statut

ReceptionUsine
  id, seance_id, quantite_recue, date_heure, observations

CompteAgriculteur
  id, agriculteur_id, solde_actuel, date_maj

MouvementCompte
  id, compte_id, type (credit/debit), montant,
  motif, reference, date

Avance
  id, agriculteur_id, montant, date_octroi,
  montant_rembourse, statut

RelevesMensuel
  id, agriculteur_id, mois, annee, total_kg,
  total_montant, avances_deduites, solde_final, statut
```

---

### A3 — Achats & fournisseurs

**Prix** : 3 000 TND HT  
**Description** : Gestion du processus d'achat de A à Z, avec mise à jour automatique du stock et de la comptabilité.

#### Fonctionnalités

| Fonctionnalité | Description détaillée | Règle métier |
|----------------|----------------------|--------------|
| **Fiche fournisseur** | Informations : raison sociale, MF, adresse, téléphone, email, contact, RIB, conditions de paiement (30/60/90 jours ou comptant), catégorie. | Le matricule fiscal (MF) est unique. |
| **Bons de commande** | Création BC : sélection fournisseur, articles, quantités, prix unitaires négociés, délai de livraison, observations. Numérotation automatique. Envoi par email possible. | Un BC ne peut pas être modifié après envoi au fournisseur — uniquement annulé avec motif. |
| **Suivi des commandes** | Statuts : Brouillon, Envoyé, Partiellement livré, Livré, Annulé. Alerte si délai de livraison dépassé. | — |
| **Bons de réception** | À la réception : rapprochement avec BC, saisie des quantités reçues, contrôle qualité (conforme/non conforme), observations. Livraison partielle possible. | Le stock est mis à jour automatiquement à la validation du BR. |
| **Factures fournisseurs** | Rapprochement automatique facture-BR. Saisie numéro facture fournisseur, date, montant HT, TVA, TTC. Validation comptable. | Une facture ne peut être validée que si elle est rapprochée avec un BR. Écriture comptable générée automatiquement. |
| **Avoirs fournisseurs** | Gestion des retours marchandises et remises accordées. Liaison avec la facture d'origine. | L'avoir est déduit du prochain règlement ou remboursé. |
| **Règlements fournisseurs** | Saisie des paiements : espèces, virement, chèque, traite. Date d'échéance, montant. | Écriture comptable générée automatiquement. |
| **Tableau de bord achats** | Volume mensuel par fournisseur, montant engagé, délais de livraison, alertes retards. | — |

#### Modèle de données (simplifié)

```
Fournisseur
  id, raison_sociale, mf, adresse, telephone, email,
  conditions_paiement, rib, categorie, statut

BonCommande
  id, fournisseur_id, numero, date, statut, delai_livraison,
  total_ht, total_tva, total_ttc, observations

LigneCommande
  id, bon_commande_id, article_id, quantite, prix_unitaire, tva

BonReception
  id, bon_commande_id, numero, date, observations

LigneReception
  id, bon_reception_id, article_id, quantite_recue, conformite

FactureFournisseur
  id, bon_reception_id, fournisseur_id, numero_facture,
  date_facture, montant_ht, tva, montant_ttc, statut

AvoirFournisseur
  id, facture_id, montant, motif, date

ReglementFournisseur
  id, facture_id, mode (especes/virement/cheque/traite),
  montant, date, reference_bancaire
```

---

### A4 — Ventes & facturation

**Prix** : 3 000 TND HT  
**Description** : Circuit de vente complet avec mise à jour automatique du stock et de la comptabilité.

#### Fonctionnalités

| Fonctionnalité | Description détaillée | Règle métier |
|----------------|----------------------|--------------|
| **Fiche client** | Informations : nom/raison sociale, MF (si entreprise), adresse, téléphone, email, conditions de paiement, historique des achats. | Un agriculteur peut être aussi un client (achats au magasin). La fiche est liée au compte agriculteur si applicable. |
| **Bons de livraison** | Création BL : sélection client, articles, quantités, prix de vente, remise, observations. Le stock est contrôlé avant validation (alerte si insuffisant). | Le BL ne peut pas être créé si le stock est insuffisant (sauf override administrateur avec motif). |
| **Factures clients** | Générées automatiquement depuis le BL. Numérotation séquentielle non modifiable. Impression PDF. TVA calculée automatiquement. | La facture est générée à la validation du BL. Écriture comptable générée automatiquement. |
| **Avoirs clients** | Gestion des retours et remises. Liaison avec la facture d'origine. | Le stock est remis à jour automatiquement à la validation d'un avoir. |
| **Suivi des paiements** | Encaissements : espèces, chèque, virement, traite. Historique par client. Solde dû en temps réel. Relances configurables. | Écriture comptable générée automatiquement. |
| **Tarification** | Prix de vente par article. Remises par client ou catégorie de client. Historique des prix. | — |
| **Tableau de bord ventes** | CA par période, par client, par article. Export Excel/PDF. | — |

#### Modèle de données (simplifié)

```
Client
  id, nom, mf (nullable), adresse, telephone,
  email, conditions_paiement, type (particulier/entreprise)

BonLivraison
  id, client_id, numero, date, statut, observations

LigneLivraison
  id, bon_livraison_id, article_id, quantite, prix_unitaire,
  remise, tva, total_ligne

FactureClient
  id, bon_livraison_id, numero, date_facture,
  montant_ht, tva, montant_ttc, statut

AvoirClient
  id, facture_id, montant, motif, date

EncaissementClient
  id, facture_id, mode, montant, date, reference
```

---

### A5 — Gestion des stocks

**Prix** : 3 600 TND HT  
**Description** : Inventaire en temps réel, alimenté automatiquement par les modules achats et ventes.

#### Fonctionnalités

| Fonctionnalité | Description détaillée | Règle métier |
|----------------|----------------------|--------------|
| **Catalogue articles** | Référence, désignation, catégorie, sous-catégorie, unité de mesure, photo, statut actif/inactif. | La référence article est unique et non modifiable après création. |
| **Fiches articles** | Prix d'achat moyen (CMP), prix de vente, TVA applicable, seuil d'alerte stock minimum, stock actuel. | Le prix d'achat CMP est calculé automatiquement à chaque entrée de stock. |
| **Entrées de stock** | Sources : réceptions fournisseurs (depuis A3), retours clients (depuis A4), inventaire initial, ajustements manuels. | Toute entrée génère un mouvement de stock horodaté. |
| **Sorties de stock** | Sources : livraisons clients (depuis A4), retours fournisseurs (depuis A3), pertes/casses (avec motif). | Toute sortie génère un mouvement de stock horodaté. |
| **Valorisation CMP** | Coût Moyen Pondéré recalculé à chaque entrée de stock. | Formule : CMP = (stock_actuel × cmp_actuel + qté_entrée × prix_achat) / (stock_actuel + qté_entrée) |
| **Inventaire physique** | Saisie des comptages réels. Calcul automatique des écarts. Validation et ajustement du stock. | L'inventaire physique génère une écriture comptable d'ajustement. |
| **Alertes stock** | Notification (tableau de bord + email configurable) quand le stock d'un article passe sous le seuil minimum. | Les alertes sont visibles sur le tableau de bord dès connexion. |
| **Rapport de stock** | État du stock à une date donnée : quantités, valorisation, mouvements par période. Export Excel/PDF. | — |
| **Gestion des lots** | Pour les produits avec date de péremption : numéro de lot, date de péremption, alerte avant expiration. | Alerte configurable (ex. 30 jours avant péremption). FIFO recommandé. |

#### Calcul CMP — Exemple

```
Entrée initiale  : 100 kg à 2,00 TND/kg → CMP = 2,00
Nouvelle entrée  : 50 kg à 2,40 TND/kg
Nouveau CMP      = (100×2,00 + 50×2,40) / (100+50)
                 = (200 + 120) / 150
                 = 320 / 150
                 = 2,133 TND/kg
```

#### Modèle de données (simplifié)

```
Article
  id, reference, designation, categorie_id, unite_mesure,
  prix_vente, tva, cmp_actuel, stock_actuel,
  seuil_alerte, statut

Categorie
  id, nom, parent_id (hierarchie)

MouvementStock
  id, article_id, type (entree/sortie), quantite,
  prix_unitaire, source (achat/vente/inventaire/ajustement),
  reference_source, date, utilisateur_id

LotArticle
  id, article_id, numero_lot, date_peremption, quantite_restante
```

---

### A6 — Comptabilité & trésorerie

**Prix** : 5 400 TND HT  
**Description** : Comptabilité complète conforme aux obligations légales tunisiennes. La grande majorité des écritures est générée automatiquement depuis les autres modules.

#### Fonctionnalités

| Fonctionnalité | Description détaillée | Règle métier |
|----------------|----------------------|--------------|
| **Plan comptable** | Plan comptable tunisien (PCG Tunisien) paramétré. Possibilité d'ajouter des comptes auxiliaires. Comptes tiers (clients, fournisseurs, agriculteurs). | Le plan comptable est fourni par SMBSA Ezahra lors du Sprint 0. Les numéros de compte ne sont pas modifiables après utilisation. |
| **Journaux comptables** | Journaux automatiques : Achats (JA), Ventes (JV), Banque (JB), Caisse (JC), Opérations diverses (JOD). Saisie manuelle possible dans JOD. | Chaque pièce comptable est numérotée automatiquement et immuable après clôture mensuelle. |
| **Saisie assistée** | Lors d'une saisie manuelle, suggestion automatique de la contrepartie (compte crédit/débit) selon le compte sélectionné. | L'écriture doit être équilibrée (total débit = total crédit) avant validation. |
| **Lettrage** | Rapprochement des mouvements débiteurs et créditeurs sur les comptes clients et fournisseurs. Automatique sur référence ou manuel. | Une écriture lettrée est considérée comme soldée. |
| **Rapprochement bancaire** | Import des relevés bancaires (CSV/Excel) ou saisie manuelle. Rapprochement ligne par ligne avec les écritures comptables. | Les écarts de rapprochement sont signalés. |
| **États financiers** | Grand livre, Balance générale, Bilan (Actif/Passif), Compte de résultat. Filtres par période. Export PDF/Excel. | Conformes aux normes comptables tunisiennes. |
| **Déclaration TVA** | Calcul automatique de la TVA collectée et TVA déductible. États mensuels/trimestriels au format officiel. | TVA applicable : 7%, 13%, 19% selon les articles. Conforme aux règles fiscales tunisiennes. |
| **Retenue à la source** | Calcul automatique de la retenue à la source sur les factures fournisseurs concernées. Génération des certificats officiels. | Taux de retenue selon le type de prestation (configurable). |
| **Règlements** | Modes de paiement : espèces, virement bancaire, chèque, traite (effet de commerce). Gestion des échéances et des impayés. | La traite génère une écriture dans le journal Effets à payer/recevoir. |
| **Gestion des échéances** | Tableau de bord : encours clients à 30/60/90 jours. Relances configurables (email/alerte). | Alerte automatique à J-7 et J-0 de l'échéance. |
| **Clôture mensuelle** | Validation et verrouillage des écritures du mois. Les écritures clôturées ne peuvent plus être modifiées. | La clôture mensuelle est irréversible (sauf rouverture par administrateur avec motif). |
| **Clôture annuelle** | Report des soldes, génération des écritures de bilan d'ouverture. | — |
| **Dépenses entreprise** | Saisie des dépenses générales : frais généraux, notes de frais, petites dépenses. | Liaison avec la comptabilité (écriture JOD générée). |

#### Écritures automatiques générées par module

| Source | Journal | Débit | Crédit |
|--------|---------|-------|--------|
| Réception fournisseur (A3) | JA | Compte stock / charge | Compte fournisseur |
| Facture fournisseur (A3) | JA | Compte charge + TVA déductible | Compte fournisseur |
| Règlement fournisseur (A3) | JB ou JC | Compte fournisseur | Banque / Caisse |
| Livraison client (A4) | JV | Compte client | Compte vente + TVA collectée |
| Encaissement client (A4) | JB ou JC | Banque / Caisse | Compte client |
| Règlement collecteur (A2) | JC ou JB | Compte charges collecte | Banque / Caisse |
| Paie employés (A1) | JOD | Compte charges salariales | Banque / Compte CNSS |
| Inventaire (A5) | JOD | ou compte stock | Compte variation stocks |

---

### Migration des données

**Prix** : 4 500 TND HT  
**Description** : Transfert complet et sécurisé de toutes les données historiques de l'ancien système vers la nouvelle plateforme.

#### Phases de migration

| Phase | Description | Responsable |
|-------|-------------|-------------|
| **Analyse** | Cartographie complète de la base de données existante : tables, colonnes, volumes de données, qualité des données. | DropWise |
| **Nettoyage** | Identification et correction des doublons, données incomplètes, incohérences. | DropWise + SMBSA Ezahra |
| **Développement scripts** | Scripts de transformation et migration (Python ou SQL) pour chaque entité. | DropWise |
| **Test migration** | Migration sur environnement de test. Validation par les responsables SMBSA Ezahra. | DropWise + SMBSA Ezahra |
| **Migration définitive** | Migration en production. Vérification intégrité des données. | DropWise |
| **Rapport** | Document récapitulatif : volumes migrés, anomalies rencontrées, corrections apportées. Signé par les deux parties. | DropWise |

#### Périmètre de la migration

| Entité | Volume estimé | Priorité |
|--------|--------------|---------|
| Employés | ~50 fiches | Élevée |
| Fournisseurs | ~100 fiches | Élevée |
| Clients | ~200 fiches | Élevée |
| Articles / Produits | ~500 références | Élevée |
| Agriculteurs | ~1 200 fiches | Élevée |
| Historique collecte | 2+ années | Élevée |
| Historique comptable | Exercice en cours + N-1 | Élevée |
| Stock à date | Inventaire courant | Élevée |

---

### Portail web agriculteurs

**Description** : Application web statique, accessible depuis smartphone ou navigateur, hébergée sur le serveur local de SMBSA Ezahra. **Inclus sans surcoût** dans le module A2.

#### Fonctionnalités

| Fonctionnalité | Description |
|----------------|-------------|
| **Authentification** | Login sécurisé par identifiant + mot de passe. Récupération par email ou via administration. |
| **Tableau de bord** | Solde du compte courant, quantité livrée ce mois, dernière livraison. |
| **Historique collecte** | Liste paginée des pesées : date, séance, quantité, qualité, prix, montant. Filtres par mois/année. |
| **Relevé mensuel** | Téléchargement du relevé mensuel en PDF (généré par le backoffice). |
| **Consultation factures** | Historique des achats au magasin. |
| **Interface** | Responsive — optimisé smartphone. Aucune installation requise. |

---

## 6. Périmètre ajusté & hors périmètre

### 6.1 Fonctionnalités incluses (ajouts post-CDC initial)

Les fonctionnalités suivantes ont été intégrées au périmètre après validation client :

| Module | Décision | Rattachement |
|--------|----------|--------------|
| **Gestion des agriculteurs** (fiche complète, compte courant, historique collecte par agriculteur, achats nutriments, correction quantité) | ✅ Inclus dans A2 | Module A2 — Collecte de lait |
| **Services Zahra basiques** (enregistrement des interventions : consultations, vaccinations, inséminations, traitements, analyses) | ✅ Inclus dans A2 — suivi simple, pas de logiciel vétérinaire dédié | Module A2 — Collecte de lait |
| **Rapports collecte par secteur** (diagrammes Chart.js : barres matin/soir, doughnut répartition, courbe évolution 7 jours) | ✅ Inclus dans A2 | Module A2 — Collecte de lait |
| **Correction de pesée avec motif** (modal d'audit : quantité actuelle → nouvelle quantité, motif obligatoire, tracé journal) | ✅ Inclus dans A2 — règle R1 | Module A2 — Collecte de lait |
| **Interface web responsive** (ERP accessible smartphone et tablette, menu hamburger mobile) | ✅ Inclus sans surcoût | Transverse |

> ✅ **Décision** : Les services vétérinaires sont inclus sous la forme d'un **enregistrement d'interventions simple** (type, technicien, coût, statut), rattaché à la fiche agriculteur. Il ne s'agit **pas** d'un logiciel vétérinaire dédié (dossiers cliniques, ordonnances, pharmacie) — cela reste hors périmètre.

---

### 6.2 Fonctionnalités hors périmètre

Les fonctionnalités suivantes sont explicitement exclues du présent projet :

| Module | Raison de l'exclusion |
|--------|-----------------------|
| Gestion de la production usine | Hors périmètre décidé |
| Capteurs IoT (supervision silos) | Géré séparément par DropWise — devis séparé |
| Parc véhicules et kiosque carburant | Hors périmètre décidé |
| **Logiciel vétérinaire dédié** (dossiers cliniques, ordonnances, pharmacie animale) | Hors périmètre — enregistrement simple inclus dans A2 |
| Site vitrine public | Hors périmètre décidé |
| Notifications SMS/email automatiques | Hors périmètre décidé |
| Application mobile native (iOS / Android) | Application web responsive suffisante |
| Hébergement cloud | Déploiement local uniquement |
| **Module mutuelle avancé** (capital social, parts sociales, remboursements mutualistes) | Hors périmètre — gestion compte courant simple incluse dans A2 |
| Gestion des votes / assemblées générales | Hors périmètre |
| Intelligence artificielle / prédictions | Hors périmètre |

> 🔄 Ces modules peuvent faire l'objet d'une Phase 2 — à discuter après GO-LIVE.

---

## 7. Exigences non fonctionnelles

### 7.1 Performance

| Critère | Exigence |
|---------|---------|
| Temps de réponse API | < 500 ms pour 95% des requêtes |
| Charge simultanée backoffice | 50 utilisateurs simultanés |
| Charge simultanée portail | 200 agriculteurs simultanés |
| Disponibilité | 99% pendant les heures ouvrables |

### 7.2 Sécurité

| Critère | Exigence |
|---------|---------|
| Authentification | JWT avec expiration configurable |
| Mots de passe | Hashés avec bcrypt (minimum 12 rounds) |
| Communications | HTTPS obligatoire (certificat auto-signé acceptable en réseau local) |
| Droits | Vérification côté API pour chaque endpoint (pas seulement UI) |
| Journal d'audit | Immuable, horodaté, complet |
| Données sensibles | Chiffrement des données sensibles au repos (paie, CNSS) |

### 7.3 Qualité du code

| Critère | Exigence |
|---------|---------|
| Tests unitaires | Couverture minimum 70% des services métier |
| Documentation API | OpenAPI/Swagger auto-générée |
| Versioning | Git avec branches Feature/Develop/Main |
| Code review | Chaque PR reviewée avant merge |
| Conventions | Nommage anglais pour le code, commentaires en français |

### 7.4 Ergonomie

| Critère | Exigence |
|---------|---------|
| Langue | Interface en arabe ou français (configurable par utilisateur) |
| Impressions | Tous les documents imprimables : A4, format officiel tunisien |
| Export | Excel (.xlsx) et PDF pour tous les rapports |
| Accessibilité | Utilisable sur écran 1366×768 minimum |

---

## 8. Règles métier critiques

Ces règles sont non négociables et doivent être implémentées exactement comme décrit.

### R1 — Immutabilité des pesées

> Une pesée validée ne peut jamais être supprimée. Elle peut uniquement être corrigée via le processus de correction (motif obligatoire + validation superviseur + trace dans journal d'audit).

### R2 — Prix du lait verrouillé à la clôture

> Le prix du lait applicable à une séance est verrouillé définitivement à la clôture de la séance. Toute modification de barème n'affecte que les séances futures.

### R3 — Numérotation séquentielle

> Les numéros de bons (BC, BR, factures, bons de livraison, bons de réception collecte) sont séquentiels, automatiques et non modifiables. Un numéro utilisé ne peut jamais être réattribué.

### R4 — Équilibre comptable

> Toute écriture comptable doit avoir Total Débit = Total Crédit. Le système refuse la validation d'une écriture déséquilibrée.

### R5 — Clôture comptable

> Une période comptable clôturée est verrouillée. Aucune écriture ne peut être ajoutée ou modifiée dans une période clôturée, sauf rouverture explicite avec autorisation administrateur.

### R6 — Stock négatif

> Par défaut, le système interdit la création d'un BL qui mettrait un stock en négatif. Un override est possible pour les administrateurs avec saisie obligatoire d'un motif.

### R7 — Traçabilité complète

> Toute action sur une donnée (création, modification, suppression logique) génère une entrée dans le journal d'audit avec : utilisateur, date/heure, module, action, valeur avant, valeur après.

### R8 — TVA conforme

> Les calculs de TVA respectent les taux tunisiens en vigueur : 7%, 13%, 19%. Les taux sont configurables par article dans le catalogue.

---

## 9. Données de référence SMBSA Ezahra

> 🔄 Ces données seront complétées et validées lors du Sprint 0.

### 9.1 Secteurs de collecte

> À compléter avec SMBSA Ezahra — nombre de secteurs, noms, zones géographiques.

### 9.2 Plan comptable

> Le plan comptable exact utilisé par SMBSA Ezahra doit être fourni par le responsable comptable lors du Sprint 0.

### 9.3 Barèmes de prix du lait

> Historique des barèmes à récupérer depuis l'ancien système.

### 9.4 Paramétrages fiscaux

| Paramètre | Valeur |
|-----------|--------|
| TVA standard | 19% |
| TVA réduite 1 | 13% |
| TVA réduite 2 | 7% |
| CNSS salarié | 9,18% |
| CNSS patronal | 16,57% |
| FOPROLOS | 1% |
| TFP | 2% |

---

## 10. Planning

### 10.1 Vue d'ensemble

| Période | Phase | Livrable |
|---------|-------|---------|
| Juin 2026 — S1-2 | Sprint 0 — Cadrage, audit, config serveur | Plan migration validé |
| Juin — Juillet 2026 | Sprints 1-3 — C1, A1, A2 | Sécurité, Employés, Collecte |
| Août 2026 | Sprints 4-5 — A3, A4, A5 | Achats, Ventes, Stocks |
| Septembre 2026 | Sprints 6-7 — A6 | Comptabilité complète |
| Octobre 2026 | Sprint 8 — Migration | Données migrées et validées |
| Novembre 2026 | Sprints 9-10 — Tests, recette, formation | PV de recette signé |
| **Décembre 2026** | **GO-LIVE** | **Système opérationnel** |

### 10.2 Méthode de travail

- **Méthodologie** : Scrum — sprints de 2 semaines
- **Sprint Review** : Démonstration au client chaque fin de sprint (vendredi)
- **Rapport d'avancement** : Envoyé chaque vendredi par email
- **Validation client** : Retour sous 3 jours ouvrés après chaque démonstration
- **Critères de Done** : Code reviewé + tests passants + déployé + validé client

### 10.3 Risques identifiés

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|-----------|
| Données existantes de mauvaise qualité | Moyenne | Élevé | Audit Sprint 0 + plan de nettoyage |
| Disponibilité du Product Owner | Faible | Élevé | Engagement contractuel vendredi |
| Serveur non prêt au démarrage | Faible | Moyen | Checklist prérequis Sprint 0 |
| Complexité module A2 sous-estimée | Faible | Moyen | 25 J/H alloués + priorité Sprint 3 |
| Délai validation comptabilité (A6) | Moyenne | Moyen | Implication responsable comptable dès Sprint 6 |

---

## 11. Chiffres et contractuel

### 11.1 Devis

| Module | Prix HT (TND) |
|--------|--------------|
| C1 — Sécurité & utilisateurs | 2 400 |
| A1 — Gestion des employés & paie | 3 600 |
| A2 — Collecte de lait | 7 500 |
| A3 — Achats & fournisseurs | 3 000 |
| A4 — Ventes & facturation | 3 000 |
| A5 — Gestion des stocks | 3 600 |
| A6 — Comptabilité & trésorerie | 5 400 |
| Migration des données | 4 500 |
| Paramétrage & formation | 2 400 |
| 🌾 Service IoT — Intégration capteurs silos | 8 000 |
| **TOTAL HT** | **43 400** |
| TVA 19% | 8 246 |
| **TOTAL TTC** | **51 646** |

### 11.2 Échéancier

| Étape | Condition | % | Montant HT |
|-------|-----------|---|-----------|
| 1 | Signature du contrat | 30% | 13 020 TND |
| 2 | Livraison ERP + installation IoT validée | 40% | 17 360 TND |
| 3 | GO-LIVE + validation silos | 30% | 13 020 TND |

### 11.3 Maintenance annuelle

| Prestation | Forfait TTC/an |
|-----------|---------------|
| Corrections bugs, patches sécurité, petites évolutions, support téléphonique, mises à jour | **6 500 TND** |

- **Garantie** : 1 an gratuite après GO-LIVE (bugs bloquants)
- **Début contrat maintenance** : Janvier 2028 (après garantie)

### 11.4 Matériel IoT (à charge SMBSA Ezahra)

Estimation : **~10 500 DT HT** — voir liste matériel détaillée dans le document annexe.

### 11.5 Conditions

- Délai client décale le planning contractuellement
- Propriété intellectuelle : DropWise conserve le code source
- SMBSA Ezahra reçoit une licence d'utilisation perpétuelle
- Code escrow notarié (libéré si DropWise cesse son activité)

---

## 12. Journal des décisions

> Ce journal trace toutes les décisions importantes prises au cours du projet. À compléter au fur et à mesure.

| Date | Décision | Contexte | Statut |
|------|----------|---------|--------|
| Mai 2026 | Réécriture complète from scratch | Le client veut rompre avec le legacy | ✅ Confirmé |
| Mai 2026 | Déploiement local (IIS → Podman + PostgreSQL) | Zéro cloud, zéro abonnement mensuel | ✅ Confirmé |
| Mai 2026 | Périmètre réduit (C1 + A1-A6 + migration) | Client veut aller vite — Phase 1 uniquement | ✅ Confirmé |
| Mai 2026 | Portail agriculteurs inclus sans surcoût | Web statique léger, valeur ajoutée client | ✅ Confirmé |
| Mai 2026 | GO-LIVE avant 31 décembre 2026 | Engagement contractuel | ✅ Confirmé |
| Mai 2026 | Matériel IoT à charge SMBSA Ezahra | DropWise facture main d'œuvre uniquement | ✅ Confirmé |
| Mai 2026 | TJM 300 TND HT | Positionnement compétitif vs DUX (~49 670 TND) | ✅ Confirmé |
| Mai 2026 | Maintenance 6 500 TND TTC/an | Après garantie 1 an | ✅ Confirmé |
| 🔄 À confirmer | Plan comptable exact | À fournir par SMBSA Ezahra au Sprint 0 | 🔄 Ouvert |
| 🔄 À confirmer | Gestion multi-dépôts collecte | Pertinence à valider avec responsable collecte | 🔄 Ouvert |
| 🔄 À confirmer | Langue de l'interface (FR/AR/bilingue) | À décider avec le client | 🔄 Ouvert |

---

*Document maintenu par DropWise Technologie — drop.wise@outlook.com*  
*Dernière mise à jour : Mai 2026 — Version 1.0*

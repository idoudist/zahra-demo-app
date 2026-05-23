// === MOCK DATA — SMBSA Ezahra ===

const MOCK = {

  user: { name: 'Administrateur', initials: 'AD', role: 'Directeur' },

  collecteurs: [
    { id: 1, nom: 'Khediri Moncef',    secteur: 'Chorbane Nord',  agriculteurs: 14, actif: true },
    { id: 2, nom: 'Trabelsi Hassen',   secteur: 'Chorbane Sud',   agriculteurs: 18, actif: true },
    { id: 3, nom: 'Ben Salem Ridha',   secteur: 'Melloulèche',    agriculteurs: 11, actif: true },
    { id: 4, nom: 'Chaabane Lotfi',    secteur: 'Sidi Alouane',   agriculteurs: 9,  actif: true },
    { id: 5, nom: 'Jbeli Kamel',       secteur: 'Bou Merdes',     agriculteurs: 13, actif: false },
  ],

  seances: [
    { date: '22/05/2026', collecteur: 'Khediri Moncef',    secteur: 'Chorbane Nord', periode: 'Matin', qte: 1842, prix: 1.35, montant: 2486.7,  statut: 'validé' },
    { date: '22/05/2026', collecteur: 'Khediri Moncef',    secteur: 'Chorbane Nord', periode: 'Soir',  qte: 1720, prix: 1.35, montant: 2322.0,  statut: 'validé' },
    { date: '22/05/2026', collecteur: 'Trabelsi Hassen',   secteur: 'Chorbane Sud',  periode: 'Matin', qte: 2105, prix: 1.35, montant: 2841.75, statut: 'validé' },
    { date: '22/05/2026', collecteur: 'Trabelsi Hassen',   secteur: 'Chorbane Sud',  periode: 'Soir',  qte: 1990, prix: 1.35, montant: 2686.5,  statut: 'validé' },
    { date: '22/05/2026', collecteur: 'Ben Salem Ridha',   secteur: 'Melloulèche',   periode: 'Matin', qte: 1450, prix: 1.35, montant: 1957.5,  statut: 'validé' },
    { date: '22/05/2026', collecteur: 'Ben Salem Ridha',   secteur: 'Melloulèche',   periode: 'Soir',  qte: 1320, prix: 1.35, montant: 1782.0,  statut: 'en attente' },
    { date: '22/05/2026', collecteur: 'Chaabane Lotfi',    secteur: 'Sidi Alouane',  periode: 'Matin', qte: 1100, prix: 1.35, montant: 1485.0,  statut: 'validé' },
    { date: '21/05/2026', collecteur: 'Khediri Moncef',    secteur: 'Chorbane Nord', periode: 'Matin', qte: 1810, prix: 1.35, montant: 2443.5,  statut: 'validé' },
    { date: '21/05/2026', collecteur: 'Trabelsi Hassen',   secteur: 'Chorbane Sud',  periode: 'Matin', qte: 2080, prix: 1.35, montant: 2808.0,  statut: 'validé' },
    { date: '21/05/2026', collecteur: 'Chaabane Lotfi',    secteur: 'Sidi Alouane',  periode: 'Soir',  qte: 1050, prix: 1.35, montant: 1417.5,  statut: 'validé' },
  ],

  agriculteur: {
    nom: 'Ben Ali Ahmed',
    code: 'AGR-0042',
    secteur: 'Chorbane Nord',
    collecteur: 'Khediri Moncef',
    solde: 4256.30,
    avance: 500.00,
    livraisons: [
      { date: '22/05/2026', periode: 'Matin', qte: 132, prix: 1.35, montant: 178.20 },
      { date: '22/05/2026', periode: 'Soir',  qte: 124, prix: 1.35, montant: 167.40 },
      { date: '21/05/2026', periode: 'Matin', qte: 128, prix: 1.35, montant: 172.80 },
      { date: '21/05/2026', periode: 'Soir',  qte: 118, prix: 1.35, montant: 159.30 },
      { date: '20/05/2026', periode: 'Matin', qte: 140, prix: 1.35, montant: 189.00 },
      { date: '20/05/2026', periode: 'Soir',  qte: 130, prix: 1.35, montant: 175.50 },
      { date: '19/05/2026', periode: 'Matin', qte: 125, prix: 1.35, montant: 168.75 },
      { date: '19/05/2026', periode: 'Soir',  qte: 115, prix: 1.35, montant: 155.25 },
    ]
  },

  employes: [
    { id: 1, nom: 'Khediri Moncef',   poste: 'Collecteur',          dept: 'Collecte',     salaire: 950,  contrat: 'CDI',   statut: 'actif' },
    { id: 2, nom: 'Trabelsi Hassen',  poste: 'Collecteur',          dept: 'Collecte',     salaire: 950,  contrat: 'CDI',   statut: 'actif' },
    { id: 3, nom: 'Ben Salem Ridha',  poste: 'Collecteur',          dept: 'Collecte',     salaire: 950,  contrat: 'CDI',   statut: 'actif' },
    { id: 4, nom: 'Chaabane Lotfi',   poste: 'Collecteur',          dept: 'Collecte',     salaire: 950,  contrat: 'CDI',   statut: 'actif' },
    { id: 5, nom: 'Jbeli Kamel',      poste: 'Collecteur',          dept: 'Collecte',     salaire: 950,  contrat: 'CDI',   statut: 'congé' },
    { id: 6, nom: 'Hamdi Sonia',      poste: 'Comptable',           dept: 'Comptabilité', salaire: 1400, contrat: 'CDI',   statut: 'actif' },
    { id: 7, nom: 'Baccar Nabil',     poste: 'Responsable Stocks',  dept: 'Magasin',      salaire: 1150, contrat: 'CDI',   statut: 'actif' },
    { id: 8, nom: 'Zaier Ines',       poste: 'Assistante Admin',    dept: 'Direction',    salaire: 1050, contrat: 'CDD',   statut: 'actif' },
    { id: 9, nom: 'Mnafekh Ali',      poste: 'Ouvrier',             dept: 'Production',   salaire: 780,  contrat: 'CDD',   statut: 'actif' },
    { id:10, nom: 'Gharbi Walid',     poste: 'Technicien IoT',      dept: 'Technique',    salaire: 1300, contrat: 'CDI',   statut: 'actif' },
  ],

  fournisseurs: [
    { id: 1, nom: 'Agri-Intrants SARL',    categorie: 'Aliments bétail',   ville: 'Sfax',   tel: '74 230 xxx', solde: 8450 },
    { id: 2, nom: 'Medis Veto',            categorie: 'Produits vétérin.', ville: 'Tunis',  tel: '71 850 xxx', solde: 1200 },
    { id: 3, nom: 'Packaging Pro',         categorie: 'Emballages',        ville: 'Sousse', tel: '73 410 xxx', solde: 3600 },
    { id: 4, nom: 'El Fouladh Acier',      categorie: 'Matériel',          ville: 'Tunis',  tel: '71 980 xxx', solde: 0    },
    { id: 5, nom: 'STEG — Électricité',   categorie: 'Services',          ville: 'Mahdia', tel: '73 690 xxx', solde: 680  },
  ],

  bonsCommande: [
    { ref: 'BC-2026-041', fournisseur: 'Agri-Intrants SARL',  date: '20/05/2026', montant: 12400, statut: 'reçu' },
    { ref: 'BC-2026-040', fournisseur: 'Medis Veto',          date: '18/05/2026', montant: 1200,  statut: 'partiel' },
    { ref: 'BC-2026-039', fournisseur: 'Packaging Pro',       date: '15/05/2026', montant: 3600,  statut: 'en cours' },
    { ref: 'BC-2026-038', fournisseur: 'STEG — Électricité', date: '12/05/2026', montant: 680,   statut: 'reçu' },
    { ref: 'BC-2026-037', fournisseur: 'Agri-Intrants SARL',  date: '08/05/2026', montant: 9800,  statut: 'reçu' },
  ],

  clients: [
    { id: 1, nom: 'Centrale Laitière Mahdia', categorie: 'Laiterie',     ville: 'Mahdia', solde: 0,     credit: 0 },
    { id: 2, nom: 'Ben Ali Ahmed',             categorie: 'Agriculteur',  ville: 'Chorbane', solde: 350, credit: 350 },
    { id: 3, nom: 'Coopérative Melloulèche',  categorie: 'Coopérative', ville: 'Melloulèche', solde: 0, credit: 0 },
    { id: 4, nom: 'Trabelsi Ferme',           categorie: 'Agriculteur',  ville: 'Chorbane', solde: 200, credit: 200 },
  ],

  factures: [
    { ref: 'FAC-2026-089', client: 'Centrale Laitière Mahdia', date: '22/05/2026', montant: 18520, statut: 'payée' },
    { ref: 'FAC-2026-088', client: 'Centrale Laitière Mahdia', date: '21/05/2026', montant: 17840, statut: 'payée' },
    { ref: 'FAC-2026-087', client: 'Ben Ali Ahmed',            date: '20/05/2026', montant: 350,   statut: 'impayée' },
    { ref: 'FAC-2026-086', client: 'Centrale Laitière Mahdia', date: '20/05/2026', montant: 18100, statut: 'payée' },
    { ref: 'FAC-2026-085', client: 'Trabelsi Ferme',          date: '18/05/2026', montant: 200,   statut: 'impayée' },
    { ref: 'FAC-2026-084', client: 'Coopérative Melloulèche', date: '15/05/2026', montant: 5600,  statut: 'payée' },
  ],

  stocks: [
    { ref: 'PRD-001', nom: 'Orge',              unite: 'kg',  qte: 18500, min: 5000,  prix: 0.85,  valeur: 15725 },
    { ref: 'PRD-002', nom: 'Son de blé',         unite: 'kg',  qte: 12000, min: 3000,  prix: 0.45,  valeur: 5400  },
    { ref: 'PRD-003', nom: 'Concentré vaches',   unite: 'kg',  qte: 8400,  min: 2000,  prix: 1.20,  valeur: 10080 },
    { ref: 'PRD-004', nom: 'Foin',               unite: 'bottes', qte: 420, min: 100,  prix: 4.50,  valeur: 1890  },
    { ref: 'PRD-005', nom: 'Médicaments',        unite: 'unité', qte: 45,  min: 20,    prix: 15.00, valeur: 675   },
    { ref: 'PRD-006', nom: 'Bidons 10L',         unite: 'unité', qte: 8,   min: 50,    prix: 12.00, valeur: 96    },
    { ref: 'PRD-007', nom: 'Produit désinfect.', unite: 'litre', qte: 180, min: 50,    prix: 3.80,  valeur: 684   },
    { ref: 'PRD-008', nom: 'Semences maïs',      unite: 'kg',  qte: 2200,  min: 500,   prix: 2.10,  valeur: 4620  },
  ],

  mouvements: [
    { date: '22/05/2026', ref: 'EN-0089', type: 'Entrée',  article: 'Orge',            qte: 5000,  fournisseur: 'Agri-Intrants SARL' },
    { date: '22/05/2026', ref: 'SO-0124', type: 'Sortie',  article: 'Concentré vaches', qte: 200,  fournisseur: 'Consommation' },
    { date: '21/05/2026', ref: 'SO-0123', type: 'Sortie',  article: 'Son de blé',       qte: 300,  fournisseur: 'Consommation' },
    { date: '21/05/2026', ref: 'EN-0088', type: 'Entrée',  article: 'Médicaments',      qte: 15,   fournisseur: 'Medis Veto' },
    { date: '20/05/2026', ref: 'SO-0122', type: 'Sortie',  article: 'Orge',             qte: 800,  fournisseur: 'Consommation' },
  ],

  journal: [
    { date: '22/05/2026', ref: 'VTE-089', libelle: 'Vente lait — CLM',        debit: 18520, credit: 0,     compte: '411' },
    { date: '22/05/2026', ref: 'VTE-089', libelle: 'Produits ventes lait',     debit: 0,     credit: 18520, compte: '701' },
    { date: '21/05/2026', ref: 'ACH-041', libelle: 'Achat orge — Agri-Int.', debit: 12400, credit: 0,     compte: '601' },
    { date: '21/05/2026', ref: 'ACH-041', libelle: 'Fournisseur Agri-Int.',   debit: 0,     credit: 12400, compte: '401' },
    { date: '20/05/2026', ref: 'PAI-033', libelle: 'Règlement collecteurs',   debit: 0,     credit: 9420,  compte: '512' },
    { date: '20/05/2026', ref: 'PAI-033', libelle: 'Charges collecte',        debit: 9420,  credit: 0,     compte: '641' },
    { date: '19/05/2026', ref: 'VTE-088', libelle: 'Vente lait — CLM',        debit: 17840, credit: 0,     compte: '411' },
    { date: '19/05/2026', ref: 'VTE-088', libelle: 'Produits ventes lait',     debit: 0,     credit: 17840, compte: '701' },
  ],

  silos: [
    {
      id: 1, nom: 'Silo A — Orge', culture: 'Orge',
      niveau: 72, volume: 648, masse: 518,
      capacite: 900, capaciteMasse: 720,
      statut: 'normal',
      temperature: 21.5, humidite: 12.1,
      derniereMesure: '22/05/2026 08:42',
      historique: [68, 70, 71, 73, 72, 71, 72]
    },
    {
      id: 2, nom: 'Silo B — Blé dur', culture: 'Blé dur',
      niveau: 38, volume: 304, masse: 243,
      capacite: 800, capaciteMasse: 640,
      statut: 'bas',
      temperature: 22.0, humidite: 11.8,
      derniereMesure: '22/05/2026 08:43',
      historique: [58, 52, 48, 44, 40, 39, 38]
    },
    {
      id: 3, nom: 'Silo C — Maïs', culture: 'Maïs',
      niveau: 91, volume: 783, masse: 595,
      capacite: 860, capaciteMasse: 655,
      statut: 'plein',
      temperature: 21.8, humidite: 12.5,
      derniereMesure: '22/05/2026 08:44',
      historique: [85, 87, 88, 90, 91, 91, 91]
    },
  ],

  utilisateurs: [
    { id: 1, nom: 'Hamdi Sonia',    login: 'sonia.h',   role: 'Comptable',       dernierConnex: '22/05/2026 07:55', statut: 'actif' },
    { id: 2, nom: 'Khediri Moncef', login: 'moncef.k',  role: 'Collecteur',      dernierConnex: '22/05/2026 06:10', statut: 'actif' },
    { id: 3, nom: 'Baccar Nabil',   login: 'nabil.b',   role: 'Magasinier',      dernierConnex: '21/05/2026 16:30', statut: 'actif' },
    { id: 4, nom: 'Zaier Ines',     login: 'ines.z',    role: 'Assistante',      dernierConnex: '21/05/2026 15:00', statut: 'actif' },
    { id: 5, nom: 'Admin Système',  login: 'admin',     role: 'Administrateur',  dernierConnex: '22/05/2026 08:00', statut: 'actif' },
  ],

  audit: [
    { date: '22/05/2026 08:42', utilisateur: 'moncef.k',  action: 'Saisie séance Matin',    module: 'Collecte' },
    { date: '22/05/2026 08:30', utilisateur: 'admin',      action: 'Connexion réussie',       module: 'Système' },
    { date: '22/05/2026 07:55', utilisateur: 'sonia.h',    action: 'Validation écriture',     module: 'Comptabilité' },
    { date: '22/05/2026 07:52', utilisateur: 'sonia.h',    action: 'Connexion réussie',       module: 'Système' },
    { date: '21/05/2026 16:30', utilisateur: 'nabil.b',    action: 'Entrée stock #EN-0088',  module: 'Stocks' },
    { date: '21/05/2026 14:00', utilisateur: 'sonia.h',    action: 'Facture FAC-2026-088',   module: 'Ventes' },
  ],

  kpis: {
    collecteJour:     11527,
    collecteMois:     248600,
    caJour:           15562,
    caMois:           312500,
    stockAlerte:      2,
    employesActifs:   9,
    silosActifs:      3,
    soldeCompta:      84200
  }
};

// Shared helpers for the demo

const DEMO_ROLES = [
  { key:'admin',       name:'Admin Système',   initials:'AS', role:'Administrateur',  color:'#e74c3c', path:null },
  { key:'comptable',   name:'Hamdi Sonia',     initials:'HS', role:'Comptable',       color:'#1a7fa3', path:'comptabilite.html' },
  { key:'collecteur',  name:'Khediri Moncef',  initials:'KM', role:'Collecteur',      color:'#27ae60', path:'collecte.html' },
  { key:'magasin',     name:'Baccar Nabil',    initials:'BN', role:'Magasinier',      color:'#f39c12', path:'stocks.html' },
  { key:'agriculteur', name:'Ben Ali Ahmed',   initials:'BA', role:'Agriculteur',     color:'#16a085', path:'../portail/index.html' },
  { key:'iot',         name:'Gharbi Walid',    initials:'GW', role:'Superviseur IoT', color:'#8e44ad', path:'../iot/index.html' },
];

function getCurrentRole() {
  const stored = localStorage.getItem('demo_role');
  if (stored) { const r = DEMO_ROLES.find(x => x.key === stored); if (r) return r; }
  return DEMO_ROLES[0];
}

function buildSidebar(active) {
  const items = [
    { href:'../erp/dashboard.html',      icon:'ri-dashboard-line',      label:'Tableau de bord',       key:'dashboard' },
    { href:'../erp/collecte.html',       icon:'ri-drop-line',           label:'Collecte de lait',      key:'collecte' },
    { href:'../erp/agriculteurs.html',   icon:'ri-plant-line',          label:'Gestion agriculteurs',  key:'agriculteurs' },
    { href:'../erp/employes.html',       icon:'ri-team-line',           label:'Employés & Paie',       key:'employes' },
    { href:'../erp/achats.html',         icon:'ri-shopping-cart-line',  label:'Achats & Fournis.',     key:'achats' },
    { href:'../erp/ventes.html',         icon:'ri-file-list-3-line',    label:'Ventes & Facturation',  key:'ventes' },
    { href:'../erp/stocks.html',         icon:'ri-archive-line',        label:'Gestion des stocks',    key:'stocks', badge:'2' },
    { href:'../erp/comptabilite.html',   icon:'ri-bank-line',           label:'Comptabilité',          key:'comptabilite' },
    { href:'../erp/utilisateurs.html',   icon:'ri-shield-user-line',    label:'Utilisateurs',          key:'utilisateurs' },
  ];
  const portailItems = [
    { href:'../portail/index.html', icon:'ri-smartphone-line',  label:'Portail Agriculteurs', key:'portail' },
    { href:'../iot/index.html',     icon:'ri-sensor-line',      label:'IoT Supervision Silos',key:'iot' },
  ];

  let html = `
    <aside class="sidebar">
      <div class="sidebar-logo">
        <div class="logo-name">DropWise</div>
        <div class="logo-sub">Solutions IoT Agricoles</div>
        <div class="logo-client"><i class="ri-building-2-line"></i> SMBSA Ezahra</div>
      </div>
      <div class="sidebar-section">
        <div class="sidebar-section-label">ERP Backoffice</div>
        <nav class="sidebar-nav">`;
  for (const it of items) {
    const cls = active === it.key ? ' class="active"' : '';
    const badge = it.badge ? `<span class="sidebar-badge">${it.badge}</span>` : '';
    html += `<a href="${it.href}"${cls}><i class="${it.icon}"></i>${it.label}${badge}</a>`;
  }
  html += `</nav></div>
      <div class="sidebar-section">
        <div class="sidebar-section-label">Interfaces Web</div>
        <nav class="sidebar-nav">`;
  for (const it of portailItems) {
    const cls = active === it.key ? ' class="active"' : '';
    html += `<a href="${it.href}"${cls}><i class="${it.icon}"></i>${it.label}</a>`;
  }
  html += `</nav></div>
      <div class="sidebar-footer">
        <div>DropWise Technologie</div>
        <div style="margin-top:3px">drop.wise@outlook.com</div>
        <div style="margin-top:3px">CDC-EZAHRA-DW-2026</div>
      </div>
    </aside>`;
  return html;
}

function buildHeader(title) {
  const u = getCurrentRole();
  const roleColors = {
    admin:'#e74c3c', comptable:'#1a7fa3', collecteur:'#27ae60',
    magasin:'#f39c12', agriculteur:'#16a085', iot:'#8e44ad'
  };
  const col = roleColors[u.key] || 'var(--primary)';

  const dropdownItems = DEMO_ROLES.map(r => `
    <div onclick="window.switchRole('${r.key}')" style="
      display:flex;align-items:center;gap:10px;padding:9px 14px;cursor:pointer;
      background:${r.key===u.key?'var(--primary-xlight)':'white'};
      border-left:3px solid ${r.key===u.key?col:'transparent'};
      transition:background 0.12s;">
      <div style="width:30px;height:30px;border-radius:50%;background:${roleColors[r.key]};
        color:white;display:flex;align-items:center;justify-content:center;
        font-size:11px;font-weight:700;flex-shrink:0">${r.initials}</div>
      <div>
        <div style="font-size:13px;font-weight:600;color:var(--text)">${r.name}</div>
        <div style="font-size:11px;color:var(--text-muted)">${r.role}</div>
      </div>
      ${r.key===u.key ? '<i class="ri-check-line" style="margin-left:auto;color:var(--primary);font-size:15px"></i>' : ''}
    </div>`).join('');

  return `
    <header class="top-header">
      <span class="page-title">${title}</span>
      <div class="header-actions">
        <button class="header-btn" title="Recherche"><i class="ri-search-line"></i></button>
        <button class="header-btn" title="Notifications">
          <i class="ri-notification-3-line"></i>
          <span class="notif-dot"></span>
        </button>

        <!-- Role Switcher -->
        <div id="role-switcher" style="position:relative">
          <div onclick="window.toggleRoleDropdown()" style="
            display:flex;align-items:center;gap:8px;padding:5px 12px 5px 6px;
            background:var(--primary-xlight);border-radius:20px;cursor:pointer;
            border:1px solid transparent;transition:border-color 0.15s;"
            onmouseover="this.style.borderColor='var(--primary-light)'"
            onmouseout="this.style.borderColor='transparent'">
            <div style="width:28px;height:28px;border-radius:50%;background:${col};
              color:white;display:flex;align-items:center;justify-content:center;
              font-size:11px;font-weight:700">${u.initials}</div>
            <div style="line-height:1.2">
              <div style="font-size:13px;font-weight:600;color:var(--text)">${u.name}</div>
              <div style="font-size:10px;color:var(--text-muted)">${u.role}</div>
            </div>
            <i class="ri-arrow-down-s-line" style="font-size:16px;color:var(--text-muted);margin-left:2px"></i>
          </div>

          <!-- Dropdown -->
          <div id="role-dropdown" style="
            display:none;position:absolute;top:calc(100% + 8px);right:0;
            width:220px;background:white;border:1px solid var(--border);
            border-radius:var(--radius);box-shadow:var(--shadow-lg);z-index:300;overflow:hidden">
            <div style="padding:10px 14px 8px;font-size:10.5px;font-weight:700;
              text-transform:uppercase;letter-spacing:0.8px;color:var(--text-muted);
              border-bottom:1px solid var(--border)">
              <i class="ri-swap-line"></i> Changer de rôle
            </div>
            ${dropdownItems}
            <div style="padding:8px 14px;border-top:1px solid var(--border)">
              <a href="../index.html" style="display:flex;align-items:center;gap:6px;
                font-size:12.5px;color:var(--danger);font-weight:500">
                <i class="ri-logout-box-line"></i> Déconnexion
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>`;
}

// ===== ROLE SWITCHER LOGIC =====
window.toggleRoleDropdown = function() {
  const dd = document.getElementById('role-dropdown');
  if (!dd) return;
  dd.style.display = dd.style.display === 'block' ? 'none' : 'block';
};

window.switchRole = function(key) {
  const r = DEMO_ROLES.find(x => x.key === key);
  if (!r) return;
  localStorage.setItem('demo_role', key);
  if (r.path) {
    window.location.href = r.path;
  } else {
    window.location.reload();
  }
};

document.addEventListener('click', function(e) {
  const sw = document.getElementById('role-switcher');
  const dd = document.getElementById('role-dropdown');
  if (dd && sw && !sw.contains(e.target)) dd.style.display = 'none';
});

// ===== SHARED UTILS =====
function initTabs() {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const group = tab.dataset.group || 'default';
      document.querySelectorAll(`.tab[data-group="${group}"]`).forEach(t => t.classList.remove('active'));
      document.querySelectorAll(`.tab-content[data-group="${group}"]`).forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.target);
      if (target) target.classList.add('active');
    });
  });
}

function openModal(id) { const m = document.getElementById(id); if (m) m.classList.add('open'); }
function closeModal(id) { const m = document.getElementById(id); if (m) m.classList.remove('open'); }

function fmt(n) {
  return new Intl.NumberFormat('fr-TN', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(n);
}
function fmtInt(n) { return new Intl.NumberFormat('fr-TN').format(n); }

function badgeStatut(statut) {
  const map = {
    'validé':'badge-success','en attente':'badge-warning','reçu':'badge-success',
    'partiel':'badge-warning','en cours':'badge-info','payée':'badge-success',
    'impayée':'badge-danger','actif':'badge-success','congé':'badge-warning',
    'inactif':'badge-secondary','normal':'badge-success','bas':'badge-warning',
    'plein':'badge-primary','alerte':'badge-danger','suspendu':'badge-danger',
    'réglé':'badge-success','en attente régl.':'badge-warning',
  };
  return `<span class="badge ${map[statut]||'badge-secondary'}">${statut}</span>`;
}

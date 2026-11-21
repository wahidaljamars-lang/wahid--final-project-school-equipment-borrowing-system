(() => {
  'use strict';

  const STORAGE_KEY = 'cics-equipment-desk-v1';
  const conditions = ['Good', 'Damaged', 'Missing', 'Maintenance'];
  const defaultCategories = [
    'Computer Equipment',
    'Networking Equipment',
    'Presentation Equipment',
    'Peripheral Devices',
    'Other Laboratory Equipment'
  ];
  const sampleEquipment = [
    ['CICS-CE-001', 'Desktop Computer', 'Computer Equipment', 'Desktop workstation for laboratory activities.', 12, 'Good', '🖥️'],
    ['CICS-CE-002', 'Laptop Computer', 'Computer Equipment', 'Portable computer for academic presentations and activities.', 8, 'Good', '💻'],
    ['CICS-CE-003', 'Computer Monitor', 'Computer Equipment', '24-inch display for laboratory use.', 10, 'Good', '🖥️'],
    ['CICS-CE-004', 'Keyboard', 'Computer Equipment', 'USB keyboard for a desktop computer.', 16, 'Good', '⌨️'],
    ['CICS-CE-005', 'Computer Mouse', 'Computer Equipment', 'USB optical mouse.', 16, 'Good', '🖱️'],
    ['CICS-CE-006', 'System Unit', 'Computer Equipment', 'Desktop computer system unit for laboratory use.', 8, 'Good', '🖥️'],
    ['CICS-NE-001', 'Router', 'Networking Equipment', 'Wireless router for networking exercises.', 4, 'Good', '📡'],
    ['CICS-NE-002', 'Network Switch', 'Networking Equipment', '24-port network switch for laboratory activities.', 5, 'Good', '🔌'],
    ['CICS-NE-003', 'Ethernet Cable', 'Networking Equipment', 'Patch cable for network setup and testing.', 30, 'Good', '🧵'],
    ['CICS-NE-004', 'LAN Tester', 'Networking Equipment', 'Cable tester for Ethernet wiring exercises.', 6, 'Good', '🧰'],
    ['CICS-NE-005', 'Network Crimping Tool', 'Networking Equipment', 'Crimping tool for network cable termination.', 5, 'Good', '🛠️'],
    ['CICS-PE-001', 'Projector', 'Presentation Equipment', 'Portable projector for classroom presentations.', 4, 'Good', '📽️'],
    ['CICS-PE-002', 'Projector Screen', 'Presentation Equipment', 'Portable pull-up projection screen.', 3, 'Good', '🎞️'],
    ['CICS-PE-003', 'Extension Cord', 'Presentation Equipment', 'Extension cord for approved classroom use.', 10, 'Good', '🔌'],
    ['CICS-PE-004', 'HDMI Cable', 'Presentation Equipment', 'HDMI display cable.', 12, 'Good', '〰️'],
    ['CICS-PE-005', 'VGA Cable', 'Presentation Equipment', 'VGA display cable for classroom presentations.', 8, 'Good', '〰️'],
    ['CICS-PD-001', 'Printer', 'Peripheral Devices', 'Color inkjet printer for laboratory use.', 2, 'Good', '🖨️'],
    ['CICS-PD-002', 'Speakers', 'Peripheral Devices', 'Compact computer speaker set.', 5, 'Good', '🔊'],
    ['CICS-PD-003', 'Webcam', 'Peripheral Devices', 'USB webcam for online activities.', 4, 'Good', '📷'],
    ['CICS-PD-004', 'Microphone', 'Peripheral Devices', 'Wired microphone for presentations.', 4, 'Good', '🎙️'],
    ['CICS-PD-005', 'Headset', 'Peripheral Devices', 'Headset for computer laboratory activities.', 6, 'Good', '🎧'],
    ['CICS-OL-001', 'AVR', 'Other Laboratory Equipment', 'Automatic voltage regulator for laboratory equipment.', 6, 'Good', '⚡'],
    ['CICS-OL-002', 'Power Strip', 'Other Laboratory Equipment', 'Surge-protected power strip.', 8, 'Good', '🔋'],
    ['CICS-OL-003', 'Laboratory Equipment Kit', 'Other Laboratory Equipment', 'General CICS laboratory equipment kit for approved academic use.', 2, 'Good', '🧰']
  ];

  const seedEquipmentImages = {
    'CICS-CE-001': { path: 'assets/images/cics-ce-001.jpg', credit: 'Unsplash', source: 'https://unsplash.com/license' },
    'CICS-CE-002': { path: 'assets/images/cics-ce-002.jpg', credit: 'Unsplash', source: 'https://unsplash.com/license' },
    'CICS-CE-003': { path: 'assets/images/cics-ce-003.jpg', credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:EIZO_Foris_FG2421_VGA_computer_monitor_displaying_test_pattern.png' },
    'CICS-CE-004': { path: 'assets/images/cics-ce-004.jpg', credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Wired_usb_Keyboard_from_backlink.jpg' },
    'CICS-CE-005': { path: 'assets/images/cics-ce-005.jpg', credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Acer_USB_Wired_Optical_Scroll_Mouse.jpg' },
    'CICS-CE-006': { path: 'assets/images/cics-ce-006.jpg', credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Computer_case_-_Full_Tower.jpg' },
    'CICS-NE-001': { path: 'assets/images/cics-ne-001.jpg', credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:ASUS_Wi-Fi_Router_(48767215803).jpg' },
    'CICS-NE-002': { path: 'assets/images/cics-ne-002.jpg', credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Brocade_FES24_Front.jpg' },
    'CICS-NE-003': { path: 'assets/images/cics-ne-003.jpg', credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Patch_cable_with_RJ45_connector.jpg' },
    'CICS-NE-004': { path: 'assets/images/cics-ne-004.jpg', credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Cable_stripper,_cable_tester_(RJ45,_RJ11),_LSA-Tool_and_crimping_tool.jpg' },
    'CICS-NE-005': { path: 'assets/images/cics-ne-005.jpg', credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Crimpzange_RJ45_-_RJ11_-_RJ12_-_IMGP1079.JPG' },
    'CICS-PE-001': { path: 'assets/images/cics-pe-001.jpg', credit: 'Dave Pape (Public domain)', source: 'https://commons.wikimedia.org/wiki/File:InFocus_IN34.jpg' },
    'CICS-PE-002': { path: 'assets/images/cics-pe-002.jpg', credit: 'AV Hire London (CC BY 2.0)', source: 'https://www.flickr.com/photos/56507339@N02/5570906972' },
    'CICS-PE-003': { path: 'assets/images/cics-pe-003.jpg', credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:NEMA-1_extension_cord.jpg' },
    'CICS-PE-004': { path: 'assets/images/cics-pe-004.jpg', credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:HDMI_Cable_1.JPG' },
    'CICS-PE-005': { path: 'assets/images/cics-pe-005.jpg', credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:VGA_Cable_1.JPG' },
    'CICS-PD-001': { path: 'assets/images/cics-pd-001.jpg', credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Canon_imagePROGRAF_PRO-300_A3%2B_Color_Photo_ink-jet_Printer.jpg' },
    'CICS-PD-002': { path: 'assets/images/cics-pd-002.jpg', credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Logitech-usb-speakers.jpg' },
    'CICS-PD-003': { path: 'assets/images/cics-pd-003.jpg', credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Webcam_01.jpg' },
    'CICS-PD-004': { path: 'assets/images/cics-pd-004.jpg', credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:DPA_dfacto_Vocal_wired_first_edition.jpg' },
    'CICS-PD-005': { path: 'assets/images/cics-pd-005.jpg', credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Xbox360_Wired_Headset.png' },
    'CICS-OL-001': { path: 'assets/images/cics-ol-001.jpg', credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Faratel_6KW_voltage_stabilizer_trans_IO.jpg' },
    'CICS-OL-002': { path: 'assets/images/cics-ol-002.jpg', credit: 'Wikimedia Commons', source: 'https://commons.wikimedia.org/wiki/File:Spike_buster-Spike_suppressor-electric-wire-_extension-cord.jpg' }
  };

  let state;
  let notice = null;
  let equipmentFilter = { search: '', category: 'all', availability: 'all' };
  let selectedAccountId = '';
  let selectedEquipmentId = '';

  const app = document.getElementById('app');
  const nowDate = () => {
    const date = new Date();
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  };
  const isValidDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value)
    && !Number.isNaN(new Date(`${value}T00:00:00Z`).getTime())
    && new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value;
  const uid = (prefix) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
  const encode = (value) => escapeHtml(value);
  const moneyDate = (date) => date ? new Date(`${date}T00:00:00`).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '—';
  const fullName = (userId) => state.users.find((user) => user.id === userId)?.name || 'Unknown user';
  const equipmentById = (id) => state.equipment.find((item) => item.id === id);
  const currentUser = () => state.users.find((user) => user.id === state.session) || null;
  const roleLabel = (role) => ({ admin: 'Administrator', staff: 'Authorized personnel', borrower: 'Student / faculty borrower' })[role] || role;
  const isStaff = (user) => user && ['admin', 'staff'].includes(user.role);

  function createInitialState() {
    const categories = defaultCategories.map((name) => ({ id: uid('cat'), name }));
    return {
      users: [],
      equipment: sampleEquipment.map(([code, name, category, description, quantity, condition, icon]) => ({
        id: uid('eq'), code, name, category, description, quantity, available: condition === 'Good' ? quantity : 0, borrowed: 0,
        condition, image: seedEquipmentImages[code]?.path || '', imageSource: seedEquipmentImages[code]?.source || '',
        imageCredit: seedEquipmentImages[code]?.credit || '', icon
      })),
      categories,
      requests: [],
      transactions: [],
      notifications: [],
      activities: [],
      session: null,
      nextRequest: 1
    };
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return createInitialState();
      const parsed = JSON.parse(saved);
      const fresh = createInitialState();
      return {
        ...fresh,
        ...parsed,
        users: Array.isArray(parsed.users) ? parsed.users : [],
        equipment: Array.isArray(parsed.equipment) ? parsed.equipment.map((item) => {
          const seededImage = seedEquipmentImages[item.code];
          const legacySeedPath = `assets/images/${String(item.code).toLowerCase()}.jpg`;
          const savedImage = item.image === legacySeedPath
            || (item.code === 'CICS-CE-001' && item.image === 'assets/images/desktop-computer.jpg')
            ? ''
            : item.image;
          const image = savedImage || seededImage?.path || '';
          const isSeededImage = image === seededImage?.path;
          return {
            ...item,
            image,
            imageSource: item.imageSource || (isSeededImage ? seededImage?.source : '') || '',
            imageCredit: item.imageCredit || (isSeededImage ? seededImage?.credit : '') || '',
            borrowed: Number.isInteger(item.borrowed) ? item.borrowed : Math.max(0, item.quantity - item.available)
          };
        }) : fresh.equipment,
        categories: Array.isArray(parsed.categories) ? parsed.categories : fresh.categories,
        requests: Array.isArray(parsed.requests) ? parsed.requests : [],
        transactions: Array.isArray(parsed.transactions) ? parsed.transactions : [],
        notifications: Array.isArray(parsed.notifications) ? parsed.notifications : [],
        activities: Array.isArray(parsed.activities) ? parsed.activities : []
      };
    } catch (error) {
      console.error('Unable to load CICS equipment data from LocalStorage.', error);
      throw new Error('Saved system data could not be read. Clear this site’s LocalStorage to start again.');
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Unable to save CICS equipment data to LocalStorage.', error);
      throw new Error('Your browser could not save this change. LocalStorage may be full or disabled.');
    }
  }

  function readEquipmentImage(file) {
    const supportedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!supportedTypes.includes(file.type)) {
      return Promise.reject(new Error('Choose a JPG, PNG, or WebP picture.'));
    }
    if (file.size > 10 * 1024 * 1024) {
      return Promise.reject(new Error('Choose a picture smaller than 10 MB.'));
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('The selected picture could not be read.'));
      reader.onload = () => {
        const image = new Image();
        image.onerror = () => reject(new Error('The selected file is not a readable picture.'));
        image.onload = () => {
          if (image.width * image.height > 40000000) {
            reject(new Error('Choose a picture with dimensions under 40 megapixels.'));
            return;
          }
          const scale = Math.min(1, 1000 / image.width, 1000 / image.height);
          const canvas = document.createElement('canvas');
          canvas.width = Math.max(1, Math.round(image.width * scale));
          canvas.height = Math.max(1, Math.round(image.height * scale));
          const context = canvas.getContext('2d');
          if (!context) {
            reject(new Error('Your browser could not process this picture.'));
            return;
          }
          context.fillStyle = '#fff';
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          try {
            const imageData = canvas.toDataURL('image/jpeg', 0.78);
            if (imageData.length > 700000) {
              reject(new Error('This picture is still too large after compression. Choose a smaller picture.'));
              return;
            }
            resolve(imageData);
          } catch (error) {
            console.error('Unable to encode the selected equipment picture.', error);
            reject(new Error('The selected picture could not be processed.'));
          }
        };
        image.src = String(reader.result);
      };
      reader.readAsDataURL(file);
    });
  }

  function log(action, details, actorId = currentUser()?.id || null) {
    state.activities.unshift({ id: uid('act'), actorId, action, details, at: new Date().toISOString() });
    state.activities = state.activities.slice(0, 250);
  }

  function notify(userId, message) {
    if (!userId) return;
    state.notifications.unshift({ id: uid('note'), userId, message, read: false, at: new Date().toISOString() });
  }

  function flash(message, type = 'success') {
    notice = { message, type };
  }

  function displayNotice() {
    if (!notice) return '';
    const html = `<div class="alert ${notice.type === 'error' ? 'error' : 'success'}" role="status">${encode(notice.message)}</div>`;
    notice = null;
    return html;
  }

  async function passwordDigest(password) {
    if (!window.crypto?.subtle) {
      throw new Error('Password hashing is unavailable in this browser context. Open this app through localhost or a secure browser context.');
    }
    const bytes = new TextEncoder().encode(password);
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
  }

  async function createPasswordHash(password) {
    const salt = Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) => byte.toString(16).padStart(2, '0')).join('');
    return { salt, hash: await passwordDigest(`${salt}:${password}`) };
  }

  async function ensureDemoAccount({ email, password, name, role, institutionalId, affiliation, verified }) {
    let account = state.users.find((user) => user.email.toLowerCase() === email);
    let changed = false;
    if (!account && role === 'admin') {
      account = state.users.find((user) => user.email.toLowerCase() === 'admin@test.local' && user.role === 'admin');
      if (account) {
        account.email = email;
        changed = true;
      }
    }
    if (!account) {
      account = {
        id: uid('user'), email, name, institutionalId, affiliation, role, accountType: role === 'borrower' ? 'Student' : 'Administrator',
        active: true, verified, createdAt: new Date().toISOString()
      };
      state.users.push(account);
      changed = true;
    }
    const matchesPassword = account.passwordSalt
      ? await passwordDigest(`${account.passwordSalt}:${password}`) === account.passwordHash
      : false;
    if (!matchesPassword) {
      const passwordRecord = await createPasswordHash(password);
      account.passwordSalt = passwordRecord.salt;
      account.passwordHash = passwordRecord.hash;
      changed = true;
    }
    if (account.role !== role || !account.active || account.verified !== verified) changed = true;
    account.role = role;
    account.active = true;
    account.verified = verified;
    return changed;
  }

  async function ensureDemoAccounts() {
    const adminChanged = await ensureDemoAccount({
      email: 'john.fredrick.lim@gmail.com', password: 'johnfredricklim', name: 'Prof John Fredrick Lim',
      role: 'admin', institutionalId: 'DEMO-ADMIN-1', affiliation: 'CICS', verified: true
    });
    const legacyAdminChanged = await ensureDemoAccount({
      email: 'admin@test.com', password: 'admin123', name: 'CICS Administrator',
      role: 'admin', institutionalId: 'DEMO-ADMIN', affiliation: 'CICS', verified: true
    });
    const borrowerChanged = await ensureDemoAccount({
      email: 'borrower@test.local', password: 'borrowerpass123', name: 'CICS Test Borrower',
      role: 'borrower', institutionalId: 'DEMO-BORROWER', affiliation: 'BSIT', verified: true
    });
    return adminChanged || legacyAdminChanged || borrowerChanged;
  }

  function route() {
    const value = location.hash.replace(/^#\/?/, '');
    return value || (currentUser() ? 'dashboard' : 'login');
  }

  function navigate(page) {
    if (location.hash === `#${page}`) render();
    else location.hash = page;
  }

  function badge(status) {
    const key = String(status).toLowerCase();
    const tone = ['approved', 'returned', 'good', 'available', 'active'].includes(key) ? 'green'
      : ['pending', 'borrowed', 'maintenance'].includes(key) ? 'amber'
        : ['rejected', 'damaged', 'missing', 'overdue', 'unavailable', 'inactive'].includes(key) ? 'red' : 'muted';
    return `<span class="badge ${tone}">${encode(status)}</span>`;
  }

  function requestItemsMarkup(request) {
    return (request.items || []).map((entry) => {
      const item = equipmentById(entry.equipmentId);
      return `<span>${encode(item?.name || 'Removed equipment')} × ${entry.quantity}</span>`;
    }).join('');
  }

  function requestCard(request, user) {
    const transaction = state.transactions.find((item) => item.requestId === request.id);
    const assigned = request.assignedTo ? fullName(request.assignedTo) : 'Unassigned';
    const mayReview = isStaff(user) && request.status === 'Pending' && (user.role === 'admin' || !request.assignedTo || request.assignedTo === user.id);
    const mayRelease = isStaff(user) && request.status === 'Approved' && !transaction && (user.role === 'admin' || request.assignedTo === user.id);
    return `<article class="request-card">
      <div>
        <div class="request-title"><div><span class="request-id">REQ-${String(request.number).padStart(4, '0')}</span><h3>${encode(fullName(request.borrowerId))}</h3></div>${badge(request.status)}</div>
        <p class="request-sub">${encode(state.users.find((item) => item.id === request.borrowerId)?.email || '')} · Submitted ${new Date(request.createdAt).toLocaleDateString()}</p>
        <p class="request-purpose">${encode(request.purpose)}</p>
        <div class="request-items-inline">${requestItemsMarkup(request)}</div>
        <div class="request-dates"><span>Borrow: <b>${moneyDate(request.borrowDate)}</b></span><span>Expected return: <b>${moneyDate(request.returnDate)}</b></span>${isStaff(user) ? `<span>Assigned: <b>${encode(assigned)}</b></span>` : ''}</div>
        ${request.rejectionReason ? `<p class="reject-reason">Reason: ${encode(request.rejectionReason)}</p>` : ''}
        ${transaction ? `<p class="request-sub">Released ${new Date(transaction.releasedAt).toLocaleDateString()} · ${transaction.status === 'Returned' ? `Returned ${new Date(transaction.returnedAt).toLocaleDateString()} (${encode(transaction.condition)})` : 'Currently borrowed'}</p>` : ''}
      </div>
      ${mayReview || mayRelease ? `<div class="request-actions">
        ${mayReview ? `<form data-action="review" class="form-stack review-form"><input type="hidden" name="request_id" value="${encode(request.id)}"><input name="reason" placeholder="Reason if rejecting" aria-label="Rejection reason"><button class="button small primary" name="decision" value="Approved">Approve</button><button class="button small danger-outline" name="decision" value="Rejected">Reject</button></form>` : ''}
        ${mayRelease ? `<form data-action="release"><input type="hidden" name="request_id" value="${encode(request.id)}"><button class="button small primary">Record release</button></form>` : ''}
      </div>` : ''}
      ${user.role === 'admin' && request.status === 'Pending' ? `<form data-action="assign" class="assign-form"><input type="hidden" name="request_id" value="${encode(request.id)}"><select name="staff_id" aria-label="Assign to staff"><option value="">Assign staff…</option>${state.users.filter((item) => item.role === 'staff' && item.active).map((staff) => `<option value="${encode(staff.id)}" ${request.assignedTo === staff.id ? 'selected' : ''}>${encode(staff.name)}</option>`).join('')}</select><button class="button small secondary">Save assignment</button></form>` : ''}
    </article>`;
  }

  function authPage(page) {
    const firstUser = state.users.length === 0;
    const register = page === 'register';
    const loginChoice = page === 'login';
    const portal = page === 'admin-login' ? 'admin' : page === 'borrower-login' ? 'borrower' : '';
    document.body.className = 'auth-body';
    return `<main class="auth-shell">
      <section class="auth-brand"><div class="logo-pair"><img src="assets/images/zppsu-logo.png" alt="Zamboanga Peninsula Polytechnic State University logo"><img class="logo-cics" src="assets/images/cics-logo.png" alt="College of Information and Computing Sciences logo"></div><p class="eyebrow">ZPPSU · College of Information and Computer Sciences</p><h1>Equipment,<br>checked in.</h1><p>One place to request, release, and return CICS laboratory equipment.</p><div class="auth-foot">CICS Equipment Borrowing Management System</div></section>
      <section class="auth-panel"><div class="auth-card">
        <div class="auth-logos-mobile"><img src="assets/images/zppsu-logo.png" alt="ZPPSU logo"><img src="assets/images/cics-logo.png" alt="CICS logo"></div>
        ${displayNotice()}
        <p class="eyebrow">${register ? (firstUser ? 'Initial setup' : 'CICS community') : portal ? (portal === 'admin' ? 'Administrator & personnel portal' : 'Borrower portal') : 'CICS equipment desk'}</p>
        <h2>${register ? (firstUser ? 'Create administrator' : 'Create your account') : loginChoice ? 'Choose your sign-in' : portal === 'admin' ? 'Administrator sign in' : portal === 'borrower' ? 'Borrower sign in' : 'Welcome back'}</h2>
        <p class="muted-text">${register ? (firstUser ? 'The first account becomes the system administrator.' : 'Register as a CICS student or faculty borrower.') : loginChoice ? 'Select the portal that matches your account.' : portal === 'admin' ? 'For administrators and authorized personnel.' : portal === 'borrower' ? 'For CICS students and faculty borrowers.' : 'Sign in to manage your equipment activity.'}</p>
        ${register ? `<form data-action="register" class="form-stack">
          <label>Full name<input name="name" autocomplete="name" required maxlength="120"></label>
          <label>Email<input type="email" name="email" autocomplete="email" required maxlength="190"></label>
          <label>Student / employee ID<input name="institutionalId" required maxlength="60"></label>
          <label>Course / CICS affiliation<input name="affiliation" placeholder="e.g. BSIT 2A or CICS faculty" required maxlength="120"></label>
          ${!firstUser ? '<label>Account type<select name="accountType"><option>Student</option><option>Faculty</option></select></label>' : ''}
          <label>Password (at least 8 characters)<div class="password-field"><input type="password" name="password" minlength="8" autocomplete="new-password" required><button type="button" class="password-toggle" data-action="toggle-password" aria-label="Show password" aria-pressed="false">Show</button></div></label>
          <button class="button primary full">${firstUser ? 'Set up system' : 'Create account'}</button>
        </form><p class="auth-switch">Already registered? <a href="#borrower-login">Borrower sign in</a></p>`
        : loginChoice ? `<div class="portal-options">
          <a class="portal-option" href="#admin-login"><span class="portal-icon">♙</span><span><b>Administrator / Staff</b><small>Inventory, requests, returns, and reports</small></span><span class="portal-arrow">→</span></a>
          <a class="portal-option" href="#borrower-login"><span class="portal-icon">♧</span><span><b>Student / Faculty Borrower</b><small>Browse equipment and manage your requests</small></span><span class="portal-arrow">→</span></a>
        </div>
        <p class="auth-switch">New CICS borrower? <a href="#register">Create an account</a></p>
        ${firstUser ? '<p class="setup-note">First time here? <a href="#register">Create the administrator account</a>.</p>' : ''}`
        : `<form data-action="login" class="form-stack">
          <input type="hidden" name="portal" value="${portal}">
          <label>Email<input type="email" name="email" autocomplete="username" required></label>
          <label>Password<div class="password-field"><input id="signin-password" type="password" name="password" autocomplete="current-password" required><button type="button" class="password-toggle" data-action="toggle-password" aria-label="Show password" aria-pressed="false">Show</button></div></label>
          <button class="button primary full">Sign in</button>
        </form>
        <p class="auth-switch"><a href="#login">← Choose a different sign-in</a></p>
        ${portal === 'borrower' ? '<p class="auth-switch">New CICS borrower? <a href="#register">Create an account</a></p>' : ''}`}
        <p class="helper-text">Demo system: account and equipment data are stored only in this browser.</p>
      </div></section>
    </main>`;
  }

  function navLink(page, label, icon, activePage, count = 0) {
    return `<a class="${activePage === page ? 'active' : ''}" href="#${page}"><span>${icon}</span>${label}${count ? `<span class="nav-count">${count}</span>` : ''}</a>`;
  }

  function shell(page, content, user) {
    document.body.className = 'app-body';
    const unread = state.notifications.filter((item) => item.userId === user.id && !item.read).length;
    return `<div class="layout">
      <aside class="sidebar" id="sidebar"><a class="brand" href="#dashboard"><span class="logo-pair"><img src="assets/images/zppsu-logo.png" alt="ZPPSU logo"><img class="logo-cics" src="assets/images/cics-logo.png" alt="CICS logo"></span><span><b>CICS</b><small>Equipment Desk</small></span></a>
        <div class="nav-label">WORKSPACE</div><nav class="nav-links">
          ${navLink('dashboard', 'Dashboard', '▦', page)}
          ${navLink('equipment', 'Equipment', '▤', page)}
          ${navLink('requests', 'Borrowing requests', '↗', page, user.role === 'admin' ? state.requests.filter((item) => item.status === 'Pending').length : 0)}
          ${isStaff(user) ? navLink('transactions', 'Issue & return', '⇄', page) : ''}
          ${isStaff(user) ? navLink('reports', 'Reports', '▥', page) : ''}
          ${user.role === 'admin' ? navLink('accounts', 'Accounts', '♙', page) : ''}
          ${navLink('notifications', 'Notifications', '♧', page, unread)}
        </nav>
        <div class="sidebar-bottom"><div class="scope-note"><b>CICS inventory only</b><span>Equipment and requests are limited to the College of Information and Computer Sciences.</span></div>
          <div class="profile-mini"><span class="avatar">${encode(user.name.slice(0, 1).toUpperCase())}</span><span class="profile-copy"><b>${encode(user.name)}</b><small>${encode(roleLabel(user.role))}</small></span></div>
          <button class="logout-button" data-action="logout">↪ Sign out</button>
        </div>
      </aside>
      <main class="main"><header class="topbar"><button class="menu-toggle" type="button" aria-label="Toggle navigation">☰</button><div class="topbar-title">CICS Equipment Desk <span>/</span> ${encode(page[0].toUpperCase() + page.slice(1))}</div><div class="topbar-right"><span class="date-label">${new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span><a class="notification-link" href="#notifications" aria-label="Notifications">♧${unread ? `<i>${unread}</i>` : ''}</a></div></header>
        <div class="content">${displayNotice()}${content}<footer class="footer">CICS School Equipment Borrowing Management System <span>·</span> ZPPSU <span>·</span> Local browser storage</footer></div>
      </main>
    </div>`;
  }

  function pageHeading(eyebrow, title, description, action = '') {
    return `<div class="page-heading"><div><p class="eyebrow">${encode(eyebrow)}</p><h1>${encode(title)}</h1><p class="muted-text">${encode(description)}</p></div>${action}</div>`;
  }

  function statCard(label, value, caption, color) {
    return `<article class="stat-card"><div class="stat-top"><span>${encode(label)}</span><span class="stat-icon ${color}">◈</span></div><strong>${Number(value).toLocaleString()}</strong><small>${encode(caption)}</small></article>`;
  }

  function dashboardPage(user) {
    const borrowed = state.transactions.filter((item) => item.status === 'Borrowed');
    const overdue = borrowed.filter((item) => item.returnDate < nowDate());
    const myRequests = state.requests.filter((item) => item.borrowerId === user.id);
    let cards;
    if (user.role === 'borrower') {
      cards = [
        ['Available equipment', state.equipment.reduce((sum, item) => sum + item.available, 0), 'Units ready to request', 'blue'],
        ['My pending', myRequests.filter((item) => item.status === 'Pending').length, 'Awaiting review', 'amber'],
        ['Approved', myRequests.filter((item) => item.status === 'Approved').length, 'Ready for release', 'green'],
        ['Currently borrowed', borrowed.filter((item) => state.requests.find((r) => r.id === item.requestId)?.borrowerId === user.id).length, 'Active transactions', 'violet']
      ];
    } else if (user.role === 'staff') {
      const assigned = state.requests.filter((item) => item.assignedTo === user.id);
      cards = [
        ['Pending requests', assigned.filter((item) => item.status === 'Pending').length, 'Assigned for review', 'amber'],
        ['Approved requests', assigned.filter((item) => item.status === 'Approved').length, 'Approved borrowing requests', 'green'],
        ['Equipment for release', assigned.filter((item) => item.status === 'Approved' && !state.transactions.some((t) => t.requestId === item.id)).length, 'Approved, not yet issued', 'blue'],
        ['Equipment for return', borrowed.filter((item) => state.requests.find((r) => r.id === item.requestId)?.assignedTo === user.id).length, 'Active transactions', 'violet'],
        ['Overdue equipment', overdue.filter((item) => state.requests.find((r) => r.id === item.requestId)?.assignedTo === user.id).length, 'Active transactions past due', 'red']
      ];
    } else {
      cards = [
        ['Total equipment', state.equipment.reduce((sum, item) => sum + item.quantity, 0), 'Items in CICS inventory', 'blue'],
        ['Available', state.equipment.reduce((sum, item) => sum + item.available, 0), 'Units ready to borrow', 'green'],
        ['Borrowed', state.equipment.reduce((sum, item) => sum + (item.borrowed || 0), 0), 'Units currently issued', 'violet'],
        ['Pending requests', state.requests.filter((item) => item.status === 'Pending').length, 'Awaiting decision', 'amber'],
        ['Overdue', overdue.length, 'Active transactions past due', 'red']
      ];
    }
    const scope = user.role === 'borrower' ? (item) => state.requests.find((r) => r.id === item.requestId)?.borrowerId === user.id
      : user.role === 'staff' ? (item) => state.requests.find((r) => r.id === item.requestId)?.assignedTo === user.id : () => true;
    const recent = state.transactions.filter(scope).slice().sort((a, b) => b.releasedAt.localeCompare(a.releasedAt)).slice(0, 5);
    const overdueForUser = overdue.filter(scope);
    const cardsHtml = cards.map(([label, value, caption, color]) => statCard(label, value, caption, color)).join('');
    const recentRows = recent.length ? recent.map((transaction) => {
      const request = state.requests.find((item) => item.id === transaction.requestId);
      return `<tr><td>REQ-${String(request?.number || '').padStart(4, '0')}<small class="table-sub">${encode(fullName(request?.borrowerId))}</small></td><td>${encode((request?.items || []).map((entry) => equipmentById(entry.equipmentId)?.name).filter(Boolean).join(', ') || '—')}</td><td>${moneyDate(transaction.returnDate)}</td><td>${badge(transaction.status === 'Borrowed' && transaction.returnDate < nowDate() ? 'Overdue' : transaction.status)}</td></tr>`;
    }).join('') : '<tr><td colspan="4" class="empty-state compact">No equipment has been released yet.</td></tr>';
    return `${pageHeading(new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }), `Good ${new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, ${user.name.split(' ')[0]}.`, user.role === 'borrower' ? 'Here is an overview of your equipment borrowing.' : 'Here is what is happening across CICS equipment today.', user.role === 'borrower' ? '<a class="button primary" href="#equipment">Browse equipment <span>→</span></a>' : '')}
      <section class="stats-grid ${cards.length === 5 ? 'five' : ''}">${cardsHtml}</section>
      ${user.role === 'borrower' && !user.verified ? '<div class="alert error">Your account is awaiting CICS affiliation verification by an administrator. You can browse equipment, but cannot submit a request yet.</div>' : ''}
      ${overdueForUser.length ? `<section class="panel overdue-panel"><div class="panel-heading"><div><h2>Overdue attention</h2><p>Borrowed equipment past its expected return date</p></div><a href="#transactions" class="text-link">View transactions →</a></div><div class="overdue-list">${overdueForUser.map((transaction) => `<div><span class="overdue-dot"></span><b>REQ-${String(state.requests.find((r) => r.id === transaction.requestId)?.number || '').padStart(4, '0')}</b><span>${encode(fullName(state.requests.find((r) => r.id === transaction.requestId)?.borrowerId))}</span><span class="due-date">Due ${moneyDate(transaction.returnDate)}</span></div>`).join('')}</div></section>` : ''}
      <section class="panel"><div class="panel-heading"><div><h2>${user.role === 'borrower' ? 'My recent borrowing' : 'Recent borrowing activity'}</h2><p>Latest equipment release activity</p></div><a href="${user.role === 'borrower' ? '#requests' : '#transactions'}" class="text-link">View all →</a></div><div class="table-wrap"><table><thead><tr><th>Request / borrower</th><th>Equipment</th><th>Due</th><th>Status</th></tr></thead><tbody>${recentRows}</tbody></table></div></section>
      ${user.role === 'admin' ? `<section class="panel"><div class="panel-heading"><div><h2>Recent system activity</h2><p>Latest actions by system users</p></div></div>${activityRows(state.activities.slice(0, 6))}</section>` : ''}`;
  }

  function equipmentArtwork(item) {
    const name = item.name.toLowerCase();
    let device;
    if (name.includes('desktop computer')) {
      device = '<rect x="34" y="27" width="116" height="75" rx="6" fill="#26394f"/><rect x="41" y="34" width="102" height="60" rx="3" fill="#77add6"/><path d="M92 102v14M73 119h39" stroke="#71839a" stroke-width="6" stroke-linecap="round"/><rect x="164" y="39" width="45" height="79" rx="5" fill="#34485e"/><rect x="173" y="49" width="27" height="5" rx="2" fill="#8299af"/><circle cx="187" cy="104" r="4" fill="#84c2a4"/>';
    } else if (name.includes('system unit')) {
      device = '<rect x="91" y="20" width="78" height="112" rx="8" fill="#34485e"/><rect x="102" y="32" width="56" height="5" rx="2" fill="#8299af"/><rect x="102" y="45" width="56" height="5" rx="2" fill="#8299af"/><circle cx="130" cy="112" r="5" fill="#83c2a4"/><path d="M104 62h52M104 70h52M104 78h52" stroke="#526980" stroke-width="3"/>';
    } else if (name.includes('laptop')) {
      device = '<path d="M68 28q0-7 8-7h108q8 0 8 7v68H68z" fill="#34485e"/><rect x="77" y="29" width="106" height="57" rx="3" fill="#78afd9"/><path d="M51 99h158l15 18q2 5-6 5H43q-8 0-6-5z" fill="#aebdcb"/><path d="M109 105h42" stroke="#71839a" stroke-width="3" stroke-linecap="round"/>';
    } else if (name.includes('monitor')) {
      device = '<rect x="48" y="24" width="164" height="91" rx="8" fill="#26394f"/><rect x="57" y="33" width="146" height="73" rx="4" fill="#79b4dd"/><path d="M130 115v16M101 134h58" stroke="#71839a" stroke-width="7" stroke-linecap="round"/>';
    } else if (name.includes('keyboard')) {
      device = '<path d="M43 40q0-7 8-7h158q8 0 8 7v67q0 8-8 8H51q-8 0-8-8z" fill="#34485e"/><g fill="#c8d3df"><path d="M54 46h13v9H54zm18 0h13v9H72zm18 0h13v9H90zm18 0h13v9h-13zm18 0h13v9h-13zm18 0h13v9h-13zm18 0h13v9h-13zm18 0h13v9h-13zm18 0h13v9h-13zM54 60h18v9H54zm23 0h13v9H77zm18 0h13v9H95zm18 0h13v9h-13zm18 0h13v9h-13zm18 0h13v9h-13zm18 0h29v9h-29zM54 74h13v9H54zm18 0h13v9H72zm18 0h13v9H90zm18 0h13v9h-13zm18 0h13v9h-13zm18 0h13v9h-13zm18 0h13v9h-13zm18 0h21v9h-21z"/><rect x="80" y="91" width="98" height="7" rx="3"/></g>';
    } else if (name.includes('mouse')) {
      device = '<path d="M130 22c-30 0-49 22-49 56v17c0 25 20 42 49 42s49-17 49-42V78c0-34-19-56-49-56z" fill="#34485e"/><path d="M130 24v42M82 74h96" stroke="#9bafc1" stroke-width="4"/><rect x="124" y="34" width="12" height="22" rx="6" fill="#78afd9"/>';
    } else if (name.includes('router')) {
      device = '<path d="M72 68V24m116 44V24" stroke="#526980" stroke-width="7" stroke-linecap="round"/><rect x="48" y="65" width="164" height="57" rx="16" fill="#34485e"/><path d="M67 104h14m13 0h14m13 0h14m13 0h14m13 0h14" stroke="#a9bac9" stroke-width="5" stroke-linecap="round"/><circle cx="75" cy="83" r="4" fill="#83c2a4"/>';
    } else if (name.includes('network switch')) {
      device = '<rect x="34" y="46" width="192" height="72" rx="10" fill="#34485e"/><path d="M52 67h15v23H52zm21 0h15v23H73zm21 0h15v23H94zm21 0h15v23h-15zm21 0h15v23h-15zm21 0h15v23h-15zm21 0h15v23h-15zm21 0h15v23h-15z" fill="#192d42"/><circle cx="57" cy="104" r="4" fill="#83c2a4"/><circle cx="70" cy="104" r="4" fill="#83c2a4"/>';
    } else if (name.includes('lan tester')) {
      device = '<rect x="94" y="18" width="72" height="116" rx="13" fill="#3c596f"/><rect x="106" y="31" width="48" height="27" rx="4" fill="#9dc8b2"/><path d="M111 42h37" stroke="#385d50" stroke-width="3"/><circle cx="130" cy="79" r="12" fill="#d7e0e8"/><circle cx="130" cy="79" r="5" fill="#80b69d"/><path d="M111 107h38" stroke="#a7bac9" stroke-width="5" stroke-linecap="round"/>';
    } else if (name.includes('crimping')) {
      device = '<path d="M78 32c14 4 25 17 34 31l-9 10c-15-7-29-12-43-9l-8-13q7-15 26-19zm103 0c-14 4-25 17-34 31l9 10c15-7 29-12 43-9l8-13q-7-15-26-19z" fill="#536b81"/><path d="m105 68 24 25 25-25 13 13-27 37q-11 13-22 0L91 81z" fill="#d58c64"/><circle cx="92" cy="51" r="6" fill="#dce4ec"/><circle cx="168" cy="51" r="6" fill="#dce4ec"/>';
    } else if (name.includes('projector screen')) {
      device = '<rect x="54" y="20" width="152" height="101" rx="5" fill="#f8fafc" stroke="#8297aa" stroke-width="7"/><path d="M130 121v17M92 139h76" stroke="#8297aa" stroke-width="5" stroke-linecap="round"/><rect x="68" y="34" width="124" height="73" fill="#d5e7f2"/>';
    } else if (name.includes('projector')) {
      device = '<path d="M53 51q0-13 13-13h112q14 0 14 13v59q0 12-14 12H66q-13 0-13-12z" fill="#e1e7ed"/><circle cx="173" cy="80" r="25" fill="#3b5269"/><circle cx="173" cy="80" r="16" fill="#78afd9"/><circle cx="173" cy="80" r="8" fill="#d1e4f0"/><path d="M77 58h35" stroke="#a4b2c0" stroke-width="6" stroke-linecap="round"/><path d="M80 123v8m91-8v8" stroke="#526980" stroke-width="7"/>';
    } else if (name.includes('cable') || name.includes('cord')) {
      device = '<path d="M54 100c29 31 60-37 88-5s45 27 64-8" fill="none" stroke="#34485e" stroke-width="10" stroke-linecap="round"/><path d="M51 88v22m-9-18 9 2m9-2-9-2" stroke="#71839a" stroke-width="5" stroke-linecap="round"/><rect x="199" y="78" width="18" height="18" rx="4" fill="#8297aa"/><path d="M208 78V67m7 11V67" stroke="#8297aa" stroke-width="4" stroke-linecap="round"/>';
    } else if (name.includes('tester')) {
      device = '<rect x="96" y="19" width="68" height="115" rx="15" fill="#e1a95e"/><rect x="108" y="34" width="44" height="31" rx="5" fill="#34485e"/><path d="M114 51h31" stroke="#9bd1b2" stroke-width="4"/><circle cx="130" cy="88" r="13" fill="#f2f5f8"/><path d="M115 115h30" stroke="#f2f5f8" stroke-width="5" stroke-linecap="round"/>';
    } else if (name.includes('power strip')) {
      device = '<rect x="47" y="57" width="166" height="49" rx="19" fill="#f2f4f6" stroke="#a8b7c5" stroke-width="4"/><circle cx="80" cy="81" r="9" fill="#34485e"/><circle cx="119" cy="81" r="9" fill="#34485e"/><circle cx="158" cy="81" r="9" fill="#34485e"/><circle cx="194" cy="81" r="5" fill="#83c2a4"/><path d="M48 81H28v24c0 15-12 17-16 17" fill="none" stroke="#526980" stroke-width="6" stroke-linecap="round"/>';
    } else if (name.includes('printer')) {
      device = '<path d="M74 48V24h112v24" fill="#f5f7f9" stroke="#8297aa" stroke-width="6"/><rect x="48" y="48" width="164" height="67" rx="13" fill="#d7e0e8"/><rect x="77" y="83" width="107" height="47" rx="4" fill="#fff" stroke="#9cabb9" stroke-width="4"/><rect x="169" y="60" width="22" height="8" rx="4" fill="#83c2a4"/>';
    } else if (name.includes('speaker')) {
      device = '<rect x="59" y="24" width="61" height="108" rx="12" fill="#34485e"/><rect x="140" y="24" width="61" height="108" rx="12" fill="#34485e"/><circle cx="89" cy="62" r="15" fill="#a7bac9"/><circle cx="89" cy="101" r="20" fill="#8297aa"/><circle cx="170" cy="62" r="15" fill="#a7bac9"/><circle cx="170" cy="101" r="20" fill="#8297aa"/>';
    } else if (name.includes('webcam')) {
      device = '<rect x="60" y="45" width="140" height="71" rx="28" fill="#34485e"/><circle cx="130" cy="80" r="26" fill="#8297aa"/><circle cx="130" cy="80" r="16" fill="#26394f"/><circle cx="130" cy="80" r="9" fill="#78afd9"/><path d="M103 116v19h54v-19" fill="#71839a"/><path d="M78 47l-13-16m117 16 13-16" stroke="#34485e" stroke-width="6" stroke-linecap="round"/>';
    } else if (name.includes('microphone')) {
      device = '<rect x="108" y="19" width="44" height="81" rx="22" fill="#526980"/><path d="M91 67v13a39 39 0 0 0 78 0V67" fill="none" stroke="#8297aa" stroke-width="8"/><path d="M130 119v17m-23 0h46" stroke="#526980" stroke-width="7" stroke-linecap="round"/><path d="M115 37h30m-30 11h30m-30 11h30" stroke="#aebdca" stroke-width="4"/>';
    } else if (name.includes('headset')) {
      device = '<path d="M66 82V69a64 64 0 0 1 128 0v13" fill="none" stroke="#526980" stroke-width="13"/><rect x="55" y="72" width="37" height="56" rx="15" fill="#34485e"/><rect x="168" y="72" width="37" height="56" rx="15" fill="#34485e"/><path d="M186 120q-3 19-32 19h-15" fill="none" stroke="#526980" stroke-width="6" stroke-linecap="round"/><circle cx="130" cy="139" r="5" fill="#8297aa"/>';
    } else if (name.includes('avr') || name.includes('voltage')) {
      device = '<rect x="61" y="23" width="138" height="110" rx="12" fill="#526980"/><rect x="78" y="39" width="104" height="34" rx="5" fill="#22364a"/><path d="M91 56h78" stroke="#9bd1b2" stroke-width="5"/><circle cx="94" cy="98" r="10" fill="#d9e1e8"/><circle cx="130" cy="98" r="10" fill="#d9e1e8"/><circle cx="166" cy="98" r="10" fill="#83c2a4"/>';
    } else {
      device = '<rect x="53" y="53" width="68" height="71" rx="10" fill="#34485e"/><rect x="138" y="31" width="67" height="93" rx="8" fill="#d8e1e9" stroke="#8297aa" stroke-width="5"/><path d="M67 70h40m-40 12h40m-40 12h40" stroke="#9db0c0" stroke-width="4"/><circle cx="171" cy="61" r="12" fill="#78afd9"/><path d="m152 104 13-19 10 12 9-12 14 19" fill="none" stroke="#8297aa" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>';
    }
    return `<svg class="equipment-art" viewBox="0 0 260 150" aria-hidden="true" focusable="false"><rect width="260" height="150" rx="12" fill="#edf3f8"/><ellipse cx="130" cy="132" rx="88" ry="8" fill="#dce6ee"/>${device}</svg>`;
  }

  function equipmentPhotoPlaceholder(name, message = 'Photo unavailable', hidden = false) {
    return `<div class="equipment-photo-placeholder"${hidden ? ' hidden' : ''} role="img" aria-label="${encode(message)}"><b>${encode(name)}</b><small>${encode(message)}</small></div>`;
  }

  function equipmentVisual(item) {
    const image = item.image || seedEquipmentImages[item.code]?.path || '';
    const placeholder = equipmentPhotoPlaceholder(item.name, 'Photo unavailable', true);
    return `<div class="equipment-photo-wrap">${image
      ? `<img class="equipment-photo" src="${encode(image)}" alt="${encode(item.name)}" onerror="this.hidden=true;this.nextElementSibling.hidden=false">${placeholder}`
      : equipmentPhotoPlaceholder(item.name)}</div>`;
  }

  function equipmentCard(item, user) {
    return `<article class="equipment-card" data-equipment-id="${encode(item.id)}"><div class="equipment-image"><div class="equipment-visual-container">${equipmentVisual(item)}</div><div class="equipment-status">${badge(item.available > 0 && item.condition === 'Good' ? 'Available' : 'Unavailable')}</div></div><div class="equipment-card-body">
      <span class="equipment-category">${encode(item.category)} · ${encode(item.code)}</span><h3>${encode(item.name)}</h3><p>${encode(item.description || 'CICS laboratory equipment.')}</p>
      <div class="equipment-meta"><span>Available <b>${item.available}</b> / ${item.quantity}</span>${badge(item.condition)}</div>
      <div class="row-actions"><button class="button small secondary" data-action="view-equipment" data-id="${encode(item.id)}">View details</button>${user.role === 'admin' ? `<button class="button small secondary" data-action="edit-equipment" data-id="${encode(item.id)}">Edit</button><button class="button small danger-outline" data-action="delete-equipment" data-id="${encode(item.id)}">Delete</button>` : ''}</div>
    </div></article>`;
  }

  function equipmentDetails(item, user) {
    if (!item) return '';
    const available = item.available > 0 && item.condition === 'Good';
    const borrowed = Number(item.borrowed || 0);
    const seededImage = seedEquipmentImages[item.code];
    const photoSource = item.imageSource || (item.image === seededImage?.path ? seededImage.source : '');
    const photoCredit = photoSource
      ? `<p class="equipment-photo-credit">Photo: <a href="${encode(photoSource)}" target="_blank" rel="noopener noreferrer">${encode(item.imageCredit || seededImage?.credit || 'Image source')}</a></p>`
      : '';
    return `<div class="equipment-modal-backdrop">
      <section class="equipment-modal" role="dialog" aria-modal="true" aria-labelledby="equipment-detail-title" tabindex="-1">
        <button class="equipment-modal-close" data-action="close-equipment" aria-label="Close equipment details">×</button>
        <div class="equipment-modal-image">${equipmentVisual(item)}</div>
        <div class="equipment-modal-content"><p class="eyebrow">${encode(item.category)} · ${encode(item.code)}</p><h2 id="equipment-detail-title">${encode(item.name)}</h2>
          <p class="equipment-description">${encode(item.description || 'CICS laboratory equipment.')}</p>
          ${photoCredit}
          <dl class="equipment-detail-list"><div><dt>Total quantity</dt><dd>${item.quantity}</dd></div><div><dt>Available</dt><dd>${item.available}</dd></div><div><dt>Currently borrowed</dt><dd>${borrowed}</dd></div><div><dt>Condition</dt><dd>${badge(item.condition)}</dd></div><div><dt>Availability status</dt><dd>${badge(available ? 'Available' : 'Unavailable')}</dd></div></dl>
          <div class="equipment-modal-actions"><button class="button secondary" data-action="close-equipment">Close</button>${user.role === 'borrower' ? '<a class="button primary" href="#requests">Go to borrowing request</a>' : user.role === 'admin' ? `<button class="button primary" data-action="edit-equipment" data-id="${encode(item.id)}">Edit equipment</button>` : ''}</div>
        </div>
      </section>
    </div>`;
  }

  function closeEquipmentDetails() {
    const closedId = selectedEquipmentId;
    selectedEquipmentId = '';
    render();
    Array.from(app.querySelectorAll('button[data-action="view-equipment"]'))
      .find((button) => button.dataset.id === closedId)
      ?.focus();
  }

  function equipmentPage(user) {
    const categories = state.categories.map((item) => item.name);
    const filtered = state.equipment.filter((item) => {
      const query = equipmentFilter.search.toLowerCase();
      const matchesSearch = !query || [item.name, item.code, item.description, item.category].some((text) => String(text || '').toLowerCase().includes(query));
      const matchesCategory = equipmentFilter.category === 'all' || equipmentFilter.category === item.category;
      const available = item.available > 0 && item.condition === 'Good';
      const matchesAvailability = equipmentFilter.availability === 'all' || (equipmentFilter.availability === 'available' ? available : !available);
      return matchesSearch && matchesCategory && matchesAvailability;
    });
    const editing = state.equipment.find((item) => item.id === equipmentFilter.editId);
    const equipmentForm = user.role === 'admin' ? `<section class="panel" id="equipment-form"><div class="panel-heading"><div><h2>${editing ? 'Edit equipment' : 'Add equipment'}</h2><p>Manage CICS inventory and quantities.</p></div>${editing ? '<button class="button small secondary" data-action="cancel-edit">Cancel</button>' : ''}</div>
      <form data-action="equipment-save" class="form-grid"><input type="hidden" name="equipmentId" value="${encode(editing?.id || '')}">
        <label>Equipment ID<input name="code" required maxlength="60" value="${encode(editing?.code || '')}"></label>
        <label>Equipment name<input name="name" required maxlength="150" value="${encode(editing?.name || '')}"></label>
        <label>Category<select name="category" required>${categories.map((category) => `<option ${editing?.category === category ? 'selected' : ''}>${encode(category)}</option>`).join('')}</select></label>
        <label>Total quantity<input type="number" name="quantity" min="${editing ? editing.borrowed + activeReservedQuantity(editing.id) : 0}" required value="${editing?.quantity ?? 1}"></label>
        <label>Condition<select name="condition">${conditions.map((condition) => `<option ${editing?.condition === condition ? 'selected' : ''}>${condition}</option>`).join('')}</select></label>
        <label>Equipment picture (optional)<input type="file" name="imageFile" accept="image/jpeg,image/png,image/webp"><small class="field-help">${editing ? 'Choose a new picture to replace the current one; leave empty to keep it.' : 'Choose a JPG, PNG, or WebP picture, up to 10 MB.'}</small></label>
        <label class="span-2">Description<textarea name="description" rows="2" maxlength="500">${encode(editing?.description || '')}</textarea></label>
        <div class="span-2 form-actions"><button class="button primary">${editing ? 'Save changes' : 'Add equipment'}</button></div>
      </form></section>
      <section class="panel"><div class="panel-heading"><div><h2>Equipment categories</h2><p>Add categories for CICS inventory.</p></div></div><form data-action="category-add" class="inline-form"><input name="category" placeholder="New category name" maxlength="100" required><button class="button secondary">Add</button></form><div class="tag-list">${categories.map((category) => `<span class="category-tag">${encode(category)}</span>`).join('')}</div></section>` : '';
    return `${pageHeading('CICS inventory', 'Equipment', 'Browse equipment owned by the College of Information and Computer Sciences.', user.role === 'admin' ? '<a class="button primary" href="#equipment-form">＋ Add equipment</a>' : '')}
      ${equipmentForm}<div class="filter-bar"><label class="search-box"><span>⌕</span><input id="equipment-search" type="search" placeholder="Search equipment…" value="${encode(equipmentFilter.search)}"></label><select id="equipment-category" aria-label="Filter by category"><option value="all">All categories</option>${categories.map((category) => `<option ${equipmentFilter.category === category ? 'selected' : ''}>${encode(category)}</option>`).join('')}</select><select id="equipment-availability" aria-label="Filter by availability"><option value="all" ${equipmentFilter.availability === 'all' ? 'selected' : ''}>All availability</option><option value="available" ${equipmentFilter.availability === 'available' ? 'selected' : ''}>Available</option><option value="unavailable" ${equipmentFilter.availability === 'unavailable' ? 'selected' : ''}>Unavailable</option></select></div>
      <div class="equipment-grid">${filtered.length ? filtered.map((item) => equipmentCard(item, user)).join('') : '<div class="panel empty-state">No equipment matches your search.</div>'}</div>
      ${equipmentDetails(state.equipment.find((item) => item.id === selectedEquipmentId), user)}`;
  }

  function requestsPage(user) {
    const borrower = user.role === 'borrower';
    const statusPriority = { Pending: 0, Approved: 1, Rejected: 2 };
    const requests = state.requests.filter((item) => borrower ? item.borrowerId === user.id : user.role === 'staff' ? item.assignedTo === user.id : true)
      .sort((a, b) => (statusPriority[a.status] ?? 9) - (statusPriority[b.status] ?? 9) || b.createdAt.localeCompare(a.createdAt));
    const form = borrower ? `<section class="panel"><div class="panel-heading"><div><h2>New borrowing request</h2><p>Requests are restricted to CICS equipment. Approval is required before release.</p></div></div>
      ${user.verified ? `<form data-action="request-create" class="form-stack request-form">
        <div class="request-items"><div class="items-heading"><b>Requested equipment</b><button type="button" class="text-link add-item">＋ Add another item</button></div>
          ${requestItemRow()}
        </div>
        <label>Purpose of borrowing<textarea name="purpose" rows="3" maxlength="2000" placeholder="Describe the class, laboratory, or academic activity." required></textarea></label>
        <div class="form-grid"><label>Borrowing date<input type="date" name="borrowDate" min="${nowDate()}" value="${nowDate()}" required></label><label>Expected return date<input type="date" name="returnDate" min="${nowDate()}" value="${tomorrowDate()}" required></label></div>
        <label class="checkbox-label"><input type="checkbox" name="acknowledgement" required><span>I accept responsibility for the equipment and will return it in the recorded condition by the expected date.</span></label>
        <button class="button primary">Submit request</button>
      </form>` : '<div class="alert error">Your CICS affiliation must be verified by an administrator before you can submit a request.</div>'}</section>` : '';
    return `${pageHeading(borrower ? 'Your activity' : 'Review and fulfill', 'Borrowing requests', borrower ? 'Submit requests and follow their approval status.' : 'Review requests and coordinate equipment release.')}
      ${form}<section class="panel"><div class="panel-heading"><div><h2>${borrower ? 'Request history' : 'All requests'}</h2><p>${requests.length} request${requests.length === 1 ? '' : 's'}</p></div></div><div class="request-list">${requests.length ? requests.map((request) => requestCard(request, user)).join('') : '<div class="empty-state">No borrowing requests yet.</div>'}</div></section>`;
  }

  function tomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return new Date(tomorrow.getTime() - tomorrow.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  }

  function requestItemRow() {
    const options = state.equipment.map((item) => `<option value="${encode(item.id)}" data-available="${item.available}" ${item.available < 1 || item.condition !== 'Good' ? 'disabled' : ''}>${encode(item.name)} · ${encode(item.code)} (${item.available} available)</option>`).join('');
    return `<div class="request-item-row"><div class="request-item-fields"><select name="equipmentId[]" required><option value="">Select CICS equipment</option>${options}</select><input name="quantity[]" type="number" min="1" value="1" required aria-label="Quantity"><button type="button" class="remove-item" disabled aria-label="Remove item">×</button></div><div class="request-item-preview">${equipmentPhotoPlaceholder('Select equipment', 'Equipment photo appears here')}</div></div>`;
  }

  function transactionsPage(user) {
    const transactions = state.transactions.filter((transaction) => {
      const request = state.requests.find((item) => item.id === transaction.requestId);
      return user.role === 'admin' || request?.assignedTo === user.id;
    }).sort((a, b) => b.releasedAt.localeCompare(a.releasedAt));
    const rows = transactions.map((transaction) => {
      const request = state.requests.find((item) => item.id === transaction.requestId);
      const overdue = transaction.status === 'Borrowed' && transaction.returnDate < nowDate();
      const returnAction = transaction.status === 'Borrowed' ? `<form data-action="return" class="return-form"><input type="hidden" name="transaction_id" value="${encode(transaction.id)}"><select name="condition" aria-label="Condition after return">${conditions.map((condition) => `<option>${condition}</option>`).join('')}</select><input name="notes" placeholder="Inspection notes (optional)" maxlength="500"><button class="button small primary">Record return</button></form>` : `<span>${encode(transaction.condition)}${transaction.notes ? `<small class="table-sub">${encode(transaction.notes)}</small>` : ''}</span>`;
      return `<tr><td><b>REQ-${String(request?.number || '').padStart(4, '0')}</b><small class="table-sub">${encode(fullName(request?.borrowerId))}</small></td><td>${(request?.items || []).map((entry) => `<span class="table-item">${encode(equipmentById(entry.equipmentId)?.name || 'Removed equipment')} × ${entry.quantity}</span>`).join('')}</td><td>${moneyDate(transaction.releasedAt.slice(0, 10))}</td><td>${moneyDate(transaction.returnDate)}</td><td>${badge(overdue ? 'Overdue' : transaction.status)}</td><td>${returnAction}</td></tr>`;
    }).join('');
    return `${pageHeading('Equipment lifecycle', 'Issue & return', 'Record physical release, return, and post-return inspection.')}<section class="panel"><div class="panel-heading"><div><h2>Transactions</h2><p>Overdue transactions are highlighted automatically.</p></div></div>${transactions.length ? `<div class="table-wrap"><table><thead><tr><th>Request / borrower</th><th>Equipment</th><th>Released</th><th>Due</th><th>Status</th><th>Action / inspection</th></tr></thead><tbody>${rows}</tbody></table></div>` : '<div class="empty-state">No equipment has been released yet. Approve a request and record its release first.</div>'}</section>`;
  }

  function reportsPage(user) {
    const rows = state.requests.filter((request) => user.role === 'admin' || request.assignedTo === user.id).flatMap((request) => request.items.map((entry) => {
      const item = equipmentById(entry.equipmentId);
      const transaction = state.transactions.find((value) => value.requestId === request.id);
      return `<tr><td>REQ-${String(request.number).padStart(4, '0')}</td><td>${encode(fullName(request.borrowerId))}<small class="table-sub">${encode(state.users.find((value) => value.id === request.borrowerId)?.institutionalId || '')}</small></td><td>${encode(item?.name || 'Removed equipment')}<small class="table-sub">${encode(item?.code || '')}</small></td><td>${entry.quantity}</td><td>${badge(request.status)}</td><td>${transaction ? badge(transaction.status) : '—'}</td><td>${moneyDate(transaction?.returnDate || request.returnDate)}${transaction?.condition ? `<small class="table-sub">${encode(transaction.condition)}</small>` : ''}</td></tr>`;
    }));
    const conditionSummary = conditions.filter((condition) => condition !== 'Good').map((condition) => ({ condition, count: state.equipment.filter((item) => item.condition === condition).length })).filter((item) => item.count);
    return `${pageHeading('Inventory & activity', 'Reports', 'Review CICS equipment, requests, returns, and overdue activity.', '<div class="heading-actions"><button class="button secondary" data-action="export">↓ Export CSV</button><button class="button primary" data-action="print">Print / Save PDF</button></div>')}
      <section class="stats-grid report-stats">${statCard('Total equipment', state.equipment.reduce((sum, item) => sum + item.quantity, 0), 'CICS inventory units', 'blue')}${statCard('Requests', state.requests.length, 'All recorded requests', 'amber')}${statCard('Borrowed now', state.transactions.filter((item) => item.status === 'Borrowed').length, 'Active transactions', 'violet')}${statCard('Overdue', state.transactions.filter((item) => item.status === 'Borrowed' && item.returnDate < nowDate()).length, 'Past expected return date', 'red')}${statCard('Completed returns', state.transactions.filter((item) => item.status === 'Returned').length, 'Inspection recorded', 'green')}</section>
      <section class="panel report-panel"><div class="panel-heading"><div><h2>Borrowing history</h2><p>One row per item in a borrowing request</p></div></div>${rows.length ? `<div class="table-wrap"><table><thead><tr><th>Request</th><th>Borrower</th><th>Equipment</th><th>Qty</th><th>Request</th><th>Transaction</th><th>Due / condition</th></tr></thead><tbody>${rows.join('')}</tbody></table></div>` : '<div class="empty-state">No report data yet.</div>'}</section>
      <section class="panel"><div class="panel-heading"><div><h2>Damaged or unavailable inventory</h2><p>Current equipment condition requiring attention</p></div></div>${conditionSummary.length ? `<div class="condition-counts">${conditionSummary.map((item) => `<div>${badge(item.condition)}<b>${item.count} equipment record(s)</b></div>`).join('')}</div>` : '<div class="empty-state compact">No equipment is currently marked damaged, missing, or under maintenance.</div>'}</section>
      ${user.role === 'admin' ? `<section class="panel"><div class="panel-heading"><div><h2>System activity</h2><p>Most recent 250 system actions</p></div></div>${activityRows(state.activities)}</section>` : ''}`;
  }

  function activityRows(rows) {
    return rows.length ? `<div class="notification-list">${rows.map((entry) => `<div class="notification-row"><span class="notification-icon">◈</span><div><p><b>${encode(entry.action.replaceAll('_', ' '))}</b> · ${encode(entry.details)}</p><small>${encode(fullName(entry.actorId))} · ${new Date(entry.at).toLocaleString()}</small></div></div>`).join('')}</div>` : '<div class="empty-state compact">No activity recorded yet.</div>';
  }

  function accountsPage() {
    const accounts = state.users.slice().sort((a, b) => a.name.localeCompare(b.name));
    const selectedAccount = state.users.find((account) => account.id === selectedAccountId && account.role === 'borrower');
    const accountRequests = selectedAccount
      ? state.requests.filter((request) => request.borrowerId === selectedAccount.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      : [];
    const borrowingHistory = selectedAccount ? `<section class="panel" id="account-activity">
      <div class="panel-heading"><div><h2>Borrowing activity · ${encode(selectedAccount.name)}</h2><p>${encode(selectedAccount.email)} · ${encode(selectedAccount.institutionalId)} · ${encode(selectedAccount.affiliation)}</p></div><button class="button small secondary" data-action="close-account-activity">Close</button></div>
      <div class="request-list">${accountRequests.length ? accountRequests.map((request) => {
        const transaction = state.transactions.find((item) => item.requestId === request.id);
        const overdue = transaction?.status === 'Borrowed' && transaction.returnDate < nowDate();
        return `<article class="request-card"><div><div class="request-title"><div><span class="request-id">REQ-${String(request.number).padStart(4, '0')}</span><h3>${encode(request.purpose)}</h3></div>${badge(request.status)}</div>
          <div class="request-items-inline">${requestItemsMarkup(request)}</div>
          <div class="request-dates"><span>Borrow: <b>${moneyDate(request.borrowDate)}</b></span><span>Expected return: <b>${moneyDate(request.returnDate)}</b></span><span>Transaction: <b>${transaction ? (overdue ? 'Overdue' : transaction.status) : 'Not released'}</b></span></div>
          ${transaction?.releasedAt ? `<p class="request-sub">Released ${new Date(transaction.releasedAt).toLocaleString()}${transaction.returnedAt ? ` · Returned ${new Date(transaction.returnedAt).toLocaleString()}` : ''}</p>` : ''}
          ${transaction?.condition ? `<p class="request-sub">Return condition: ${encode(transaction.condition)}${transaction.notes ? ` · ${encode(transaction.notes)}` : ''}</p>` : ''}
          ${request.rejectionReason ? `<p class="reject-reason">Reason: ${encode(request.rejectionReason)}</p>` : ''}
        </div></article>`;
      }).join('') : '<div class="empty-state">This borrower has no borrowing requests yet.</div>'}</div>
    </section>` : '';
    return `${pageHeading('Access management', 'Accounts', 'Create staff accounts and manage access for the CICS equipment system.')}
      <div class="two-column account-layout"><section class="panel"><div class="panel-heading"><div><h2>Create account</h2><p>Administrator-created accounts are verified immediately.</p></div></div><form data-action="account-create" class="form-stack">
        <label>Full name<input name="name" required maxlength="120"></label><label>Email<input name="email" type="email" required maxlength="190"></label><label>Student / employee ID<input name="institutionalId" required maxlength="60"></label><label>Course / department<input name="affiliation" required maxlength="120"></label>
        <label>Role<select name="role"><option value="borrower">Borrower</option><option value="staff">Authorized personnel</option><option value="admin">Administrator</option></select></label><label>Initial password<div class="password-field"><input name="password" type="password" minlength="8" required><button type="button" class="password-toggle" data-action="toggle-password" aria-label="Show password" aria-pressed="false">Show</button></div></label><button class="button primary">Create account</button></form></section>
      <section class="panel"><div class="panel-heading"><div><h2>System accounts</h2><p>${accounts.length} registered user${accounts.length === 1 ? '' : 's'}</p></div></div><div class="account-list">${accounts.map((account) => `<div class="account-row"><span class="avatar">${encode(account.name.slice(0, 1).toUpperCase())}</span><div class="account-detail"><b>${encode(account.name)}</b><small>${encode(account.email)} · ${encode(account.institutionalId)}</small><span>${encode(account.affiliation)} · ${encode(roleLabel(account.role))} · ${account.active ? 'Active' : 'Inactive'}${account.role === 'borrower' ? (account.verified ? ' · CICS verified' : ' · Verification needed') : ''}</span></div><div class="row-actions">${account.role === 'borrower' ? `<button class="button small secondary" data-action="view-account-activity" data-id="${encode(account.id)}">View borrowing</button>` : ''}${account.id !== currentUser().id ? `${account.role === 'borrower' && !account.verified && account.active ? `<button class="button small primary" data-action="verify-account" data-id="${encode(account.id)}">Verify CICS</button>` : ''}<button class="button small ${account.active ? 'danger-outline' : 'secondary'}" data-action="toggle-account" data-id="${encode(account.id)}">${account.active ? 'Deactivate' : 'Activate'}</button>` : '<span class="you-label">You</span>'}</div></div>`).join('')}</div></section></div>${borrowingHistory}`;
  }

  function notificationsPage(user) {
    const messages = state.notifications.filter((item) => item.userId === user.id);
    return `${pageHeading('Updates', 'Notifications', 'Request status and equipment activity updates.', messages.some((item) => !item.read) ? '<button class="button secondary" data-action="read-notifications">Mark all read</button>' : '')}
      <section class="panel"><div class="notification-list">${messages.length ? messages.map((message) => `<div class="notification-row ${message.read ? '' : 'unread'}"><span class="notification-icon">♧</span><div><p>${encode(message.message)}</p><small>${new Date(message.at).toLocaleString()}</small></div>${message.read ? '' : '<span class="unread-dot"></span>'}</div>`).join('') : '<div class="empty-state">You have no notifications.</div>'}</div></section>`;
  }

  function render() {
    const page = route();
    const user = currentUser();
    if (!user) {
      if (!['login', 'register', 'admin-login', 'borrower-login'].includes(page)) {
        location.hash = 'login';
        return;
      }
      app.innerHTML = authPage(page);
      return;
    }
    if (!user.active) {
      state.session = null;
      saveState();
      flash('Your account is inactive. Contact a system administrator.', 'error');
      location.hash = 'login';
      return;
    }
    const permitted = {
      dashboard: true, equipment: true, requests: true, transactions: isStaff(user),
      reports: isStaff(user), accounts: user.role === 'admin', notifications: true
    };
    if (!permitted[page]) {
      flash('You do not have permission to access that page.', 'error');
      location.hash = 'dashboard';
      return;
    }
    const pages = {
      dashboard: () => dashboardPage(user),
      equipment: () => equipmentPage(user),
      requests: () => requestsPage(user),
      transactions: () => transactionsPage(user),
      reports: () => reportsPage(user),
      accounts: accountsPage,
      notifications: () => notificationsPage(user)
    };
    app.innerHTML = shell(page, (pages[page] || pages.dashboard)(), user);
  }

  function assertUnique(value, field, exceptId) {
    const normalized = value.trim().toLowerCase();
    if (state.users.some((user) => user.id !== exceptId && String(user[field]).toLowerCase() === normalized)) {
      throw new Error(`${field === 'email' ? 'Email address' : 'Institutional ID'} is already registered.`);
    }
  }

  function activeReservedQuantity(equipmentId, excludingRequestId = '') {
    return state.requests.filter((request) => request.id !== excludingRequestId && request.status === 'Approved' && !state.transactions.some((transaction) => transaction.requestId === request.id))
      .reduce((sum, request) => sum + request.items.filter((entry) => entry.equipmentId === equipmentId).reduce((itemSum, entry) => itemSum + entry.quantity, 0), 0);
  }

  function assertRequestItemsAvailable(items, excludingRequestId = '') {
    for (const entry of items) {
      const item = equipmentById(entry.equipmentId);
      if (!item || item.condition !== 'Good' || item.available - activeReservedQuantity(item.id, excludingRequestId) < entry.quantity) {
        throw new Error(`Not enough available ${item?.name || 'equipment'} to complete this action.`);
      }
    }
  }

  async function handleSubmit(form, event) {
    event.preventDefault();
    const action = form.dataset.action;
    const data = new FormData(form);
    const snapshot = JSON.stringify(state);
    try {
      if (action === 'login') {
        const email = String(data.get('email')).trim().toLowerCase();
        const user = state.users.find((item) => item.email.toLowerCase() === email && item.active);
        const portal = String(data.get('portal') || '');
        const allowedRoles = portal === 'admin' ? ['admin', 'staff'] : portal === 'borrower' ? ['borrower'] : ['admin', 'staff', 'borrower'];
        if (!user || !allowedRoles.includes(user.role)) {
          throw new Error(portal === 'admin'
            ? 'Use an administrator or authorized personnel account for this sign-in.'
            : 'Use a student or faculty borrower account for this sign-in.');
        }
        const digest = user ? await passwordDigest(`${user.passwordSalt}:${String(data.get('password'))}`) : '';
        if (user && digest !== user.passwordHash) throw new Error('Email or password is incorrect, or this account is inactive.');
        state.session = user.id;
        log('signed_in', user.email);
        saveState();
        flash(`Welcome back, ${user.name}.`);
        navigate('dashboard');
        return;
      }
      if (action === 'register' || action === 'account-create') {
        const name = String(data.get('name') || '').trim();
        const email = String(data.get('email') || '').trim().toLowerCase();
        const institutionalId = String(data.get('institutionalId') || '').trim();
        const affiliation = String(data.get('affiliation') || '').trim();
        const userPassword = String(data.get('password') || '');
        if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !institutionalId || !affiliation || userPassword.length < 8) {
          throw new Error('Complete all fields using a valid email and a password of at least 8 characters.');
        }
        assertUnique(email, 'email');
        assertUnique(institutionalId, 'institutionalId');
        const firstUser = state.users.length === 0;
        const role = action === 'account-create' ? String(data.get('role')) : (firstUser ? 'admin' : 'borrower');
        if (!['admin', 'staff', 'borrower'].includes(role)) throw new Error('Select a valid account role.');
        const passwordRecord = await createPasswordHash(userPassword);
        const user = {
          id: uid('user'), name, email, institutionalId, affiliation, role,
          accountType: String(data.get('accountType') || ''), passwordHash: passwordRecord.hash, passwordSalt: passwordRecord.salt,
          active: true, verified: firstUser || action === 'account-create', createdAt: new Date().toISOString()
        };
        state.users.push(user);
        if (firstUser) {
          state.session = user.id;
        }
        log('account_created', `${role}: ${email}`, user.id);
        if (firstUser) {
          saveState();
          flash('Administrator account created. You are signed in.');
          navigate('dashboard');
        } else if (action === 'account-create') {
          saveState();
          flash('Account created.');
          render();
        } else {
          saveState();
          flash('Account created. An administrator must verify your CICS affiliation before you can submit requests.');
          navigate('login');
        }
        return;
      }

      const user = currentUser();
      if (!user) throw new Error('Please sign in again.');

      if (action === 'equipment-save') {
        if (user.role !== 'admin') throw new Error('Administrator access only.');
        const id = String(data.get('equipmentId') || '');
        const existing = id ? equipmentById(id) : null;
        const code = String(data.get('code')).trim().toUpperCase();
        const name = String(data.get('name')).trim();
        const category = String(data.get('category')).trim();
        const quantity = Number(data.get('quantity'));
        const condition = String(data.get('condition'));
        if (!code || !name || !state.categories.some((item) => item.name === category) || !Number.isInteger(quantity) || quantity < 0 || !conditions.includes(condition)) {
          throw new Error('Enter valid equipment details and a non-negative whole-number quantity.');
        }
        if (state.equipment.some((item) => item.id !== id && item.code.toLowerCase() === code.toLowerCase())) throw new Error('That equipment ID is already in use.');
        const reserved = existing ? activeReservedQuantity(existing.id) : 0;
        if (existing && quantity < existing.borrowed + reserved) {
          throw new Error(`Total quantity cannot be lower than the ${existing.borrowed + reserved} borrowed or approved unit(s).`);
        }
        const borrowed = existing?.borrowed || 0;
        const imageFile = data.get('imageFile');
        const image = imageFile && imageFile.size > 0
          ? await readEquipmentImage(imageFile)
          : existing?.image || '';
        const seededImage = seedEquipmentImages[code];
        const imageSource = imageFile && imageFile.size > 0
          ? ''
          : existing?.imageSource || (image === seededImage?.path ? seededImage?.source : '') || '';
        const imageCredit = imageFile && imageFile.size > 0
          ? ''
          : existing?.imageCredit || (image === seededImage?.path ? seededImage?.credit : '') || '';
        const updated = {
          id: id || uid('eq'), code, name, category, description: String(data.get('description') || '').trim(),
          quantity, available: condition === 'Good' ? quantity - borrowed : 0, borrowed, condition, image, imageSource, imageCredit,
          icon: existing?.icon || '▤'
        };
        if (existing) state.equipment[state.equipment.indexOf(existing)] = updated;
        else state.equipment.push(updated);
        log(existing ? 'equipment_updated' : 'equipment_added', code);
        equipmentFilter.editId = '';
        flash(existing ? 'Equipment updated.' : 'Equipment added.');
      } else if (action === 'category-add') {
        if (user.role !== 'admin') throw new Error('Administrator access only.');
        const category = String(data.get('category')).trim();
        if (!category) throw new Error('Enter a category name.');
        if (state.categories.some((item) => item.name.toLowerCase() === category.toLowerCase())) throw new Error('That category already exists.');
        state.categories.push({ id: uid('cat'), name: category });
        log('category_added', category);
        flash('Category added.');
      } else if (action === 'request-create') {
        if (user.role !== 'borrower' || !user.verified) throw new Error('A verified CICS borrower account is required to submit a request.');
        const purpose = String(data.get('purpose')).trim();
        const borrowDate = String(data.get('borrowDate'));
        const returnDate = String(data.get('returnDate'));
        const equipmentIds = data.getAll('equipmentId[]').map(String);
        const quantities = data.getAll('quantity[]').map(Number);
        if (!purpose || purpose.length > 2000 || !isValidDate(borrowDate) || !isValidDate(returnDate)
          || borrowDate < nowDate() || returnDate <= borrowDate || data.get('acknowledgement') !== 'on') {
          throw new Error('Provide a purpose, valid borrowing dates, and accept the responsibility acknowledgement.');
        }
        const items = equipmentIds.map((equipmentId, index) => ({ equipmentId, quantity: quantities[index] }));
        if (!items.length || items.some((item) => !item.equipmentId || !Number.isInteger(item.quantity) || item.quantity < 1) || new Set(equipmentIds).size !== equipmentIds.length) {
          throw new Error('Select unique equipment items and a quantity of at least one.');
        }
        for (const entry of items) {
          const item = equipmentById(entry.equipmentId);
          if (!item || item.condition !== 'Good' || item.available < entry.quantity) throw new Error(`Requested quantity is unavailable for ${item?.name || 'an item'}.`);
        }
        const request = { id: uid('req'), number: state.nextRequest++, borrowerId: user.id, purpose, borrowDate, returnDate, items, status: 'Pending', assignedTo: null, rejectionReason: '', createdAt: new Date().toISOString() };
        state.requests.unshift(request);
        state.users.filter((item) => item.role === 'admin' && item.active).forEach((admin) => notify(admin.id, `New borrowing request #${request.number} is pending review.`));
        log('request_submitted', `Request #${request.number}`);
        flash('Borrowing request submitted for approval.');
      } else if (action === 'review') {
        if (!isStaff(user)) throw new Error('Staff access only.');
        const request = state.requests.find((item) => item.id === data.get('request_id'));
        const decision = String(event.submitter?.value || data.get('decision'));
        const reason = String(data.get('reason') || '').trim();
        if (!request || request.status !== 'Pending' || (user.role === 'staff' && request.assignedTo !== user.id)) throw new Error('This request is no longer pending or is assigned to another staff member.');
        if (!['Approved', 'Rejected'].includes(decision) || (decision === 'Rejected' && !reason)) throw new Error('Choose approve or reject. A reason is required when rejecting.');
        if (decision === 'Approved') assertRequestItemsAvailable(request.items);
        request.status = decision;
        request.reviewedBy = user.id;
        request.rejectionReason = decision === 'Rejected' ? reason : '';
        notify(request.borrowerId, `Your request #${request.number} was ${decision.toLowerCase()}${decision === 'Rejected' ? `: ${reason}` : '.'}`);
        log(`request_${decision.toLowerCase()}`, `Request #${request.number}${decision === 'Rejected' ? `: ${reason}` : ''}`);
        flash(`Request ${decision.toLowerCase()}.`);
      } else if (action === 'assign') {
        if (user.role !== 'admin') throw new Error('Administrator access only.');
        const request = state.requests.find((item) => item.id === data.get('request_id'));
        const staffId = String(data.get('staff_id') || '');
        const staff = state.users.find((item) => item.id === staffId && item.role === 'staff' && item.active);
        if (!request || request.status !== 'Pending' || !staff) throw new Error('Select an active staff account for a pending request.');
        request.assignedTo = staff.id;
        notify(staff.id, `Borrowing request #${request.number} was assigned to you.`);
        log('request_assigned', `Request #${request.number} assigned to ${staff.name}`);
        flash('Request assigned to staff.');
      } else if (action === 'release') {
        const request = state.requests.find((item) => item.id === data.get('request_id'));
        if (!isStaff(user) || !request || request.status !== 'Approved' || (user.role === 'staff' && request.assignedTo !== user.id) || state.transactions.some((item) => item.requestId === request.id)) {
          throw new Error('Only an approved, assigned request without a previous release can be recorded.');
        }
        assertRequestItemsAvailable(request.items, request.id);
        request.items.forEach((entry) => {
          const item = equipmentById(entry.equipmentId);
          item.available -= entry.quantity;
          item.borrowed += entry.quantity;
        });
        state.transactions.push({ id: uid('txn'), requestId: request.id, releasedBy: user.id, releasedAt: new Date().toISOString(), returnDate: request.returnDate, returnedAt: '', status: 'Borrowed', condition: '', notes: '' });
        notify(request.borrowerId, `Equipment for request #${request.number} has been released.`);
        log('equipment_released', `Request #${request.number}`);
        flash('Equipment release recorded.');
      } else if (action === 'return') {
        if (!isStaff(user)) throw new Error('Staff access only.');
        const transaction = state.transactions.find((item) => item.id === data.get('transaction_id') && item.status === 'Borrowed');
        const request = transaction && state.requests.find((item) => item.id === transaction.requestId);
        const condition = String(data.get('condition'));
        const notes = String(data.get('notes') || '').trim();
        if (!transaction || !request || (user.role === 'staff' && request.assignedTo !== user.id) || !conditions.includes(condition)) {
          throw new Error('Transaction not found, already returned, or assigned to another staff member.');
        }
        const returnItems = request.items.map((entry) => ({ entry, item: equipmentById(entry.equipmentId) }));
        if (returnItems.some(({ item }) => !item)) throw new Error('An equipment record for this transaction is missing.');
        returnItems.forEach(({ entry, item }) => {
          item.borrowed = Math.max(0, item.borrowed - entry.quantity);
          if (condition === 'Good') item.available = Math.max(item.available, item.quantity - item.borrowed);
          else item.available = 0;
          item.condition = condition;
        });
        transaction.status = 'Returned';
        transaction.returnedAt = new Date().toISOString();
        transaction.condition = condition;
        transaction.notes = notes;
        notify(request.borrowerId, `Return for request #${request.number} was recorded (${condition.toLowerCase()}).`);
        log('equipment_returned', `Request #${request.number}, condition: ${condition}`);
        flash(condition === 'Good' ? 'Return recorded. Equipment is back in available stock.' : `Return recorded. Equipment marked ${condition.toLowerCase()} and is unavailable.`);
      } else {
        throw new Error('Unknown action.');
      }
      saveState();
      render();
    } catch (error) {
      console.error(`Action "${action}" failed.`, error);
      state = JSON.parse(snapshot);
      flash(error.message || 'The action could not be completed. Check the submitted information and try again.', 'error');
      render();
    }
  }

  function csvCell(value) {
    const text = String(value ?? '');
    const safeText = /^[\s]*[=+\-@]/.test(text) ? `'${text}` : text;
    return `"${safeText.replace(/"/g, '""')}"`;
  }

  function exportReport() {
    const rows = [['Request ID', 'Borrower', 'Institutional ID', 'Affiliation', 'Equipment ID', 'Equipment', 'Quantity', 'Purpose', 'Request status', 'Transaction status', 'Released', 'Expected return', 'Returned', 'Return condition', 'Notes']];
    const user = currentUser();
    state.requests.filter((request) => user.role === 'admin' || request.assignedTo === user.id).forEach((request) => {
      const transaction = state.transactions.find((item) => item.requestId === request.id);
      const borrower = state.users.find((item) => item.id === request.borrowerId);
      request.items.forEach((entry) => {
        const item = equipmentById(entry.equipmentId);
        rows.push([
          request.number, borrower?.name, borrower?.institutionalId, borrower?.affiliation, item?.code, item?.name, entry.quantity,
          request.purpose, request.status, transaction?.status, transaction?.releasedAt, request.returnDate, transaction?.returnedAt,
          transaction?.condition, transaction?.notes
        ]);
      });
    });
    const blob = new Blob([rows.map((row) => row.map(csvCell).join(',')).join('\r\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cics-borrowing-report-${nowDate()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  app.addEventListener('submit', (event) => {
    const form = event.target.closest('form[data-action]');
    if (form) handleSubmit(form, event);
  });

  app.addEventListener('click', (event) => {
    const target = event.target.closest('[data-action], .add-item, .remove-item, .equipment-card, .equipment-modal-backdrop');
    if (!target) return;
    const user = currentUser();
    const action = target.dataset.action;
    if (target.classList.contains('menu-toggle')) {
      document.getElementById('sidebar')?.classList.toggle('open');
    } else if (action === 'toggle-password') {
      const input = target.closest('.password-field')?.querySelector('input');
      if (!input) return;
      const showPassword = input.type === 'password';
      input.type = showPassword ? 'text' : 'password';
      target.textContent = showPassword ? 'Hide' : 'Show';
      target.setAttribute('aria-label', `${showPassword ? 'Hide' : 'Show'} password`);
      target.setAttribute('aria-pressed', String(showPassword));
    } else if (action === 'logout') {
      state.session = null;
      saveState();
      flash('You have been signed out.');
      navigate('login');
    } else if (action === 'view-equipment' || target.classList.contains('equipment-card')) {
      selectedEquipmentId = target.dataset.id || target.dataset.equipmentId;
      render();
      document.querySelector('.equipment-modal')?.focus();
    } else if (action === 'close-equipment' || (target.classList.contains('equipment-modal-backdrop') && event.target === target)) {
      closeEquipmentDetails();
    } else if (action === 'edit-equipment') {
      if (user?.role !== 'admin') return;
      equipmentFilter.editId = target.dataset.id;
      selectedEquipmentId = '';
      render();
      document.getElementById('equipment-form')?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'cancel-edit') {
      equipmentFilter.editId = '';
      render();
    } else if (action === 'delete-equipment') {
      if (user?.role !== 'admin') return;
      const item = equipmentById(target.dataset.id);
      if (!item) return;
      if (state.requests.some((request) => request.items.some((entry) => entry.equipmentId === item.id))) {
        flash('Equipment with borrowing history cannot be deleted. Set its quantity to zero instead.', 'error');
      } else if (window.confirm(`Delete ${item.name} (${item.code})?`)) {
        state.equipment = state.equipment.filter((entry) => entry.id !== item.id);
        log('equipment_deleted', item.code);
        flash('Equipment deleted.');
        saveState();
      }
      render();
    } else if (action === 'verify-account' || action === 'toggle-account') {
      if (user?.role !== 'admin') return;
      const targetUser = state.users.find((item) => item.id === target.dataset.id);
      if (!targetUser || targetUser.id === user.id) return;
      if (action === 'verify-account') {
        targetUser.verified = true;
        notify(targetUser.id, 'Your CICS affiliation has been verified. You can now submit borrowing requests.');
        log('borrower_verified', targetUser.email);
        flash('Borrower affiliation verified.');
      } else {
        if (!window.confirm(`Change access for ${targetUser.name}?`)) return;
        targetUser.active = !targetUser.active;
        log('account_status_changed', `${targetUser.email}: ${targetUser.active ? 'active' : 'inactive'}`);
        flash('Account status updated.');
      }
      saveState();
      render();
    } else if (action === 'view-account-activity') {
      if (user?.role !== 'admin') return;
      selectedAccountId = target.dataset.id;
      render();
      document.getElementById('account-activity')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (action === 'close-account-activity') {
      selectedAccountId = '';
      render();
    } else if (action === 'read-notifications') {
      state.notifications.filter((item) => item.userId === user?.id).forEach((item) => { item.read = true; });
      log('notifications_read', 'Marked all notifications as read');
      saveState();
      flash('Notifications marked as read.');
      render();
    } else if (action === 'export') {
      exportReport();
    } else if (action === 'print') {
      window.print();
    } else if (target.classList.contains('add-item')) {
      const container = app.querySelector('.request-items');
      const firstRow = container?.querySelector('.request-item-row');
      if (firstRow) {
        const clone = firstRow.cloneNode(true);
        clone.querySelector('select').selectedIndex = 0;
        clone.querySelector('input').value = '1';
        clone.querySelector('.remove-item').disabled = false;
        clone.querySelector('.request-item-preview').innerHTML = equipmentPhotoPlaceholder('Select equipment', 'Equipment photo appears here');
        container.appendChild(clone);
      }
    } else if (target.classList.contains('remove-item')) {
      const container = target.closest('.request-items');
      const rows = container?.querySelectorAll('.request-item-row') || [];
      if (rows.length > 1) target.closest('.request-item-row').remove();
    }
  });

  app.addEventListener('input', (event) => {
    if (event.target.id === 'equipment-search') {
      const position = event.target.selectionStart;
      equipmentFilter.search = event.target.value;
      render();
      const input = document.getElementById('equipment-search');
      input?.focus();
      input?.setSelectionRange(position, position);
    }
  });

  app.addEventListener('change', (event) => {
    const target = event.target;
    if (target.id === 'equipment-category') {
      equipmentFilter.category = target.value;
      render();
    } else if (target.id === 'equipment-availability') {
      equipmentFilter.availability = target.value;
      render();
    } else if (target.matches('select[name="equipmentId[]"]')) {
      const selects = [...app.querySelectorAll('select[name="equipmentId[]"]')];
      const selected = selects.map((item) => item.value).filter(Boolean);
      if (new Set(selected).size !== selected.length) {
        target.value = '';
        flash('Select each equipment item only once.', 'error');
        render();
      } else {
        const item = state.equipment.find((equipment) => equipment.id === target.value);
        const preview = target.closest('.request-item-row')?.querySelector('.request-item-preview');
        if (preview) {
          preview.innerHTML = item
            ? equipmentVisual(item)
            : equipmentPhotoPlaceholder('Select equipment', 'Equipment photo appears here');
        }
      }
    } else if (target.matches('input[name="quantity[]"]')) {
      const select = target.closest('.request-item-row')?.querySelector('select');
      const max = Number(select?.selectedOptions[0]?.dataset.available || 0);
      if (max && Number(target.value) > max) {
        target.value = String(max);
        flash(`Only ${max} unit(s) are currently available.`, 'error');
        render();
      }
    }
  });

  document.addEventListener('click', (event) => {
    const sidebar = document.getElementById('sidebar');
    const toggle = event.target.closest('.menu-toggle');
    if (toggle && sidebar) sidebar.classList.toggle('open');
    else if (window.innerWidth <= 760 && sidebar?.classList.contains('open') && !sidebar.contains(event.target)) sidebar.classList.remove('open');
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && selectedEquipmentId) {
      closeEquipmentDetails();
    }
  });
  window.addEventListener('hashchange', render);
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY) {
      state = loadState();
      render();
    }
  });

  async function initialize() {
    state = loadState();
    if (await ensureDemoAccounts()) saveState();
    render();
  }

  initialize().catch((error) => {
    console.error('Unable to initialize CICS Equipment Desk.', error);
    app.innerHTML = `<main class="auth-panel"><section class="auth-card"><div class="alert error">${encode(error.message)}</div></section></main>`;
  });
})();

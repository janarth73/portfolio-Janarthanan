/* ============================================================
   contact.js  —  EmailJS  (debugged version)
   ============================================================ */

/* ── YOUR CREDENTIALS ── */
const EJS_SERVICE_ID  = 'service_5pdaare';      // ← paste your Service ID
const EJS_TEMPLATE_ID = 'template_g935gav';     // ← paste your Template ID
const EJS_PUBLIC_KEY  = 'El1Gh7DItBtUTuFvf';   // ← your Public Key ✓

/* ── Init ── */
emailjs.init({ publicKey: EJS_PUBLIC_KEY });

document.addEventListener('DOMContentLoaded', () => {

  const submitBtn = document.getElementById('submitBtn');
  const nameEl    = document.getElementById('name');
  const emailEl   = document.getElementById('email');
  const subjectEl = document.getElementById('subject');
  const messageEl = document.getElementById('message');

  if (!submitBtn) {
    console.error('❌ submitBtn not found in DOM');
    return;
  }

  submitBtn.addEventListener('click', async () => {

    const name    = nameEl?.value.trim()    || '';
    const email   = emailEl?.value.trim()   || '';
    const subject = subjectEl?.value.trim() || '';
    const message = messageEl?.value.trim() || '';

    /* Validate */
    if (!name || !email || !subject || !message) {
      setBtn('⚠ Please fill all fields', 'error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setBtn('⚠ Enter a valid email', 'error');
      return;
    }

    setBtn('Sending...', 'loading');

    /* Debug — print what is being sent */
    console.log('📤 Sending via EmailJS...');
    console.log('   Service ID  :', EJS_SERVICE_ID);
    console.log('   Template ID :', EJS_TEMPLATE_ID);
    console.log('   Public Key  :', EJS_PUBLIC_KEY);
    console.log('   Params      :', { from_name: name, from_email: email, subject, message });

    try {
      const res = await emailjs.send(
        EJS_SERVICE_ID,
        EJS_TEMPLATE_ID,
        {
          from_name  : name,
          from_email : email,
          subject    : subject,
          message    : message,
          reply_to   : email,
        }
      );

      console.log('✅ EmailJS success:', res.status, res.text);
      setBtn('✓ Message Sent!', 'success');
      clearForm();

    } catch (err) {
      /* Show the exact error in console */
      console.error('❌ EmailJS failed:');
      console.error('   Status :', err.status);
      console.error('   Text   :', err.text);
      console.error('   Full   :', err);

      /* Show specific error message to user */
      const msg = getErrorMessage(err);
      setBtn('✗ ' + msg, 'error');
    }
  });


  /* ── Translate error code to readable message ── */
  function getErrorMessage(err) {
    const status = err?.status;
    const text   = err?.text || '';

    if (status === 400) return 'Bad request — check Template variables';
    if (status === 401) return 'Wrong Public Key — check credentials';
    if (status === 402) return 'EmailJS free limit reached (200/month)';
    if (status === 403) return 'Blocked — check EmailJS domain settings';
    if (status === 404) return 'Service ID or Template ID not found';
    if (status === 412) return 'Gmail not connected in EmailJS';
    if (text.includes('network')) return 'No internet connection';
    return 'Failed (check F12 Console for details)';
  }


  /* ── Button state ── */
  function setBtn(text, state) {
    const bg = {
      loading : 'linear-gradient(135deg,#4a80c4,#6699dd)',
      success : 'linear-gradient(135deg,#2a8a4a,#4aba6a)',
      error   : 'linear-gradient(135deg,#c44a4a,#dd4444)',
    };
    submitBtn.textContent      = text;
    submitBtn.style.background = bg[state] || '';
    submitBtn.disabled         = state === 'loading';

    if (state !== 'loading') {
      setTimeout(() => {
        submitBtn.textContent      = 'Send Message →';
        submitBtn.style.background = '';
        submitBtn.disabled         = false;
      }, 4000);
    }
  }

  /* ── Clear form ── */
  function clearForm() {
    if (nameEl)    nameEl.value    = '';
    if (emailEl)   emailEl.value   = '';
    if (subjectEl) subjectEl.value = '';
    if (messageEl) messageEl.value = '';
  }

});

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('.contact-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('.btn-send');
      var originalText = btn.innerHTML;
      btn.innerHTML = 'Sending...';
      btn.disabled = true;

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.ok) {
          var card = form.closest('.contact-form-card');
          card.innerHTML = '<div style="text-align:center;padding:3rem 2rem;"><i class="fa-regular fa-circle-check" style="font-size:3rem;color:var(--color-blue);margin-bottom:1rem;display:block;"></i><h3 style="font-size:1.2rem;margin-bottom:0.5rem;color:var(--color-near-black);">Message sent!</h3><p style="color:var(--color-text-gray);">Thank you — I\'ll get back to you soon.</p></div>';
        } else {
          throw new Error(data.error || 'Submission failed');
        }
      })
      .catch(function () {
        btn.innerHTML = originalText;
        btn.disabled = false;
        alert('Something went wrong. Please try again or email me directly.');
      });
    });
  });
})();

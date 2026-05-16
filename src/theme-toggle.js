(function () {
  var root = document.documentElement;
  function updateIcons() {
    var theme = root.getAttribute('data-theme');
    var isDark = theme === 'dark';
    document.querySelectorAll('.theme-toggle i').forEach(function (icon) {
      if (isDark) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
    });
  }
  updateIcons();
  document.querySelectorAll('.theme-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var current = root.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateIcons();
    });
  });
})();

document.querySelectorAll('pre').forEach(function (pre) {
  var b = document.createElement('button');
  b.type = 'button'; b.className = 'copy'; b.textContent = 'Copy';
  b.addEventListener('click', function () {
    navigator.clipboard.writeText(pre.querySelector('code').textContent).then(function () {
      b.textContent = 'Copied'; setTimeout(function () { b.textContent = 'Copy'; }, 1500);
    });
  });
  pre.appendChild(b);
});

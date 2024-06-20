function resizeIframe(obj) {
  obj.style.height  = obj.contentWindow.document.body.offsetHeight + 'px';
  obj.style.width = obj.contentWindow.document.body.offsetWidth+'px';
}
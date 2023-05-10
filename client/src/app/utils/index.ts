function downloadURL(url: string) {
  var aElement = document.createElement('a');
  aElement.href = url;
  aElement.target = '_blank';
//   aElement.download = filename;
  document.body.appendChild(aElement);
  aElement.click();
  document.body.removeChild(aElement);
  window.URL.revokeObjectURL(url);
}

export { downloadURL };

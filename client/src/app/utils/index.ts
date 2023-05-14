function downloadURL(url: string, fileName?: string) {
  var aElement = document.createElement('a');
  aElement.href = url;
  aElement.target = '_blank';
  if (fileName) {
    aElement.download = fileName;
  }
  document.body.appendChild(aElement);
  aElement.click();
  document.body.removeChild(aElement);
  window.URL.revokeObjectURL(url);
}

export { downloadURL };

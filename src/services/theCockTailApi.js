export default getCockTail = async () => {
  const endpoint = '';
  const cockTailApi = await fetch(endpoint);
  return cockTailApi.json();
};

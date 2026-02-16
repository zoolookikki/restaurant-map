export function delay(ms) {
  return new Promise(resolve => {
    // ici Promise créée => en attente (pending)
    setTimeout(() => {
      resolve();
      // ici après ms millisecondes, Promise est terminée/résolue (resolved)
    }, ms);
  });
}

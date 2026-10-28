
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./service-worker.js')
        .then((registration) => {
            console.log(
                'Service worker zarejestrowany:',
                registration.scope
            );
        })
        .catch((error) => {
            console.error(
                'Błąd rejestracji service workera:',
                error
            );
        });
}

let deferredPrompt = null;

const installBtn = document.querySelector('.install-button');

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    installBtn.hidden = false;
});

installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    console.log('Wynik instalacji:', outcome);

    deferredPrompt = null;
    installBtn.hidden = true;
});

window.addEventListener('appinstalled', () => {
    installBtn.hidden = true;
    console.log('Aplikacja została zainstalowana.');
});

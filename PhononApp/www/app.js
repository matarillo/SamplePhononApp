document.addEventListener("include", function (e) {
    phonon.options({
        navigator: {
            defaultPage: 'login',
            animatePages: true,
            enableBrowserBackButton: true,
            templateRootDirectory: ''
        },
        i18n: null
    });

    var app = phonon.navigator();
    app.on({ page: 'pagetwo', preventClose: true });
    app.start();
});

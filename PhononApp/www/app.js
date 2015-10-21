phonon.options({
    navigator: {
        defaultPage: 'login',
        animatePages: true,
        enableBrowserBackButton: true,
        templateRootDirectory: './tpl'
    },
    i18n: null
});

var app = phonon.navigator();
app.on({ page: 'login', preventClose: false, content: null });
app.on({ page: 'main', preventClose: false, content: null });
app.on({ page: 'pagetabs', preventClose: false, content: null });
app.on({ page: 'home', preventClose: false, content: null });
app.on({ page: 'pagetwo', preventClose: true, content: null });
app.start();

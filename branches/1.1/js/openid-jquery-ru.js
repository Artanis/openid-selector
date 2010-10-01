/*
Simple OpenID Plugin
http://code.google.com/p/openid-selector/

This code is licenced under the New BSD License.
*/

var providers_large = {
    google: {
        name: 'Google',
        url: 'https://www.google.com/accounts/o8/id'
    },
    yahoo: {
        name: 'Yahoo',      
        url: 'http://me.yahoo.com/'
    },
    myopenid: {
      name: 'MyOpenID',
      label: 'Введите ваше MyOpenID имя.',
      url: 'http://{username}.myopenid.com/'
    },
    aol: {
        name: 'AOL',     
        label: 'Введите ваше AOL screenname.',
        url: 'http://openid.aol.com/{username}'
    },
    openid: {
        name: 'OpenID',     
        label: 'Введите ваш OpenID.',
        url: null
    }
};
var providers_small = {
    livejournal: {
        name: 'Живой Журнал',
        label: 'Введите ваше Livejournal username.',
        url: 'http://{username}.livejournal.com/'
    },
    /* flickr: {
        name: 'Flickr',        
        label: 'Введите ваше Flickr username.',
        url: 'http://flickr.com/{username}/'
    }, */
    /* technorati: {
        name: 'Technorati',
        label: 'Введите ваше Technorati username.',
        url: 'http://technorati.com/people/technorati/{username}/'
    }, */
    wordpress: {
        name: 'Wordpress',
        label: 'Введите ваше Wordpress.com username.',
        url: 'http://{username}.wordpress.com/'
    },
    blogger: {
        name: 'Blogger',
        label: 'Ваш Blogger аккаунт',
        url: 'http://{username}.blogspot.com/'
    },
    verisign: {
      name: 'Verisign',
      label: 'Ваше Verisign username',
      url: 'http://{username}.pip.verisignlabs.com/'
    },
    /* vidoop: {
        name: 'Vidoop',
        label: 'Ваше Vidoop username',
        url: 'http://{username}.myvidoop.com/'
    }, */
    /* launchpad: {
        name: 'Launchpad',
        label: 'Ваше Launchpad username',
        url: 'https://launchpad.net/~{username}'
    }, */
    claimid: {
        name: 'ClaimID',
        label: 'Ваше ClaimID username',
        url: 'http://claimid.com/{username}'
    },
    clickpass: {
      name: 'ClickPass',
      label: 'Введите ваше ClickPass username',
      url: 'http://clickpass.com/public/{username}'
    },
    google_profile: {
      name: 'Профиль Google',
      label: 'Введите ваше Google Profile username',
      url: 'http://www.google.com/profiles/{username}'
    }
};

openid.demo_text = 'В демонстрационном режиме на клиенте. В действительности произошел бы сабмит следующего OpenID:';
openid.signin_text = 'Войти';

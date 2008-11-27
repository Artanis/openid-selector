/*************************************************************
 * Open-selector
 *  Help regular people to login using OpenID without them knowing
 *
 * Javascript snippet to change your regular OpenID box for a provider 
 * combo box.
 *
 * Based on:
 *    - http://sites.google.com/site/oauthgoog/UXFedLogin
 *    - http://ma.gnolia.com/signin/ 
 *
 * This is an alternative to IdSelector? (http://www.idselector.com/)
 *  
 * Proyect page:
 *  http://code.google.com/p/open-selector/
 * 
 * Jj (jjdelc@gmail.com)
 *  http://isgeek.net/ - 2008
 *
 *
 * Usage
 * -----
 * Add this to your signin page:
 *
 * <script src="/js/open-selector.js" type="text/javascript"></script>
 * <script type="text/javascript">
 *     open_selector.openid_form_id= 'openid_form';// ID for the OpenID form
 *     open_selector.openid_box_id= 'openid_url';// ID for the OpenID URL box
 *     open_selector.init();
 * </script>
 *
 *************************************************************/

// List of OpenID providers
var providers = {
    myopenid: {
        name: 'MyOpenid',
        ask_username: true,
        icon: "https://www.myopenid.com/favicon.ico?version=1",
        url: 'http://{username}.myopenid.com/'
    },

    livejournal: {
        name: 'LiveJournal',
        label: 'Enter your Livejournal username',
        ask_username: true,
        icon: 'http://livejournal.com/favicon.ico',
        url: 'http://{username}.livejournal.com/'
    },

    yahoo: {
        name: 'Yahoo',
        info: 'Continue to Yahoo to login.',
        ask_username: false,
        icon: 'http://yahoo.com/favicon.ico',
        url: 'http://yahoo.com/'
    },

    google: {
        name: 'GMail account',
        ask_username: false,
        info: 'Sign in with your Google account.',
        icon: 'http://mail.google.com/mail/images/favicon.ico',
        url: 'https://www.google.com/accounts/o8/id',
    },

    aol: {
        name: 'AOL',
        label: 'Enter your AOL screenname',
        ask_username: true,
        icon: 'http://aol.com/favicon.ico',
        url: 'http://openid.aol.com/{username}/',
    },

    flickr: {
        name: 'Flickr',
        label: 'Enter your flickr username',
        ask_username: true,
        icon: 'http://flickr.com/favicon.ico',
        url: 'http://flickr.com/{username}/',
    },

    technorati: {
        name: 'Technorati',
        label: 'Enter your Technorati username',
        ask_username: true,
        icon: 'http://technorati.com/favicon.ico',
        url: 'http://technorati.com/people/technorati/{username}/',
    },

    wordpress: {
        name: 'Wordpress',
        label: 'Enter your Wordpress.com username',
        ask_username: true,
        icon: 'http://wordpress.com/favicon.ico',
        url: 'http://{username}.wordpress.com/',
    },
    
    blogger: {
        name: 'Blogger',
        label: 'Your Blogger account',
        ask_username: true,
        icon: 'http://blogger.com/favicon.ico',
        url: 'http://{username}.blogspot.com/',
    },
    
    openid: {
        name: 'Other OpenID provider',
        label: 'Your OpenID identifier',
        info: 'You know what OpenID is.',
        ask_username: true,
        icon: 'http://openid.net/favicon.ico',
        url: '',
    }
};

var open_selector = {
    // ID of the OpenID Login form
    openid_form_id: 'openid_form',

    // ID of the OpenID URL box
    openid_box_id: 'openid_url',

    init: function(){
        if (this.active == true) {
            return;
        }
        var openid_form = $('#' + this.openid_form_id);
        var openid_box = $('#' + this.openid_box_id);
        openid_box.hide();
        openid_box.after('<p><label for="open-selector">Select your provider</label>:<br/> <select id="open-selector"></select></p><p id="open-selector-user-block" style="display:none;"><label for="open-selector-username">Username</label>:<br/> <input type="text" size="20" style="padding-left: 22px;" id="open-selector-username" style="display:none;"/><br/><span style="font-size: 90%;font-style:italic;color:#BBB"></span></p> <p id="open-selector-info"></p><p style="color:#DDD;font-size:80%;font-style:italic;">Powered by <a href="http://open-selector.com" title="Open-selector">Open-selector</a>.</p>');

        var open_selector = $('#open-selector');
        var open_user = $('#open-selector-username');
        var open_user_block = $('#open-selector-user-block');
        var info = $('#open-selector-info'); 
        var label = $('#open-selector-user-block label');
        var span = $('#open-selector-user-block span');

        var provider, style, option, selected_provider;
        var endpoint = "";

        // Fill the combo box with configured providers
        open_selector.prepend("<option>Select provider</option>");
        for (provider_id in providers) {
            provider = providers[provider_id];
            style = 'style="padding-left: 22px;background: url(' + provider.icon+ ') no-repeat 3px center"';
            option = '<option id="' + provider_id + '" ' + style + '>' + provider.name + '</option>';
            open_selector.append(option);
        }

        // Set what to do on provider selecion
        open_selector.change(function(){
            endpoint = "";
            $('option', this).each(function(){
                if (this.selected == true) {
                    if (this.id) {
                        selected_provider = providers[this.id];
                        endpoint = selected_provider.url;

                        if (selected_provider.info) {
                            info.html(selected_provider.info);
                            info.show();
                        } else {
                            info.hide();
                        }

                        if ( selected_provider.ask_username == true) {
                            open_user.css('background', "url(" + selected_provider.icon + ") no-repeat 3px center");

                            span.html(endpoint);
                            if (selected_provider.label) {
                                label.html(selected_provider.label);
                            } else {
                                label.html('Enter your username');
                            }

                            open_user_block.show();
                            open_user.focus();
                        } else {
                            open_user_block.hide();
                        }
                    } else {
                        // Not a provider selection
                        open_user_block.hide()
                    }
                return; // Stop looping here
                }
            });
        });

        // Convert the endpoint to the OpenID identifier before submiting()
        var button = $('#' + this.openid_form_id + ' input[type=submit]');
        var button_action = button.click;
        button.click(function(){
            endpoint = endpoint.replace('{username}', open_user.val());
            openid_box.val(endpoint);
            button_action();
        });
        this.active = true;
    },
    active: false,
};


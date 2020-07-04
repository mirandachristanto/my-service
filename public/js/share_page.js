function shareFacebook(){
    var share_url = window.location.href
    window.open(
        'https://www.facebook.com/sharer.php?u='+share_url,
        '',
        'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600'
    );
}
function shareTwitter(){
    var share_url = window.location.href
    window.open(
        'https://twitter.com/intent/tweet?text='+share_url,
        '',
        'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600'
    );
}

function shareWhatsApp(){
    var share_url = window.location.href
    window.open(
        'whatsapp://send?text='+share_url,
        '',
        'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600'
    );
}
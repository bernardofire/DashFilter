$(document).ready(function() {
    $('#ok').click(setOptionsIntoLocalStorage);
    if (getOptionsFromLocalStorage())
        configureOptionsInPopup();
});

function verifyOptions() {
    var dash_options = {};
    $('input').each(function() {
        dash_options[this.id] = this.checked ? true : false;
    });
    return dash_options;
}

function configureOptionsInPopup() {
    var dash_options = getOptionsFromLocalStorage();
    $('input').each(function() {
        if (dash_options[this.id] === true && !this.checked)
            $(this).attr('checked', 'checked');
        else if (dash_options[this.id] === false && this.checked)
            $(this).removeAttr('checked')
    });
}

function setOptionsIntoLocalStorage() {
    var dash_options = verifyOptions();
    localStorage.setItem('dashfilter_options', JSON.stringify(dash_options));
}

function getOptionsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('dashfilter_options'));
}

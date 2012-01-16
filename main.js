function setOptionsPanel() {
    var div = $('div.pagehead.shrunken.dashboard');
    div.append('\
        <div id="dash_options">\
            <input type="checkbox" checked id="watch_started"> Watch </input>\
            <input type="checkbox" checked id="follow"> Follow </input>\
            <input type="checkbox" checked id="push"> Push </input>\
            <input type="checkbox" checked id="create"> Create </input>\
            <input type="checkbox" checked id="fork"> Fork </input>\
            <input type="checkbox" checked id="issues_opened"> Opened Issue</input>\
            <input type="checkbox" checked id="issues_closed"> Closed Issue</input>\
            <input type="checkbox" checked id="issues_comment"> Commented Issue</input>\
            <input type="checkbox" checked id="gist"> Gist </input>\
            <input type="checkbox" checked id="gollum"> Gollum </input>\
        </div>\
    ');

    var inputs = div.find('input');
    inputs.change(function() {
        setOptionsIntoLocalStorage();
        filterDashboard();
    });
}

function setOptionsIntoLocalStorage() {
    var dash_options = verifyOptions();
    localStorage.setItem('dashfilter_options', JSON.stringify(dash_options));
}

function getOptionsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('dashfilter_options'));
}

function verifyOptions() {
    var dash_options = {};
    var div = $('div.pagehead.shrunken.dashboard');
    div.find('input').each(function() {
        dash_options[this.id] = this.checked ? true : false;
    });
    return dash_options;
}

function configureOptionsInPage() {
    var dash_options = getOptionsFromLocalStorage();
    var div = $('div.pagehead.shrunken.dashboard');
    div.find('input').each(function() {
        if (dash_options[this.id] === true && !this.checked)
            $(this).attr('checked', 'checked');
        else if (dash_options[this.id] === false && this.checked)
            $(this).removeAttr('checked');
    });
}

function filterDashboard() {
    $('#dashboard .news').children().each(function() {
        dash = JSON.parse(localStorage.getItem('dashfilter_options'));
        var id = $(this).attr('class').replace('alert', '').trim();
        dash[id] ? $(this).show() : $(this).hide();
    })
}


(function main() {
    setOptionsPanel();
    if (getOptionsFromLocalStorage)
        configureOptionsInPage();
    else
        setOptionsIntoLocalStorage();
})();

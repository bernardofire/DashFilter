function setOptionsPanel() {
    var div = $('div.pagehead.shrunken.dashboard');
    div.append('\
        <div id="dash_filter">\
            <div id="dash_options">\
                <input type="checkbox" checked id="watch_started"> Watch </input>\
                <input type="checkbox" checked id="follow"> Follow </input>\
                <input type="checkbox" checked id="push"> Push </input>\
                <input type="checkbox" checked id="create"> Create </input>\
                <input type="checkbox" checked id="fork"> Fork </input>\
                <input type="checkbox" checked id="issues_opened"> Open Issue</input>\
                <input type="checkbox" checked id="issues_closed"> Close Issue</input>\
                <input type="checkbox" checked id="issues_comment"> Comment Issue</input>\
                <input type="checkbox" checked id="gist"> Gist </input>\
                <input type="checkbox" checked id="gollum"> Gollum </input>\
            </div>\
            <div id="filter_helper">\
                <span> Options: </span>\
                <a href="javascript:void(0);" id="invert"> Invert </a>\
                -\
                <a href="javascript:void(0);" id="none"> None </a>\
                -\
                <a href="javascript:void(0);" id="all"> All </a>\
            </div>\
        </div>\
    ');

    $('#invert').click(invertOptions);
    $('#none').click(noneOption);
    $('#all').click(allOptions);

    var inputs = div.find('input');
    inputs.change(function() {
        setOptionsAndFilterDash();
    });
}

function setOptionsAndFilterDash() {
    setOptionsIntoLocalStorage();
    filterDashboard();
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

//############################### Filter Options helper #########################################

function invertOptions() {
    $('#dash_options').children().each(function() {
        $(this).attr('checked') ? $(this).removeAttr('checked') : $(this).attr('checked', 'checked');
    });
    setOptionsAndFilterDash();
}

function noneOption() {
    $('#dash_options').children().removeAttr('checked');
    setOptionsAndFilterDash();
}

function allOptions() {
    $('#dash_options').children().attr('checked', 'checked');
    setOptionsAndFilterDash();
}

//###############################################################################################

(function main() {
    setOptionsPanel();
    filterDashboard();
    if (getOptionsFromLocalStorage)
        configureOptionsInPage();
    else
        setOptionsIntoLocalStorage();
})();

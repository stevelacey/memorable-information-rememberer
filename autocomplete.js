var ctx;

function ready() {
    chrome.storage.sync.get(function(settings) {
        if (settings.sites) {
            for (var i = 0; i < settings.sites.length; i++) {
                var site = settings.sites[i];
                if (document.location.href.indexOf(site.url) === 0) {
                    go(site)
                }
            }
        }
    });
}

function go(site) {
    var autocompletion = false
    var sectionlabels = ctx.querySelectorAll('label');
    for (var i = 0; i < sectionlabels.length; i++) {
        var label = sectionlabels[i];
        if (label.textContent.toLowerCase().indexOf('memorable info') !== -1) {
            label.click();
        }
    }
    var sectionidentifiers = ctx.querySelectorAll('h1, h2, h3');
    for (var i = 0; i < sectionidentifiers.length; i++) {
        var identifier = sectionidentifiers[i];
        var section = {
            name: identifier.textContent.toLowerCase().trim(),
            node: identifier.parentNode,
            site: site,
        };
        if (scan(section)) {
            autocompletion = true
        }
    }
    if (autocompletion && site.autosubmit) {
        submit();
    }
}

function scan(section) {
    var autocompletion = false
    for (var i = 0; i < section.site.memories.length; i++) {
        var memory = section.site.memories[i];
        if (section.name.indexOf(memory.name) !== -1 && section.node.getElementsByTagName('label').length) {
            if (autocomplete(section, memory)) {
                autocompletion = true;
            }
        }
    }
    return autocompletion
}

function autocomplete(section, memory) {
    var autocompletion = false
    var labels = section.node.getElementsByTagName('label');
    for (var i = 0; i < labels.length; i++) {
        var label = labels[i];
        var text = label.textContent.toLowerCase();
        if (text.indexOf('character') !== -1 || text.indexOf('number') !== -1) {
            var field = ctx.getElementById(label.attributes['for'].value);
            var char = memory.value[text.replace(/[^0-9]/g, '') - 1].toLowerCase();
            if (field.nodeName == 'SELECT') {
                var options = field.children;
                for (var o = 0; o < options.length; o++) {
                    var option = options[o];
                    if (option.textContent.toLowerCase().indexOf(char) !== -1 && option.value.replace('-', '')) {
                        autocompletion = true
                        field.value = option.value;
                    }
                }
            } else {
                autocompletion = true
                field.value = char;
            }
        }
    }
    return autocompletion
}

function submit() {
    var inputs = ctx.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        if (input.type == 'image' || input.type == 'submit') {
            input.click();
            break;
        }
    }
}

if (!document.getElementsByTagName('frameset').length) {
    ctx = document;
    ready();
} else {
    window.frames[0].onload = function() {
        ctx = this.document;
        ready();
    };
}

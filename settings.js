var form = document.getElementsByTagName('form')[0],
    sites = form.getElementsByClassName('sites')[0],
    submit = form.getElementsByTagName('button')[0];

function ready() {
    chrome.storage.sync.get(function(settings) {
        settings = settings.sites ? settings : {sites: []};
        settings.sites.push({i: settings.sites.length, memories: []})
        for (var i = 0; i < settings.sites.length; i++) {
            var site = settings.sites[i];
            site.i = i;
            sitebuild(site);
        }
    });

    form.addEventListener('submit', submithandler);
}

function sitebuild(site) {
    var html = '<fieldset class="site">' +
        '<input class="url" placeholder="http://www.example.com" type="url" value="' + (site.url || '') + '"' + (site.i === 0 ? ' autofocus' : '') + '>' +
        '<label><input class="autosubmit" type="checkbox"' + (site.autosubmit ? ' checked' : '') + '>autosubmit</label>' +
        '<div class="memories">';

    site.memories.push({i: site.memories.length, site: site})
    for (var i = 0; i < site.memories.length; i++) {
        var memory = site.memories[i];
        memory.i = i;
        memory.site = site;
        html += memorybuild(memory)
    }

    html += '</div>' +
    '</fieldset>';

    sites.insertAdjacentHTML('beforeend', html);
}

function memorybuild(memory) {
    return '<div class="memory">' +
        '<input class="name" placeholder="section name" type="text" value="' + (memory.name || '') + '">' +
        '<input class="value" placeholder="memorable information" type="password" value="' + (memory.value || '') + '">' +
    '</div>';
}

function siteparse(node) {
    site = {
        autosubmit: node.getElementsByClassName('autosubmit')[0].checked,
        url: node.getElementsByClassName('url')[0].value,
        memories: [],
    };

    var memories = node.getElementsByClassName('memory');
    for (var i = 0; i < memories.length; i++) {
        var memory = memoryparse(memories[i]);
        if (memory) site.memories.push(memory);
    }

    if (site.url) return site;
}

function memoryparse(node) {
    memory = {
        name: node.getElementsByClassName('name')[0].value,
        value: node.getElementsByClassName('value')[0].value,
    }

    if (memory.name && memory.value) return memory;
}

function submithandler(e) {
    e.preventDefault();
    var settings = {sites: []};

    var nodes = sites.getElementsByClassName('site');
    for (var i = 0; i < nodes.length; i++) {
        var site = siteparse(nodes[i]);
        if (site) settings.sites.push(site);
    }

    chrome.storage.sync.set(settings, function() {
        submit.innerHTML = '&#10004;';
        submit.style.background = '#4CAF50';
        submit.style.border = '1px solid #4CAF50';
        submit.style.color = 'white';
        submit.style.boxShadow = 'none';
        submit.style.textShadow = 'none';
        setTimeout(function() { window.location.reload(); }, 1000);
    });
}

ready();

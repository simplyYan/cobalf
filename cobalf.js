class Cobalf {
    constructor() {
        this.toolboxActivated = false;
        this.requestIds = [];
        this.localStorageKey = 'cobalfEncryptionKey'; // Key for LocalStorage encryption (should be kept secret)
    }

    static New() {
        return new Cobalf();
    }

    RequestMade(id) {
        return this.requestIds.includes(id);
    }

    Select(element, index) {
        const matches = element.innerHTML.match(/::(.*?)::/g);
        return matches[index - 1].replace(/::/g, '');
    }

    Replace(element, index, newValue) {
        const matches = element.innerHTML.match(/::(.*?)::/g);
        element.innerHTML = element.innerHTML.replace(matches[index - 1], newValue);
    }

    InputValue(input) {
        return input.value;
    }

    Clipboard(text) {
        navigator.clipboard.writeText(text);
    }

    SetAttribute(id, attribute, value) {
        const element = this.Id(id);
        element.setAttribute(attribute, value);
    }

    Id(idd) {
        return document.getElementById(idd);
    }

    Toolbox() {
        this.toolboxActivated = true;
        this.currentDate = new Date();
        this.lastModified = document.lastModified;
    }

    LocalKey(name) {
        return `${name}_${Math.random().toString(36).substr(2, 9)}`;
    }

    LocalStorage(value, key) {
        const encryptedValue = this.encrypt(value, key);
        localStorage.setItem(key, encryptedValue);
    }

    CSS(css) {
        return function() {
            const style = document.createElement('style');
            style.innerHTML = css;
            document.head.appendChild(style);
        }
    }

    GetStorage(key) {
        const encryptedValue = localStorage.getItem(key);
        return this.decrypt(encryptedValue, key);
    }

    encrypt(value, key) {
        // Encryption
        return btoa(value + key); // Simple simulation
    }

    decrypt(encryptedValue, key) {
        // Decryption simula
        return atob(encryptedValue).replace(key, ''); // Simple simulation
    }

    HTML(html) {
        const sanitizedHTML = this.sanitizeHTML(html); // Necessary HTML sanitization function
        document.body.insertAdjacentHTML('beforeend', sanitizedHTML);
    }

   sanitizeHTML(html) {
    const element = document.createElement('div');
    element.innerHTML = html;
    const sanitizedHTML = element.textContent;
    return sanitizedHTML;
}


    Request(options, successCallback, errorCallback) {
        const xhr = new XMLHttpRequest();
        xhr.open(options.type, options.url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                successCallback(xhr.responseText);
            } else {
                errorCallback(xhr.statusText);
            }
        };

        xhr.onerror = function () {
            errorCallback(xhr.statusText);
        };

        xhr.send(JSON.stringify(options.data));
    }
}

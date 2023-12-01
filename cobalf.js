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
        element.innerText = html;
        const sanitizedHTML = element.innerHTML;
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

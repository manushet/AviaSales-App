class Loader {  
    static showLoader() {
        const container = document.querySelector('.form-section');
        const loader = `
            <div class="progress">
                <div class="indeterminate"></div>
            </div>
        `;
        container.insertAdjacentHTML('beforeEnd', loader);
    }

    static hideLoader() {
        const loader = document.querySelector(".progress");
        if (loader) {
            loader.remove();
        }
    }   
}

export default Loader;
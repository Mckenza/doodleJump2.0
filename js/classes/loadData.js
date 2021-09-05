class LoadData {
    constructor() {
        this.url = 'https://fe.it-academy.by/AjaxStringStorage2.php';
        this.nameData = 'buyak_eugene_doodlejump_score';
        this.pass = '123456Zz';
    }

    readData(callback) {
        $.ajax({
            url: this.url,
            type: 'POST',
            data: {
                f: 'READ',
                n: this.nameData,
            },
            success: resolve.bind(this),
            error: reject,
        });

        function resolve(data) {
            console.log('READ - ok');
            callback(data);
        }

        function reject() {
            console.log('READ - bad');
        }
    }
    /*
    insertData(){
        $.ajax({
            url: this.url,
            type: 'POST',
            data: {
                f: 'INSERT',
                n: this.nameData,
                v: JSON.stringify({}),
            },
            success: resolve.bind(this),
            error: reject,
        });

        function resolve(data) {
            console.log('INSERT - ok');
            console.log(data);
        }

        function reject() {
            console.log('INSERT - bad');
        }
    }
    */

    lockgetData() {
        $.ajax({
            url: this.url,
            type: 'POST',
            data: {
                f: 'LOCKGET',
                n: this.nameData,
                p: this.pass,
            },
            success: resolve.bind(this),
            error: reject,
        });

        function resolve(data) {
            console.log('LOCKGET - ok');
            console.log(data);
            this.updateData();
        }

        function reject() {
            console.log('LOCKGET - bad');
        }
    }

    updateData() {
        $.ajax({
            url: this.url,
            type: 'POST',
            data: {
                f: 'UPDATE',
                n: this.nameData,
                p: this.pass,
                v: JSON.stringify([]), /* */
            },
            success: resolve.bind(this),
            error: reject,
        });

        function resolve(data) {
            console.log('UPDATE - ok');
            console.log(data);
        }

        function reject() {
            console.log('UPDATE - bad');
        }
    }
}

export { LoadData };
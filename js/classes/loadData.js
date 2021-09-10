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
            dataType: 'json',
            data: {
                f: 'READ',
                n: this.nameData,
            },
            success: resolve.bind(this),
            error: reject.bind(this),
        });

        function resolve(data) {
            console.log('READ - ok');
            console.log(data);
            callback(JSON.parse(data.result));
        }

        function reject() {
            console.log('READ - bad');
            callback('Error read data');
        }
    }

    lockgetData(array, callback) {
        $.ajax({
            url: this.url,
            type: 'POST',
            data: {
                f: 'LOCKGET',
                n: this.nameData,
                p: this.pass,
            },
            success: resolve.bind(this),
            error: reject.bind(this),
        });

        function resolve(data) {
            console.log('LOCKGET - ok');
            console.log(data);
            this.updateData(array, callback);
        }

        function reject() {
            console.log('LOCKGET - bad');
            alert('Ошибка при обновлении/добавлении данных');
        }
    }

    updateData(data, callback) {
        $.ajax({
            url: this.url,
            type: 'POST',
            data: {
                f: 'UPDATE',
                n: this.nameData,
                p: this.pass,
                v: JSON.stringify(data),
            },
            success: resolve.bind(this),
            error: reject.bind(this),
        });

        function resolve(data) {
            console.log('UPDATE - ok');
            callback(data);
        }

        function reject() {
            console.log('UPDATE - bad');
        }
    }
}

export { LoadData };
var rangeText = function (start, end) {
        var str = '';
        str += start ? start.format('D MMMM YYYY') + ' to ' : '';
        str += end ? end.format('D MMMM YYYY') : '...';

        return str;
    };

new Lightpick({
    field: document.getElementById('startdate'),
    secondField: document.getElementById('enddate'),
    onSelect: function(start, end){
        var timesheetTable = document.getElementById('timesheetTable') 
        // axios.post('http://jsonplaceholder.typicode.com/todos', {
        //     userId: '1',
        //     title: 'SOME TITLE',
        //     completed: false
        // })
        // axios.get('https://still-chamber-18482.herokuapp.com/')
        // .then(function (response) {
        //     timesheetTable.innerHTML = '<h3>Employee Timesheet</h3>';
        //     timesheetTable.innerHTML += 'Insert timesheet table here';
        // })
        // .catch(function (error) {
        //     timesheetTable.innerHTML = '<font color="#DC322F"><b>Request error, please contact administrator.</b></font>';
        // });
    }
});

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
        var timesheetView = document.getElementById('timesheetTable') 
        var startDate = start.format('YYYY-MM-DD')
        var endDate = end.format('YYYY-MM-DD')
        
        // Only when both startDate and endDate selected, send POST request
        if (endDate) {
            timesheetView.innerHTML = '<div class="loader" id="loader"></div>';
            axios.post('/view', {
                startDate: startDate,
                endDate: endDate
            })
            .then(function (response) {
                timesheetView.innerHTML = '<h3>Employee Timesheet</h3>';
                timesheetView.innerHTML += response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
});

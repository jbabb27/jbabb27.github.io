$(document).ready(function() {
    function format (d) {
        // d is the row's data object
        return `
          <div class="p-3">
            ${d.expand}
          </div>
        `;
    }

               
    var table = $('#airport-table').DataTable({
        pageLength: 25,
        columns: [
            {
                className: 'dt-control',
                orderable: false,
                data: null,
                defaultContent: '',
            },
            { data: 'airport' },
            { data: 'name' },
            { data: 'visits' },
            { data: 'last visited' },
            { data: 'distance from kmsn (nm)', 
                render: function (data, type, row) {
                    if (type === 'display') {
                        return `<span data-order="${data}">${data} nm</span>`;
                    }
                    return data; // For sorting/searching
                },
                type: 'num' },
            { data: 'expand', visible: false },
        ],
        order: [[3, 'desc']],

    });

    // Add event listener for opening and closing details
    $('#airport-table tbody').on('click', 'td.dt-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    });
});
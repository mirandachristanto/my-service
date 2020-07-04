var table_point;

function openUpdatePoints(id){
    posting({
        url: base_url+"/ms_points/get",
        param: {
            id:id,
        },
        done: function (res) {
            console.log(res.data)
            $('#update_id').val(res.data.id_points)
            $('#update_idprograms').val(res.data.id_programs)
            $('#update_typeproducts').val(res.data.type_product).trigger('chosen:updated');
            $('#update_pointvalue').val(res.data.point_value)
            
            $('#modal_ms_points_update').modal('show');
        }
    });
}

function activePoints(id, isActive){
    if(confirm("Are you sure want to "+(isActive?"deactive":"activate")+"?")){
        posting({
            url: base_url+"/ms_points/active",
            param: {
                id:id,
            },
            done: function (data) {
                alert(data.status);
                table_point.ajax.reload();
            }
        })
    }
}

function deletePoints(id){
    if(confirm("Are you sure want to delete?")){
        posting({
            url: base_url+"/ms_points/delete",
            param: {
                id:id,
            },
            done: function (data) {
                alert(data.status);
                table_point.ajax.reload();
            }
        })
    }
}

$(document).ready(function(){
    $.fn.dataTable.ext.errMode = 'throw';
    table_point = $('#point-table').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url":base_url+"/ms_points/list",
            "method":"POST",
            "data": function ( d ) {
                d.id_programs = id_programs;
            }
        },
        "columns":[
            {data:"programs_name", defaultContent: "<i class='not-set'>Not set</i>"},
            {data:"type_product", defaultContent: "<i class='not-set'>Not set</i>"},
            {data:"point_value", defaultContent: "<i class='not-set'>Not set</i>"},
            {data:"is_active",
                searchable:false,
                render: function(data, type, row){
                    if(data)return "<i class='fas fa-play text-success' title='Active'></i>";
                    else return "<i class='fas fa-stop text-danger title='Not Active'></i>"
                }
            },
            {data:"created_date",
                searchable:false,
                render: function(data, type, row){
                    if(!data) return "<i class='not-set'>Not set</i>"
                    if(type === "sort" || type === "type"){
                        return data;
                    }
                    return  moment(data).format("YYYY-MM-DD HH:mm:ss")
                }
            },
            {data:"updated_date",
                searchable:false,
                render: function(data, type, row){
                    if(!data) return "<i class='not-set'>Not set</i>"
                    if(type === "sort" || type === "type"){
                        return data;
                    }
                    return  moment(data).format("YYYY-MM-DD HH:mm:ss")
                }
            },
            {
                orderable:false,
                searchable:false,
                data: {"id_points":"id_points", "is_active":"is_active"},
                render: function(data, type, row){
                    var button = "<div style='text-align:center;'>"
                    button += "<button class='btn btn-warning fix-btn' onclick='openUpdatePoints(\""+data.id_points+"\")' title='Edit'><i class='fas fa-pencil-alt'></i></button>"
                    button += "<button class='btn btn-danger fix-btn' onclick='deletePoints(\""+data.id_points+"\")' title='Delete'><i class='fas fa-trash-alt'></i></button>"
                    button += " | "
                    if(!data.is_active)
                        button += "<button class='btn btn-success fix-btn' onclick='activePoints(\""+data.id_points+"\","+data.is_active+")' title='Activate'><i class='fas fa-play'></i></button>"
                    else
                        button += "<button class='btn btn-danger fix-btn' onclick='activePoints(\""+data.id_points+"\","+data.is_active+")' title='Deactivate'><i class='fas fa-stop'></i></button>"
                    button += "</div>"
                    return button
                }
            }
        ]
    })

    $("#btn-add-point").click(function(){
        $("#typeproducts").val('').trigger('chosen:updated');
        $("#pointvalue").val('')
        
        $('#modal_ms_points_add').modal('show');
    })

    $("#save_ms_points").click(function(){
        if(!$("#pointvalue").val()){
            alert("Point value harus diisi")
            return;
        }
        $('#add_ms_points_form').submit();
    })
    $("#add_ms_points_form").submit(function(e){
        posting({
            url: base_url+"/ms_points/insert",
            param: $("#add_ms_points_form").serialize(),
            done: function (data) {
                alert(data.status)
                $('#modal_ms_points_add').modal('hide')
                table_point.ajax.reload();
            }
        });
        e.preventDefault();
    })
    $("#update_save_ms_points").click(function(){
        if(!$("#update_pointvalue").val()){
            alert("Point value harus diisi")
            return;
        }
        $('#update_ms_points_form').submit();
    })
    $("#update_ms_points_form").submit(function(e){
        posting({
            url: base_url+"/ms_points/update",
            param: $("#update_ms_points_form").serialize(),
            done: function (data) {
                alert(data.status)
                $('#modal_ms_points_update').modal('hide')
                table_point.ajax.reload();
            }
        });
        e.preventDefault();
    })
    
    $(".chosen-select").chosen({ width: '100%' })
})
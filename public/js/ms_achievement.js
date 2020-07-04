var table_achievement;
var count_requirement_row = 0;
var programs_lock = false;

function openUpdateAchievement(id){
    posting({
        url: base_url+"/ms_achievement/get",
        param: {
            id:id,
        },
        done: function (res) {
            console.log(res.data)
            $('#update_idachievement').val(res.data.id_achievement)
            $('#update_idprograms').val(res.data.id_programs)
            $('#update_achievementname').val(res.data.achievement_name)
            $('#update_achievementvalue').val(res.data.achievement_value)
            $("#update_list_requirement").html("")
            for (let i = 0; i < res.data.requirement.length; i++) {
                const element = res.data.requirement[i];
                $("#update_list_requirement").append(generateNewRequirement(element))
                $(".chosen-select").chosen({ width: '100%' })
            }
            
            $('#modal_ms_achievement_update').modal('show');
        }
    });
}

function activeAchievement(id, isActive){
    if(confirm("Are you sure want to "+(isActive?"deactive":"activate")+"?")){
        posting({
            url: base_url+"/ms_achievement/active",
            param: {
                id:id,
            },
            done: function (data) {
                alert(data.status);
                table_achievement.ajax.reload();
            }
        })
    }
}

function deleteAchievement(id){
    if(confirm("Are you sure want to delete?")){
        posting({
            url: base_url+"/ms_achievement/delete",
            param: {
                id:id,
            },
            done: function (data) {
                alert(data.status);
                table_achievement.ajax.reload();
            }
        })
    }
}

function changeData(num_row){
    $("#requirement_comparator_data_"+num_row).html("")
    var list_data = achievement_data[$("#requirement_comparator_name_"+num_row).val()]
    var data_select = ""
    for (let i = 0; i < list_data.length; i++) {
        const element = list_data[i];
        data_select+="<option value='"+element+"'>"+element+"</option>"
    }
    $("#requirement_comparator_data_"+num_row).html(data_select)
    $("#requirement_comparator_data_"+num_row).prop('disabled', (list_data.length < 1));
    $("#requirement_comparator_data_"+num_row).trigger("chosen:updated");
    
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function generateNewRequirement(data){
    var num_row = count_requirement_row++
    var row_id = "requirement_row_"+num_row

    var list_comparator = Object.keys(achievement_data)
    var comparator_select = "<select onchange='changeData("+num_row+")' id='requirement_comparator_name_"+num_row+"' name='requirement:"+num_row+":comparator_name' class='form-control'>"
    for (let i = 0; i < list_comparator.length; i++) {
        const element = list_comparator[i];
        comparator_select+="<option value='"+element+"' "+(data?data.comparator_name==element?"selected":"":"")+">"+capitalize(element)+"</option>"
    }
    comparator_select+="</select>"

    var list_data = achievement_data[data?data.comparator_name:list_comparator[0]]
    console.log(list_data.length)
    var data_select = "<select id='requirement_comparator_data_"+num_row+"' name='requirement:"+num_row+":comparator_data' class='form-control chosen-select' "+(list_data.length<1?"disabled":"")+">"
    for (let i = 0; i < list_data.length; i++) {
        const element = list_data[i];
        data_select+="<option value='"+element+"' "+(data?data.comparator_data==element?"selected":"":"")+">"+element+"</option>"
    }
    data_select+="</select>"

    var row = "<tr id='"+row_id+"'>"
    row += "<td>"+comparator_select+"</td>"
    row += "<td>"+data_select+"</td>"
    row += "<td><input type='number' name='requirement:"+num_row+":comparator_value' class='form-control' "+(data?data.comparator_value?"value='"+data.comparator_value+"'":"":"")+"></td>"
    row += "<td style='text-align:center;'><button id='requirement_row_delete_"+num_row+"' class='btn btn-danger' type='button' onclick='delete_row(\""+row_id+"\")'><i class='fas fa-times'></i></button></td>"
    row += "</tr>"
    return row
}

function getFormData(form_id){
    const form = document.querySelector('#'+form_id);
    const data = new FormData(form)
    const arrayData = Array.from(data)
    var listData = {}
    var currType = "";
    var currCount = 0;
    var currObj = {}
    for (let index = 0; index < arrayData.length; index++) {
        const element = arrayData[index]
        var [type, count, key] = element[0].split(':')
        var value = element[1]
        if(currType != type){    
            currType = type
            currCount = count;
            listData[currType] = Object.assign({},listData[currType])
            listData[currType] = []
        }
        if(index == 0) currCount = count
        if(count && key){
            currObj[key] = Object.assign({},currObj[key])
            currObj["num_row"] = count;
            currObj[key] = value;
            if(index < arrayData.length - 1){
                const nextElement = arrayData[index+1]
                var [nextType, nextCount, nextKey] = nextElement[0].split(':')
                if(nextType != currType || currCount != parseInt(nextCount)){
                    if(currCount != parseInt(nextCount)){
                        currCount = parseInt(nextCount)
                    }
                    listData[currType].push(currObj)
                    currObj = {}
                }
            }else{
                listData[type].push(currObj)
            }
        }else{
            listData[type] = value
        }
    }
    return listData
}

function delete_row(row_id){
    if(confirm("Apakah anda yakin untuk menghapus baris ini?")){
        $('#'+row_id).remove();
    }
}


$(document).ready(function(){
    $.fn.dataTable.ext.errMode = 'throw';
    table_achievement = $('#achievement-table').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url":base_url+"/ms_achievement/list",
            "method":"POST",
            "data": function ( d ) {
                d.id_programs = id_programs;
            }
        },
        "columns":[
            {data:"programs_name", defaultContent: "<i class='not-set'>Not set</i>"},
            {data:"achievement_name", defaultContent: "<i class='not-set'>Not set</i>"},
            {data:"achievement_value", defaultContent: "<i class='not-set'>Not set</i>"},
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
                data: {"id_achievement":"id_achievement", "is_active":"is_active"},
                render: function(data, type, row){
                    var button = "<div style='text-align:center;'>"
                    button += "<button class='btn btn-warning fix-btn' onclick='openUpdateAchievement(\""+data.id_achievement+"\")' title='Edit'><i class='fas fa-pencil-alt'></i></button>"
                    button += "<button class='btn btn-danger fix-btn' onclick='deleteAchievement(\""+data.id_achievement+"\")' title='Delete'><i class='fas fa-trash-alt'></i></button>"
                    button += " | "
                    if(!data.is_active)
                        button += "<button class='btn btn-success fix-btn' onclick='activeAchievement(\""+data.id_achievement+"\","+data.is_active+")' title='Activate'><i class='fas fa-play'></i></button>"
                    else
                        button += "<button class='btn btn-danger fix-btn' onclick='activeAchievement(\""+data.id_achievement+"\","+data.is_active+")' title='Deactivate'><i class='fas fa-stop'></i></button>"
                    button += "</div>"
                    return button
                }
            }
        ]
    })

    $("#btn-add-achievement").click(function(){
        $('#achievementname').val("")
        $('#achievementvalue').val("")
        $("#list_requirement").html("")
        $("#list_requirement").append(generateNewRequirement())
        $(".chosen-select").chosen({ width: '100%' })
        
        $('#modal_ms_achievement_add').modal('show');
    })

    $("#save_ms_achievement").click(function(){
        $('#add_ms_achievement_form').submit();
    })
    $("#add_ms_achievement_form").submit(function(e){
        posting({
            url: base_url+"/ms_achievement/insert",
            param: getFormData("add_ms_achievement_form"),
            done: function (data) {
                if(data.status == "SUCCESS"){
                    alert(data.status)
                    $('#modal_ms_achievement_add').modal('hide')
                    table_achievement.ajax.reload();
                }else{
                    alert(data.message)
                }
            }
        });
        e.preventDefault();
    })
    $("#update_save_ms_achievement").click(function(){
        $('#update_ms_achievement_form').submit();
    })
    $("#update_ms_achievement_form").submit(function(e){
        posting({
            url: base_url+"/ms_achievement/update",
            param: getFormData("update_ms_achievement_form"),
            done: function (data) {
                if(data.status == "SUCCESS"){
                    alert(data.status)
                    $('#modal_ms_achievement_update').modal('hide')
                    table_achievement.ajax.reload();
                }else{
                    alert(data.message)
                }
                
            }
        });
        e.preventDefault();
    })

    $("#new_requirement").click(function(){
        $("#list_requirement").append(generateNewRequirement())
        $(".chosen-select").chosen({ width: '100%' })
    })

    $("#update_new_requirement").click(function(){
        $("#update_list_requirement").append(generateNewRequirement())
        $(".chosen-select").chosen({ width: '100%' })
    })
})